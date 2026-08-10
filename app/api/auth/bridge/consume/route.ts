import { consumeBridgeCode, isSsoEnabled } from "@/lib/auth/users";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Studios exchange a one-time bridge code for email.
 * Requires X-ET-Bridge-Signature HMAC (AUTH_BRIDGE_SECRET or BILLING_FULFILL_SECRET).
 */
export async function POST(request: Request) {
  if (!isSsoEnabled()) {
    return Response.json({ error: "SSO disabled" }, { status: 503 });
  }

  const ip = clientIp(request);
  const limited = await rateLimit(`bridge-consume:${ip}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!limited.success) return tooManyRequests(limited.resetMs);

  const body = (await request.json().catch(() => ({}))) as { code?: string };
  const code = body.code?.trim() ?? "";
  if (!code) {
    return Response.json({ error: "code required" }, { status: 400 });
  }

  const secret =
    process.env.AUTH_BRIDGE_SECRET?.trim() ||
    process.env.BILLING_FULFILL_SECRET?.trim() ||
    "";
  if (!secret) {
    return Response.json(
      { error: "Bridge signing not configured" },
      { status: 503 },
    );
  }

  const sig = request.headers.get("X-ET-Bridge-Signature")?.trim() || "";
  if (!sig) {
    return Response.json({ error: "Signature required" }, { status: 401 });
  }

  const expected = createHmac("sha256", secret).update(code).digest("hex");
  try {
    const ok =
      expected.length === sig.length &&
      timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
    if (!ok) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const email = await consumeBridgeCode(code);
  if (!email) {
    return Response.json({ error: "Invalid or expired code" }, { status: 400 });
  }
  return Response.json({ ok: true, email });
}
