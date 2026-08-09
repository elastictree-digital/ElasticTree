import { resetWithToken } from "@/lib/auth/reset";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    token?: string;
    password?: string;
  };
  const token = body.token?.trim() ?? "";
  const password = body.password ?? "";
  if (!token || password.length < 8) {
    return Response.json(
      { error: "Token and password (min 8 chars) required" },
      { status: 400 },
    );
  }
  try {
    const ok = await resetWithToken(token, password);
    if (!ok) {
      return Response.json({ error: "Invalid or expired reset link" }, { status: 400 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Reset failed" },
      { status: 400 },
    );
  }
}
