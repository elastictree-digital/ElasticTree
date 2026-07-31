"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ETLogo from "./ETLogo";
import AiGazeLogo from "./AiGazeLogo";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import { AI_GAZE_STUDIO_URL } from "@/lib/ai-gaze";
import { DATAWIZ_STUDIO_URL } from "@/lib/data-wiz";
import { QUALVIEW_STUDIO_URL } from "@/lib/qual-view";
import { TSCRIBE_STUDIO_URL } from "@/lib/t-scribe";
import { Menu, X } from "lucide-react";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/table-share", label: "Table Share" },
  // AI Gaze nav tab hidden for now — page remains at /ai-gaze
  // QualView nav tab hidden for now — page remains at /Qual-view
  // DataWiz nav tab hidden for now — page remains at /data-wiz
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
  { href: "https://www.elastictree.com/TSCRIBE", label: "Studio", external: true },
];

const qualViewLinks = [
  { href: "/Qual-view", label: "Overview" },
  { href: "/Qual-view#features", label: "Features" },
  { href: "/Qual-view#pricing", label: "Pricing" },
  { href: "https://www.elastictree.com/qualview", label: "Studio", external: true },
];

const dataWizLinks = [
  { href: "/data-wiz", label: "Overview" },
  { href: "/data-wiz#features", label: "Features" },
  { href: "/data-wiz#pricing", label: "Pricing" },
  // Studio opens via Launch Studio CTA (sign-in modal) — not a bare link
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const pathLower = (pathname || "").toLowerCase();
  const isAiGaze = pathname === "/ai-gaze" || pathname.startsWith("/ai-gaze/");
  const isTScribe = pathname === "/t-scribe" || pathname.startsWith("/t-scribe/");
  const isQualView =
    pathLower === "/qual-view" || pathLower.startsWith("/qual-view/");
  const isDataWiz =
    pathLower === "/data-wiz" || pathLower.startsWith("/data-wiz/");
  const links = isAiGaze
    ? aiGazeLinks
    : isTScribe
      ? tScribeLinks
      : isQualView
        ? qualViewLinks
        : isDataWiz
          ? dataWizLinks
          : siteLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const homeHref = isAiGaze
    ? "/ai-gaze"
    : isTScribe
      ? "/t-scribe"
      : isQualView
        ? "/Qual-view"
        : isDataWiz
          ? "/data-wiz"
          : "/";

  const homeLabel = isAiGaze
    ? "AI Gaze home"
    : isTScribe
      ? "TScribe home"
      : isQualView
        ? "QualView home"
        : isDataWiz
          ? "DataWiz home"
          : "Elastic Tree home";

  function isActive(href: string, external?: boolean) {
    if (href === "/ai-gaze") return pathname === "/ai-gaze";
    if (href === "/t-scribe") return pathname === "/t-scribe";
    if (href === "/Qual-view") return isQualView;
    if (href === "/data-wiz") return isDataWiz;
    return (
      pathname === href ||
      (href !== "/" && !href.includes("#") && !external && pathname.startsWith(href))
    );
  }

  function studioCta() {
    if (isAiGaze) {
      return (
        <ProductStudioLink
          product="ai-gaze"
          studioUrl={AI_GAZE_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="text-sm !py-2.5 !px-5"
        />
      );
    }
    if (isTScribe) {
      return (
        <ProductStudioLink
          product="tscribe"
          studioUrl={TSCRIBE_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="text-sm !py-2.5 !px-5"
        />
      );
    }
    if (isQualView) {
      return (
        <ProductStudioLink
          product="qualview"
          studioUrl={QUALVIEW_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="text-sm !py-2.5 !px-5"
        />
      );
    }
    if (isDataWiz) {
      return (
        <ProductStudioLink
          product="datawiz"
          studioUrl={DATAWIZ_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="text-sm !py-2.5 !px-5"
        />
      );
    }
    return (
      <Link href="/contact" className="btn-primary text-sm !py-2.5 !px-5">
        Get in Touch
      </Link>
    );
  }

  function mobileStudioCta() {
    if (isAiGaze) {
      return (
        <ProductStudioLink
          product="ai-gaze"
          studioUrl={AI_GAZE_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="w-full justify-center"
        />
      );
    }
    if (isTScribe) {
      return (
        <ProductStudioLink
          product="tscribe"
          studioUrl={TSCRIBE_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="w-full justify-center"
        />
      );
    }
    if (isQualView) {
      return (
        <ProductStudioLink
          product="qualview"
          studioUrl={QUALVIEW_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="w-full justify-center"
        />
      );
    }
    if (isDataWiz) {
      return (
        <ProductStudioLink
          product="datawiz"
          studioUrl={DATAWIZ_STUDIO_URL}
          label="Launch Studio"
          showIcon={false}
          className="w-full justify-center"
        />
      );
    }
    return (
      <Link href="/contact" className="btn-primary w-full justify-center">
        Get in Touch
      </Link>
    );
  }

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "site-header--scrolled" : ""
      }`}
    >
      <nav className="page-content h-16 flex items-center justify-between gap-4">
        <Link href={homeHref} className="relative z-10 shrink-0" aria-label={homeLabel}>
          {isAiGaze ? <AiGazeLogo height={48} priority /> : <ETLogo height={28} priority />}
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const href = "href" in l ? l.href : "";
            const external = "external" in l && Boolean(l.external);
            const active = isActive(href, external);
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

        <div className="hidden lg:flex items-center gap-3 shrink-0">{studioCta()}</div>

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
                const active = isActive(href, external);
                return (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        className={`block py-3 text-body-sm font-medium border-b border-white/[0.04] transition-colors ${
                          active
                            ? "text-[var(--amber)]"
                            : "text-slate-200 hover:text-[var(--amber)]"
                        }`}
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={`block py-3 text-body-sm font-medium border-b border-white/[0.04] transition-colors ${
                          active
                            ? "text-[var(--amber)]"
                            : "text-slate-200 hover:text-[var(--amber)]"
                        }`}
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="pt-4 pb-2">{mobileStudioCta()}</li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
