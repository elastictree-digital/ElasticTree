import { fulfillProduct, verifyPayUCallback, type PayUCallbackPayload } from "@/lib/billing/payu";
import { alreadyFulfilled, upsertOrder } from "@/lib/billing/orders";
import { getSku, studioUrlFor } from "@/lib/billing/catalog";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function parsePayload(request: Request): Promise<PayUCallbackPayload> {
  const contentType = request.headers.get("content-type") ?? "";
  if (request.method === "GET") {
    const out: PayUCallbackPayload = {};
    const { searchParams } = new URL(request.url);
    for (const [k, v] of searchParams.entries()) out[k] = v;
    return out;
  }
  if (contentType.includes("application/json")) {
    const json = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const out: PayUCallbackPayload = {};
    for (const [k, v] of Object.entries(json)) {
      if (v != null) out[k] = String(v);
    }
    return out;
  }
  const text = await request.text();
  const params = new URLSearchParams(text);
  const out: PayUCallbackPayload = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
}

async function handleReturn(request: Request, kind: "success" | "failure") {
  const payload = await parsePayload(request);
  const txnid = payload.txnid ?? "";
  const status = (payload.status ?? "").toLowerCase();

  // Best-effort fulfill on browser return (webhook remains authoritative; both are idempotent).
  if (kind === "success" && payload.hash && status === "success") {
    const verified = verifyPayUCallback(payload);
    if (verified.ok && verified.entry && txnid && !(await alreadyFulfilled(txnid))) {
      const entry = verified.entry;
      const email = (payload.email ?? "").toLowerCase();
      await upsertOrder({
        txnid,
        mihpayid: payload.mihpayid,
        sku: entry.sku,
        email,
        amountInr: entry.amountInr,
        status: "success",
      });
      const result = await fulfillProduct({
        entry,
        email,
        txnid,
        mihpayid: payload.mihpayid ?? "",
        amountInr: entry.amountInr,
        paidAt: new Date().toISOString(),
      });
      await upsertOrder({
        txnid,
        mihpayid: payload.mihpayid,
        sku: entry.sku,
        email,
        amountInr: entry.amountInr,
        status: result.ok ? "fulfilled" : "fulfill_failed",
        fulfillDetail: result.detail,
      });
    }
  } else if (txnid && kind === "failure") {
    const entry = payload.udf2 ? getSku(payload.udf2) : undefined;
    if (entry) {
      await upsertOrder({
        txnid,
        mihpayid: payload.mihpayid,
        sku: entry.sku,
        email: (payload.email ?? "").toLowerCase(),
        amountInr: entry.amountInr,
        status: "failure",
      });
    }
  }

  const qs = new URLSearchParams();
  if (txnid) qs.set("txnid", txnid);
  if (payload.email) qs.set("email", payload.email);
  if (payload.udf2) qs.set("sku", payload.udf2);
  if (payload.status) qs.set("payuStatus", payload.status);

  const entry = payload.udf2 ? getSku(payload.udf2) : undefined;
  if (entry) {
    qs.set("studio", studioUrlFor(entry));
    qs.set("product", entry.product);
    qs.set("label", entry.label);
  }

  redirect(`/checkout/${kind}?${qs.toString()}`);
}

export async function GET(
  request: Request,
  ctx: { params: Promise<{ kind: string }> },
) {
  const { kind } = await ctx.params;
  if (kind !== "success" && kind !== "failure") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return handleReturn(request, kind);
}

export async function POST(
  request: Request,
  ctx: { params: Promise<{ kind: string }> },
) {
  const { kind } = await ctx.params;
  if (kind !== "success" && kind !== "failure") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return handleReturn(request, kind);
}
