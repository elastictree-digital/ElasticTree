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
    name: "Starter",
    price: "₹2,999",
    period: "/ month",
    blurb: "For freelancers and small teams testing a few creatives each month.",
    features: [
      "20 analyses / month",
      "Heat map, hot spot, gaze path",
      "Clarity & top elements",
      "PDF report export",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹7,999",
    period: "/ month",
    blurb: "For brands and agencies running regular creative & pack QA.",
    features: [
      "80 analyses / month",
      "Everything in Starter",
      "A/B variant compare",
      "Attention balance",
      "Priority support · shared seats (3)",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "from ₹19,999/mo",
    blurb: "For multi-brand teams needing volume, SLAs, and white-label.",
    features: [
      "Unlimited / high-volume credits",
      "Team seats & SSO (on request)",
      "API / batch workflow options",
      "White-label PDF branding",
      "Dedicated Elastic Tree researcher",
    ],
    featured: false,
  },
] as const;
