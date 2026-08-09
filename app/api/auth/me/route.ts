import { auth } from "@/auth";
import { isSsoEnabled } from "@/lib/auth/users";

/** Studio-friendly session probe (NextAuth keeps GET /api/auth/session for the client). */
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({
      authenticated: false,
      ssoEnabled: isSsoEnabled(),
    });
  }
  return Response.json({
    authenticated: true,
    ssoEnabled: isSsoEnabled(),
    user: {
      email: session.user.email,
      name: session.user.name ?? null,
      id: (session.user as { id?: string }).id ?? null,
    },
  });
}
