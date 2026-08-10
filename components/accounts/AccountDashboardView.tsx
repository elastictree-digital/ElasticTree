import Link from "next/link";
import type { AccountDashboard } from "@/lib/accounts/dashboard";
import AccountSignOutButton from "@/components/accounts/AccountSignOutButton";

function accessTone(access: AccountDashboard["tools"][number]["access"]): string {
  if (access === "full") return "text-[var(--teal)]";
  if (access === "active") return "text-[var(--amber)]";
  return "text-slate-500";
}

export default function AccountDashboardView({ data }: { data: AccountDashboard }) {
  const displayName = data.name?.trim() || data.email.split("@")[0];

  return (
    <div className="page-content max-w-3xl mx-auto section-py-compact">
      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--teal)] mb-3">
        Elastic Tree Accounts · Private
      </p>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-black text-display-md text-white mb-2">
            {displayName}
          </h1>
          <p className="text-body-sm text-slate-400">
            {data.email}
            {data.isEmployee ? (
              <span className="ml-2 text-[var(--teal)]">· Staff full access</span>
            ) : null}
          </p>
        </div>
        <AccountSignOutButton />
      </div>

      <section className="mb-10">
        <h2 className="font-display font-bold text-white text-lg mb-2">Plans</h2>
        <p className="text-body-sm text-slate-400 mb-4">
          Derived from PayU purchases on this email
          {data.isEmployee ? " plus Workspace staff entitlements" : ""}. Studio
          pilots stay off the main site until rollout.
        </p>
        {data.activePlanLines.length > 0 ? (
          <ul className="space-y-2 text-sm text-slate-200">
            {data.activePlanLines.map((line) => (
              <li
                key={line}
                className="border-b border-white/10 pb-2 last:border-0 last:pb-0"
              >
                {line}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            No active plans yet. Checkout uses the same email as this account.
          </p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="font-display font-bold text-white text-lg mb-2">Tools</h2>
        <p className="text-body-sm text-slate-400 mb-4">
          Open a studio you can use. Products without a plan stay locked here until
          purchase or staff grant.
        </p>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {data.tools.map((tool) => {
            const canOpen = tool.access !== "none";
            return (
              <li
                key={tool.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display font-bold text-white">{tool.name}</span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-[0.12em] ${accessTone(tool.access)}`}
                    >
                      {tool.accessLabel}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{tool.blurb}</p>
                  <p className="text-xs text-slate-500 mt-1">{tool.planSummary}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {tool.overviewHref ? (
                    <Link href={tool.overviewHref} className="btn-secondary text-sm">
                      Overview
                    </Link>
                  ) : null}
                  {canOpen ? (
                    <a href={tool.openHref} className="btn-primary text-sm">
                      Open
                    </a>
                  ) : (
                    <span className="btn-secondary text-sm opacity-40 pointer-events-none">
                      Locked
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-display font-bold text-white text-lg mb-2">Invoices</h2>
        <p className="text-body-sm text-slate-400 mb-4">
          PayU receipts for this account (last 90 days). These are payment records,
          not GST tax invoices.
        </p>
        {data.invoices.length === 0 ? (
          <p className="text-sm text-slate-500">No payments recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-500 border-b border-white/10">
                  <th className="py-2 pr-3 font-normal">Date</th>
                  <th className="py-2 pr-3 font-normal">Item</th>
                  <th className="py-2 pr-3 font-normal">Amount</th>
                  <th className="py-2 pr-3 font-normal">Status</th>
                  <th className="py-2 font-normal">Txn</th>
                </tr>
              </thead>
              <tbody>
                {data.invoices.map((inv) => (
                  <tr key={inv.txnid} className="border-b border-white/5 text-slate-300">
                    <td className="py-3 pr-3 whitespace-nowrap">{inv.createdLabel}</td>
                    <td className="py-3 pr-3">
                      <span className="text-white">{inv.label}</span>
                      <span className="block text-xs text-slate-500">{inv.productName}</span>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">{inv.amountLabel}</td>
                    <td className="py-3 pr-3 whitespace-nowrap">{inv.statusLabel}</td>
                    <td className="py-3 font-mono text-xs text-slate-500 break-all">
                      {inv.mihpayid || inv.txnid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs text-slate-600">
        This page is not linked from the main site. Bookmark{" "}
        <span className="text-slate-400">/accounts</span> while products roll out.
      </p>
    </div>
  );
}
