import { NextResponse } from "next/server";

/** Best-effort country from edge/CDN headers (Vercel / Cloudflare / generic). */
export async function GET(request: Request) {
  const headers = request.headers;
  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    headers.get("cloudfront-viewer-country") ||
    null;

  return NextResponse.json({
    country: country && country !== "XX" ? country.toUpperCase() : null,
  });
}
