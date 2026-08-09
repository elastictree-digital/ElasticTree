import { Suspense } from "react";
import type { Metadata } from "next";
import CheckoutSuccessClient from "@/components/billing/CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Payment success | Elastic Tree",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="page-content max-w-lg mx-auto section-py-compact text-center text-slate-400">
          Loading…
        </div>
      }
    >
      <CheckoutSuccessClient />
    </Suspense>
  );
}
