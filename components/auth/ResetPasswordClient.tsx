"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Reset failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-content max-w-md mx-auto section-py-compact">
      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--teal)] mb-3">
        Elastic Tree Accounts
      </p>
      <h1 className="font-display font-black text-display-md text-white mb-2">Reset password</h1>
      {!token ? (
        <p className="text-body-sm text-rose-300">Missing reset token. Request a new link.</p>
      ) : done ? (
        <p className="text-body-sm text-teal-300 mb-4">
          Password updated.{" "}
          <Link href="/accounts/signin" className="text-[var(--amber)] underline">
            Sign in
          </Link>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3 mt-4">
          <label className="block text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400">
              New password
            </span>
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a1f4a]/60 px-3 py-2.5 text-white text-sm outline-none focus:border-[var(--amber)]/60"
              autoComplete="new-password"
            />
          </label>
          {error && (
            <p className="text-sm text-rose-300" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-primary btn-glow w-full justify-center">
            {busy ? "Saving…" : "Update password"}
          </button>
        </form>
      )}
      <p className="text-center text-xs text-slate-500 mt-5">
        <Link href="/accounts/signin" className="hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
