import { listOrdersByEmail, type PayUOrderRecord } from "@/lib/billing/orders";
import {
  BILLING_CATALOG,
  formatInr,
  getSku,
  studioUrlFor,
  type BillingProduct,
  type CatalogSku,
} from "@/lib/billing/catalog";
import { isEtEmployeeEmail } from "@/lib/auth/employee";
import { isSsoEnabled } from "@/lib/auth/users";
import { DATAWIZ_STUDIO_URL } from "@/lib/data-wiz";
import { AI_GAZE_STUDIO_URL } from "@/lib/ai-gaze";
import { ETHOS_PULSE_STUDIO_URL } from "@/lib/ethos-pulse";
import { QUALVIEW_STUDIO_URL } from "@/lib/qual-view";
import { TSCRIBE_STUDIO_URL } from "@/lib/t-scribe";

export type ToolAccessLevel = "full" | "active" | "none";

export type AccountTool = {
  id: string;
  name: string;
  productKey?: BillingProduct | "datawiz";
  blurb: string;
  studioUrl: string;
  /** Prefer this for Open — SSO bridge when enabled so studios get a session. */
  openHref: string;
  overviewHref?: string;
  access: ToolAccessLevel;
  accessLabel: string;
  planSummary: string;
};

export type AccountInvoice = {
  txnid: string;
  mihpayid?: string;
  sku: string;
  label: string;
  productName: string;
  amountLabel: string;
  status: PayUOrderRecord["status"];
  statusLabel: string;
  createdAt: string;
  createdLabel: string;
};

export type AccountDashboard = {
  email: string;
  name?: string | null;
  isEmployee: boolean;
  tools: AccountTool[];
  invoices: AccountInvoice[];
  activePlanLines: string[];
};

const PRODUCT_META: Record<
  BillingProduct | "datawiz",
  { name: string; blurb: string; overviewHref: string; studioUrl: string }
> = {
  tscribe: {
    name: "TScribe",
    blurb: "Research transcription for DIs and FGDs.",
    overviewHref: "/t-scribe",
    studioUrl: TSCRIBE_STUDIO_URL,
  },
  qualview: {
    name: "QualView",
    blurb: "Live FGD / IDI viewing rooms.",
    overviewHref: "/Qual-view",
    studioUrl: QUALVIEW_STUDIO_URL,
  },
  aigaze: {
    name: "AI Gaze",
    blurb: "Predictive eye tracking and attention tests.",
    overviewHref: "/ai-gaze",
    studioUrl: AI_GAZE_STUDIO_URL,
  },
  ethos: {
    name: "Ethos Pulse",
    blurb: "Employee engagement surveys and dashboards.",
    overviewHref: "/Ethos-pulse",
    studioUrl: ETHOS_PULSE_STUDIO_URL,
  },
  datawiz: {
    name: "DataWiz",
    blurb: "Stub × banner crosstabs and Excel packs.",
    overviewHref: "/data-wiz",
    studioUrl: DATAWIZ_STUDIO_URL,
  },
};

const STATUS_LABEL: Record<PayUOrderRecord["status"], string> = {
  created: "Checkout started",
  success: "Paid",
  failure: "Failed",
  fulfilled: "Fulfilled",
  fulfill_failed: "Fulfillment issue",
};

function catalogEntryForProduct(product: BillingProduct): CatalogSku | undefined {
  return BILLING_CATALOG.find((s) => s.product === product);
}

/** Open href that signs into the studio via central SSO bridge when enabled. */
export function studioOpenHref(studioUrl: string): string {
  if (isSsoEnabled()) {
    return `/api/auth/bridge?returnUrl=${encodeURIComponent(studioUrl)}`;
  }
  try {
    const u = new URL(studioUrl);
    u.searchParams.set("signin", "1");
    return u.toString();
  } catch {
    return studioUrl;
  }
}

function accessLabel(level: ToolAccessLevel, isEmployee: boolean): string {
  if (level === "full" || isEmployee) return "Full access";
  if (level === "active") return "Active";
  return "No plan yet";
}

function planSummaryForProduct(
  product: BillingProduct | "datawiz",
  fulfilled: PayUOrderRecord[],
  isEmployee: boolean,
): string {
  if (isEmployee) return "Elastic Tree staff · enterprise entitlements";
  if (product === "datawiz") {
    return "Quote-led · contact for unlock";
  }
  const labels = fulfilled
    .map((o) => getSku(o.sku)?.label)
    .filter((x): x is string => Boolean(x));
  const unique = Array.from(new Set(labels));
  if (unique.length) return unique.join(" · ");
  return "No purchases yet";
}

export async function buildAccountDashboard(input: {
  email: string;
  name?: string | null;
}): Promise<AccountDashboard> {
  const email = input.email.trim().toLowerCase();
  const isEmployee = isEtEmployeeEmail(email);
  const orders = await listOrdersByEmail(email);
  const paid = orders.filter(
    (o) => o.status === "fulfilled" || o.status === "success",
  );

  const byProduct = new Map<BillingProduct, PayUOrderRecord[]>();
  for (const order of paid) {
    const sku = getSku(order.sku);
    if (!sku) continue;
    const list = byProduct.get(sku.product) ?? [];
    list.push(order);
    byProduct.set(sku.product, list);
  }

  const toolIds: Array<BillingProduct | "datawiz"> = [
    "tscribe",
    "qualview",
    "aigaze",
    "ethos",
    "datawiz",
  ];

  const tools: AccountTool[] = toolIds.map((id) => {
    const meta = PRODUCT_META[id];
    const fulfilled = id === "datawiz" ? [] : byProduct.get(id) ?? [];
    const access: ToolAccessLevel = isEmployee
      ? "full"
      : fulfilled.length > 0
        ? "active"
        : "none";
    const catalog = id === "datawiz" ? undefined : catalogEntryForProduct(id);
    const studioUrl =
      catalog != null ? studioUrlFor(catalog) : meta.studioUrl;

    return {
      id,
      name: meta.name,
      productKey: id,
      blurb: meta.blurb,
      studioUrl,
      openHref: studioOpenHref(studioUrl),
      overviewHref: meta.overviewHref,
      access,
      accessLabel: accessLabel(access, isEmployee),
      planSummary: planSummaryForProduct(id, fulfilled, isEmployee),
    };
  });

  const invoices: AccountInvoice[] = orders.map((o) => {
    const sku = getSku(o.sku);
    const productName = sku ? PRODUCT_META[sku.product].name : "Elastic Tree";
    return {
      txnid: o.txnid,
      mihpayid: o.mihpayid,
      sku: o.sku,
      label: sku?.label ?? o.sku,
      productName,
      amountLabel: formatInr(o.amountInr),
      status: o.status,
      statusLabel: STATUS_LABEL[o.status],
      createdAt: o.createdAt,
      createdLabel: new Date(o.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  });

  const activePlanLines = tools
    .filter((t) => t.access !== "none")
    .map((t) => `${t.name}: ${t.planSummary}`);

  return {
    email,
    name: input.name ?? null,
    isEmployee,
    tools,
    invoices,
    activePlanLines,
  };
}
