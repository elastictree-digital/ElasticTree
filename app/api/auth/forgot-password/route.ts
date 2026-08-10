import { createResetToken } from "@/lib/auth/reset";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

const OK = { ok: true, message: "If an account exists for that email, we sent a reset link." };

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = await rateLimit(`auth-forgot:${ip}`, {
    limit: 5,
    windowMs: 15 * 60_000,
  });
  if (!limited.success) return tooManyRequests(limited.resetMs);

  const body = (await request.json().catch(() => ({}))) as { email?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  if (!email.includes("@")) {
    return Response.json({ error: "Valid email required" }, { status: 400 });
  }

  const token = await createResetToken(email);
  if (!token) {
    return Response.json(OK);
  }

  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.elastictree.com").replace(
    /\/$/,
    "",
  );
  const resetUrl = `${site}/accounts/reset-password?token=${token}`;
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.info("[ET Auth] Password reset (no RESEND_API_KEY):", resetUrl);
    return Response.json({ ...OK, devResetUrl: resetUrl });
  }

  const to = email;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "Elastic Tree <onboarding@resend.dev>";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Reset your Elastic Tree password",
      html: `<p>Reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 1 hour.</p>`,
    }),
  });

  return Response.json(OK);
}
