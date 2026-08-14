import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import StudioProductGrid from "@/components/studio/StudioProductGrid";
import { studioProducts } from "@/lib/studio-products";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Studio | Digital Products",
  description:
    "Elastic Tree Studio — open Survey Studio, AI Gaze, TScribe, QualView, DataWiz, Ethos Pulse, and Table Share from one place (test phase · hidden).",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        variant="home"
        eyebrow="Product hub · Private"
        title={
          <>
            Studio<span className="text-gradient-amber">.</span>
          </>
        }
        subtitle="Open the research tools you’ve bought — or explore what’s ready for pilots."
        actions={
          <>
            <a href="#products" className="btn-primary btn-glow">
              View products <ArrowRight size={16} />
            </a>
            <Link href="/accounts/signin?returnUrl=%2Faccounts" className="btn-secondary">
              Sign in to account
            </Link>
          </>
        }
        meta={
          <p className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] font-mono uppercase tracking-[0.14em] text-slate-500">
            {studioProducts.map((p, i) => (
              <span key={p.id}>
                {i > 0 ? <span className="text-slate-700 mr-2.5">·</span> : null}
                <a href={`#${p.id}`} className="hover:text-[var(--amber)] transition-colors">
                  {p.name}
                </a>
              </span>
            ))}
          </p>
        }
      />

      <section id="products" className="section-py-compact page-content">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow-text mb-3 w-fit">Your tools</p>
          <h2 className="font-display font-black text-display-md text-white tracking-tight mb-3">
            Launch a studio
          </h2>
          <p className="text-lead">
            One Elastic Tree account unlocks every product below. Overview pages stay
            available; Open signs you straight into the app.
          </p>
        </header>
        <StudioProductGrid />
      </section>

      <section className="section-py-compact page-content">
        <div className="border-t border-white/[0.08] pt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-lg">
            <p className="eyebrow-text mb-2 w-fit">Already a customer?</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-2">
              Manage access in My account
            </h2>
            <p className="text-body-sm text-slate-400">
              Plans, invoices, and one-click studio open — same email as PayU checkout.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/accounts" className="btn-secondary">
              My account
            </Link>
            <Link
              href="/accounts/signin?returnUrl=%2Faccounts"
              className="btn-primary btn-glow"
            >
              Sign in <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
