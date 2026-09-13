import type { NextConfig } from "next";
import path from "path";
import {
  ETSCOUT_SECURITY_HEADERS,
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

/** ET Scout — Railway app, proxied at /ET-Scout; collectors on et-scout.elastictree.com. */
const ETSCOUT_ORIGIN =
  process.env.ETSCOUT_ORIGIN?.replace(/\/$/, "") ||
  "https://et-scout.up.railway.app";

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
        source: "/ET-Scout",
        headers: ETSCOUT_SECURITY_HEADERS,
      },
      {
        source: "/ET-Scout/:path*",
        headers: ETSCOUT_SECURITY_HEADERS,
      },
      {
        source: "/((?!qualview(?:/|$)|ET-Scout(?:/|$)|et-scout(?:/|$)).*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/capabilities", permanent: true },
      { source: "/ai-capabilities", destination: "/capabilities", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      // Old tree-mark favicon paths — send cached browsers to the ET Scout icon.
      { source: "/icon.svg", destination: "/favicon.png", permanent: false },
      { source: "/apple-icon.svg", destination: "/apple-touch-icon.png", permanent: false },
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
      // ET Scout (basePath /ET-Scout on Railway). Vercel paths are case-insensitive.
      {
        source: "/ET-Scout",
        destination: `${ETSCOUT_ORIGIN}/ET-Scout`,
      },
      {
        source: "/ET-Scout/:path*",
        destination: `${ETSCOUT_ORIGIN}/ET-Scout/:path*`,
      },
    ];
  },
};

export default nextConfig;
