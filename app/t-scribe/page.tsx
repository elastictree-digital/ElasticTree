import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import DisplayPricingGrid from "@/components/billing/DisplayPricingGrid";
import {
  TSCRIBE_STUDIO_URL,
  tscribeApplications,
  tscribeDeliverables,
  tscribeInsights,
  tscribePricing,
  tscribeStats,
} from "@/lib/t-scribe";
import { ArrowRight, Mic2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "TScribe™ | Research Transcription",
  description:
    "TScribe™ — Elastic Tree research transcription. Whisper upload, Moderator/Respondent roles, projects & folders, qualitative reports, and DOCX/PDF export.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TScribePage() {
  return (
    <>
      <PageHero
        eyebrow="Qualitative Research · Transcription Studio"
        title={
          <>
            TScribe<span className="text-gradient-amber">™</span>
          </>
        }
        subtitle="From recording to research-ready in one studio. Upload DIs and FGDs — get Moderator / Respondent transcripts, editable studios, and Elastic Tree–style research reports powered by OpenAI Whisper."
        actions={
          <>
            <ProductStudioLink
              product="tscribe"
              studioUrl={TSCRIBE_STUDIO_URL}
              label="Launch Studio"
            />
            <Link href="#pricing" className="btn-secondary">
              View Pricing <ArrowRight size={16} />
            </Link>
          </>
        }
        stats={tscribeStats.map((s) => ({
          value: s.val,
          label: s.label,
          accent: s.accent,
        }))}
      />

      <section id="features" className="section-py-compact page-content">
        <div className="content-grid-2 items-start gap-10 lg:gap-14">
          <div className="section-stack-sm">
            <SectionHeader
              label="Research Workspace"
              title="Not a notepad — a qualitative transcription studio"
              subtitle="Built for Elastic Tree fieldwork: roles, folders, reports, and client-ready exports."
              titleSize="md"
            />
            <ul className="list-spaced list-bullet">
              {tscribeDeliverables.map((item) => (
                <li key={item} className="text-body-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="highlight-panel section-stack-sm">
            <div className="flex items-center gap-2.5">
              <Mic2 size={20} className="text-[var(--amber)]" aria-hidden />
              <p className="text-title">How TScribe™ works</p>
            </div>
            <p className="text-body-sm">
              OpenAI Whisper-1 produces timed segments. A research-aware pass labels
              Moderator and Respondent for DIs and FGDs. Edit in-studio, generate a
              GPT debrief, then export for the client pack.
            </p>
            <ProductStudioLink
              product="tscribe"
              studioUrl={TSCRIBE_STUDIO_URL}
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
            label="Why TScribe"
            title="Qual research deserves better than Speaker 1 / Speaker 2"
            subtitle="Roles, structure, and reports that match how Elastic Tree delivers insight."
            className="mb-10"
          />
          <div className="content-grid-3">
            {tscribeInsights.map((item) => (
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
          title="Where teams use TScribe™"
          subtitle="From depth interviews to multi-market FGDs — the same research lens."
          className="mb-10"
        />
        <div className="content-grid-2 lg:grid-cols-3 gap-6">
          {tscribeApplications.map((app) => (
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
            title="TScribe™ rate card"
            subtitle="Per-unit pricing · No minimum commitment · All prices exclusive of GST"
            className="mb-10"
          />
          <DisplayPricingGrid
            productName="TScribe"
            plans={tscribePricing.map((plan) => ({
              name: plan.name,
              price: plan.price,
              period: plan.period,
              blurb: plan.blurb,
              features: plan.features,
              featured: plan.featured,
              amountInr: plan.amountInr ?? null,
              href: `mailto:sunilmukkath@elastictree.com?subject=TScribe%20${encodeURIComponent(plan.name)}`,
            }))}
            footnote="Base prices in INR, exclusive of GST · Pay for what you use · Bundled free with QualView sessions · Select your country above to pay in local currency (+20% intl)"
          />
        </div>
      </section>

      <section className="section-py-compact border-t border-white/[0.06] section-flow flow-tint-teal">
        <div className="page-content max-w-xl section-stack-sm">
          <Sparkles size={28} className="text-[var(--amber)] opacity-80" aria-hidden />
          <h2 className="font-display font-black text-display-md text-white">
            From fieldwork audio to client-ready insight — without the shuffle.
          </h2>
          <p className="text-lead max-w-lg">
            TScribe™ is your research transcription studio — roles, folders, reports, and
            exports in one Elastic Tree product.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <ProductStudioLink
              product="tscribe"
              studioUrl={TSCRIBE_STUDIO_URL}
              label="Launch Studio"
            />
            <a href="mailto:sunil@elastictree.com" className="btn-secondary">
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
          <p className="text-body-sm text-slate-400">
            Launch Studio → email sign-in → TScribe dashboard
          </p>
        </div>
      </section>
    </>
  );
}
