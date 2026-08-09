import { getOrder } from "@/lib/billing/orders";

/** Poll order status after browser return from PayU (webhook is authoritative). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txnid = searchParams.get("txnid")?.trim() ?? "";
  if (!txnid) {
    return Response.json({ error: "txnid required" }, { status: 400 });
  }
  const order = await getOrder(txnid);
  if (!order) {
    return Response.json({ status: "unknown", txnid });
  }
  return Response.json({
    status: order.status,
    txnid: order.txnid,
    sku: order.sku,
    email: order.email,
    amountInr: order.amountInr,
  });
}
