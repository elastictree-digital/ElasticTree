/** Decorative stub × banner preview for the DataWiz marketing hero. */
export default function CrosstabPreview() {
  const cols = ["Total", "Male", "Female", "18–34", "35–54"];
  const letters = ["", "A", "B", "C", "D"];
  const rows: {
    label: string;
    vals: string[];
    heat: number[];
    sig?: string[];
  }[] = [
    { label: "Base (n)", vals: ["1,240", "598", "642", "410", "520"], heat: [0, 0, 0, 0, 0] },
    {
      label: "Brand A",
      vals: ["42%", "38%", "46%", "51%", "36%"],
      heat: [0.7, 0.55, 0.85, 0.95, 0.45],
      sig: ["", "", "A", "D", ""],
    },
    {
      label: "Brand B",
      vals: ["31%", "34%", "28%", "22%", "38%"],
      heat: [0.45, 0.5, 0.35, 0.2, 0.6],
      sig: ["", "", "", "", "C"],
    },
    {
      label: "Brand C",
      vals: ["18%", "19%", "17%", "16%", "19%"],
      heat: [0.25, 0.28, 0.22, 0.2, 0.28],
      sig: ["", "", "", "", ""],
    },
    {
      label: "Other",
      vals: ["9%", "9%", "9%", "11%", "7%"],
      heat: [0.12, 0.12, 0.12, 0.15, 0.1],
      sig: ["", "", "", "", ""],
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      <div
        className="absolute -inset-4 rounded-[1.75rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(232,168,32,0.22), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(45,212,191,0.16), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[rgba(16,52,102,0.72)] shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--teal)]">
              Live banner · Preference
            </p>
            <p className="font-display text-sm font-semibold text-white mt-0.5">
              Brand consideration × Demo
            </p>
          </div>
          <span className="rounded-full border border-[rgba(232,168,32,0.35)] bg-[rgba(232,168,32,0.12)] px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--amber-light)]">
            95% sig
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-[11px]">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="sticky left-0 bg-[rgba(12,45,92,0.95)] px-3 py-2 font-medium text-slate-300">
                  Stub
                </th>
                {cols.map((c) => (
                  <th
                    key={c}
                    className="px-2.5 py-2 text-center font-semibold text-slate-200"
                  >
                    {c}
                  </th>
                ))}
              </tr>
              <tr className="border-b border-white/[0.06]">
                <th className="sticky left-0 bg-[rgba(12,45,92,0.95)] px-3 py-1" />
                {letters.map((L, i) => (
                  <th key={i} className="px-2.5 py-1 text-center text-[var(--cyan)] font-semibold">
                    {L}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr
                  key={r.label}
                  className={`border-b border-white/[0.05] ${ri === 0 ? "font-medium" : ""}`}
                >
                  <td className="sticky left-0 bg-[rgba(12,45,92,0.92)] px-3 py-2 text-slate-200 whitespace-nowrap">
                    {r.label}
                  </td>
                  {r.vals.map((v, ci) => (
                    <td
                      key={ci}
                      className="px-2.5 py-2 text-center font-mono text-slate-200"
                      style={
                        ri > 0
                          ? {
                              background: `rgba(232, 168, 32, ${0.06 + r.heat[ci] * 0.35})`,
                            }
                          : undefined
                      }
                    >
                      {v}
                      {r.sig?.[ci] ? (
                        <sup className="ml-0.5 text-[var(--cyan)] font-semibold">
                          {r.sig[ci]}
                        </sup>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-white/[0.08] px-4 py-2.5 text-[10px] text-slate-500">
          Letters mark columns significantly different · Col % · weighted counts
        </p>
      </div>
    </div>
  );
}
