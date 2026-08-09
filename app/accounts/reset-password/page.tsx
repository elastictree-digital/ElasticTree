import { Suspense } from "react";
import type { Metadata } from "next";
import ResetPasswordClient from "@/components/auth/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="page-content section-py-compact text-center text-slate-400">
          Loading…
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
