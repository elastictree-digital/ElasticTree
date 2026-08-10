import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { buildAccountDashboard } from "@/lib/accounts/dashboard";
import AccountDashboardView from "@/components/accounts/AccountDashboardView";

export const metadata: Metadata = {
  title: "My account",
  description: "Elastic Tree account — plans, tool access, and PayU invoices.",
  robots: { index: false, follow: false },
};

export default async function AccountsPage() {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  if (!email) {
    redirect("/accounts/signin?returnUrl=%2Faccounts");
  }

  const data = await buildAccountDashboard({
    email,
    name: session?.user?.name ?? null,
  });

  return <AccountDashboardView data={data} />;
}
