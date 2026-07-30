import type { NextConfig } from "next";
import path from "path";

/** Hidden Ethos Pulse pilot — proxied, not linked from marketing nav. */
const ETHOS_PULSE_ORIGIN =
  process.env.ETHOS_PULSE_ORIGIN?.replace(/\/$/, "") || "https://ethos-pulse.vercel.app";

/** Hidden ETScribe pilot — Railway, proxied, not linked from marketing nav. */
const TSCRIBE_ORIGIN =
  process.env.TSCRIBE_ORIGIN?.replace(/\/$/, "") ||
  "https://web-production-b8066.up.railway.app";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/services", destination: "/capabilities", permanent: true },
      { source: "/ai-capabilities", destination: "/capabilities", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      // Canonical studio URL is /TSCRIBE
      { source: "/tscribe", destination: "/TSCRIBE", permanent: false },
      { source: "/tscribe/:path*", destination: "/TSCRIBE/:path*", permanent: false },
      { source: "/TScribe", destination: "/TSCRIBE", permanent: false },
      { source: "/TScribe/:path*", destination: "/TSCRIBE/:path*", permanent: false },
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
      {
        source: "/TSCRIBE",
        destination: `${TSCRIBE_ORIGIN}/TSCRIBE`,
      },
      {
        source: "/TSCRIBE/:path*",
        destination: `${TSCRIBE_ORIGIN}/TSCRIBE/:path*`,
      },
    ];
  },
};

export default nextConfig;
