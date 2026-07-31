import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import CrosstabPreview from "@/components/data-wiz/CrosstabPreview";
import {
  DATAWIZ_STUDIO_URL,
  datawizApplications,
  datawizDeliverables,
  datawizInsights,
  datawizPricing,
  datawizStats,
  datawizWorkflow,
} from "@/lib/data-wiz";
import { ArrowRight, Check, Table2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "DataWiz | Crosstab Analysis Studio",
  description:
    "DataWiz — Elastic Tree crosstab studio. Upload survey data and run stub × banner tables with nested banners, significance, weighting, and Excel export.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DataWizPage() {
  return (
    <>
      <PageHero
        variant="home"
        eyebrow="Quantitative Research · Crosstab Studio"
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
            Data<span className="text-gradient-amber">Wiz</span>
          </>
        }
        subtitle="Professional stub × banner books from uploaded survey data — nested breaks, column-letter significance, weighting, and Excel packs."
        actions={
          <>
            <ProductStudioLink
              product="datawiz"
              studioUrl={DATAWIZ_STUDIO_URL}
              label="Launch Studio"
            />
            <Link href="#pricing" className="btn-secondary">
              View Pricing <ArrowRight size={16} />
            </Link>
          </>
        }
        stats={datawizStats.map((s) => ({
          value: s.val,
          label: s.label,
          accent: s.accent,
        }))}
        visual={<CrosstabPreview />}
      />

      <section id="features" className="section-py-compact page-content">
        <div className="content-grid-2 items-start gap-10 lg:gap-14">
          <div className="section-stack-sm">
            <SectionHeader
              label="Research Workspace"
              title="Quant crosstabs built for Elastic Tree delivery"
              subtitle="Banner-module depth on your uploaded datasets — without the desktop stats shuffle."
              titleSize="md"
            />
            <ul className="list-spaced list-bullet">
              {datawizDeliverables.map((item) => (
                <li key={item} className="text-body-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="highlight-panel section-stack-sm">
            <div className="flex items-center gap-2.5">
              <Table2 size={20} className="text-[var(--amber)]" aria-hidden />
              <p className="text-title">How DataWiz works</p>
            </div>
            <ol className="space-y-4 mt-1">
              {datawizWorkflow.map((w) => (
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
              product="datawiz"
              studioUrl={DATAWIZ_STUDIO_URL}
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
            label="Why DataWiz"
            title="Banner books without the SPSS shuffle"
            subtitle="Nested banners, letter tests, and Excel packs in one Elastic Tree product."
            className="mb-10"
          />
          <div className="content-grid-3">
            {datawizInsights.map((item) => (
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
          title="Where teams use DataWiz"
          subtitle="From brand tables to tracking books — the same research lens."
          className="mb-10"
        />
        <div className="content-grid-2 lg:grid-cols-3 gap-6">
          {datawizApplications.map((app) => (
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
            title="Choose how your team uses DataWiz"
            subtitle="Transparent SaaS plans · upgrade when you need nested banners and Excel"
            className="mb-10"
          />
          <div className="content-grid-3 gap-6 items-stretch">
            {datawizPricing.map((plan) => (
              <div
                key={plan.name}
                className={`feature-card relative flex flex-col ${
                  plan.featured
                    ? "ring-1 ring-[var(--amber)]/50 bg-[rgba(232,168,32,0.08)]"
                    : ""
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
                  {plan.price}
                  <span className="text-sm font-semibold text-slate-400 ml-1">
                    {plan.period}
                  </span>
                </p>
                <p className="text-body-sm mb-5 mt-3">{plan.blurb}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-body-sm text-slate-300">
                      <Check
                        size={15}
                        className="text-[var(--teal)] shrink-0 mt-0.5"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <ProductStudioLink
                  product="datawiz"
                  studioUrl={DATAWIZ_STUDIO_URL}
                  variant={plan.featured ? "primary" : "secondary"}
                  showIcon={false}
                  label={plan.featured ? "Choose Pro" : `Start ${plan.name}`}
                  className="w-full justify-center"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-body-sm text-slate-500 mt-8">
            Enterprise (SSO · API · unlimited) —{" "}
            <a
              href="mailto:sunil@elastictree.com?subject=DataWiz%20Enterprise"
              className="text-[var(--amber)] hover:underline"
            >
              talk to us
            </a>
          </p>
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
            From uploaded data to client-ready banner books.
          </h2>
          <p className="text-lead max-w-lg">
            DataWiz is your Elastic Tree crosstab studio — stubs, nested banners,
            significance, and Excel export in one product.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <ProductStudioLink
              product="datawiz"
              studioUrl={DATAWIZ_STUDIO_URL}
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
