"use client";

import { FormEvent, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Mode = "signin" | "register";

export default function AccountsSignInClient() {
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl") || "/";
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const callbackUrl = useMemo(() => {
    try {
      // Prefer bridge so studios get et_bridge code when needed
      const site = window.location.origin;
      return `${site}/api/auth/bridge?returnUrl=${encodeURIComponent(returnUrl)}`;
    } catch {
      return returnUrl;
    }
  }, [returnUrl]);

  async function onCredentials(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Registration failed");
      }
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (result?.error) throw new Error("Invalid email or password");
      window.location.href = callbackUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(false);
    }
  }

  function social(provider: "google" | "microsoft-entra-id" | "linkedin") {
    setBusy(true);
    void signIn(provider, { callbackUrl });
  }

  return (
    <div className="page-content max-w-md mx-auto section-py-compact">
      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--teal)] mb-3">
        Elastic Tree Accounts
      </p>
      <h1 className="font-display font-black text-display-md text-white mb-2">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="text-body-sm text-slate-400 mb-6">
        One login for TScribe, QualView, AI Gaze, Ethos Pulse, and DataWiz. Use the same email
        as PayU checkout.
      </p>

      <div className="space-y-2 mb-6">
        <button
          type="button"
          disabled={busy}
          onClick={() => social("google")}
          className="btn-secondary w-full justify-center"
        >
          Continue with Google
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => social("microsoft-entra-id")}
          className="btn-secondary w-full justify-center"
        >
          Continue with Microsoft
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => social("linkedin")}
          className="btn-secondary w-full justify-center"
        >
          Continue with LinkedIn
        </button>
      </div>

      <div className="relative my-6 text-center">
        <span className="text-xs text-slate-500 bg-[var(--navy,#0a1f4a)] px-2 relative z-10">
          or email
        </span>
        <div className="absolute inset-x-0 top-1/2 border-t border-white/10 -z-0" />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          className={`flex-1 text-sm py-2 rounded-lg ${
            mode === "signin" ? "bg-white/10 text-white" : "text-slate-400"
          }`}
          onClick={() => setMode("signin")}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`flex-1 text-sm py-2 rounded-lg ${
            mode === "register" ? "bg-white/10 text-white" : "text-slate-400"
          }`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <form onSubmit={onCredentials} className="space-y-3">
        {mode === "register" && (
          <label className="block text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400">
              Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a1f4a]/60 px-3 py-2.5 text-white text-sm outline-none focus:border-[var(--amber)]/60"
            />
          </label>
        )}
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
        <label className="block text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400">
            Password
          </span>
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a1f4a]/60 px-3 py-2.5 text-white text-sm outline-none focus:border-[var(--amber)]/60"
            autoComplete={mode === "register" ? "new-password" : "current-password"}
          />
        </label>
        {error && (
          <p className="text-sm text-rose-300" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className="btn-primary btn-glow w-full justify-center">
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="text-center text-xs text-slate-500 mt-5">
        <Link href="/accounts/forgot-password" className="text-[var(--amber)] hover:underline">
          Forgot password?
        </Link>
        {" · "}
        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>
      </p>
    </div>
  );
}
