import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export type EtUser = {
  id: string;
  email: string;
  name?: string | null;
  passwordHash?: string | null;
  providers: string[];
  createdAt: string;
  updatedAt: string;
};

type FileStore = { users: EtUser[] };

const USER_PREFIX = "et:user:";
const EMAIL_INDEX = "et:user:email:";

function redis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function filePath() {
  const override = process.env.ET_AUTH_USERS_PATH?.trim();
  if (override) return override;
  // Vercel serverless FS is read-only except /tmp — local uses .data/
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "et-users.json");
  }
  return path.join(process.cwd(), ".data", "et-users.json");
}

function readFile(): FileStore {
  try {
    const p = filePath();
    if (!existsSync(p)) return { users: [] };
    const parsed = JSON.parse(readFileSync(p, "utf8")) as FileStore;
    return { users: Array.isArray(parsed.users) ? parsed.users : [] };
  } catch {
    return { users: [] };
  }
}

function writeFile(store: FileStore) {
  try {
    const p = filePath();
    mkdirSync(path.dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(store, null, 2), "utf8");
  } catch (err) {
    // Ephemeral FS can fail; JWT session still works without durable user rows.
    console.error("[et-auth] user store write failed", err);
  }
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const [, salt, hashHex] = parts;
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function getUserByEmail(email: string): Promise<EtUser | null> {
  const normalized = email.trim().toLowerCase();
  const r = redis();
  if (r) {
    const id = await r.get<string>(`${EMAIL_INDEX}${normalized}`);
    if (!id) return null;
    return (await r.get<EtUser>(`${USER_PREFIX}${id}`)) ?? null;
  }
  return readFile().users.find((u) => u.email === normalized) ?? null;
}

export async function getUserById(id: string): Promise<EtUser | null> {
  const r = redis();
  if (r) {
    return (await r.get<EtUser>(`${USER_PREFIX}${id}`)) ?? null;
  }
  return readFile().users.find((u) => u.id === id) ?? null;
}

async function saveUser(user: EtUser): Promise<EtUser> {
  const r = redis();
  if (r) {
    await r.set(`${USER_PREFIX}${user.id}`, user);
    await r.set(`${EMAIL_INDEX}${user.email}`, user.id);
    return user;
  }
  const store = readFile();
  const idx = store.users.findIndex((u) => u.id === user.id);
  if (idx >= 0) store.users[idx] = user;
  else store.users.push(user);
  writeFile(store);
  return user;
}

export async function upsertOAuthUser(input: {
  email: string;
  name?: string | null;
  provider: string;
}): Promise<EtUser> {
  const email = input.email.trim().toLowerCase();
  const existing = await getUserByEmail(email);
  const now = new Date().toISOString();
  if (existing) {
    const providers = Array.from(new Set([...existing.providers, input.provider]));
    return saveUser({
      ...existing,
      name: input.name ?? existing.name,
      providers,
      updatedAt: now,
    });
  }
  return saveUser({
    id: randomBytes(16).toString("hex"),
    email,
    name: input.name ?? null,
    passwordHash: null,
    providers: [input.provider],
    createdAt: now,
    updatedAt: now,
  });
}

export async function createPasswordUser(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<EtUser> {
  const email = input.email.trim().toLowerCase();
  if (await getUserByEmail(email)) {
    throw new Error("Account already exists");
  }
  if (input.password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const now = new Date().toISOString();
  return saveUser({
    id: randomBytes(16).toString("hex"),
    email,
    name: input.name?.trim() || null,
    passwordHash: hashPassword(input.password),
    providers: ["credentials"],
    createdAt: now,
    updatedAt: now,
  });
}

export async function setPassword(email: string, password: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  if (!user) return false;
  if (password.length < 8) throw new Error("Password must be at least 8 characters");
  await saveUser({
    ...user,
    passwordHash: hashPassword(password),
    providers: Array.from(new Set([...user.providers, "credentials"])),
    updatedAt: new Date().toISOString(),
  });
  return true;
}

function bridgeFilePath() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "bridge-codes.json");
  }
  return path.join(process.cwd(), ".data", "bridge-codes.json");
}

/** Short-lived bridge codes for studios that cannot read the parent cookie (e.g. AI Gaze). */
export async function issueBridgeCode(email: string): Promise<string> {
  const code = randomBytes(24).toString("hex");
  const payload = { email, exp: Date.now() + 5 * 60 * 1000 };
  const r = redis();
  if (r) {
    await r.set(`et:bridge:${code}`, payload, { ex: 300 });
    return code;
  }
  const p = bridgeFilePath();
  mkdirSync(path.dirname(p), { recursive: true });
  let map: Record<string, typeof payload> = {};
  try {
    if (existsSync(p)) map = JSON.parse(readFileSync(p, "utf8"));
  } catch {
    map = {};
  }
  map[code] = payload;
  writeFileSync(p, JSON.stringify(map), "utf8");
  return code;
}

export async function consumeBridgeCode(code: string): Promise<string | null> {
  const r = redis();
  if (r) {
    const payload = await r.get<{ email: string; exp: number }>(`et:bridge:${code}`);
    if (!payload) return null;
    await r.del(`et:bridge:${code}`);
    if (payload.exp < Date.now()) return null;
    return payload.email;
  }
  const p = bridgeFilePath();
  try {
    if (!existsSync(p)) return null;
    const map = JSON.parse(readFileSync(p, "utf8")) as Record<
      string,
      { email: string; exp: number }
    >;
    const payload = map[code];
    if (!payload) return null;
    delete map[code];
    writeFileSync(p, JSON.stringify(map), "utf8");
    if (payload.exp < Date.now()) return null;
    return payload.email;
  } catch {
    return null;
  }
}

export function isSsoEnabled(): boolean {
  return process.env.ET_SSO === "1" || process.env.NEXT_PUBLIC_ET_SSO === "1";
}

export function accountsSignInUrl(returnUrl?: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.elastictree.com").replace(
    /\/$/,
    "",
  );
  const u = new URL(`${base}/accounts/signin`);
  if (returnUrl) u.searchParams.set("returnUrl", returnUrl);
  return u.toString();
}
