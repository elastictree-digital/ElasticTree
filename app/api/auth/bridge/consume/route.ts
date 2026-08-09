import { consumeBridgeCode, isSsoEnabled } from "@/lib/auth/users";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Studios (or AI Gaze) exchange a one-time bridge code for email.
 * Optional HMAC with BILLING_FULFILL_SECRET / AUTH_BRIDGE_SECRET for server-to-server.
 */
export async function POST(request: Request) {
  if (!isSsoEnabled()) {
    return Response.json({ error: "SSO disabled" }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as { code?: string };
  const code = body.code?.trim() ?? "";
  if (!code) {
    return Response.json({ error: "code required" }, { status: 400 });
  }

  const secret =
    process.env.AUTH_BRIDGE_SECRET?.trim() ||
    process.env.BILLING_FULFILL_SECRET?.trim() ||
    "";
  const sig = request.headers.get("X-ET-Bridge-Signature");
  if (secret && sig) {
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
  }

  const email = await consumeBridgeCode(code);
  if (!email) {
    return Response.json({ error: "Invalid or expired code" }, { status: 400 });
  }
  return Response.json({ ok: true, email });
}
