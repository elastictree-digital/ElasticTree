import { Suspense } from "react";
import type { Metadata } from "next";
import AccountsSignInClient from "@/components/auth/AccountsSignInClient";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Elastic Tree Studios with Google, Microsoft, LinkedIn, or email.",
  robots: { index: false, follow: false },
};

export default function AccountsSignInPage() {
  return (
    <Suspense
      fallback={
        <div className="page-content section-py-compact text-center text-slate-400">
          Loading…
        </div>
      }
    >
      <AccountsSignInClient />
    </Suspense>
  );
}
