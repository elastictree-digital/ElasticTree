import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  path?: string;
  url?: string;
  referrer?: string;
  title?: string;
};

export async function POST(req: NextRequest) {
  const target = (process.env.ET_SCOUT_ANALYTICS_URL || "").trim().replace(/\/$/, "");
  const secret = (process.env.ET_SCOUT_ANALYTICS_SECRET || "").trim();
  if (!target || !secret) {
    return NextResponse.json({ ok: false, skipped: true }, { status: 204 });
  }

  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, detail: "invalid json" }, { status: 400 });
  }

  const path = (body.path || "").trim();
  const url = (body.url || "").trim();
  if (!path && !url) {
    return NextResponse.json({ ok: false, detail: "path or url required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${target}/api/webhooks/website/pageview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Secret": secret,
      },
      body: JSON.stringify({
        path: path || undefined,
        url: url || undefined,
        referrer: body.referrer,
        title: body.title,
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
