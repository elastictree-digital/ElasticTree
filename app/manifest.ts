import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elastic Tree — AI-Powered Market Research",
    short_name: "Elastic Tree",
    description:
      "AI-powered market research: analytics, sensory science, syndicated & impact research.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1f4a",
    theme_color: "#0a1f4a",
    icons: [
      {
        src: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
