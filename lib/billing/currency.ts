/**
 * Country → currency display for Elastic Tree pricing.
 * Base prices are INR. International display = (INR ÷ FX) × (1 + APPRECIATION).
 * FX table is INR per 1 unit of foreign currency (indicative mid-market).
 */

export const FX_APPRECIATION = 0.2; // 20% on converted foreign amount

export type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "SGD"
  | "AUD"
  | "CAD"
  | "SAR"
  | "MYR"
  | "JPY";

export type PricingCountry = {
  code: string;
  name: string;
  currency: CurrencyCode;
  /** INR per 1 unit of foreign currency. INR uses 1. */
  inrPerUnit: number;
  locale: string;
  symbol: string;
};

/** Popular research-buyer markets + India default. */
export const PRICING_COUNTRIES: PricingCountry[] = [
  { code: "IN", name: "India", currency: "INR", inrPerUnit: 1, locale: "en-IN", symbol: "₹" },
  { code: "US", name: "United States", currency: "USD", inrPerUnit: 83.5, locale: "en-US", symbol: "$" },
  { code: "GB", name: "United Kingdom", currency: "GBP", inrPerUnit: 106, locale: "en-GB", symbol: "£" },
  { code: "EU", name: "Europe (EUR)", currency: "EUR", inrPerUnit: 90, locale: "de-DE", symbol: "€" },
  { code: "AE", name: "United Arab Emirates", currency: "AED", inrPerUnit: 22.7, locale: "en-AE", symbol: "د.إ" },
  { code: "SG", name: "Singapore", currency: "SGD", inrPerUnit: 62, locale: "en-SG", symbol: "S$" },
  { code: "AU", name: "Australia", currency: "AUD", inrPerUnit: 54, locale: "en-AU", symbol: "A$" },
  { code: "CA", name: "Canada", currency: "CAD", inrPerUnit: 60, locale: "en-CA", symbol: "C$" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", inrPerUnit: 22.3, locale: "en-SA", symbol: "﷼" },
  { code: "MY", name: "Malaysia", currency: "MYR", inrPerUnit: 18.5, locale: "en-MY", symbol: "RM" },
  { code: "JP", name: "Japan", currency: "JPY", inrPerUnit: 0.55, locale: "ja-JP", symbol: "¥" },
];

const byCountry = new Map(PRICING_COUNTRIES.map((c) => [c.code, c]));

/** Map common ISO country codes (and browser locales) → pricing country. */
const COUNTRY_ALIASES: Record<string, string> = {
  IN: "IN",
  US: "US",
  GB: "GB",
  UK: "GB",
  AE: "AE",
  SG: "SG",
  AU: "AU",
  CA: "CA",
  SA: "SA",
  MY: "MY",
  JP: "JP",
  DE: "EU",
  FR: "EU",
  NL: "EU",
  ES: "EU",
  IT: "EU",
  IE: "EU",
  BE: "EU",
  AT: "EU",
  PT: "EU",
  FI: "EU",
  SE: "EU",
  DK: "EU",
  NO: "EU", // display EUR basket for Nordics in this simple table
};

export function getPricingCountry(code: string | null | undefined): PricingCountry {
  if (!code) return PRICING_COUNTRIES[0];
  const upper = code.trim().toUpperCase();
  const mapped = COUNTRY_ALIASES[upper] ?? upper;
  return byCountry.get(mapped) ?? PRICING_COUNTRIES[0];
}

export function resolveCountryFromLocale(locale: string | null | undefined): PricingCountry {
  if (!locale) return PRICING_COUNTRIES[0];
  const parts = locale.replace("_", "-").split("-");
  const region = parts.length > 1 ? parts[parts.length - 1] : "";
  if (region.length === 2) return getPricingCountry(region);
  const lang = parts[0]?.toLowerCase();
  if (lang === "en") return getPricingCountry("US");
  if (["de", "fr", "es", "it", "nl", "pt"].includes(lang)) return getPricingCountry("EU");
  return PRICING_COUNTRIES[0];
}

/**
 * Convert base INR → display foreign amount with 20% appreciation.
 * India (INR): returns the base amount unchanged (no markup).
 */
export function convertFromInr(amountInr: number, country: PricingCountry): number {
  if (!Number.isFinite(amountInr) || amountInr <= 0) return 0;
  if (country.currency === "INR") return amountInr;
  const raw = amountInr / country.inrPerUnit;
  return raw * (1 + FX_APPRECIATION);
}

export function formatForeignAmount(amount: number, country: PricingCountry): string {
  if (country.currency === "JPY") {
    return new Intl.NumberFormat(country.locale, {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  }
  if (country.currency === "INR") {
    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
  }
  return new Intl.NumberFormat(country.locale, {
    style: "currency",
    currency: country.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatInrCompact(amountInr: number): string {
  return `₹${Math.round(amountInr).toLocaleString("en-IN")}`;
}

export type DisplayMoney = {
  primary: string;
  secondary: string | null;
  currency: CurrencyCode;
  amount: number;
  amountInr: number;
  isInternational: boolean;
};

/** Build display strings for a priced plan. */
export function displayMoney(amountInr: number, country: PricingCountry): DisplayMoney {
  const converted = convertFromInr(amountInr, country);
  const isInternational = country.currency !== "INR";
  return {
    primary: formatForeignAmount(converted, country),
    secondary: isInternational ? `${formatInrCompact(amountInr)} base` : null,
    currency: country.currency,
    amount: converted,
    amountInr,
    isInternational,
  };
}

export function quoteMailto(opts: {
  product: string;
  plan: string;
  amountInr: number | null | undefined;
  country: PricingCountry;
  baseHref?: string;
}): string {
  const subject = encodeURIComponent(`${opts.product} ${opts.plan} — ${opts.country.currency} quote`);
  let body = `Hi Elastic Tree,%0A%0AI'm interested in ${opts.product} — ${opts.plan}.%0A`;
  body += `Country / currency: ${opts.country.name} (${opts.country.currency})%0A`;
  if (opts.amountInr != null && opts.amountInr > 0) {
    const money = displayMoney(opts.amountInr, opts.country);
    body += `Listed price: ${money.primary}`;
    if (money.isInternational) {
      body += ` (intl rate = FX from ${formatInrCompact(opts.amountInr)} + 20% appreciation)%0A`;
    } else {
      body += ` (INR, exclusive of GST)%0A`;
    }
  }
  body += `%0APlease share payment / invoice options.%0A`;
  if (opts.baseHref?.startsWith("mailto:")) {
    // Preserve any existing address from plan.href
    const addr = opts.baseHref.slice("mailto:".length).split("?")[0];
    return `mailto:${addr}?subject=${subject}&body=${body}`;
  }
  return `mailto:sunilmukkath@elastictree.com?subject=${subject}&body=${body}`;
}
