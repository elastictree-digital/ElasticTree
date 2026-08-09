import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import DisplayPricingGrid from "@/components/billing/DisplayPricingGrid";
import { ETHOS_PULSE_STUDIO_URL, ethosPulsePricing } from "@/lib/ethos-pulse";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Ethos Pulse | Employee Satisfaction",
  description:
    "Ethos Pulse — Elastic Tree employee satisfaction surveys with loyalty dashboards, cohorts, and manager scorecards.",
  robots: { index: false, follow: false },
};

export default function EthosPulsePage() {
  return (
    <>
      <PageHero
        eyebrow="People Insights · Employee Satisfaction"
        title={
          <>
            Ethos Pulse<span className="text-gradient-amber">™</span>
          </>
        }
        subtitle="Run structured employee satisfaction studies with loyalty dashboards, cohort views, and manager scorecards — built for Elastic Tree clients."
        actions={
          <>
            <ProductStudioLink
              product="ethos-pulse"
              studioUrl={ETHOS_PULSE_STUDIO_URL}
              label="Launch Studio"
            />
            <Link href="#pricing" className="btn-secondary">
              View Pricing <ArrowRight size={16} />
            </Link>
          </>
        }
      />

      <section id="pricing" className="section-py-compact section-flow flow-tint-purple">
        <div className="page-content">
          <SectionHeader
            label="Pricing"
            title="Choose your Ethos Pulse plan"
            subtitle="Priced for how research is bought in India · All prices exclusive of GST"
            className="mb-10"
          />
          <DisplayPricingGrid
            productName="Ethos Pulse"
            plans={ethosPulsePricing.map((plan) => ({
              name: plan.name,
              price: plan.price,
              period: plan.period,
              blurb: plan.blurb,
              features: plan.features,
              featured: plan.featured,
              amountInr: plan.amountInr ?? null,
              href: `mailto:sunilmukkath@elastictree.com?subject=Ethos%20Pulse%20${encodeURIComponent(plan.name)}`,
            }))}
            footnote="Base prices in INR, exclusive of GST · Custom / bulk pricing available for ongoing partnerships · Select your country above to pay in local currency (+20% intl)"
          />
        </div>
      </section>

      <section className="section-py-compact border-t border-white/[0.06] section-flow flow-tint-teal">
        <div className="page-content max-w-xl section-stack-sm">
          <Sparkles size={28} className="text-[var(--amber)] opacity-80" aria-hidden />
          <h2 className="font-display font-black text-display-md text-white">
            Measure culture with the same rigor as your brand research.
          </h2>
          <p className="text-lead max-w-lg">
            Ethos Pulse turns employee feedback into dashboards your leadership team can act on.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <ProductStudioLink
              product="ethos-pulse"
              studioUrl={ETHOS_PULSE_STUDIO_URL}
              label="Launch Studio"
            />
            <a href="mailto:sunil@elastictree.com" className="btn-secondary">
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
