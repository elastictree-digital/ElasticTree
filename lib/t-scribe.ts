/** ETScribe™ — research transcription product (Elastic Tree). */

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

export const tscribePricing = [
  {
    name: "Starter",
    price: "₹2,999",
    period: "/ month",
    blurb: "For solo researchers and small insight teams.",
    features: [
      "5 hours audio / month",
      "Moderator / Respondent labeling",
      "Projects & folders",
      "Full research report",
      "TXT · SRT · DOCX · PDF",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹7,999",
    period: "/ month",
    blurb: "For agencies and multi-market fieldwork.",
    features: [
      "25 hours audio / month",
      "Everything in Starter",
      "FGD multi-respondent roles",
      "Multi-language reports",
      "Priority support · 3 seats",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "from ₹19,999/mo",
    blurb: "For high-volume studies, SLAs, and white-label.",
    features: [
      "High-volume / unlimited hours",
      "Team seats & SSO (on request)",
      "White-label PDF branding",
      "API / batch workflow options",
      "Dedicated Elastic Tree researcher",
    ],
    featured: false,
  },
] as const;
