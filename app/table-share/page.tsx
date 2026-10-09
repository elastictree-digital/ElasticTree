import { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import OccasionIcon, { occasionVariantFromName } from "@/components/ui/icons/OccasionIcon";
import TableShareDemoLink from "@/components/table-share/TableShareDemoLink";
import DashboardPreview from "@/components/table-share/DashboardPreview";
import {
  tableShareStats,
  tableShareInsights,
  tableShareOccasions,
  tableShareBusinessUses,
  tableShareDeliverables,
  tableShareCities,
} from "@/lib/table-share";
import {
  MapPin,
  ArrowRight,
  LayoutDashboard,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Table Share® | Elastic Tree",
  description:
    "Table Share® is India's food consumption intelligence platform — 3,468 households, 16 cities, 400+ dishes. Explore the interactive dashboard demo.",
};

export default function TableSharePage() {
  return (
    <>
      <PageHero
        eyebrow="Food Consumption Intelligence"
        title={<>Table Share<span className="text-gradient-amber">®</span></>}
        subtitle="Captures real, dish-level eating behaviour across urban India — mapped by occasion, effort, and frequency."
        actions={
          <>
            <TableShareDemoLink label="Explore Demo" />
            <Link href="/contact" className="btn-secondary">
              Book a Demo <ArrowRight size={16} />
            </Link>
          </>
        }
        stats={tableShareStats.map((s) => ({
          value: s.val,
          label: s.label,
          accent: s.accent,
        }))}
      />

      <section className="section-py-compact page-content">
        <div className="content-grid-2 items-center gap-10 lg:gap-14">
          <div className="section-stack-sm">
            <SectionHeader
              label="Decision Platform"
              title="Not a static report — a living dashboard"
              subtitle="Go beyond the top 15: your gateway to 400+ dishes and behaviours. From insight to impact, the Table Share® dashboard is built to elevate your strategic agility."
              titleSize="md"
            />
            <ul className="list-spaced list-bullet">
              {tableShareDeliverables.map((item) => (
                <li key={item} className="text-body-sm">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-body-sm italic">
              Custom extensions available by category, market, or target group.
            </p>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="section-py-compact section-flow flow-tint-purple !pb-8 md:!pb-10">
        <div className="page-content">
          <SectionHeader
            label="Why Consumption"
            title="If you don't know what's eaten, you can't know what will grow"
            subtitle="Beyond availability: inform your urban market strategy with actual consumption metrics."
            className="mb-10"
          />
          <div className="content-grid-3">
            {tableShareInsights.map((item) => (
              <div key={item.title} className="feature-card">
                <h3 className="text-title mb-2" style={{ color: item.accent }}>{item.title}</h3>
                <p className="text-body-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py-compact page-content !pt-8 md:!pt-10">
        <SectionHeader
          label="Occasions"
          title="India eats 7 times a day"
          subtitle="Each occasion has different foods, needs, and competitive sets. Table Share® maps them independently — and accurately."
          className="mb-10"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-8">
          {tableShareOccasions.map((occ) => (
            <div key={occ.name} className="text-center group">
              <OccasionIcon
                variant={occasionVariantFromName(occ.name)}
                className="mb-3 mx-auto transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-title mb-1">{occ.name}</h3>
              <p className="text-body-sm">{occ.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-py-compact section-flow flow-tint-amber">
        <div className="page-content content-grid-2 items-center gap-10">
          <div className="section-stack-sm">
            <SectionHeader
              label="Source of Preparation"
              title="Where food comes from matters"
              subtitle="Homemade is still dominant — but uneven across dishes. RTC / RTE / takeaway adoption is driven by effort, not category alone."
              titleSize="md"
            />
            <p className="text-lead font-display font-semibold text-white">
              Convenience doesn't replace cooking. It replaces effort.
            </p>
            <TableShareDemoLink variant="secondary" size="sm" label="See RTC opportunities in demo" />
          </div>
          <div className="highlight-panel section-stack-sm">
            <div className="flex items-center gap-2.5">
              <UtensilsCrossed size={20} className="text-[var(--amber)]" aria-hidden />
              <p className="text-title">The innovation sweet spot</p>
            </div>
            <p className="text-body-sm">
              Identify white-space where effort is high but homemade share is declining — the signal for RTC and RTE innovation pipelines.
            </p>
          </div>
        </div>
      </section>

      <section className="section-py-compact page-content">
        <SectionHeader
          label="Volume Relevance"
          title="Why penetration isn't enough"
          subtitle="Growth follows volume relevance — not just reach. Table Share® shows which dishes and occasions drive real consumption share."
          className="mb-10"
        />
        <div className="content-grid-2 lg:grid-cols-4 gap-6">
          {tableShareBusinessUses.map((use) => (
            <div key={use.title} className="pillar-link">
              <h3 className="text-title mb-2" style={{ color: use.accent }}>{use.title}</h3>
              <p className="text-body-sm">{use.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-py-compact section-flow flow-tint-teal">
        <div className="page-content">
          <SectionHeader
            label="Geographic Reach"
            title="16 cities covered"
            subtitle="Metro, Tier 1 and Tier 2 cities — representative coverage of India's diverse urban food landscape."
            className="mb-10"
          />
          <div className="flex flex-wrap gap-2.5">
            {tableShareCities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] text-body-sm text-slate-300 hover:text-[var(--amber)] hover:border-[var(--amber)]/30 transition-colors"
              >
                <MapPin size={12} className="text-[var(--amber)] opacity-70" aria-hidden />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py-compact border-t border-white/[0.06] section-flow flow-tint-teal">
        <div className="page-content max-w-xl section-stack-sm">
          <Sparkles size={28} className="text-[var(--amber)] opacity-80" aria-hidden />
          <h2 className="font-display font-black text-display-md text-white">
            If your product isn't winning at the table, it won't win at retail.
          </h2>
          <p className="text-lead max-w-lg">
            Table Share® isn't just data — it's your roadmap to staying relevant, responsive, and ahead in India's urban food market.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <TableShareDemoLink label="Explore Demo" />
            <Link href="/contact" className="btn-secondary">
              Book a Demo <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-body-sm flex items-center gap-2">
            <LayoutDashboard size={15} className="text-[var(--teal)]" aria-hidden />
            Opens the interactive Table Share® dashboard in a new tab
          </p>
        </div>
      </section>
    </>
  );
}
