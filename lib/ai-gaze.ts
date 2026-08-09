/** Public studio URL for the AI Gaze™ Streamlit / SaaS app (Railway). */
export const AI_GAZE_STUDIO_URL =
  process.env.NEXT_PUBLIC_AI_GAZE_STUDIO_URL ?? "https://aigaze-production.up.railway.app";

export const aiGazeStats = [
  { val: "92%", label: "Accuracy vs lab ET", accent: "#e8a820" },
  { val: "~3s", label: "First-glance window", accent: "#2dd4bf" },
  { val: "–60%", label: "Cost vs hardware", accent: "#38bdf8" },
  { val: "24h", label: "Typical turnaround", accent: "#a78bfa" },
] as const;

export const aiGazeFeatures = [
  "Heat maps, hot spots, and gaze-path prediction",
  "Clarity score, top elements & attention balance",
  "Packaging, planogram, ads, and digital creative QA",
  "Branded PDF reports — fraction of hardware eye-tracking cost",
] as const;

export const aiGazeDeliverables = [
  "Attention heat map with calibrated scale",
  "Hot-spot tiers (HIGH / MEDIUM / LOW)",
  "Gaze sequence for the first ~3 seconds",
  "Clarity score and top attention regions",
  "Composition balance and attention hierarchy",
  "Client-ready branded PDF report",
] as const;

export const aiGazeInsights = [
  {
    title: "First glance decides",
    desc: "Pre-attentive vision in the first 3–5 seconds shapes what gets noticed — and what gets ignored.",
    accent: "#e8a820",
  },
  {
    title: "Hardware isn't always needed",
    desc: "AI Gaze™ predicts attention from visual science (edges, contrast, intensity, faces) without lab sessions.",
    accent: "#38bdf8",
  },
  {
    title: "Fix hierarchy before go-live",
    desc: "Validate packs, shelves, and ads early — move hero assets into the zones that actually get seen.",
    accent: "#2dd4bf",
  },
] as const;

export const aiGazeApplications = [
  { title: "Packaging", desc: "Pack shots, redesign QA, claim hierarchy", accent: "#e8a820" },
  { title: "Retail / Shelf", desc: "Planogram & POSM attention testing", accent: "#38bdf8" },
  { title: "Advertising", desc: "Print, OOH, digital, vehicle graphics", accent: "#2dd4bf" },
  { title: "Digital UX", desc: "Landing pages, emails, brochures", accent: "#a78bfa" },
  { title: "Logo & Brand", desc: "Symbol / lockup saliency checks", accent: "#f5c842" },
  { title: "Menus & Offers", desc: "Price, CTA, and promo visibility", accent: "#5eead4" },
] as const;

export const aiGazePricing = [
  {
    name: "Single Test",
    price: "₹4,500",
    amountInr: 4500,
    period: "/ creative",
    blurb: "One creative asset — heatmap, clarity score, and PDF report.",
    features: [
      "1 creative asset",
      "Attention heatmap + clarity score",
      "PDF report",
    ],
    featured: false,
  },
  {
    name: "Pack of 10",
    price: "₹32,000",
    amountInr: 32000,
    period: "(~₹3,200 ea.)",
    blurb: "Compare creatives across a set with shared benchmarking.",
    features: [
      "10 creative assets",
      "Comparative benchmarking across the set",
      "Heatmap + clarity for each asset",
      "PDF reports",
    ],
    featured: true,
  },
  {
    name: "Agency Retainer",
    price: "Custom",
    amountInr: null,
    period: "quote",
    blurb: "Ongoing monthly volume with priority turnaround.",
    features: [
      "Ongoing monthly volume",
      "Priority turnaround",
      "Brand-tracking over time",
    ],
    featured: false,
  },
] as const;
