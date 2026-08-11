import { fulfillProduct, verifyPayUCallback, type PayUCallbackPayload } from "@/lib/billing/payu";
import { alreadyFulfilled, upsertOrder } from "@/lib/billing/orders";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

async function parsePayload(request: Request): Promise<PayUCallbackPayload> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const json = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const out: PayUCallbackPayload = {};
    for (const [k, v] of Object.entries(json)) {
      if (v == null) continue;
      out[k] = String(v);
    }
    return out;
  }

  const text = await request.text();
  const params = new URLSearchParams(text);
  const out: PayUCallbackPayload = {};
  for (const [k, v] of params.entries()) {
    out[k] = v;
  }
  return out;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = await rateLimit(`payu-webhook:${ip}`, {
    limit: 120,
    windowMs: 60_000,
  });
  if (!limited.success) return tooManyRequests(limited.resetMs);

  const payload = await parsePayload(request);
  const verified = verifyPayUCallback(payload);

  if (!verified.ok || !verified.entry) {
    console.warn("PayU webhook rejected:", verified.reason, payload.txnid);
    return Response.json({ error: verified.reason ?? "Invalid" }, { status: 400 });
  }

  const entry = verified.entry;
  const txnid = payload.txnid ?? "";
  const status = (payload.status ?? "").toLowerCase();
  const email = (payload.email ?? "").toLowerCase();
  const mihpayid = payload.mihpayid ?? "";
  const amountInr = Number.parseFloat(payload.amount ?? "0");

  if (status !== "success") {
    await upsertOrder({
      txnid,
      mihpayid,
      sku: entry.sku,
      email,
      amountInr: entry.amountInr,
      status: "failure",
    });
    return Response.json({ ok: true, status: "ignored", paymentStatus: status });
  }

  if (await alreadyFulfilled(txnid)) {
    return Response.json({ ok: true, status: "already_fulfilled", txnid });
  }

  await upsertOrder({
    txnid,
    mihpayid,
    sku: entry.sku,
    email,
    amountInr: entry.amountInr,
    status: "success",
  });

  const result = await fulfillProduct({
    entry,
    email,
    txnid,
    mihpayid,
    amountInr: Number.isFinite(amountInr) ? amountInr : entry.amountInr,
    paidAt: new Date().toISOString(),
  });

  await upsertOrder({
    txnid,
    mihpayid,
    sku: entry.sku,
    email,
    amountInr: entry.amountInr,
    status: result.ok ? "fulfilled" : "fulfill_failed",
    fulfillDetail: result.detail,
  });

  if (!result.ok) {
    console.error("PayU fulfill failed:", txnid, result.status, result.detail);
    return Response.json(
      { error: "Fulfillment failed", detail: result.detail },
      { status: 502 },
    );
  }

  return Response.json({ ok: true, status: "fulfilled", txnid });
}
