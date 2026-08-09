import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment failed | Elastic Tree",
  robots: { index: false, follow: false },
};

export default async function CheckoutFailurePage({
  searchParams,
}: {
  searchParams: Promise<{ txnid?: string; sku?: string; product?: string }>;
}) {
  const params = await searchParams;
  const retryHref =
    params.product === "tscribe"
      ? "/t-scribe#pricing"
      : params.product === "aigaze"
        ? "/ai-gaze#pricing"
        : params.product === "qualview"
          ? "/Qual-view#pricing"
          : params.product === "ethos"
            ? "/Ethos-pulse#pricing"
            : "/contact";

  return (
    <div className="page-content max-w-lg mx-auto section-py-compact section-stack-sm text-center">
      <XCircle className="mx-auto text-rose-400" size={40} aria-hidden />
      <h1 className="font-display font-black text-display-md text-white">Payment not completed</h1>
      <p className="text-lead">
        No charge was applied for a completed plan unlock. You can retry checkout or contact us.
      </p>
      {params.txnid && (
        <p className="text-body-sm text-slate-500 font-mono break-all">Ref {params.txnid}</p>
      )}
      <div className="flex flex-wrap gap-3 justify-center pt-2">
        <Link href={retryHref} className="btn-primary btn-glow">
          Try again
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact
        </Link>
      </div>
    </div>
  );
}
