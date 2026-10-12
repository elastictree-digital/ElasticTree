import { BarChart3, LayoutDashboard, PieChart, TrendingUp } from "lucide-react";
import TableShareDemoLink from "./TableShareDemoLink";

const panels = [
  { label: "Occasion share", value: "34%", trend: "+12%", accent: "#2dd4bf" },
  { label: "RTC opportunity", value: "18 dishes", trend: "High", accent: "#e8a820" },
  { label: "City index", value: "Bengaluru", trend: "Top 3", accent: "#38bdf8" },
  { label: "Effort shift", value: "−8%", trend: "Homemade", accent: "#5eead4" },
];

export default function DashboardPreview() {
  return (
    <div className="feature-card overflow-hidden p-0">
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <LayoutDashboard size={18} className="text-[var(--amber)]" aria-hidden />
          <div>
            <p className="text-title text-sm">Table Share® Dashboard</p>
            <p className="text-caption normal-case tracking-normal">Interactive demo · 400+ dishes</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption normal-case tracking-normal border border-[var(--teal)]/25 text-[var(--teal-bright)] bg-[var(--teal-dim)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
          Live preview
        </span>
      </div>

      <div className="p-5 section-stack-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {panels.map((p) => (
            <div
              key={p.label}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
            >
              <p className="text-caption normal-case tracking-normal mb-2">{p.label}</p>
              <p className="font-display font-bold text-xl" style={{ color: p.accent }}>
                {p.value}
              </p>
              <p className="text-body-sm mt-1">{p.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 min-h-[140px]">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={16} className="text-[var(--cyan)]" aria-hidden />
              <p className="text-caption normal-case tracking-normal">Dish frequency by occasion</p>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[42, 68, 55, 88, 72, 95, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#103870] to-[var(--teal)] opacity-80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 min-h-[140px]">
            <div className="flex items-center gap-2 mb-4">
              <PieChart size={16} className="text-[var(--amber)]" aria-hidden />
              <p className="text-caption normal-case tracking-normal">Source of preparation</p>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Homemade", pct: 62, color: "#2dd4bf" },
                { label: "RTC / RTE", pct: 21, color: "#e8a820" },
                { label: "Takeaway", pct: 17, color: "#38bdf8" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-body-sm mb-1">
                    <span>{row.label}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: row.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          <p className="text-body-sm flex items-center gap-2">
            <TrendingUp size={15} className="text-[var(--teal)]" aria-hidden />
            From insight to impact — explore the full interactive dashboard.
          </p>
          <TableShareDemoLink size="sm" label="Demo" />
        </div>
      </div>
    </div>
  );
}
