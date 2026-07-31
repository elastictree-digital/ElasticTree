import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  DATAWIZ_STUDIO_URL,
  datawizApplications,
  datawizDeliverables,
  datawizInsights,
  datawizPricing,
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
        subtitle="Upload coded survey data and build professional stub × banner crosstabs — nested breaks, column-letter significance, weighting, and Excel packs — without desktop stats software."
        actions={
          <>
            <a href={DATAWIZ_STUDIO_URL} className="btn-primary">
              Launch Studio <ArrowRight size={16} />
            </a>
            <Link href="#pricing" className="btn-secondary">
              View Pricing <ArrowRight size={16} />
            </Link>
            <span className="inline-flex items-center rounded-full border border-[rgba(232,168,32,0.35)] bg-[rgba(232,168,32,0.1)] px-3 py-1.5 text-xs font-medium text-[var(--amber)]">
              Hidden pilot
            </span>
          </>
        }
      />

      <section id="features" className="section-py-compact page-content">
        <div className="content-grid-2 items-start gap-10 lg:gap-14">
          <div className="section-stack-sm">
            <SectionHeader
              label="Research Workspace"
              title="Quant crosstabs built for Elastic Tree delivery"
              subtitle="The analysis depth of a Quantitative banner module — focused on uploaded datasets."
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
            <p className="text-body-sm">
              Upload CSV or Excel, pick side rows (stubs) and banner layers, set bases and
              significance, then build. Export multi-sheet Excel with an index and sig footnotes.
            </p>
            <a href={DATAWIZ_STUDIO_URL} className="btn-secondary text-sm inline-flex">
              Open studio <ArrowRight size={14} />
            </a>
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
                <a
                  href={DATAWIZ_STUDIO_URL}
                  className={
                    plan.featured
                      ? "btn-primary w-full justify-center"
                      : "btn-secondary w-full justify-center"
                  }
                >
                  {plan.featured ? "Choose Pro" : `Start ${plan.name}`}
                </a>
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
            <a href={DATAWIZ_STUDIO_URL} className="btn-primary">
              Launch Studio <ArrowRight size={16} />
            </a>
            <a href="mailto:sunil@elastictree.com" className="btn-secondary">
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
          <p className="text-body-sm text-slate-400">
            Launch Studio → access password → upload dataset → build crosstabs
          </p>
        </div>
      </section>
    </>
  );
}
