import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import DisplayPricingGrid from "@/components/billing/DisplayPricingGrid";
import {
  QUALVIEW_STUDIO_URL,
  qualviewApplications,
  qualviewDeliverables,
  qualviewInsights,
  qualviewPricing,
} from "@/lib/qual-view";
import { ArrowRight, Eye, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "QualView | Live Qualitative Viewing Room",
  description:
    "QualView — Elastic Tree live qualitative viewing room. Moderator, respondents, and client observers with live transcript, engagement overlays, and ET consulting PPTX.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QualViewPage() {
  return (
    <>
      <PageHero
        eyebrow="Qualitative Research · Live Viewing Room"
        title={
          <>
            Qual<span className="text-gradient-amber">View</span>
          </>
        }
        subtitle="Conduct DIs and FGDs online with a client viewing room — live per-speaker transcript, engagement overlays, and an Elastic Tree Master Template PPTX when the session ends."
        actions={
          <>
            <ProductStudioLink
              product="qualview"
              studioUrl={QUALVIEW_STUDIO_URL}
              label="Launch Studio"
            />
            <Link href="#pricing" className="btn-secondary">
              View Pricing <ArrowRight size={16} />
            </Link>
            <span className="inline-flex items-center rounded-full border border-[rgba(232,168,32,0.35)] bg-[rgba(232,168,32,0.1)] px-3 py-1.5 text-xs font-medium text-[var(--amber)]">
              5 min free trial
            </span>
          </>
        }
      />

      <section id="features" className="section-py-compact page-content">
        <div className="content-grid-2 items-start gap-10 lg:gap-14">
          <div className="section-stack-sm">
            <SectionHeader
              label="Research Workspace"
              title="Not a Zoom call — a qualitative viewing room"
              subtitle="Built for Elastic Tree fieldwork: roles, live capture, and client-ready decks."
              titleSize="md"
            />
            <ul className="list-spaced list-bullet">
              {qualviewDeliverables.map((item) => (
                <li key={item} className="text-body-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="highlight-panel section-stack-sm">
            <div className="flex items-center gap-2.5">
              <Eye size={20} className="text-[var(--amber)]" aria-hidden />
              <p className="text-title">How QualView works</p>
            </div>
            <p className="text-body-sm">
              Create a study, share moderator / respondent / observer links, go live.
              Captions and engagement run in-session. End the room to open debrief and
              download an Elastic Tree consulting PPTX.
            </p>
            <ProductStudioLink
              product="qualview"
              studioUrl={QUALVIEW_STUDIO_URL}
              variant="secondary"
              size="sm"
              label="Open studio"
              showIcon={false}
              className="text-sm inline-flex"
            />
          </div>
        </div>
      </section>

      <section className="section-py-compact section-flow flow-tint-amber !pb-8 md:!pb-10">
        <div className="page-content">
          <SectionHeader
            label="Why QualView"
            title="Live qual deserves more than a meeting link"
            subtitle="Viewing room, capture, and delivery in one Elastic Tree product."
            className="mb-10"
          />
          <div className="content-grid-3">
            {qualviewInsights.map((item) => (
              <div key={item.title} className="feature-card">
                <h3 className="text-title mb-2" style={{ color: item.accent }}>
                  {item.title}
                </h3>
                <p className="text-body-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py-compact page-content !pt-8 md:!pt-10">
        <SectionHeader
          label="Built For"
          title="Where teams use QualView"
          subtitle="From depth interviews to multi-respondent FGDs — the same research lens."
          className="mb-10"
        />
        <div className="content-grid-2 lg:grid-cols-3 gap-6">
          {qualviewApplications.map((app) => (
            <div key={app.title} className="pillar-link">
              <h3 className="text-title mb-2" style={{ color: app.accent }}>
                {app.title}
              </h3>
              <p className="text-body-sm">{app.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section-py-compact section-flow flow-tint-purple">
        <div className="page-content">
          <SectionHeader
            label="Pricing"
            title="QualView rate card"
            subtitle="Launching soon · Per-session pricing · All prices exclusive of GST"
            className="mb-10"
          />
          <DisplayPricingGrid
            productName="QualView"
            plans={qualviewPricing.map((plan) => ({
              name: plan.name,
              price: plan.price,
              period: plan.period,
              blurb: plan.blurb,
              features: plan.features,
              featured: plan.featured,
              amountInr: plan.amountInr ?? null,
              href: `mailto:sunilmukkath@elastictree.com?subject=QualView%20${encodeURIComponent(plan.name)}`,
            }))}
            footnote="Base prices in INR, exclusive of GST · Traditional agency IDIs in India often cost ₹10,000–21,000 per respondent · Select your country above to pay in local currency (+20% intl)"
          />
        </div>
      </section>

      <section className="section-py-compact border-t border-white/[0.06] section-flow flow-tint-teal">
        <div className="page-content max-w-xl section-stack-sm">
          <Sparkles
            size={28}
            className="text-[var(--amber)] opacity-80"
            aria-hidden
          />
          <h2 className="font-display font-black text-display-md text-white">
            From live room to client-ready deck — without the shuffle.
          </h2>
          <p className="text-lead max-w-lg">
            QualView is your live qualitative studio — viewing room, transcript,
            engagement, and Elastic Tree PPTX in one product.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <ProductStudioLink
              product="qualview"
              studioUrl={QUALVIEW_STUDIO_URL}
              label="Launch Studio"
            />
            <a href="mailto:sunil@elastictree.com" className="btn-secondary">
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
          <p className="text-body-sm text-slate-400">
            Launch Studio → email sign-in → QualView lobby
          </p>
        </div>
      </section>
    </>
  );
}
