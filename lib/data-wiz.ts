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
  "Prepare: QC, arbitrary nets, question groups, RIM weights",
  "Analysis plans — save, import/export JSON, batch run all stubs",
  "Nested banners with live header preview · row nest · filter trees",
  "χ², means tests, FDR, effective-n significance · wave compare · Excel packs",
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

/** Per-dataset rate card — launching soon. */
export const datawizPricing = [
  {
    name: "Cross-tab analysis",
    price: "₹8,000",
    amountInr: 8000,
    period: "/ dataset",
    blurb: "Full stub × banner book with significance testing included.",
    features: [
      "Cross-tab analysis per dataset",
      "Significance testing included",
      "Excel export pack",
      "Quote scales with sample size & variable count",
    ],
    featured: true,
  },
  {
    name: "Dashboard extension",
    price: "+₹7,000",
    amountInr: 7000,
    period: "(₹15,000 total)",
    blurb: "Add an interactive dashboard on top of the crosstab delivery.",
    features: [
      "Interactive dashboard extension",
      "₹15,000 total with crosstabs",
      "Client-ready exploration layer",
    ],
    featured: false,
  },
  {
    name: "Custom / large books",
    price: "Custom",
    amountInr: null,
    period: "quote",
    blurb: "Final quote confirmed after reviewing your questionnaire.",
    features: [
      "Rate scales with sample size and variable count",
      "Multi-wave / multi-market books",
      "Dedicated analyst option",
    ],
    featured: false,
  },
] as const;
