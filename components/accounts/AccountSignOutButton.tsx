"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountSignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSignOut() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/accounts/signin?returnUrl=%2Faccounts");
      router.refresh();
    } catch {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => void onSignOut()}
      className="btn-secondary text-sm"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
