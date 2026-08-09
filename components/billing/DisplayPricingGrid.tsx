"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Globe2 } from "lucide-react";
import {
  FX_APPRECIATION,
  PRICING_COUNTRIES,
  displayMoney,
  getPricingCountry,
  quoteMailto,
  resolveCountryFromLocale,
  type PricingCountry,
} from "@/lib/billing/currency";

export type DisplayPricingPlan = {
  name: string;
  /** Fallback label when amountInr is absent (Custom / Included). */
  price: string;
  period: string;
  blurb: string;
  features: readonly string[];
  featured?: boolean;
  ctaLabel?: string;
  href?: string;
  /** Base INR amount for FX conversion. Omit for Custom / Included. */
  amountInr?: number | null;
};

type Props = {
  plans: readonly DisplayPricingPlan[];
  footnote?: string;
  defaultMailto?: string;
  productName?: string;
};

const DEFAULT_MAIL =
  "mailto:sunilmukkath@elastictree.com?subject=Elastic%20Tree%20pricing%20enquiry";

const STORAGE_KEY = "et-pricing-country";

export default function DisplayPricingGrid({
  plans,
  footnote,
  defaultMailto = DEFAULT_MAIL,
  productName = "Elastic Tree",
}: Props) {
  const [country, setCountry] = useState<PricingCountry>(PRICING_COUNTRIES[0]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          if (!cancelled) {
            setCountry(getPricingCountry(saved));
            setReady(true);
          }
          return;
        }

        const res = await fetch("/api/geo");
        if (res.ok) {
          const data = (await res.json()) as { country?: string | null };
          if (data.country) {
            if (!cancelled) {
              setCountry(getPricingCountry(data.country));
              setReady(true);
            }
            return;
          }
        }
      } catch {
        /* fall through */
      }

      if (!cancelled) {
        setCountry(resolveCountryFromLocale(navigator.language));
        setReady(true);
      }
    }

    void detect();
    return () => {
      cancelled = true;
    };
  }, []);

  function onCountryChange(code: string) {
    const next = getPricingCountry(code);
    setCountry(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next.code);
    } catch {
      /* ignore */
    }
  }

  const intlNote = useMemo(() => {
    if (country.currency === "INR") {
      return "Paying in INR · exclusive of GST";
    }
    const pct = Math.round(FX_APPRECIATION * 100);
    return `${country.currency} prices = INR converted at indicative FX + ${pct}% international appreciation · exclusive of GST`;
  }, [country]);

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <label className="inline-flex items-center gap-2 text-sm text-slate-300">
          <Globe2 size={16} className="text-[var(--teal)]" aria-hidden />
          <span className="sr-only">Country / currency</span>
          <select
            value={country.code}
            onChange={(e) => onCountryChange(e.target.value)}
            className="rounded-full border border-white/15 bg-[#0a1f4a]/80 px-4 py-2 text-sm font-semibold text-white outline-none focus:border-[var(--amber)]/60"
            aria-label="Select country for currency"
          >
            {PRICING_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} · {c.currency}
              </option>
            ))}
          </select>
        </label>
        <p className="text-center text-xs text-slate-500 max-w-md">
          {ready ? intlNote : "Detecting your region…"}
        </p>
      </div>

      <div className="content-grid-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const convertible =
            typeof plan.amountInr === "number" &&
            plan.amountInr > 0 &&
            !plan.price.toLowerCase().includes("custom") &&
            plan.price.toLowerCase() !== "included";

          const money = convertible ? displayMoney(plan.amountInr!, country) : null;
          const href = convertible
            ? quoteMailto({
                product: productName,
                plan: plan.name,
                amountInr: plan.amountInr,
                country,
                baseHref: plan.href ?? defaultMailto,
              })
            : (plan.href ?? defaultMailto);

          return (
            <div
              key={plan.name}
              className={`feature-card relative flex flex-col ${
                plan.featured ? "ring-1 ring-[var(--amber)]/50 bg-[rgba(232,168,32,0.08)]" : ""
              }`}
            >
              {plan.featured && (
                <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-gradient-to-r from-[#f5c842] to-[#e8a820] text-[#0a1f4a] font-bold">
                  Popular
                </span>
              )}
              <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--teal)] mb-3">
                {plan.name}
              </p>
              <p className="font-display font-black text-3xl text-white leading-none mb-1">
                {money ? money.primary : plan.price}
                {plan.period ? (
                  <span className="text-sm font-semibold text-slate-400 ml-1">{plan.period}</span>
                ) : null}
              </p>
              {money?.secondary ? (
                <p className="mt-2 text-xs text-slate-500">
                  {money.secondary}
                  {money.isInternational ? " · +20% intl" : ""}
                </p>
              ) : null}
              <p className="text-body-sm mb-5 mt-3">{plan.blurb}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-body-sm text-slate-300">
                    <Check size={15} className="text-[var(--teal)] shrink-0 mt-0.5" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                className={
                  plan.featured ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"
                }
              >
                {plan.ctaLabel ??
                  (plan.price.toLowerCase().includes("custom")
                    ? "Talk to Sales"
                    : money?.isInternational
                      ? `Pay in ${money.currency}`
                      : "Request quote")}
              </a>
            </div>
          );
        })}
      </div>
      {footnote ? (
        <p className="text-center text-body-sm text-slate-500 mt-8">{footnote}</p>
      ) : null}
      <p className="text-center text-[11px] text-slate-600 mt-3">
        International checkout quotes use indicative FX and include {Math.round(FX_APPRECIATION * 100)}%
        appreciation vs INR. Final invoice may settle in INR or your local currency.
      </p>
    </div>
  );
}
