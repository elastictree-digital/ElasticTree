/** Survey Studio — quantitative survey programming & fielding (Elastic Tree). */

export const SURVEY_STUDIO_URL =
  process.env.NEXT_PUBLIC_SURVEY_STUDIO_URL ??
  "https://survey-studio.up.railway.app";

export const surveyStudioStats = [
  { val: "Draft → Field", label: "Native ET surveys", accent: "#e8a820" },
  { val: "AI assist", label: "Questionnaire & translate", accent: "#38bdf8" },
  { val: "Public link", label: "Collector + quotas", accent: "#2dd4bf" },
] as const;

export const surveyStudioWorkflow = [
  {
    step: "01",
    title: "Draft",
    desc: "Start from a brief or blank — AI questionnaire assist, question bank, and revisions.",
  },
  {
    step: "02",
    title: "Design & logic",
    desc: "Themes, piping, skip logic, quotas, investigator mode, and multi-language packs.",
  },
  {
    step: "03",
    title: "Publish & collect",
    desc: "Field on a public slug, monitor quotas, then pull completes into analysis.",
  },
] as const;

export const surveyStudioDeliverables = [
  "Survey Studio control center — list, create, duplicate, publish",
  "Builder: questions, design, logic map, fielding, preview, translations, revisions",
  "AI questionnaire draft and auto-translate (shared Claude via ET Scout)",
  "Public collector with page validation, uploads, and media",
  "Same engine as ET Scout Survey Studio — updates ship together",
] as const;

export const surveyStudioInsights = [
  {
    title: "Program without LimeSurvey lock-in",
    desc: "Native Elastic Tree surveys for programming and fielding — ready when LimeSurvey is optional.",
    accent: "#e8a820",
  },
  {
    title: "One engine, two faces",
    desc: "Employee teams use Survey Studio inside ET Scout; customers open the same engine from Studio SSO.",
    accent: "#38bdf8",
  },
  {
    title: "From brief to live link",
    desc: "Draft, validate runtime logic, publish, and share a collector URL in one workspace.",
    accent: "#2dd4bf",
  },
] as const;

export const surveyStudioApplications = [
  {
    title: "Concept & usage tests",
    desc: "Program multi-block questionnaires with quotas and piping",
    accent: "#e8a820",
  },
  {
    title: "Tracking waves",
    desc: "Duplicate a study, revise, and re-field with translation packs",
    accent: "#38bdf8",
  },
  {
    title: "Agency programming",
    desc: "Client-ready surveys without desktop questionnaire tools",
    accent: "#2dd4bf",
  },
  {
    title: "Pilot fieldwork",
    desc: "Soft-launch collectors while the studio hub stays hidden",
    accent: "#a78bfa",
  },
] as const;

export const surveyStudioPricing = [
  {
    name: "Pilot",
    price: "Quote",
    period: "",
    blurb: "Test-phase access for Elastic Tree customers — contact for unlock.",
    features: [
      "Survey Studio programming & fielding",
      "Studio SSO (same email as other products)",
      "AI draft & translate (fair use)",
      "Hidden hub · not in public nav",
    ],
    cta: "Contact for pilot",
    highlighted: true,
  },
] as const;
