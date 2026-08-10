"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import AccountsAuthShell from "@/components/auth/AccountsAuthShell";

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
    <AccountsAuthShell
      footer={
        <Link href="/accounts/signin" className="text-[var(--teal)] hover:text-[var(--teal-bright)]">
          Back to sign in
        </Link>
      }
    >
      <p className="font-display text-xl text-white/90 tracking-tight mb-2">Forgot password</p>
      <p className="text-sm text-slate-400 mb-6">
        Enter your account email and we&apos;ll send a reset link.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="accounts-auth-input mt-1.5"
            autoComplete="email"
          />
        </label>
        {error && (
          <p className="text-sm text-[#f5a8a0]" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="text-sm text-[var(--teal-bright)]" role="status">
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
    </AccountsAuthShell>
  );
}
