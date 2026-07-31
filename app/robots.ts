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
        "/Qual-view",
        "/Qual-view/",
        "/qual-view",
        "/qual-view/",
        "/qualview",
        "/qualview/",
        "/data-wiz",
        "/data-wiz/",
        "/datawiz",
        "/datawiz/",
      ],
    },
    sitemap: "https://www.elastictree.com/sitemap.xml",
  };
}
