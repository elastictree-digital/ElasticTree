import { randomBytes } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { getUserByEmail, hashToken, setPassword } from "@/lib/auth/users";

function redis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function filePath() {
  return path.join(process.cwd(), ".data", "reset-tokens.json");
}

export async function createResetToken(email: string): Promise<string | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = Date.now() + 60 * 60 * 1000;
  const r = redis();
  if (r) {
    await r.set(`et:reset:${tokenHash}`, { email: user.email, expiresAt }, { ex: 3600 });
    return token;
  }
  // Vercel file/.data is not durable across instances — require Redis in production.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    console.error("[ET Auth] Password reset requires Upstash Redis on Vercel");
    return null;
  }
  const p = filePath();
  mkdirSync(path.dirname(p), { recursive: true });
  let map: Record<string, { email: string; expiresAt: number }> = {};
  try {
    if (existsSync(p)) map = JSON.parse(readFileSync(p, "utf8"));
  } catch {
    map = {};
  }
  map[tokenHash] = { email: user.email, expiresAt };
  writeFileSync(p, JSON.stringify(map), "utf8");
  return token;
}

export async function resetWithToken(token: string, password: string): Promise<boolean> {
  const tokenHash = hashToken(token);
  const r = redis();
  if (r) {
    const row = await r.get<{ email: string; expiresAt: number }>(`et:reset:${tokenHash}`);
    if (!row || row.expiresAt < Date.now()) return false;
    await r.del(`et:reset:${tokenHash}`);
    return setPassword(row.email, password);
  }
  const p = filePath();
  if (!existsSync(p)) return false;
  const map = JSON.parse(readFileSync(p, "utf8")) as Record<
    string,
    { email: string; expiresAt: number }
  >;
  const row = map[tokenHash];
  if (!row || row.expiresAt < Date.now()) return false;
  delete map[tokenHash];
  writeFileSync(p, JSON.stringify(map), "utf8");
  return setPassword(row.email, password);
}
