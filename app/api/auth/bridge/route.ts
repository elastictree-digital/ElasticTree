import { auth } from "@/auth";
import { issueBridgeCode, isSsoEnabled, accountsSignInUrl } from "@/lib/auth/users";

/**
 * Studio entry bridge.
 * - If SSO session exists: redirect to returnUrl (cookie already set) or return {email, code}.
 * - If not: redirect to sign-in with returnUrl.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const returnUrl = searchParams.get("returnUrl")?.trim() || "";
  const format = searchParams.get("format") || "redirect";

  if (!isSsoEnabled()) {
    return Response.json(
      { error: "SSO is not enabled", ssoEnabled: false },
      { status: 503 },
    );
  }

  const session = await auth();
  if (!session?.user?.email) {
    const signIn = accountsSignInUrl(returnUrl || undefined);
    if (format === "json") {
      return Response.json({ authenticated: false, signInUrl: signIn });
    }
    return Response.redirect(signIn);
  }

  const email = session.user.email;
  const code = await issueBridgeCode(email);

  if (format === "json") {
    return Response.json({
      authenticated: true,
      email,
      name: session.user.name ?? null,
      code,
    });
  }

  if (!returnUrl) {
    return Response.json({ authenticated: true, email, code });
  }

  try {
    const dest = new URL(returnUrl);
    dest.searchParams.set("et_bridge", code);
    dest.searchParams.set("et_email", email);
    return Response.redirect(dest.toString());
  } catch {
    return Response.json({ authenticated: true, email, code });
  }
}
