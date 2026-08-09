"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [devUrl, setDevUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    setDevUrl(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessage(data.message || "Check your email for a reset link.");
      if (data.devResetUrl) setDevUrl(data.devResetUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-content max-w-md mx-auto section-py-compact">
      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--teal)] mb-3">
        Elastic Tree Accounts
      </p>
      <h1 className="font-display font-black text-display-md text-white mb-2">Forgot password</h1>
      <p className="text-body-sm text-slate-400 mb-6">
        Enter your account email and we&apos;ll send a reset link.
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a1f4a]/60 px-3 py-2.5 text-white text-sm outline-none focus:border-[var(--amber)]/60"
            autoComplete="email"
          />
        </label>
        {error && (
          <p className="text-sm text-rose-300" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="text-sm text-teal-300" role="status">
            {message}
          </p>
        )}
        {devUrl && (
          <p className="text-xs text-slate-400 break-all">
            Dev reset link:{" "}
            <a href={devUrl} className="text-[var(--amber)] underline">
              {devUrl}
            </a>
          </p>
        )}
        <button type="submit" disabled={busy} className="btn-primary btn-glow w-full justify-center">
          {busy ? "Sending…" : "Send reset link"}
        </button>
      </form>
      <p className="text-center text-xs text-slate-500 mt-5">
        <Link href="/accounts/signin" className="text-[var(--amber)] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
