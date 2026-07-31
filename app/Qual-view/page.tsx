import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  QUALVIEW_STUDIO_URL,
  qualviewApplications,
  qualviewDeliverables,
  qualviewInsights,
  qualviewPricing,
} from "@/lib/qual-view";
import { ArrowRight, Check, Eye, Sparkles } from "lucide-react";

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
            <a href={QUALVIEW_STUDIO_URL} className="btn-primary">
              Launch Studio <ArrowRight size={16} />
            </a>
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
            <a href={QUALVIEW_STUDIO_URL} className="btn-secondary text-sm inline-flex">
              Open studio <ArrowRight size={14} />
            </a>
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
            title="Choose how your team uses QualView"
            subtitle="Transparent SaaS plans · 5-minute trial rooms on every plan"
            className="mb-10"
          />
          <div className="content-grid-3 gap-6 items-stretch">
            {qualviewPricing.map((plan) => (
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
                {plan.name === "Enterprise" ? (
                  <a
                    href="mailto:sunil@elastictree.com?subject=QualView%20Enterprise"
                    className="btn-secondary w-full justify-center"
                  >
                    Talk to Sales
                  </a>
                ) : (
                  <a
                    href={QUALVIEW_STUDIO_URL}
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
            <a href={QUALVIEW_STUDIO_URL} className="btn-primary">
              Launch Studio <ArrowRight size={16} />
            </a>
            <a href="mailto:sunil@elastictree.com" className="btn-secondary">
              Contact Sales <ArrowRight size={16} />
            </a>
          </div>
          <p className="text-body-sm text-slate-400">
            Launch Studio → access password → QualView lobby
          </p>
        </div>
      </section>
    </>
  );
}
