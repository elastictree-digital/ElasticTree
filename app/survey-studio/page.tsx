import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import DisplayPricingGrid from "@/components/billing/DisplayPricingGrid";
import {
  SURVEY_STUDIO_URL,
  surveyStudioApplications,
  surveyStudioDeliverables,
  surveyStudioInsights,
  surveyStudioPricing,
  surveyStudioStats,
  surveyStudioWorkflow,
} from "@/lib/survey-studio";
import { ArrowRight, ClipboardList, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Survey Studio | Quantitative Programming",
  description:
    "Survey Studio — Elastic Tree survey programming and fielding. Draft, design, translate, publish, and collect — same engine as ET Scout.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SurveyStudioPage() {
  return (
    <>
      <PageHero
        variant="home"
        eyebrow="Quantitative Research · Survey Programming"
        prefix={
          <Image
            src="/logo.png"
            alt="Elastic Tree"
            width={148}
            height={27}
            priority
            className="mb-1 h-7 w-auto object-contain opacity-95"
          />
        }
        title={
          <>
            Survey <span className="text-gradient-amber">Studio</span>
          </>
        }
        subtitle="Program and field native Elastic Tree surveys — AI draft, logic, translations, and live collectors. Same engine as ET Scout Survey Studio."
        actions={
          <>
            <ProductStudioLink
              product="survey-studio"
              studioUrl={SURVEY_STUDIO_URL}
              label="Launch Studio"
            />
            <Link href="#pricing" className="btn-secondary">
              Pilot access <ArrowRight size={16} />
            </Link>
          </>
        }
        stats={surveyStudioStats.map((s) => ({
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
              title="Survey programming built for Elastic Tree delivery"
              subtitle="From brief to public collector — without bolting on a separate questionnaire tool."
              titleSize="md"
            />
            <ul className="list-spaced list-bullet">
              {surveyStudioDeliverables.map((item) => (
                <li key={item} className="text-body-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="highlight-panel section-stack-sm">
            <div className="flex items-center gap-2.5">
              <ClipboardList size={20} className="text-[var(--amber)]" aria-hidden />
              <p className="text-title">How Survey Studio works</p>
            </div>
            <ol className="space-y-4 mt-1">
              {surveyStudioWorkflow.map((w) => (
                <li key={w.step} className="flex gap-3">
                  <span className="font-mono text-[11px] font-bold text-[var(--amber)] mt-0.5 shrink-0">
                    {w.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{w.title}</p>
                    <p className="text-body-sm mt-0.5">{w.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ProductStudioLink
              product="survey-studio"
              studioUrl={SURVEY_STUDIO_URL}
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
            label="Why Survey Studio"
            title="One engine with ET Scout"
            subtitle="Customer Studio and employee ET Scout share the same Survey Studio code — updates land together."
            className="mb-10"
          />
          <div className="content-grid-3">
            {surveyStudioInsights.map((item) => (
              <div key={item.title} className="feature-card">
                <div
                  className="mb-4 h-0.5 w-10 rounded-full"
                  style={{ background: item.accent }}
                  aria-hidden
                />
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
          title="Where teams use Survey Studio"
          subtitle="Programming desks and pilot fieldwork — hidden while we test."
          className="mb-10"
        />
        <div className="content-grid-2 lg:grid-cols-3 gap-6">
          {surveyStudioApplications.map((app) => (
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
            title="Survey Studio pilot"
            subtitle="Test phase · Quote-led · Exclusive of GST"
            className="mb-10"
          />
          <DisplayPricingGrid
            productName="Survey Studio"
            plans={surveyStudioPricing.map((plan) => ({
              name: plan.name,
              price: plan.price,
              period: plan.period,
              blurb: plan.blurb,
              features: [...plan.features],
              cta: plan.cta,
              highlighted: plan.highlighted,
            }))}
          />
        </div>
      </section>

      <section className="section-py-compact page-content">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/[0.08] pt-10">
          <div className="max-w-xl">
            <p className="eyebrow-text mb-2 w-fit">Ready to program?</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-2">
              Open Survey Studio
            </h2>
            <p className="text-body-sm text-slate-400">
              Sign in with Elastic Tree Studio SSO — same account as TScribe, QualView, and DataWiz.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ProductStudioLink
              product="survey-studio"
              studioUrl={SURVEY_STUDIO_URL}
              label="Launch Studio"
            />
            <Link href="/studio" className="btn-secondary inline-flex items-center gap-2">
              <Sparkles size={16} aria-hidden />
              All studios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
