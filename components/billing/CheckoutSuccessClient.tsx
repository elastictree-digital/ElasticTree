"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

type OrderStatus = "unknown" | "created" | "success" | "failure" | "fulfilled" | "fulfill_failed";

export default function CheckoutSuccessClient() {
  const params = useSearchParams();
  const txnid = params.get("txnid") ?? "";
  const email = params.get("email") ?? "";
  const label = params.get("label") ?? "your plan";
  const studio = params.get("studio") ?? "/";
  const [status, setStatus] = useState<OrderStatus>("unknown");

  useEffect(() => {
    if (!txnid) return;
    let cancelled = false;
    let attempts = 0;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(`/api/payu/status?txnid=${encodeURIComponent(txnid)}`);
        const data = (await res.json()) as { status?: OrderStatus };
        if (!cancelled && data.status) setStatus(data.status);
        if (
          !cancelled &&
          data.status !== "fulfilled" &&
          data.status !== "fulfill_failed" &&
          data.status !== "failure" &&
          attempts < 12
        ) {
          setTimeout(poll, 1500);
        }
      } catch {
        if (!cancelled && attempts < 12) setTimeout(poll, 1500);
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [txnid]);

  const ready = status === "fulfilled" || status === "success";
  const failed = status === "fulfill_failed";

  return (
    <div className="page-content max-w-lg mx-auto section-py-compact section-stack-sm text-center">
      {ready ? (
        <CheckCircle2 className="mx-auto text-[var(--teal)]" size={40} aria-hidden />
      ) : failed ? (
        <CheckCircle2 className="mx-auto text-[var(--amber)]" size={40} aria-hidden />
      ) : (
        <Loader2 className="mx-auto text-[var(--amber)] animate-spin" size={40} aria-hidden />
      )}
      <h1 className="font-display font-black text-display-md text-white">
        {ready ? "Payment received" : failed ? "Payment received — activating" : "Confirming payment"}
      </h1>
      <p className="text-lead">
        {ready
          ? `${label} is unlocked for ${email || "your account"}. Sign in to the studio with that same Elastic Tree SSO email.`
          : failed
            ? "Payment succeeded but studio activation needs a moment. Contact support if access is missing after sign-in."
            : "PayU is confirming your payment. This usually takes a few seconds."}
      </p>
      {txnid && (
        <p className="text-body-sm text-slate-500 font-mono break-all">Order {txnid}</p>
      )}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <a
          href={
            process.env.NEXT_PUBLIC_ET_SSO === "1"
              ? `/accounts/signin?returnUrl=${encodeURIComponent(studio)}`
              : `${studio}${studio.includes("?") ? "&" : "?"}signin=1`
          }
          className="btn-primary btn-glow"
        >
          Launch Studio
        </a>
        <Link href="/" className="btn-secondary">
          Back home
        </Link>
      </div>
    </div>
  );
}
