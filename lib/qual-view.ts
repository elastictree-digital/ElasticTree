/** QualView — live qualitative viewing room (Elastic Tree). */

export const QUALVIEW_STUDIO_URL =
  process.env.NEXT_PUBLIC_QUALVIEW_STUDIO_URL ??
  "https://www.elastictree.com/qualview";

export const qualviewDeliverables = [
  "Live WebRTC viewing room for moderator, respondents, and client observers",
  "Per-speaker live transcription with Moderator / Respondent labels",
  "On-device engagement overlays (presence, attention, affect proxy)",
  "5-minute trial rooms for demos",
  "Elastic Tree Master Template 2025 consulting PPTX",
  "Transcript export TXT · SRT · DOCX",
] as const;

export const qualviewInsights = [
  {
    title: "A real viewing room",
    desc: "Clients observe live without publishing camera or mic — the same dynamic as a physical facility.",
    accent: "#e8a820",
  },
  {
    title: "Capture while you moderate",
    desc: "Live transcript and engagement chips run in-session so debrief starts the moment you end.",
    accent: "#38bdf8",
  },
  {
    title: "Decks that look like Elastic Tree",
    desc: "Dense consulting PPTX in navy / gold / tree-ring — ready for client workshops.",
    accent: "#2dd4bf",
  },
] as const;

export const qualviewApplications = [
  {
    title: "Depth interviews",
    desc: "1:1 online DIs with moderator control and client observers",
    accent: "#e8a820",
  },
  {
    title: "Focus groups",
    desc: "Multi-respondent FGDs with numbered respondent tiles",
    accent: "#38bdf8",
  },
  {
    title: "Client viewing",
    desc: "Stakeholders watch live without joining the conversation",
    accent: "#2dd4bf",
  },
  {
    title: "Agency delivery",
    desc: "Same-day PPTX debrief in Elastic Tree template language",
    accent: "#a78bfa",
  },
  {
    title: "Pilot / demo rooms",
    desc: "5-minute trial sessions to show the product before full fieldwork",
    accent: "#f5c842",
  },
  {
    title: "Insight teams",
    desc: "Run and archive live qual without juggling Zoom + TurboScribe + PowerPoint",
    accent: "#5eead4",
  },
] as const;

/** Per-session rate card — launching soon. */
export const qualviewPricing = [
  {
    name: "IDI session",
    price: "₹2,000",
    amountInr: 2000,
    period: "/ interview",
    blurb: "1-on-1 interview with live room + transcription.",
    features: [
      "1-on-1 interview room",
      "Live transcription included",
      "Observer links for clients",
      "Transcript export",
    ],
    featured: false,
  },
  {
    name: "FGD session",
    price: "₹6,500",
    amountInr: 6500,
    period: "/ session",
    blurb: "Focus group for up to 8 participants.",
    features: [
      "Up to 8 participants",
      "Live viewing room + transcript",
      "TScribe included (no separate charge)",
      "Session export pack",
    ],
    featured: true,
  },
  {
    name: "End report add-on",
    price: "₹5,000",
    amountInr: 5000,
    period: "/ project",
    blurb: "Consolidated end-of-project report across sessions.",
    features: [
      "End-of-project consolidated report",
      "Themes, quotes, and narrative",
      "ET consulting delivery style",
    ],
    featured: false,
  },
] as const;
