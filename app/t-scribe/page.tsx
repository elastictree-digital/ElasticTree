import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  TSCRIBE_STUDIO_URL,
  tscribeApplications,
  tscribeDeliverables,
  tscribeInsights,
  tscribePricing,
  tscribeStats,
} from "@/lib/t-scribe";
import { ArrowRight, Check, Mic2, Sparkles } from "lucide-react";

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
            <a href={TSCRIBE_STUDIO_URL} className="btn-primary">
              Launch Studio <ArrowRight size={16} />
            </a>
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
            <a href={TSCRIBE_STUDIO_URL} className="btn-secondary text-sm inline-flex">
              Open studio <ArrowRight size={14} />
            </a>
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
            title="Choose how your team uses TScribe™"
            subtitle="Transparent SaaS plans · Pilot studio access available"
            className="mb-10"
          />
          <div className="content-grid-3 gap-6 items-stretch">
            {tscribePricing.map((plan) => (
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
                  {plan.price}
                  <span className="text-sm font-semibold text-slate-400 ml-1">{plan.period}</span>
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
                {plan.name === "Enterprise" ? (
                  <a href="mailto:sunil@elastictree.com" className="btn-secondary w-full justify-center">
                    Talk to Sales
                  </a>
                ) : (
                  <a
                    href={TSCRIBE_STUDIO_URL}
                    className={
                      plan.featured
                        ? "btn-primary w-full justify-center"
                        : "btn-secondary w-full justify-center"
                    }
                  >
                    {plan.featured ? "Choose Growth" : "Start Starter"}
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-body-sm text-slate-500 mt-8">
            Prices in INR · Annual billing discounts on Growth &amp; Enterprise
          </p>
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
            <a href={TSCRIBE_STUDIO_URL} className="btn-primary">
              Launch Studio <ArrowRight size={16} />
            </a>
            <a href="mailto:sunil@elastictree.com" className="btn-secondary">
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
          <p className="text-body-sm text-slate-400">
            Launch Studio → access password → TScribe dashboard
          </p>
        </div>
      </section>
    </>
  );
}
