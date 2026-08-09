import { createHash, createHmac, timingSafeEqual } from "crypto";
import { getSku, type CatalogSku } from "./catalog";

export type PayUCreateInput = {
  sku: string;
  firstname: string;
  email: string;
  phone: string;
};

export type PayUFormFields = {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
  service_provider: string;
};

export function payuConfig() {
  const key = process.env.PAYU_MERCHANT_KEY?.trim() ?? "";
  const salt = process.env.PAYU_MERCHANT_SALT?.trim() ?? "";
  const baseUrl = (process.env.PAYU_BASE_URL?.trim() || "https://test.payu.in").replace(
    /\/$/,
    "",
  );
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    "https://www.elastictree.com"
  ).replace(/\/$/, "");
  return { key, salt, baseUrl, siteUrl, paymentUrl: `${baseUrl}/_payment` };
}

export function isPayUConfigured(): boolean {
  const { key, salt } = payuConfig();
  return Boolean(key && salt);
}

export function sha512(value: string): string {
  return createHash("sha512").update(value).digest("hex");
}

/** Request hash: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT */
export function buildRequestHash(params: {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  salt: string;
}): string {
  const {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    salt,
  } = params;
  const raw = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
  return sha512(raw);
}

/**
 * Reverse hash for callback/webhook:
 * SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
 */
export function buildResponseHash(params: {
  salt: string;
  status: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  email: string;
  firstname: string;
  productinfo: string;
  amount: string;
  txnid: string;
  key: string;
}): string {
  const {
    salt,
    status,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    key,
  } = params;
  const raw = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  return sha512(raw);
}

export function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a.toLowerCase());
    const bb = Buffer.from(b.toLowerCase());
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export function newTxnId(sku: string): string {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const short = sku.replace(/[^a-z0-9]/gi, "").slice(0, 12);
  return `et${short}${stamp}${rand}`.slice(0, 40);
}

export function amountString(amountInr: number): string {
  return amountInr.toFixed(2);
}

export function buildPayUForm(
  input: PayUCreateInput,
  entry: CatalogSku,
): { fields: PayUFormFields; paymentUrl: string } {
  const { key, salt, siteUrl, paymentUrl } = payuConfig();
  if (!key || !salt) {
    throw new Error("PayU is not configured");
  }

  const txnid = newTxnId(entry.sku);
  const amount = amountString(entry.amountInr);
  const udf1 = entry.product;
  const udf2 = entry.sku;
  const udf3 = entry.period;
  const udf4 = entry.plan;
  const udf5 = txnid;

  const hash = buildRequestHash({
    key,
    txnid,
    amount,
    productinfo: entry.productInfo,
    firstname: input.firstname,
    email: input.email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    salt,
  });

  return {
    paymentUrl,
    fields: {
      key,
      txnid,
      amount,
      productinfo: entry.productInfo,
      firstname: input.firstname.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      surl: `${siteUrl}/api/payu/return/success`,
      furl: `${siteUrl}/api/payu/return/failure`,
      hash,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
      service_provider: "payu_paisa",
    },
  };
}

export type PayUCallbackPayload = Record<string, string>;

export function verifyPayUCallback(payload: PayUCallbackPayload): {
  ok: boolean;
  entry?: CatalogSku;
  reason?: string;
} {
  const { key, salt } = payuConfig();
  if (!key || !salt) return { ok: false, reason: "PayU not configured" };

  const status = payload.status ?? "";
  const hash = payload.hash ?? "";
  const txnid = payload.txnid ?? "";
  const amount = payload.amount ?? "";
  const productinfo = payload.productinfo ?? "";
  const firstname = payload.firstname ?? "";
  const email = payload.email ?? "";
  const udf1 = payload.udf1 ?? "";
  const udf2 = payload.udf2 ?? "";
  const udf3 = payload.udf3 ?? "";
  const udf4 = payload.udf4 ?? "";
  const udf5 = payload.udf5 ?? "";

  const expected = buildResponseHash({
    salt,
    status,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
    email,
    firstname,
    productinfo,
    amount,
    txnid,
    key,
  });

  if (!hash || !safeEqualHex(hash, expected)) {
    return { ok: false, reason: "Invalid hash" };
  }

  const entry = getSku(udf2);
  if (!entry) {
    return { ok: false, reason: "Unknown SKU" };
  }

  const paid = Number.parseFloat(amount);
  if (!Number.isFinite(paid) || Math.abs(paid - entry.amountInr) > 0.01) {
    return { ok: false, reason: "Amount mismatch" };
  }

  return { ok: true, entry };
}

export function signFulfillBody(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("hex");
}

export async function fulfillProduct(opts: {
  entry: CatalogSku;
  email: string;
  txnid: string;
  mihpayid: string;
  amountInr: number;
  paidAt: string;
}): Promise<{ ok: boolean; status: number; detail?: string }> {
  const secret = process.env.BILLING_FULFILL_SECRET?.trim() ?? "";
  const fulfillUrl = process.env[opts.entry.fulfillEnvKey]?.trim() ?? "";
  if (!secret) {
    return { ok: false, status: 500, detail: "BILLING_FULFILL_SECRET missing" };
  }
  if (!fulfillUrl) {
    return {
      ok: false,
      status: 500,
      detail: `${opts.entry.fulfillEnvKey} missing`,
    };
  }

  const payload = {
    email: opts.email,
    sku: opts.entry.sku,
    plan: opts.entry.plan,
    period: opts.entry.period,
    product: opts.entry.product,
    txnid: opts.txnid,
    mihpayid: opts.mihpayid,
    amountInr: opts.amountInr,
    paidAt: opts.paidAt,
  };
  const body = JSON.stringify(payload);
  const signature = signFulfillBody(body, secret);

  const res = await fetch(fulfillUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-ET-Billing-Signature": signature,
    },
    body,
  });

  const text = await res.text().catch(() => "");
  if (!res.ok) {
    return { ok: false, status: res.status, detail: text.slice(0, 500) };
  }
  return { ok: true, status: res.status, detail: text.slice(0, 200) };
}
