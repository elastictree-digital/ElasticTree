"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cookie,
  CreditCard,
  GlobeLock,
  KeyRound,
  Link2,
  Shield,
} from "lucide-react";
import SpaceSection from "@/components/ui/SpaceSection";
import SectionBlock from "@/components/ui/SectionBlock";
import { useMotionSafeFade } from "@/lib/motion";

/** Only controls that ship today — keep in sync with docs/SECURITY.md wave 1. */
const controls = [
  {
    id: "sso",
    title: "Studio SSO",
    desc: "One Elastic Tree account — Google, Microsoft, LinkedIn, or email — opens TScribe, QualView, Ethos, AI Gaze, and DataWiz.",
    Icon: KeyRound,
  },
  {
    id: "bridge",
    title: "Signed studio handoff",
    desc: "Short-lived bridge codes with HMAC verification and an allowlisted return URL — studios never accept an unsigned login.",
    Icon: Link2,
  },
  {
    id: "tls",
    title: "Encryption in transit",
    desc: "Public traffic to elastictree.com and Studio apps uses HTTPS / TLS.",
    Icon: GlobeLock,
  },
  {
    id: "headers",
    title: "Browser security headers",
    desc: "CSP, HSTS, and related headers on the corporate site and Next.js studios.",
    Icon: Shield,
  },
  {
    id: "payu",
    title: "Verified payments",
    desc: "PayU callbacks and studio unlocks are signature-checked before plans are applied.",
    Icon: CreditCard,
  },
  {
    id: "privacy",
    title: "Privacy basics",
    desc: "Cookie notice on the site, published privacy policy, and account pages kept out of search indexes.",
    Icon: Cookie,
  },
] as const;

export default function SecurityDataSection() {
  const motionProps = useMotionSafeFade();

  return (
    <SpaceSection flow="teal" id="security-data" spacing="compact" className="scroll-mt-24">
      <SectionBlock
        label="Security & Data"
        title={
          <>
            What we <span className="text-gradient-amber">ship today</span>
          </>
        }
        subtitle="Practical controls already live on elastictree.com and Studio — not a wishlist."
        action={
          <div className="hidden sm:block shrink-0">
            <Link href="/security" className="btn-secondary text-sm">
              Security overview <ArrowRight size={14} />
            </Link>
          </div>
        }
      >
        <div className="highlight-panel home-panel">
          <div className="content-grid-3">
            {controls.map(({ id, title, desc, Icon }, i) => (
              <motion.div
                key={id}
                initial={motionProps.initial}
                whileInView={motionProps.whileInView}
                viewport={motionProps.viewport}
                transition={
                  motionProps.transition
                    ? { ...motionProps.transition, delay: i * 0.04 }
                    : undefined
                }
                className="feature-card h-full text-center sm:text-left"
              >
                <div className="mx-auto sm:mx-0 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon size={22} className="text-slate-300" aria-hidden />
                </div>
                <h3 className="text-title !mb-2">{title}</h3>
                <p className="text-body-sm text-slate-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center sm:hidden pt-2">
          <Link href="/security" className="btn-secondary text-sm">
            Security overview <ArrowRight size={14} />
          </Link>
        </div>
      </SectionBlock>
    </SpaceSection>
  );
}
