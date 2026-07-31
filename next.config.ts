import type { NextConfig } from "next";
import path from "path";
import {
  QUALVIEW_SECURITY_HEADERS,
  SECURITY_HEADERS,
} from "./lib/security-headers";

/** Hidden Ethos Pulse pilot — proxied, not linked from marketing nav. */
const ETHOS_PULSE_ORIGIN =
  process.env.ETHOS_PULSE_ORIGIN?.replace(/\/$/, "") || "https://ethos-pulse.vercel.app";

/** Hidden TScribe pilot — Railway, proxied, not linked from marketing nav. */
const TSCRIBE_ORIGIN =
  process.env.TSCRIBE_ORIGIN?.replace(/\/$/, "") ||
  "https://web-production-b8066.up.railway.app";

/** Hidden QualView pilot — Railway studio, proxied; marketing at /Qual-view. */
const QUALVIEW_ORIGIN =
  process.env.QUALVIEW_ORIGIN?.replace(/\/$/, "") ||
  "https://web-production-c13b1.up.railway.app";

/** Hidden DataWiz pilot — Railway studio, proxied; marketing at /data-wiz. */
const DATAWIZ_ORIGIN =
  process.env.DATAWIZ_ORIGIN?.replace(/\/$/, "") ||
  "https://datawiz.up.railway.app";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      // QualView needs camera/mic — must not inherit the site-wide deny policy.
      {
        source: "/qualview",
        headers: QUALVIEW_SECURITY_HEADERS,
      },
      {
        source: "/qualview/:path*",
        headers: QUALVIEW_SECURITY_HEADERS,
      },
      {
        source: "/((?!qualview(?:/|$)).*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/capabilities", permanent: true },
      { source: "/ai-capabilities", destination: "/capabilities", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      // Note: do not redirect /qual-view → /Qual-view — Vercel path matching
      // is case-insensitive and that redirect loops on /Qual-view itself.
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ethos-pulse",
        destination: `${ETHOS_PULSE_ORIGIN}/ethos-pulse`,
      },
      {
        source: "/ethos-pulse/:path*",
        destination: `${ETHOS_PULSE_ORIGIN}/ethos-pulse/:path*`,
      },
      // Canonical TScribe studio — Vercel path matching is case-insensitive,
      // so one rewrite covers /TSCRIBE and /tscribe.
      {
        source: "/TSCRIBE",
        destination: `${TSCRIBE_ORIGIN}/TSCRIBE`,
      },
      {
        source: "/TSCRIBE/:path*",
        destination: `${TSCRIBE_ORIGIN}/TSCRIBE/:path*`,
      },
      // QualView studio app (basePath /qualview on Railway)
      {
        source: "/qualview",
        destination: `${QUALVIEW_ORIGIN}/qualview`,
      },
      {
        source: "/qualview/:path*",
        destination: `${QUALVIEW_ORIGIN}/qualview/:path*`,
      },
      // DataWiz studio app (basePath /datawiz on Railway)
      {
        source: "/datawiz",
        destination: `${DATAWIZ_ORIGIN}/datawiz`,
      },
      {
        source: "/datawiz/:path*",
        destination: `${DATAWIZ_ORIGIN}/datawiz/:path*`,
      },
    ];
  },
};

export default nextConfig;
