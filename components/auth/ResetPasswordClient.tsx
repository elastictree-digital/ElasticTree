"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AccountsAuthShell from "@/components/auth/AccountsAuthShell";

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
    <AccountsAuthShell
      footer={
        <Link href="/accounts/signin" className="text-[var(--teal)] hover:text-[var(--teal-bright)]">
          Back to sign in
        </Link>
      }
    >
      <p className="font-display text-xl text-white/90 tracking-tight mb-4">Reset password</p>
      {!token ? (
        <p className="text-sm text-[#f5a8a0]">Missing reset token. Request a new link.</p>
      ) : done ? (
        <p className="text-sm text-[var(--teal-bright)]">
          Password updated.{" "}
          <Link href="/accounts/signin" className="text-[var(--amber)] underline">
            Sign in
          </Link>
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
              New password
            </span>
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="accounts-auth-input mt-1.5"
              autoComplete="new-password"
            />
          </label>
          {error && (
            <p className="text-sm text-[#f5a8a0]" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-primary btn-glow w-full justify-center">
            {busy ? "Saving…" : "Update password"}
          </button>
        </form>
      )}
    </AccountsAuthShell>
  );
}
