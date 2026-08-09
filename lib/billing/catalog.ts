/** Central INR plan catalog for PayU checkout. Amounts are authoritative — never trust the client.

Marketing pages now use quote-led rate cards (DisplayPricingGrid). These SKUs remain for
legacy checkout links and fixed pack purchases that still map cleanly to PayU.
*/

export type BillingProduct = "tscribe" | "aigaze" | "qualview" | "ethos";
export type BillingPeriod = "monthly" | "yearly";
export type BillingPlan = "starter" | "growth" | "expert" | "single" | "pack10";

export type CatalogSku = {
  sku: string;
  product: BillingProduct;
  plan: BillingPlan;
  period: BillingPeriod;
  amountInr: number;
  label: string;
  productInfo: string;
  studioPath: string;
  fulfillEnvKey:
    | "TSCRIBE_FULFILL_URL"
    | "AIGAZE_FULFILL_URL"
    | "QUALVIEW_FULFILL_URL"
    | "ETHOS_FULFILL_URL";
};

export const BILLING_CATALOG: CatalogSku[] = [
  // Ethos Pulse — Starter cycle
  {
    sku: "ethos.starter.yearly",
    product: "ethos",
    plan: "starter",
    period: "yearly",
    amountInr: 12000,
    label: "Ethos Pulse Starter (per cycle)",
    productInfo: "Ethos Pulse Starter Cycle",
    studioPath: "/ethos-pulse",
    fulfillEnvKey: "ETHOS_FULFILL_URL",
  },
  // AI Gaze — single creative / pack of 10 (one-time; use monthly period key for skuFor compat)
  {
    sku: "aigaze.single.monthly",
    product: "aigaze",
    plan: "single",
    period: "monthly",
    amountInr: 4500,
    label: "AI Gaze Single Test",
    productInfo: "AI Gaze Single Creative",
    studioPath: "/ai-gaze",
    fulfillEnvKey: "AIGAZE_FULFILL_URL",
  },
  {
    sku: "aigaze.pack10.monthly",
    product: "aigaze",
    plan: "pack10",
    period: "monthly",
    amountInr: 32000,
    label: "AI Gaze Pack of 10",
    productInfo: "AI Gaze Pack of 10",
    studioPath: "/ai-gaze",
    fulfillEnvKey: "AIGAZE_FULFILL_URL",
  },
  // Legacy aliases kept so old checkout deep-links do not 404 (map to new amounts)
  {
    sku: "aigaze.starter.monthly",
    product: "aigaze",
    plan: "starter",
    period: "monthly",
    amountInr: 4500,
    label: "AI Gaze Single Test",
    productInfo: "AI Gaze Single Creative",
    studioPath: "/ai-gaze",
    fulfillEnvKey: "AIGAZE_FULFILL_URL",
  },
  {
    sku: "aigaze.growth.monthly",
    product: "aigaze",
    plan: "growth",
    period: "monthly",
    amountInr: 32000,
    label: "AI Gaze Pack of 10",
    productInfo: "AI Gaze Pack of 10",
    studioPath: "/ai-gaze",
    fulfillEnvKey: "AIGAZE_FULFILL_URL",
  },
  // QualView — per-session proxies (IDI / FGD)
  {
    sku: "qualview.starter.monthly",
    product: "qualview",
    plan: "starter",
    period: "monthly",
    amountInr: 2000,
    label: "QualView IDI session",
    productInfo: "QualView IDI",
    studioPath: "/qualview",
    fulfillEnvKey: "QUALVIEW_FULFILL_URL",
  },
  {
    sku: "qualview.growth.monthly",
    product: "qualview",
    plan: "growth",
    period: "monthly",
    amountInr: 6500,
    label: "QualView FGD session",
    productInfo: "QualView FGD",
    studioPath: "/qualview",
    fulfillEnvKey: "QUALVIEW_FULFILL_URL",
  },
  // TScribe — 1 audio-hour packs (standard / volume)
  {
    sku: "tscribe.starter.monthly",
    product: "tscribe",
    plan: "starter",
    period: "monthly",
    amountInr: 200,
    label: "TScribe Standard (1 audio hour)",
    productInfo: "TScribe 1 Hour",
    studioPath: "/TSCRIBE",
    fulfillEnvKey: "TSCRIBE_FULFILL_URL",
  },
  {
    sku: "tscribe.growth.monthly",
    product: "tscribe",
    plan: "growth",
    period: "monthly",
    amountInr: 100,
    label: "TScribe Volume (1 audio hour)",
    productInfo: "TScribe Volume Hour",
    studioPath: "/TSCRIBE",
    fulfillEnvKey: "TSCRIBE_FULFILL_URL",
  },
];

const bySku = new Map(BILLING_CATALOG.map((s) => [s.sku, s]));

export function getSku(sku: string): CatalogSku | undefined {
  return bySku.get(sku);
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function skuFor(
  product: BillingProduct,
  plan: string,
  period: BillingPeriod,
): CatalogSku | undefined {
  const key = `${product}.${plan.toLowerCase()}.${period}`;
  return bySku.get(key);
}

export function studioUrlFor(entry: CatalogSku): string {
  if (entry.product === "aigaze") {
    return (
      process.env.NEXT_PUBLIC_AI_GAZE_STUDIO_URL ??
      "https://aigaze-production.up.railway.app"
    );
  }
  if (entry.product === "tscribe") {
    return (
      process.env.NEXT_PUBLIC_TSCRIBE_STUDIO_URL ??
      "https://www.elastictree.com/TSCRIBE"
    );
  }
  if (entry.product === "qualview") {
    return (
      process.env.NEXT_PUBLIC_QUALVIEW_STUDIO_URL ??
      "https://www.elastictree.com/qualview"
    );
  }
  return (
    process.env.NEXT_PUBLIC_ETHOS_PULSE_STUDIO_URL ??
    "https://www.elastictree.com/ethos-pulse/login"
  );
}
