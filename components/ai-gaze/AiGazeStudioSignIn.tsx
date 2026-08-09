"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { AI_GAZE_STUDIO_URL } from "@/lib/ai-gaze";

export function openAiGazeDashboard() {
  const url = new URL(AI_GAZE_STUDIO_URL);
  url.searchParams.set("signin", "1");
  window.location.assign(url.toString());
}

export function AiGazeSignInForm({
  onSuccess,
}: {
  onSuccess?: () => void;
  inputId?: string;
}) {
  function go() {
    onSuccess?.();
    openAiGazeDashboard();
  }

  return (
    <div className="w-full">
      <p className="font-display font-bold text-lg text-white mb-1">
        Sign in to AI Gaze Studio
      </p>
      <p className="text-body-sm text-slate-400 mb-5">
        Sign in with your email and password on the studio — same access pattern as
        DataWiz, QualView, and TScribe.
      </p>

      <button
        type="button"
        onClick={go}
        className="btn-primary btn-glow w-full justify-center"
      >
        Continue →
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
        <a
          href="/privacy"
          className="text-slate-400 hover:text-[var(--amber)] hover:underline"
        >
          Privacy
        </a>
      </p>
    </div>
  );
}

export function AiGazeSignInModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#0a1f4a]/80 backdrop-blur-sm"
        aria-label="Close sign in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-gaze-signin-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#103466] p-6 sm:p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <h2 id="ai-gaze-signin-title" className="sr-only">
          Sign in to AI Gaze Studio
        </h2>
        <AiGazeSignInForm onSuccess={onClose} />
      </div>
    </div>
  );
}
