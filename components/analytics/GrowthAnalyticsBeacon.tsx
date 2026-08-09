"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Opt-in Growth analytics beacon.
 * Enable with NEXT_PUBLIC_ET_SCOUT_ANALYTICS=1 and server env:
 * ET_SCOUT_ANALYTICS_URL + ET_SCOUT_ANALYTICS_SECRET
 */
export default function GrowthAnalyticsBeacon() {
  const pathname = usePathname();
  const enabled = process.env.NEXT_PUBLIC_ET_SCOUT_ANALYTICS === "1";

  useEffect(() => {
    if (!enabled || !pathname) return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void fetch("/api/analytics/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          url: window.location.href,
          referrer: document.referrer || undefined,
          title: document.title || undefined,
        }),
        signal: controller.signal,
        keepalive: true,
      }).catch(() => {
        /* swallow — analytics must never break the site */
      });
    }, 400);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [enabled, pathname]);

  return null;
}
