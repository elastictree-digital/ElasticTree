import { createPasswordUser, isSsoEnabled } from "@/lib/auth/users";

export async function POST(request: Request) {
  if (!isSsoEnabled() && process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Registration via SSO is not enabled yet." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
    name?: string;
  };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const name = body.name?.trim();

  try {
    const user = await createPasswordUser({ email, password, name });
    return Response.json({ ok: true, email: user.email });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Could not register" },
      { status: 400 },
    );
  }
}
