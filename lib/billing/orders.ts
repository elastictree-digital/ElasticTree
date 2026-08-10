import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

export type PayUOrderRecord = {
  txnid: string;
  mihpayid?: string;
  sku: string;
  email: string;
  amountInr: number;
  status: "created" | "success" | "failure" | "fulfilled" | "fulfill_failed";
  createdAt: string;
  updatedAt: string;
  fulfillDetail?: string;
};

type Store = { orders: PayUOrderRecord[] };

const KEY_PREFIX = "payu:order:";
const EMAIL_INDEX_PREFIX = "payu:email:";

function redisFromEnv(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function emailIndexKey(email: string): string {
  return `${EMAIL_INDEX_PREFIX}${email.trim().toLowerCase()}`;
}

async function indexOrderEmail(
  redis: Redis,
  email: string,
  txnid: string,
): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@") || !txnid) return;
  // Keep email→txnid set aligned with order TTL (90 days)
  await redis.sadd(emailIndexKey(normalized), txnid);
  await redis.expire(emailIndexKey(normalized), 60 * 60 * 24 * 90);
}

function dataPath(): string {
  const override = process.env.PAYU_ORDERS_PATH?.trim();
  if (override) return override;
  return path.join(process.cwd(), ".data", "payu-orders.json");
}

function readFileStore(): Store {
  const file = dataPath();
  try {
    if (!existsSync(file)) return { orders: [] };
    const raw = readFileSync(file, "utf8");
    const parsed = JSON.parse(raw) as Store;
    return { orders: Array.isArray(parsed.orders) ? parsed.orders : [] };
  } catch {
    return { orders: [] };
  }
}

function writeFileStore(store: Store) {
  const file = dataPath();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(store, null, 2), "utf8");
}

function orderKey(txnid: string): string {
  return `${KEY_PREFIX}${txnid}`;
}

export async function upsertOrder(
  partial: Omit<PayUOrderRecord, "createdAt" | "updatedAt"> & {
    createdAt?: string;
  },
): Promise<PayUOrderRecord> {
  const now = new Date().toISOString();
  const redis = redisFromEnv();

  if (redis) {
    const key = orderKey(partial.txnid);
    const prev = (await redis.get<PayUOrderRecord>(key)) ?? null;
    const next: PayUOrderRecord = prev
      ? {
          ...prev,
          ...partial,
          createdAt: prev.createdAt,
          updatedAt: now,
        }
      : {
          ...partial,
          createdAt: partial.createdAt ?? now,
          updatedAt: now,
        };
    // 90 days retention
    await redis.set(key, next, { ex: 60 * 60 * 24 * 90 });
    await indexOrderEmail(redis, next.email, next.txnid);
    return next;
  }

  const store = readFileStore();
  const idx = store.orders.findIndex((o) => o.txnid === partial.txnid);
  if (idx >= 0) {
    const prev = store.orders[idx];
    const next: PayUOrderRecord = {
      ...prev,
      ...partial,
      createdAt: prev.createdAt,
      updatedAt: now,
    };
    store.orders[idx] = next;
    writeFileStore(store);
    return next;
  }
  const created: PayUOrderRecord = {
    ...partial,
    createdAt: partial.createdAt ?? now,
    updatedAt: now,
  };
  store.orders.push(created);
  writeFileStore(store);
  return created;
}

export async function getOrder(txnid: string): Promise<PayUOrderRecord | undefined> {
  const redis = redisFromEnv();
  if (redis) {
    const row = await redis.get<PayUOrderRecord>(orderKey(txnid));
    return row ?? undefined;
  }
  return readFileStore().orders.find((o) => o.txnid === txnid);
}

/** Returns true if this txn was already fulfilled (idempotent skip). */
export async function alreadyFulfilled(txnid: string): Promise<boolean> {
  const o = await getOrder(txnid);
  return o?.status === "fulfilled";
}

/** Orders for an account email (newest first). Uses Redis set index or file scan. */
export async function listOrdersByEmail(email: string): Promise<PayUOrderRecord[]> {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return [];

  const redis = redisFromEnv();
  if (redis) {
    const txnids = await redis.smembers(emailIndexKey(normalized));
    if (!txnids.length) return [];
    const rows = await Promise.all(
      txnids.map(async (txnid) => {
        const row = await redis.get<PayUOrderRecord>(orderKey(String(txnid)));
        return row ?? null;
      }),
    );
    return rows
      .filter((r): r is PayUOrderRecord => Boolean(r && r.email.trim().toLowerCase() === normalized))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  return readFileStore()
    .orders.filter((o) => o.email.trim().toLowerCase() === normalized)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
