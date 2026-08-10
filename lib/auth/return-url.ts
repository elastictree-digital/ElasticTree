/**
 * Allowlist for SSO bridge / sign-in returnUrl values.
 * Prevents open redirects that leak one-time bridge codes to attacker hosts.
 */

const EXACT_HOSTS = new Set([
  "elastictree.com",
  "www.elastictree.com",
  "localhost",
  "127.0.0.1",
]);

const HOST_SUFFIXES = [".elastictree.com", ".up.railway.app", ".vercel.app"];

function envOrigins(): string[] {
  const keys = [
    "ETHOS_PULSE_ORIGIN",
    "TSCRIBE_ORIGIN",
    "QUALVIEW_ORIGIN",
    "DATAWIZ_ORIGIN",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_AI_GAZE_STUDIO_URL",
    "NEXT_PUBLIC_TSCRIBE_STUDIO_URL",
    "NEXT_PUBLIC_ETHOS_PULSE_STUDIO_URL",
    "NEXT_PUBLIC_QUALVIEW_STUDIO_URL",
    "NEXT_PUBLIC_DATAWIZ_STUDIO_URL",
    "ET_BRIDGE_ALLOWED_ORIGINS",
  ];
  const out: string[] = [];
  for (const key of keys) {
    const raw = process.env[key]?.trim();
    if (!raw) continue;
    for (const part of raw.split(",")) {
      const p = part.trim();
      if (p) out.push(p);
    }
  }
  return out;
}

function hostAllowed(hostname: string, extraHosts: Set<string>): boolean {
  const host = hostname.toLowerCase();
  if (EXACT_HOSTS.has(host) || extraHosts.has(host)) return true;
  return HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

/**
 * True for same-site relative paths or absolute http(s) URLs on allowed hosts.
 * Safe to call from client (pass empty extraOrigins) or server.
 */
export function isAllowedReturnUrl(
  raw: string,
  extraOrigins: string[] = [],
): boolean {
  const value = raw.trim();
  if (!value) return false;

  // Same-origin relative path (not protocol-relative //evil.com)
  if (value.startsWith("/") && !value.startsWith("//")) {
    if (value.includes("\\") || value.includes("@")) return false;
    return true;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  // Prod should prefer https; allow http only for localhost
  if (
    url.protocol === "http:" &&
    url.hostname !== "localhost" &&
    url.hostname !== "127.0.0.1"
  ) {
    return false;
  }

  const extraHosts = new Set<string>();
  for (const origin of extraOrigins) {
    try {
      extraHosts.add(new URL(origin).hostname.toLowerCase());
    } catch {
      /* ignore bad env entries */
    }
  }

  return hostAllowed(url.hostname, extraHosts);
}

/** Server helper: merges env-configured studio origins into the allowlist. */
export function isAllowedBridgeReturnUrl(raw: string): boolean {
  return isAllowedReturnUrl(raw, envOrigins());
}

export function safeReturnUrl(raw: string | null | undefined, fallback = "/accounts"): string {
  const value = raw?.trim() || "";
  if (value && isAllowedBridgeReturnUrl(value)) return value;
  return fallback;
}
