/** TScribe™ — research transcription product (Elastic Tree). */

export const TSCRIBE_STUDIO_URL =
  process.env.NEXT_PUBLIC_TSCRIBE_STUDIO_URL ??
  "https://www.elastictree.com/TSCRIBE";

export const tscribeStats = [
  { val: "99+", label: "Whisper languages", accent: "#e8a820" },
  { val: "DI / FGD", label: "Moderator · Respondent", accent: "#2dd4bf" },
  { val: "5 steps", label: "Project → Upload → Export", accent: "#38bdf8" },
  { val: "GPT-4o", label: "Best for Indian languages", accent: "#a78bfa" },
] as const;

export const tscribeDeliverables = [
  "Timed Whisper transcripts with edit studio",
  "Moderator / Respondent role labeling for DIs & FGDs",
  "Projects, folders, and subfolders for fieldwork",
  "GPT research reports — themes, quotes, open questions",
  "Export TXT · SRT · DOCX · PDF",
  "Multilingual + vocabulary prompts for brand terms",
] as const;

export const tscribeInsights = [
  {
    title: "Roles that match qual practice",
    desc: "Depth interviews and focus groups labeled as Moderator and Respondent — not anonymous Speaker 1 / 2.",
    accent: "#e8a820",
  },
  {
    title: "From audio to debrief",
    desc: "Create a project and folder first, then upload, edit, report, and export — without file-shuffling.",
    accent: "#38bdf8",
  },
  {
    title: "Organised like fieldwork",
    desc: "Projects and nested folders mirror waves, markets, and client studies.",
    accent: "#2dd4bf",
  },
] as const;

export const tscribeApplications = [
  { title: "Depth interviews", desc: "One-on-one DIs with clear Moderator / Respondent turns", accent: "#e8a820" },
  { title: "Focus groups", desc: "Multi-respondent FGDs with numbered Respondent labels", accent: "#38bdf8" },
  { title: "Brand & UX research", desc: "Category language, jargon prompts, multilingual fields", accent: "#2dd4bf" },
  { title: "Agency delivery", desc: "Client-ready DOCX / PDF packs from the same workflow", accent: "#a78bfa" },
  { title: "Multi-market studies", desc: "Indian and global languages on Whisper-1", accent: "#f5c842" },
  { title: "Insight teams", desc: "Library structure for waves, cohorts, and archives", accent: "#5eead4" },
] as const;

/** Hour-bank tiers — audio hours included; overage billed separately. PayU SKUs in billing/catalog. */
export const tscribePricing = [
  {
    name: "Lite",
    price: "₹275",
    amountInr: 275,
    period: "· 2 audio hours",
    blurb: "For a DI or short pilot — prepaid hour bank, 90-day expiry.",
    features: [
      "2 audio hours included",
      "AI transcription + edit studio",
      "Moderator / Respondent labeling",
      "1 research report included",
      "TXT · SRT · DOCX · PDF · English pack",
    ],
    featured: false,
    payuSku: "tscribe.starter.monthly",
    payuChargeHint: "2 audio hours · prepaid pack",
    ctaLabel: "Subscribe with PayU · ₹275",
  },
  {
    name: "Studio",
    price: "₹2,000",
    amountInr: 2000,
    period: "· 20 audio hours",
    blurb: "For fieldwork waves — full quality pipeline with report caps.",
    features: [
      "20 audio hours included",
      "Everything in Lite",
      "FGD multi-respondent roles",
      "Up to 10 research reports included",
      "Multi-language reports · extra report ₹499",
    ],
    featured: true,
    payuSku: "tscribe.growth.monthly",
    payuChargeHint: "20 audio hours · prepaid pack",
    ctaLabel: "Subscribe with PayU · ₹2,000",
  },
  {
    name: "Agency",
    price: "₹4,999",
    amountInr: 4999,
    period: "· 50 audio hours / mo",
    blurb: "For agencies and multi-market insight teams.",
    features: [
      "50 audio hours / month · 3 seats",
      "Everything in Studio",
      "Priority queue · glossary support",
      "Overage ₹150 / audio hour",
      "Scout handoff ready",
    ],
    featured: false,
    payuSku: "tscribe.agency.monthly",
    payuChargeHint: "50 audio hours / month · subscription",
    ctaLabel: "Subscribe with PayU · ₹4,999",
  },
] as const;
