"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import PayUCheckoutButton from "@/components/billing/PayUCheckoutButton";
import {
  formatInr,
  skuFor,
  type BillingPeriod,
  type BillingProduct,
} from "@/lib/billing/catalog";

export type PricingPlanCard = {
  name: string;
  planId: "starter" | "growth" | "expert" | "enterprise";
  blurb: string;
  features: readonly string[];
  featured?: boolean;
  /** Display price when period toggle is monthly (or only period). */
  monthlyPriceLabel?: string;
  yearlyPriceLabel?: string;
  /** Fixed period products (Ethos yearly-only). */
  fixedPeriod?: BillingPeriod;
  enterpriseMailto?: string;
};

type Props = {
  product: BillingProduct;
  plans: PricingPlanCard[];
  allowPeriodToggle?: boolean;
  footnote?: string;
};

export default function ProductPricingGrid({
  product,
  plans,
  allowPeriodToggle = true,
  footnote,
}: Props) {
  const [period, setPeriod] = useState<BillingPeriod>(
    !allowPeriodToggle ? "yearly" : "monthly",
  );

  const showToggle = allowPeriodToggle && plans.some((p) => p.planId !== "enterprise" && !p.fixedPeriod);

  const resolved = useMemo(() => {
    return plans.map((plan) => {
      if (plan.planId === "enterprise") {
        return { plan, sku: undefined as undefined, amountInr: 0, periodLabel: plan.yearlyPriceLabel ?? plan.monthlyPriceLabel ?? "Custom" };
      }
      const effectivePeriod = plan.fixedPeriod ?? period;
      const entry = skuFor(product, plan.planId, effectivePeriod);
      const amountInr = entry?.amountInr ?? 0;
      const periodLabel =
        effectivePeriod === "yearly"
          ? `${formatInr(amountInr)}/yr`
          : `${formatInr(amountInr)}/mo`;
      return { plan, sku: entry?.sku, amountInr, periodLabel, effectivePeriod };
    });
  }, [plans, period, product]);

  return (
    <div>
      {showToggle && (
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex rounded-full border border-white/10 bg-[#0a1f4a]/50 p-1"
            role="group"
            aria-label="Billing period"
          >
            {(["monthly", "yearly"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                  period === p
                    ? "bg-gradient-to-r from-[#f5c842] to-[#e8a820] text-[#0a1f4a]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {p === "monthly" ? "Monthly" : "Yearly (2 mo free)"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="content-grid-3 gap-6 items-stretch">
        {resolved.map(({ plan, sku, amountInr, periodLabel, effectivePeriod }) => (
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
              {plan.planId === "enterprise" ? "Custom" : periodLabel.split("/")[0]}
              {plan.planId !== "enterprise" && (
                <span className="text-sm font-semibold text-slate-400 ml-1">
                  / {effectivePeriod === "yearly" ? "year" : "month"}
                </span>
              )}
              {plan.planId === "enterprise" && plan.monthlyPriceLabel && (
                <span className="text-sm font-semibold text-slate-400 ml-1 block mt-2 font-sans font-medium">
                  {plan.monthlyPriceLabel}
                </span>
              )}
            </p>
            <p className="text-body-sm mb-5 mt-3">{plan.blurb}</p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2 text-body-sm text-slate-300">
                  <Check size={15} className="text-[var(--teal)] shrink-0 mt-0.5" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            {plan.planId === "enterprise" ? (
              <a
                href={plan.enterpriseMailto ?? "mailto:sunil@elastictree.com"}
                className="btn-secondary w-full justify-center"
              >
                Talk to Sales
              </a>
            ) : sku ? (
              <PayUCheckoutButton
                sku={sku}
                product={product}
                planLabel={plan.name}
                amountInr={amountInr}
                period={effectivePeriod ?? "monthly"}
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full justify-center"
                label={plan.featured ? `Choose ${plan.name}` : `Start ${plan.name}`}
              />
            ) : (
              <a href="mailto:sunil@elastictree.com" className="btn-secondary w-full justify-center">
                Contact Sales
              </a>
            )}
          </div>
        ))}
      </div>
      {footnote && (
        <p className="text-center text-body-sm text-slate-500 mt-8">{footnote}</p>
      )}
    </div>
  );
}
