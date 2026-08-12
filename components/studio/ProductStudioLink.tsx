"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

type ProductId =
  | "ai-gaze"
  | "datawiz"
  | "qualview"
  | "tscribe"
  | "ethos-pulse"
  | "survey-studio";

const SSO_ON = process.env.NEXT_PUBLIC_ET_SSO === "1";

const PRODUCT_COPY: Record<
  ProductId,
  { title: string; blurb: string; cta: string }
> = {
  "ai-gaze": {
    title: "Open AI Gaze Studio",
    blurb: SSO_ON
      ? "Sign in once with Google, Microsoft, LinkedIn, or email. Use the same email as PayU checkout."
      : "Sign in with your email and password on the studio — same access pattern as DataWiz and QualView.",
    cta: SSO_ON ? "Continue with Elastic Tree SSO →" : "Continue →",
  },
  datawiz: {
    title: "Open DataWiz Studio",
    blurb: SSO_ON
      ? "Sign in once with Google, Microsoft, LinkedIn, or email. Use the same email as PayU checkout."
      : "Continue to sign in or register with your email on the studio.",
    cta: SSO_ON ? "Continue with Elastic Tree SSO →" : "Continue →",
  },
  qualview: {
    title: "Open QualView Studio",
    blurb: SSO_ON
      ? "Sign in once with Google, Microsoft, LinkedIn, or email. Use the same email as PayU checkout."
      : "Continue to sign in or register with your email on the studio.",
    cta: SSO_ON ? "Continue with Elastic Tree SSO →" : "Continue →",
  },
  tscribe: {
    title: "Open TScribe Studio",
    blurb: SSO_ON
      ? "Sign in once with Google, Microsoft, LinkedIn, or email. Use the same email as PayU checkout."
      : "Continue to sign in or register with your email on the studio.",
    cta: SSO_ON ? "Continue with Elastic Tree SSO →" : "Continue →",
  },
  "ethos-pulse": {
    title: "Open Ethos Pulse",
    blurb: SSO_ON
      ? "Sign in once with Google, Microsoft, LinkedIn, or email. Use the same email as PayU checkout."
      : "Continue to sign in or register with your email on Ethos Pulse.",
    cta: SSO_ON ? "Continue with Elastic Tree SSO →" : "Continue →",
  },
  "survey-studio": {
    title: "Open Survey Studio",
    blurb: SSO_ON
      ? "Sign in once with Google, Microsoft, LinkedIn, or email. Same Survey Studio engine as ET Scout."
      : "Continue to Survey Studio — same engine as ET Scout Survey Studio.",
    cta: SSO_ON ? "Continue with Elastic Tree SSO →" : "Continue →",
  },
};

export function openStudio(studioUrl: string) {
  if (SSO_ON) {
    const accounts = (
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.elastictree.com"
    ).replace(/\/$/, "");
    // Prefer bridge when already on elastictree.com (e.g. /accounts) so studios
    // receive et_bridge without bouncing through the sign-in screen again.
    const onAccountsOrigin =
      typeof window !== "undefined" &&
      window.location.origin.replace(/\/$/, "") === accounts;
    if (onAccountsOrigin) {
      window.location.assign(
        `/api/auth/bridge?returnUrl=${encodeURIComponent(studioUrl)}`,
      );
      return;
    }
    window.location.assign(
      `${accounts}/accounts/signin?returnUrl=${encodeURIComponent(studioUrl)}`,
    );
    return;
  }
  const url = new URL(studioUrl);
  url.searchParams.set("signin", "1");
  window.location.assign(url.toString());
}

export function StudioSignInForm({
  product,
  studioUrl,
  onSuccess,
}: {
  product: ProductId;
  studioUrl: string;
  onSuccess?: () => void;
  inputId?: string;
}) {
  const copy = PRODUCT_COPY[product];

  function go() {
    onSuccess?.();
    openStudio(studioUrl);
  }

  return (
    <div className="w-full">
      <p className="font-display font-bold text-lg text-white mb-1">{copy.title}</p>
      <p className="text-body-sm text-slate-400 mb-5">{copy.blurb}</p>

      <button type="button" onClick={go} className="btn-primary btn-glow w-full justify-center">
        {copy.cta}
      </button>

      <p className="text-center text-xs text-slate-500 mt-4">
        Need a seat?{" "}
        <a
          href="mailto:sunil@elastictree.com"
          className="text-[var(--amber)] font-semibold hover:underline"
        >
          Contact sales
        </a>
        {" · "}
        <a href="/privacy" className="text-slate-400 hover:text-[var(--amber)] hover:underline">
          Privacy
        </a>
      </p>
    </div>
  );
}

export function StudioSignInModal({
  open,
  onClose,
  product,
  studioUrl,
}: {
  open: boolean;
  onClose: () => void;
  product: ProductId;
  studioUrl: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#0a1f4a]/85 backdrop-blur-md"
        aria-label="Close sign in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-signin-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#103466] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <h2 id="studio-signin-title" className="sr-only">
          {PRODUCT_COPY[product].title}
        </h2>
        <StudioSignInForm product={product} studioUrl={studioUrl} onSuccess={onClose} />
      </div>
    </div>
  );
}

interface StudioLinkProps {
  product: ProductId;
  studioUrl: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  label?: string;
  showIcon?: boolean;
}

/** Opens the product studio — SSO when ET_SSO is on, else email gate on the studio. */
export default function ProductStudioLink({
  product,
  studioUrl,
  variant = "primary",
  size = "md",
  className = "",
  label = "Launch Studio",
  showIcon = true,
}: StudioLinkProps) {
  const [open, setOpen] = useState(false);
  const sizeClass = size === "sm" ? "text-sm px-5 py-2.5" : "";
  const variantClass = variant === "primary" ? "btn-primary btn-glow" : "btn-secondary";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${variantClass} ${sizeClass} ${className}`.trim()}
      >
        {showIcon && <Play size={size === "sm" ? 14 : 16} fill="currentColor" aria-hidden />}
        {label}
      </button>
      <StudioSignInModal
        open={open}
        onClose={() => setOpen(false)}
        product={product}
        studioUrl={studioUrl}
      />
    </>
  );
}
