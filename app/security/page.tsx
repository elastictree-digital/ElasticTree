import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Cookie,
  CreditCard,
  GlobeLock,
  KeyRound,
  Link2,
  Shield,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Security & Data",
  description:
    "What Elastic Tree ships today for Studio SSO, signed handoffs, TLS, security headers, PayU verification, and privacy basics.",
};

const shipped = [
  {
    id: "sso",
    title: "Studio SSO",
    desc: "Sign in once with Google, Microsoft, LinkedIn, or email on elastictree.com. The same account unlocks TScribe, QualView, Ethos Pulse, AI Gaze, and DataWiz when SSO is enabled.",
    Icon: KeyRound,
  },
  {
    id: "bridge",
    title: "Signed studio handoff",
    desc: "After login, studios receive a short-lived bridge code. Consume requires an HMAC signature; return URLs are allowlisted so codes are not sent to arbitrary hosts.",
    Icon: Link2,
  },
  {
    id: "tls",
    title: "Encryption in transit",
    desc: "HTTPS / TLS on the corporate site and Studio deployments (Vercel and Railway).",
    Icon: GlobeLock,
  },
  {
    id: "headers",
    title: "Browser security headers",
    desc: "Content-Security-Policy, HSTS, and related headers on the website and Next.js studios (QualView allows camera/mic where needed for live rooms).",
    Icon: Shield,
  },
  {
    id: "payu",
    title: "Verified payments",
    desc: "PayU response hashes are verified before plans unlock. Studio fulfill calls require a matching billing signature.",
    Icon: CreditCard,
  },
  {
    id: "privacy",
    title: "Privacy basics",
    desc: "Cookie consent banner, published Privacy Policy and Terms, and soft-hidden account / studio hub routes that stay out of search indexes.",
    Icon: Cookie,
  },
] as const;

const notYet = [
  "Enterprise SAML / SCIM provisioning",
  "Automatic PII redaction on every ingest",
  "Customer-selectable data residency regions",
  "Unified customer-facing audit log product",
  "Customer UI for AI model allow/deny lists",
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & Data"
        title={
          <>
            What we ship<span className="text-gradient-amber">.</span>
          </>
        }
        subtitle="Honest controls that are live today across elastictree.com and Elastic Tree Studio — not a compliance brochure."
        actions={
          <>
            <Link href="/contact" className="btn-primary btn-glow">
              Ask a security question <ArrowRight size={16} />
            </Link>
            <Link href="/privacy" className="btn-secondary">
              Privacy policy
            </Link>
          </>
        }
      />

      <section className="section-py-compact page-content">
        <SectionHeader
          align="left"
          label="In production"
          title="Live controls"
          subtitle="Aligned with our internal security checklist — SSO, signed bridges, TLS, headers, payment verification, and privacy notices."
          className="!mx-0 mb-10"
        />
        <div className="content-grid-3">
          {shipped.map(({ id, title, desc, Icon }) => (
            <article key={id} id={id} className="feature-card scroll-mt-28">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <Icon size={22} className="text-slate-300" aria-hidden />
              </div>
              <h2 className="text-title !mb-2">{title}</h2>
              <p className="text-body-sm text-slate-400">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-py-compact page-content border-t border-white/[0.06]">
        <SectionHeader
          align="left"
          label="Roadmap"
          title="Not claimed as shipped"
          subtitle="We do not market these as standard product features yet. Talk to us if a programme needs them."
          className="!mx-0 mb-8"
        />
        <ul className="max-w-2xl space-y-2">
          {notYet.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-slate-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-py-compact page-content border-t border-white/[0.06]">
        <div className="max-w-2xl">
          <p className="eyebrow-text mb-3 w-fit">Next step</p>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-3">
            Security questionnaire or DPA?
          </h2>
          <p className="text-lead mb-6">
            Send your checklist — we will map each control to what is live on the website and each Studio, without
            overclaiming.
          </p>
          <Link href="/contact" className="btn-primary btn-glow">
            Contact us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
