"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ETLogo from "./ETLogo";
import AiGazeLogo from "./AiGazeLogo";
import AiGazeStudioLink from "@/components/ai-gaze/AiGazeStudioLink";
import { Menu, X } from "lucide-react";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/table-share", label: "Table Share" },
  // AI Gaze nav tab hidden for now — page remains at /ai-gaze
  { href: "/casestudies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

const aiGazeLinks = [
  { href: "/ai-gaze", label: "Overview" },
  { href: "/ai-gaze#features", label: "Features" },
  { href: "/ai-gaze#pricing", label: "Pricing" },
  { href: "/ai-gaze#studio", label: "Studio" },
];

const tScribeLinks = [
  { href: "/t-scribe", label: "Overview" },
  { href: "/t-scribe#features", label: "Features" },
  { href: "/t-scribe#pricing", label: "Pricing" },
  { href: "https://www.elastictree.com/tscribe", label: "Studio", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAiGaze = pathname === "/ai-gaze" || pathname.startsWith("/ai-gaze/");
  const isTScribe = pathname === "/t-scribe" || pathname.startsWith("/t-scribe/");
  const links = isAiGaze ? aiGazeLinks : isTScribe ? tScribeLinks : siteLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "site-header--scrolled" : ""
      }`}
    >
      <nav className="page-content h-16 flex items-center justify-between gap-4">
        <Link
          href={isAiGaze ? "/ai-gaze" : isTScribe ? "/t-scribe" : "/"}
          className="relative z-10 shrink-0"
          aria-label={
            isAiGaze ? "AI Gaze home" : isTScribe ? "TScribe home" : "Elastic Tree home"
          }
        >
          {isAiGaze ? (
            <AiGazeLogo height={48} priority />
          ) : (
            <ETLogo height={28} priority />
          )}
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const href = "href" in l ? l.href : "";
            const external = "external" in l && l.external;
            const active =
              href === "/ai-gaze"
                ? pathname === "/ai-gaze"
                : href === "/t-scribe"
                  ? pathname === "/t-scribe"
                  : pathname === href ||
                    (href !== "/" && !href.includes("#") && !external && pathname.startsWith(href));
            return (
              <li key={href}>
                {external ? (
                  <a
                    href={href}
                    className={`nav-link px-3.5 py-2 text-body-sm font-medium rounded-lg transition-colors ${
                      active ? "nav-link--active" : ""
                    }`}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className={`nav-link px-3.5 py-2 text-body-sm font-medium rounded-lg transition-colors ${
                      active ? "nav-link--active" : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isAiGaze ? (
            <AiGazeStudioLink
              label="Launch Studio"
              showIcon={false}
              className="text-sm !py-2.5 !px-5"
            />
          ) : isTScribe ? (
            <a
              href="https://www.elastictree.com/tscribe"
              className="btn-primary text-sm !py-2.5 !px-5"
            >
              Launch Studio
            </a>
          ) : (
            <Link href="/contact" className="btn-primary text-sm !py-2.5 !px-5">
              Get in Touch
            </Link>
          )}
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-slate-300 hover:text-[var(--amber)] transition-colors relative z-50"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[#0a1f4a]/80 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="lg:hidden site-header-mobile relative z-50">
            <ul className="page-content py-3">
              {links.map((l) => {
                const href = l.href;
                const external = "external" in l && Boolean(l.external);
                const active =
                  href === "/ai-gaze"
                    ? pathname === "/ai-gaze"
                    : href === "/t-scribe"
                      ? pathname === "/t-scribe"
                      : pathname === href ||
                        (href !== "/" &&
                          !href.includes("#") &&
                          !external &&
                          pathname.startsWith(href));
                return (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        className={`block py-3 text-body-sm font-medium border-b border-white/[0.04] transition-colors ${
                          active ? "text-[var(--amber)]" : "text-slate-200 hover:text-[var(--amber)]"
                        }`}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={`block py-3 text-body-sm font-medium border-b border-white/[0.04] transition-colors ${
                          active ? "text-[var(--amber)]" : "text-slate-200 hover:text-[var(--amber)]"
                        }`}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="pt-4 pb-2">
                {isAiGaze ? (
                  <AiGazeStudioLink
                    label="Launch Studio"
                    showIcon={false}
                    className="w-full justify-center"
                  />
                ) : isTScribe ? (
                  <a
                    href="https://www.elastictree.com/tscribe"
                    className="btn-primary w-full justify-center"
                  >
                    Launch Studio
                  </a>
                ) : (
                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Get in Touch
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
