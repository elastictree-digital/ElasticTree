"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

type ProductId = "ai-gaze" | "datawiz" | "qualview" | "tscribe" | "ethos-pulse";

const PRODUCT_COPY: Record<
  ProductId,
  { title: string; blurb: string; cta: string }
> = {
  "ai-gaze": {
    title: "Open AI Gaze Studio",
    blurb: "Sign in with your email and password on the studio — same access pattern as DataWiz and QualView.",
    cta: "Continue →",
  },
  datawiz: {
    title: "Open DataWiz Studio",
    blurb: "Continue to sign in or register with your email on the studio.",
    cta: "Continue →",
  },
  qualview: {
    title: "Open QualView Studio",
    blurb: "Continue to sign in or register with your email on the studio.",
    cta: "Continue →",
  },
  tscribe: {
    title: "Open TScribe Studio",
    blurb: "Continue to sign in or register with your email on the studio.",
    cta: "Continue →",
  },
  "ethos-pulse": {
    title: "Open Ethos Pulse",
    blurb: "Continue to sign in or register with your email on Ethos Pulse.",
    cta: "Continue →",
  },
};

export function openStudio(studioUrl: string) {
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

/** Opens the product studio — users sign in with email + password there. */
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
