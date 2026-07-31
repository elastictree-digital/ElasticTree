/** Shared security headers for Elastic Tree Next.js apps. */
export const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** QualView needs camera/mic for LiveKit sessions. */
export const QUALVIEW_SECURITY_HEADERS = SECURITY_HEADERS.map((h) =>
  h.key === "Permissions-Policy"
    ? {
        key: "Permissions-Policy",
        value: "camera=(self), microphone=(self), geolocation=(), payment=()",
      }
    : h,
);
