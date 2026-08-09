"use client";

import { useEffect, useId, useState } from "react";
import { Loader2, X } from "lucide-react";
import { formatInr, type BillingPeriod, type BillingProduct } from "@/lib/billing/catalog";

type CreateResponse = {
  ok?: boolean;
  error?: string;
  paymentUrl?: string;
  fields?: Record<string, string>;
  label?: string;
  amountInr?: number;
};

type Props = {
  sku: string;
  product: BillingProduct;
  planLabel: string;
  amountInr: number;
  period: BillingPeriod;
  variant?: "primary" | "secondary";
  className?: string;
  label?: string;
};

export default function PayUCheckoutButton({
  sku,
  product,
  planLabel,
  amountInr,
  period,
  variant = "primary",
  className = "",
  label,
}: Props) {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleId = useId();
  const formId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const variantClass = variant === "primary" ? "btn-primary btn-glow" : "btn-secondary";
  const cta =
    label ??
    (period === "yearly" ? `Pay ${formatInr(amountInr)}/yr` : `Pay ${formatInr(amountInr)}/mo`);

  async function startCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/payu/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku, firstname, email, phone }),
      });
      const data = (await res.json()) as CreateResponse;
      if (!res.ok || !data.paymentUrl || !data.fields) {
        setError(data.error ?? "Could not start checkout.");
        setBusy(false);
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.paymentUrl;
      form.style.display = "none";
      for (const [key, value] of Object.entries(data.fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch {
      setError("Network error. Please try again.");
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
        className={`${variantClass} ${className}`.trim()}
      >
        {cta}
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#0a1f4a]/85 backdrop-blur-md"
            aria-label="Close checkout"
            onClick={() => !busy && setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#103466] p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              onClick={() => !busy && setOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Close"
              disabled={busy}
            >
              <X size={18} />
            </button>

            <h2 id={titleId} className="font-display font-bold text-lg text-white mb-1">
              Checkout — {planLabel}
            </h2>
            <p className="text-body-sm text-slate-400 mb-5">
              {formatInr(amountInr)}
              {period === "yearly" ? " / year" : " / month"} prepaid via PayU. Use the same email
              for Studio sign-in so we can unlock your plan.
            </p>

            <form id={formId} onSubmit={startCheckout} className="space-y-3">
              <label className="block text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  Full name
                </span>
                <input
                  required
                  minLength={2}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a1f4a]/60 px-3 py-2.5 text-white text-sm outline-none focus:border-[var(--amber)]/60"
                  autoComplete="name"
                />
              </label>
              <label className="block text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-400">
                  Studio login email
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
                  Phone
                </span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#0a1f4a]/60 px-3 py-2.5 text-white text-sm outline-none focus:border-[var(--amber)]/60"
                  autoComplete="tel"
                  placeholder="10+ digits"
                />
              </label>

              {error && (
                <p className="text-sm text-rose-300" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="btn-primary btn-glow w-full justify-center mt-2 disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                    Redirecting to PayU…
                  </>
                ) : (
                  `Pay ${formatInr(amountInr)}`
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-4">
              Product: {product} · Secured by PayU
            </p>
          </div>
        </div>
      )}
    </>
  );
}
