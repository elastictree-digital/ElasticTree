import { auth } from "@/auth";
import { issueBridgeCode, isSsoEnabled, accountsSignInUrl } from "@/lib/auth/users";
import { isAllowedBridgeReturnUrl } from "@/lib/auth/return-url";

/**
 * Studio entry bridge.
 * - If SSO session exists: redirect to returnUrl (cookie already set) or return {email, code}.
 * - If not: redirect to sign-in with returnUrl.
 * returnUrl must pass the host allowlist (see lib/auth/return-url.ts).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const returnUrlRaw = searchParams.get("returnUrl")?.trim() || "";
  const format = searchParams.get("format") || "redirect";
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.elastictree.com"
  ).replace(/\/$/, "");

  if (!isSsoEnabled()) {
    return Response.json(
      { error: "SSO is not enabled", ssoEnabled: false },
      { status: 503 },
    );
  }

  const returnUrl =
    returnUrlRaw && isAllowedBridgeReturnUrl(returnUrlRaw) ? returnUrlRaw : "";

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
    if (returnUrlRaw) {
      // Rejected by allowlist — never bounce a bridge code to an unknown host.
      return Response.redirect(`${site}/accounts`);
    }
    return Response.json({ authenticated: true, email, code });
  }

  try {
    const dest = new URL(
      returnUrl.startsWith("/") ? `${site}${returnUrl}` : returnUrl,
    );
    dest.searchParams.set("et_bridge", code);
    dest.searchParams.set("et_email", email);
    return Response.redirect(dest.toString());
  } catch {
    return Response.redirect(`${site}/accounts`);
  }
}
