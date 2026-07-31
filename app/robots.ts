import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Hidden pilots — path-proxied, not marketed
      disallow: [
        "/ethos-pulse",
        "/ethos-pulse/",
        "/tscribe",
        "/tscribe/",
        "/TSCRIBE",
        "/TSCRIBE/",
        "/t-scribe",
        "/t-scribe/",
        // QualView marketing is public; keep studio proxy unlisted
        "/qualview",
        "/qualview/",
      ],
    },
    sitemap: "https://www.elastictree.com/sitemap.xml",
  };
}
