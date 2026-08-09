import { getSku } from "@/lib/billing/catalog";
import { buildPayUForm, isPayUConfigured } from "@/lib/billing/payu";
import { upsertOrder } from "@/lib/billing/orders";

type CreateBody = {
  sku?: string;
  firstname?: string;
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  if (!isPayUConfigured()) {
    return Response.json(
      { error: "PayU checkout is not configured yet. Please contact sales." },
      { status: 503 },
    );
  }

  let body: CreateBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sku = body.sku?.trim() ?? "";
  const firstname = body.firstname?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";

  const entry = getSku(sku);
  if (!entry) {
    return Response.json({ error: "Unknown plan." }, { status: 400 });
  }
  if (!firstname || firstname.length < 2) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return Response.json({ error: "Valid phone number is required." }, { status: 400 });
  }

  try {
    const { fields, paymentUrl } = buildPayUForm(
      { sku, firstname, email, phone },
      entry,
    );

    await upsertOrder({
      txnid: fields.txnid,
      sku: entry.sku,
      email,
      amountInr: entry.amountInr,
      status: "created",
    });

    return Response.json({
      ok: true,
      paymentUrl,
      fields,
      label: entry.label,
      amountInr: entry.amountInr,
    });
  } catch (err) {
    console.error("PayU create error:", err);
    return Response.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
