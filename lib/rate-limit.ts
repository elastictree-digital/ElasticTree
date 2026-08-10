import { Redis } from "@upstash/redis";

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetMs: number;
};

type MemoryBucket = { count: number; resetAt: number };

const memory = new Map<string, MemoryBucket>();

function redis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const cur = memory.get(key);
  if (!cur || cur.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetMs: windowMs };
  }
  cur.count += 1;
  const remaining = Math.max(0, limit - cur.count);
  return {
    success: cur.count <= limit,
    remaining,
    resetMs: Math.max(0, cur.resetAt - now),
  };
}

/**
 * Sliding fixed-window limiter. Uses Upstash when configured; otherwise in-memory
 * (per serverless instance — still slows casual abuse in local/dev).
 */
export async function rateLimit(
  key: string,
  opts: { limit: number; windowMs: number },
): Promise<RateLimitResult> {
  const { limit, windowMs } = opts;
  const r = redis();
  if (!r) return memoryLimit(key, limit, windowMs);

  const rkey = `et:rl:${key}`;
  try {
    const count = await r.incr(rkey);
    if (count === 1) {
      await r.pexpire(rkey, windowMs);
    }
    const ttl = await r.pttl(rkey);
    return {
      success: count <= limit,
      remaining: Math.max(0, limit - count),
      resetMs: ttl > 0 ? ttl : windowMs,
    };
  } catch {
    return memoryLimit(key, limit, windowMs);
  }
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function tooManyRequests(resetMs?: number): Response {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (resetMs && resetMs > 0) {
    headers.set("Retry-After", String(Math.ceil(resetMs / 1000)));
  }
  return new Response(
    JSON.stringify({ error: "Too many requests. Try again later." }),
    { status: 429, headers },
  );
}
