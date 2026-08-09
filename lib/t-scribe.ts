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

/** Per-unit rate card — no monthly SaaS commitment. */
export const tscribePricing = [
  {
    name: "Standard",
    price: "₹200",
    amountInr: 200,
    period: "/ audio hour",
    blurb: "Pay for the hours you transcribe — no minimum commitment.",
    features: [
      "AI transcription + edit studio",
      "Moderator / Respondent labeling",
      "Research report export",
      "TXT · SRT · DOCX · PDF",
    ],
    featured: false,
  },
  {
    name: "Volume",
    price: "₹100",
    amountInr: 100,
    period: "/ audio hour",
    blurb: "For teams processing 50+ hours per month.",
    features: [
      "₹100 / audio hour at 50+ hours/month",
      "Everything in Standard",
      "Priority turnaround on request",
    ],
    featured: true,
  },
  {
    name: "With QualView",
    price: "Included",
    amountInr: null,
    period: "",
    blurb: "Bundled with a QualView session — no separate transcription charge.",
    features: [
      "Included with QualView IDI / FGD session",
      "Same studio export pack",
      "No separate TScribe invoice line",
    ],
    featured: false,
  },
] as const;
