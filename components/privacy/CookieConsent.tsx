"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "et-cookie-consent-v1";

type ConsentChoice = "accepted" | "essential";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: ConsentChoice) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore quota / private mode */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[180] p-4 sm:p-6 pointer-events-none"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-white/[0.1] bg-[#0c1a38]/95 backdrop-blur-md p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <p className="font-display font-semibold text-white text-base mb-2">Cookies</p>
        <p className="text-body-sm text-slate-300 mb-4 leading-relaxed">
          We use essential cookies for Soft Launch access and security. Optional analytics
          cookies are used only if you accept. See our{" "}
          <Link href="/privacy#cookies" className="text-[var(--amber)] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="btn-secondary !py-2.5 !px-4 justify-center text-sm"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-primary !py-2.5 !px-4 justify-center text-sm"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
