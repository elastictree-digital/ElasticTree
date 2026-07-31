"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { Play, X } from "lucide-react";

/** Shared soft-launch password for Elastic Tree product studios. */
export const STUDIO_ACCESS_PASSWORD =
  process.env.NEXT_PUBLIC_ET_STUDIO_ACCESS_PASSWORD ?? "elastic2026";

type ProductId = "ai-gaze" | "datawiz" | "qualview" | "tscribe" | "ethos-pulse";

const PRODUCT_COPY: Record<
  ProductId,
  { title: string; blurb: string; cta: string }
> = {
  "ai-gaze": {
    title: "Sign in to AI Gaze Studio",
    blurb: "Enter your access password to open the analysis dashboard",
    cta: "Sign in →",
  },
  datawiz: {
    title: "Sign in to DataWiz Studio",
    blurb: "Enter your access password to open crosstab analysis",
    cta: "Sign in →",
  },
  qualview: {
    title: "Sign in to QualView Studio",
    blurb: "Enter your access password to open the live viewing room",
    cta: "Sign in →",
  },
  tscribe: {
    title: "Sign in to TScribe Studio",
    blurb: "Enter your access password to open transcription and reports",
    cta: "Sign in →",
  },
  "ethos-pulse": {
    title: "Sign in to Ethos Pulse",
    blurb: "Enter your access password to open employee satisfaction surveys",
    cta: "Sign in →",
  },
};

function openStudio(studioUrl: string, password: string, product: ProductId) {
  const url = new URL(studioUrl);
  // Soft-launch token — AI Gaze Streamlit + DataWiz cookie exchange read ?access=
  if (product === "ai-gaze" || product === "datawiz") {
    url.searchParams.set("access", password.trim());
  } else {
    url.searchParams.set("signin", "1");
  }
  window.location.assign(url.toString());
}

export function StudioSignInForm({
  product,
  studioUrl,
  onSuccess,
  inputId,
}: {
  product: ProductId;
  studioUrl: string;
  onSuccess?: () => void;
  inputId?: string;
}) {
  const autoId = useId();
  const fieldId = inputId ?? `studio-pwd-${autoId}`;
  const copy = PRODUCT_COPY[product];
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (password.trim() !== STUDIO_ACCESS_PASSWORD) {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
      return;
    }

    onSuccess?.();
    openStudio(studioUrl, password, product);
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <p className="font-display font-bold text-lg text-white mb-1">{copy.title}</p>
      <p className="text-body-sm text-slate-400 mb-5">{copy.blurb}</p>

      <label htmlFor={fieldId} className="sr-only">
        Password
      </label>
      <input
        id={fieldId}
        type="password"
        name="password"
        autoComplete="current-password"
        autoFocus
        placeholder="Enter access password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        className="w-full rounded-xl border border-white/[0.12] bg-[#090e2c]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[var(--amber)]/60 focus:ring-1 focus:ring-[var(--amber)]/40 mb-3"
      />

      {error && (
        <p className="text-sm text-red-400 mb-3" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !password.trim()}
        className="btn-primary btn-glow w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Opening studio…" : copy.cta}
      </button>

      <p className="text-center text-xs text-slate-500 mt-4">
        Need a seat?{" "}
        <a
          href="mailto:sunil@elastictree.com"
          className="text-[var(--amber)] font-semibold hover:underline"
        >
          Contact sales
        </a>
      </p>
    </form>
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
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

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

/** Opens shared soft-launch sign-in; successful auth loads the product studio. */
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
