import { AI_GAZE_STUDIO_URL } from "@/lib/ai-gaze";
import { DATAWIZ_STUDIO_URL } from "@/lib/data-wiz";
import { ETHOS_PULSE_STUDIO_URL } from "@/lib/ethos-pulse";
import { QUALVIEW_STUDIO_URL } from "@/lib/qual-view";
import { SURVEY_STUDIO_URL } from "@/lib/survey-studio";
import { TABLE_SHARE_DEMO_URL } from "@/lib/table-share";
import { TSCRIBE_STUDIO_URL } from "@/lib/t-scribe";

/** Product id passed to ProductStudioLink / SSO gate. */
export type StudioLaunchProduct =
  | "ai-gaze"
  | "datawiz"
  | "qualview"
  | "tscribe"
  | "ethos-pulse"
  | "survey-studio";

export type StudioProductStatus = "live" | "pilot" | "soon";

export type StudioProduct = {
  id: string;
  name: string;
  mark?: "™" | "®";
  category: string;
  blurb: string;
  accent: string;
  status: StudioProductStatus;
  /** Marketing / overview page on elastictree.com */
  overviewHref?: string;
  /** Opens via ProductStudioLink (SSO / studio sign-in). */
  launch?: {
    product: StudioLaunchProduct;
    studioUrl: string;
    label?: string;
  };
  /** Direct external open (no SSO gate) — e.g. Table Share demo. */
  external?: {
    href: string;
    label: string;
  };
};

/** Customer-facing studios on elastictree.com (hidden hub — test phase). */
export const studioProducts: StudioProduct[] = [
  {
    id: "survey-studio",
    name: "Survey Studio",
    mark: "™",
    category: "Quantitative · Programming",
    blurb:
      "Draft, design, translate, and field native Elastic Tree surveys — same engine as ET Scout Survey Studio.",
    accent: "#e8a820",
    status: "pilot",
    overviewHref: "/survey-studio",
    launch: {
      product: "survey-studio",
      studioUrl: SURVEY_STUDIO_URL,
    },
  },
  {
    id: "ai-gaze",
    name: "AI Gaze",
    mark: "™",
    category: "Attention · Eye tracking",
    blurb:
      "Predictive eye tracking for packs, shelves, and ads — heat maps, gaze path, and branded reports without hardware.",
    accent: "#e8a820",
    status: "pilot",
    overviewHref: "/ai-gaze",
    launch: {
      product: "ai-gaze",
      studioUrl: AI_GAZE_STUDIO_URL,
    },
  },
  {
    id: "tscribe",
    name: "TScribe",
    mark: "™",
    category: "Qualitative · Transcription",
    blurb:
      "Research-grade transcription for DIs and FGDs — Whisper, Moderator / Respondent roles, editable studios, and export.",
    accent: "#2dd4bf",
    status: "pilot",
    overviewHref: "/t-scribe",
    launch: {
      product: "tscribe",
      studioUrl: TSCRIBE_STUDIO_URL,
    },
  },
  {
    id: "qualview",
    name: "QualView",
    mark: "™",
    category: "Qualitative · Live rooms",
    blurb:
      "Live FGD / IDI viewing rooms — moderator, respondents, observers, transcript, and Elastic Tree–ready reports.",
    accent: "#38bdf8",
    status: "soon",
    overviewHref: "/Qual-view",
    launch: {
      product: "qualview",
      studioUrl: QUALVIEW_STUDIO_URL,
    },
  },
  {
    id: "datawiz",
    name: "DataWiz",
    category: "Quantitative · Crosstabs",
    blurb:
      "Stub × banner crosstab studio with nested breaks, significance testing, weighting, and Excel packs.",
    accent: "#a78bfa",
    status: "soon",
    overviewHref: "/data-wiz",
    launch: {
      product: "datawiz",
      studioUrl: DATAWIZ_STUDIO_URL,
    },
  },
  {
    id: "ethos-pulse",
    name: "Ethos Pulse",
    mark: "™",
    category: "People · Engagement",
    blurb:
      "Employee satisfaction surveys with loyalty dashboards, cohort views, and manager scorecards.",
    accent: "#fb923c",
    status: "pilot",
    overviewHref: "/Ethos-pulse",
    launch: {
      product: "ethos-pulse",
      studioUrl: ETHOS_PULSE_STUDIO_URL,
      label: "Launch Ethos Pulse",
    },
  },
  {
    id: "table-share",
    name: "Table Share",
    mark: "®",
    category: "Syndicated · Food intelligence",
    blurb:
      "Dish-level eating behaviour across urban India — mapped by occasion, effort, and frequency.",
    accent: "#8b5cf6",
    status: "live",
    overviewHref: "/table-share",
    external: {
      href: TABLE_SHARE_DEMO_URL,
      label: "Open demo",
    },
  },
];

export const studioStatusLabel: Record<StudioProductStatus, string> = {
  live: "Live",
  pilot: "Pilot",
  soon: "Launching soon",
};
