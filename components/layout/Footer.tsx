"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ETLogo from "./ETLogo";
import AiGazeLogo from "./AiGazeLogo";
import { LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { contactChannels, hqSummary, socialLinks } from "@/lib/contact";

const siteNav = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Table Share", href: "/table-share" },
  // AI Gaze nav tab hidden for now — page remains at /ai-gaze
  { label: "Case Studies", href: "/casestudies" },
  { label: "Contact", href: "/contact" },
];

const aiGazeNav = [
  { label: "Overview", href: "/ai-gaze" },
  { label: "Features", href: "/ai-gaze#features" },
  { label: "Pricing", href: "/ai-gaze#pricing" },
  { label: "Studio", href: "/ai-gaze#studio" },
];

const tScribeNav = [
  { label: "Overview", href: "/t-scribe" },
  { label: "Features", href: "/t-scribe#features" },
  { label: "Pricing", href: "/t-scribe#pricing" },
  { label: "Studio", href: "https://www.elastictree.com/tscribe" },
];

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
} as const;

export default function Footer() {
  const pathname = usePathname();
  const isAiGaze = pathname === "/ai-gaze" || pathname.startsWith("/ai-gaze/");
  const isTScribe = pathname === "/t-scribe" || pathname.startsWith("/t-scribe/");
  const nav = isAiGaze ? aiGazeNav : isTScribe ? tScribeNav : siteNav;

  return (
    <footer className="border-t border-white/[0.06] section-flow flow-tint-blue">
      <div className="page-content section-py-tight">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          <div className="md:col-span-5">
            {isAiGaze ? (
              <AiGazeLogo height={48} className="mb-5" />
            ) : (
              <ETLogo height={30} className="mb-5" />
            )}
            <p className="text-body-sm max-w-sm mb-6">
              {isAiGaze
                ? "Predictive eye tracking for packs, shelves, and ads — without hardware."
                : isTScribe
                  ? "Research-grade transcription for DIs and FGDs — Whisper, roles, reports, and export."
                  : "Market research for FMCG and food-service brands. Smart decisions, simply made — since 2014."}
            </p>
            {!isAiGaze && !isTScribe && (
              <div className="flex gap-2">
                {socialLinks.map(({ label, href }) => {
                  const Icon = socialIcons[label as keyof typeof socialIcons];
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-[var(--amber)] hover:bg-white/[0.04] transition-colors"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            <p className="text-caption normal-case mb-4">Navigate</p>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-body-sm text-slate-300 hover:text-[var(--amber)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-caption normal-case mb-4">Contact</p>
            <div className="space-y-3">
              {isAiGaze || isTScribe ? (
                <>
                  <a
                    href="mailto:sunil@elastictree.com"
                    className="block text-body-sm text-slate-300 hover:text-[var(--amber)] transition-colors"
                  >
                    sunil@elastictree.com
                  </a>
                  <p className="text-body-sm text-slate-400">+91 98408 50057</p>
                  <p className="text-body-sm text-slate-400">Chennai</p>
                </>
              ) : (
                <>
                  {contactChannels.map((channel) => (
                    <div key={channel.label}>
                      <p className="text-caption normal-case mb-1">{channel.label}</p>
                      {channel.kind === "email" && (
                        <a href={channel.href} className="text-body-sm text-slate-300 hover:text-[var(--amber)] transition-colors">
                          {channel.value}
                        </a>
                      )}
                      {channel.kind === "phone" && (
                        <div className="space-y-0.5">
                          {channel.numbers.map((n) => (
                            <a
                              key={n.href}
                              href={n.href}
                              className="block text-body-sm text-slate-300 hover:text-[var(--amber)] transition-colors"
                            >
                              {n.display}
                            </a>
                          ))}
                        </div>
                      )}
                      {channel.kind === "address" && (
                        <p className="text-body-sm text-slate-400">{channel.lines[0]}</p>
                      )}
                    </div>
                  ))}
                  <div>
                    <p className="text-caption normal-case mb-1">Offices</p>
                    <p className="text-body-sm text-slate-300">{hqSummary}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 border-t border-white/[0.06]">
          <p className="text-caption normal-case">
            © {new Date().getFullYear()}{" "}
            {isAiGaze ? "AI Gaze™" : isTScribe ? "TScribe™ · Elastic Tree" : "Elastic Tree Research"}
          </p>
          <p className="text-caption normal-case text-slate-500">
            {isAiGaze
              ? "Predictive Eye Tracking"
              : isTScribe
                ? "Research Transcription"
                : "Smart Decisions, Simply Made."}
          </p>
        </div>
      </div>
    </footer>
  );
}
