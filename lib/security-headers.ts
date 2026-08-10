/** Shared security headers for Elastic Tree Next.js apps. */

/**
 * Practical CSP for the marketing site + Auth.js + PayU hosted checkout.
 * QualView paths use a wider connect/media policy for LiveKit.
 */
const CSP_BASE = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.elastictree.com https://*.elastictree.com https://*.up.railway.app https://*.vercel.app https://accounts.google.com https://login.microsoftonline.com https://www.linkedin.com",
  "frame-ancestors 'self'",
  "form-action 'self' https://secure.payu.in https://test.payu.in https://*.payu.in",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const CSP_QUALVIEW = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "connect-src 'self' https: wss: blob:",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

export const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: CSP_BASE },
];

/** QualView needs camera/mic + LiveKit connect/media. */
export const QUALVIEW_SECURITY_HEADERS = SECURITY_HEADERS.map((h) => {
  if (h.key === "Permissions-Policy") {
    return {
      key: "Permissions-Policy",
      value: "camera=(self), microphone=(self), geolocation=(), payment=(self)",
    };
  }
  if (h.key === "Content-Security-Policy") {
    return { key: "Content-Security-Policy", value: CSP_QUALVIEW };
  }
  return h;
});

/** Studio apps (TScribe / DataWiz / Ethos) — copy into product next.config. */
export const STUDIO_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.elastictree.com https://*.elastictree.com https://*.up.railway.app https://*.vercel.app https://api.openai.com",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
