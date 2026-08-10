"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AccountsAuthShell from "@/components/auth/AccountsAuthShell";
import { isAllowedReturnUrl } from "@/lib/auth/return-url";

type Mode = "signin" | "register";

const ERROR_COPY: Record<string, string> = {
  AccessDenied:
    "Google signed you in, but the account handoff failed. Try again — this was a server save issue we fixed.",
  Configuration: "That sign-in option is not available yet. Use Google.",
  OAuthAccountNotLinked: "This email is already linked to another sign-in method.",
  OAuthCallback: "Google sign-in failed at callback. Try again.",
  Default: "Sign-in failed. Please try again.",
};

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.1.1 6.2 5.2C39.2 37.1 44 32 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}

export default function AccountsSignInClient() {
  const params = useSearchParams();
  const router = useRouter();
  const returnUrlRaw = params.get("returnUrl") || "/accounts";
  const returnUrl = isAllowedReturnUrl(returnUrlRaw) ? returnUrlRaw : "/accounts";
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    const code = params.get("error");
    if (!code) return;
    setError(ERROR_COPY[code] || ERROR_COPY.Default);
    setEmailOpen(true);
    // Drop stale error from the URL so a refresh doesn't re-show it
    const next = new URLSearchParams(params.toString());
    next.delete("error");
    const qs = next.toString();
    router.replace(qs ? `/accounts/signin?${qs}` : "/accounts/signin");
  }, [params, router]);

  const callbackUrl = useMemo(() => {
    try {
      if (returnUrl.startsWith("/") && !returnUrl.startsWith("//")) {
        return returnUrl;
      }
      const site = window.location.origin;
      return `${site}/api/auth/bridge?returnUrl=${encodeURIComponent(returnUrl)}`;
    } catch {
      return "/accounts";
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

  function onGoogle() {
    setBusy(true);
    setError(null);
    void signIn("google", { callbackUrl });
  }

  return (
    <AccountsAuthShell
      footer={
        <>
          Use the same email as PayU checkout.
          {" · "}
          <Link href="/privacy" className="text-slate-400 hover:text-[var(--amber)] transition-colors">
            Privacy
          </Link>
        </>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-8"
      >
        <p className="font-display text-2xl text-white/90 tracking-tight leading-snug">
          Sign in
        </p>

        <AnimatePresence>
          {error ? (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm leading-relaxed text-[#f5a8a0] -mt-2"
              role="alert"
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          disabled={busy}
          onClick={onGoogle}
          className="btn-primary btn-glow w-full justify-center text-base py-4"
        >
          <GoogleMark />
          {busy ? "Redirecting…" : "Continue with Google"}
        </button>

        <div className="flex items-center gap-5 py-2">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500 shrink-0">
            or email
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {!emailOpen ? (
          <button
            type="button"
            onClick={() => setEmailOpen(true)}
            className="btn-secondary w-full justify-center py-3.5"
          >
            Use email &amp; password
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-7"
          >
            <div className="flex gap-8 border-b border-white/10">
              <button
                type="button"
                className={`pb-3 text-sm leading-none transition-colors ${
                  mode === "signin"
                    ? "text-white border-b-2 border-[var(--amber)] -mb-px"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`pb-3 text-sm leading-none transition-colors ${
                  mode === "register"
                    ? "text-white border-b-2 border-[var(--amber)] -mb-px"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                onClick={() => setMode("register")}
              >
                Create account
              </button>
            </div>

            <form onSubmit={onCredentials} className="flex flex-col gap-6">
              {mode === "register" && (
                <label className="block text-left">
                  <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="accounts-auth-input mt-3"
                    autoComplete="name"
                  />
                </label>
              )}
              <label className="block text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="accounts-auth-input mt-3"
                  autoComplete="email"
                />
              </label>
              <label className="block text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-slate-500">
                  Password
                </span>
                <input
                  required
                  type="password"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="accounts-auth-input mt-3"
                  autoComplete={mode === "register" ? "new-password" : "current-password"}
                />
              </label>

              <button
                type="submit"
                disabled={busy}
                className="btn-secondary w-full justify-center py-3.5 mt-1"
              >
                {busy
                  ? "Please wait…"
                  : mode === "signin"
                    ? "Sign in with email"
                    : "Create account"}
              </button>
            </form>

            {mode === "signin" ? (
              <p className="text-center text-sm text-slate-500 pt-1">
                <Link
                  href="/accounts/forgot-password"
                  className="text-[var(--teal)] hover:text-[var(--teal-bright)] transition-colors"
                >
                  Forgot password?
                </Link>
              </p>
            ) : null}
          </motion.div>
        )}
      </motion.div>
    </AccountsAuthShell>
  );
}
