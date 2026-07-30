/** QualView — live qualitative viewing room (Elastic Tree). Hidden pilot. */

export const QUALVIEW_STUDIO_URL =
  process.env.NEXT_PUBLIC_QUALVIEW_STUDIO_URL ??
  "https://www.elastictree.com/qualview";

export const qualviewStats = [
  { val: "5 min", label: "Free trial live time", accent: "#e8a820" },
  { val: "DI / FGD", label: "Moderator · Respondent · Observer", accent: "#2dd4bf" },
  { val: "Live", label: "Transcript + engagement", accent: "#38bdf8" },
  { val: "PPTX", label: "ET Master Template debrief", accent: "#a78bfa" },
] as const;

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

export const qualviewPricing = [
  {
    name: "Starter",
    price: "₹2,999",
    period: "/ month",
    blurb: "For solo moderators and small insight teams.",
    features: [
      "5 hours live room / month",
      "Trial rooms (5 min) for demos",
      "DI + observer links",
      "Live transcript + engagement",
      "ET PPTX + transcript export",
      "Email support · 1 seat",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "₹7,999",
    period: "/ month",
    blurb: "For agencies and multi-market qualitative fieldwork.",
    features: [
      "25 hours live room / month",
      "Everything in Starter",
      "FGD multi-respondent rooms",
      "Session recording egress",
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
      "White-label PPTX branding",
      "Dedicated Elastic Tree researcher",
      "SLA & private deployment options",
    ],
    featured: false,
  },
] as const;
