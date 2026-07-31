/** DataWiz — crosstab analysis studio (Elastic Tree). */

export const DATAWIZ_STUDIO_URL =
  process.env.NEXT_PUBLIC_DATAWIZ_STUDIO_URL ??
  "https://www.elastictree.com/datawiz";

export const datawizStats = [
  { val: "Stub × Banner", label: "Research-grade tables", accent: "#e8a820" },
  { val: "90 / 95 / 99", label: "Column-letter significance", accent: "#38bdf8" },
  { val: "Excel packs", label: "Index + sig footnotes", accent: "#2dd4bf" },
] as const;

export const datawizWorkflow = [
  {
    step: "01",
    title: "Project library",
    desc: "Organize studies in projects and folders — same studio rhythm as TScribe and QualView.",
  },
  {
    step: "02",
    title: "Upload & prepare",
    desc: "Infer schema, run QC, build T2B / B2B nets, wrangle columns, save derived datasets.",
  },
  {
    step: "03",
    title: "Analyze & export",
    desc: "Nested banners, bases, weights, heatmap scan — then multi-sheet Excel for the client pack.",
  },
] as const;

export const datawizDeliverables = [
  "Project & folder library (TScribe / QualView-style studio)",
  "Upload CSV / Excel into a selected project",
  "Prepare: QC checks, custom nets (T2B / B2B), wrangle & save derived datasets",
  "Stub × banner crosstabs with nested layers and significance",
  "Re-run analysis on prepared datasets in the same project",
  "Excel export and recent analysis history",
] as const;

export const datawizInsights = [
  {
    title: "Quant tables without SPSS overhead",
    desc: "Build professional stub × banner books from uploaded data — nested breaks, bases, and letter sig in one workspace.",
    accent: "#e8a820",
  },
  {
    title: "Research-grade inference",
    desc: "Two-proportion z-tests with classic column letters, weighted counts, and unweighted bases — footnotes clients recognize.",
    accent: "#38bdf8",
  },
  {
    title: "From file to Excel pack",
    desc: "Run dozens of tables, heatmap for scanning, export multi-sheet workbooks with an index and sig notes.",
    accent: "#2dd4bf",
  },
] as const;

export const datawizApplications = [
  {
    title: "Brand & usage tables",
    desc: "Preference, awareness, and consideration by segment banners",
    accent: "#e8a820",
  },
  {
    title: "Tracking / waves",
    desc: "Break by wave or market; compare bases and percentages fast",
    accent: "#38bdf8",
  },
  {
    title: "Concept & claim tests",
    desc: "Scale means, Top 2 Box, and significance across cells",
    accent: "#2dd4bf",
  },
  {
    title: "Agency delivery",
    desc: "Client-ready banner books without desktop stats software",
    accent: "#a78bfa",
  },
  {
    title: "Insight teams",
    desc: "Self-serve crosstabs on coded datasets between SPSS runs",
    accent: "#f5c842",
  },
  {
    title: "Pilot / RFP demos",
    desc: "Show nested banners and Excel export on sample survey files",
    accent: "#5eead4",
  },
] as const;

export const datawizPricing = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    blurb: "Try crosstabs on your own files.",
    features: [
      "1 dataset · up to 5,000 rows",
      "Stub × banner tables",
      "Column % and counts",
      "1 banner layer",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ month",
    blurb: "Full Quant crosstab toolkit for researchers.",
    features: [
      "10 datasets · up to 100,000 rows",
      "Nested banner layers",
      "Column-letter significance",
      "Weighting + base modes",
      "Summary stats · Excel export",
    ],
    featured: true,
  },
  {
    name: "Team",
    price: "$149",
    period: "/ month",
    blurb: "Shared research workflows and larger books.",
    features: [
      "50 datasets · up to 500,000 rows",
      "Everything in Pro",
      "RIM weights · analysis plans",
      "PDF / PPT export · shared presets",
      "Up to 10 seats",
    ],
    featured: false,
  },
] as const;
