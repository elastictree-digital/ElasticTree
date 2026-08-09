/** Ethos Pulse — employee engagement & satisfaction surveys (Elastic Tree). */

export const ETHOS_PULSE_STUDIO_URL =
  process.env.NEXT_PUBLIC_ETHOS_PULSE_STUDIO_URL ??
  "https://www.elastictree.com/ethos-pulse/login";

export const ethosPulsePricing = [
  {
    name: "Starter",
    planId: "starter" as const,
    price: "₹12,000",
    amountInr: 12000,
    period: "/ cycle",
    blurb: "One survey cycle for teams up to 100 employees.",
    features: [
      "Up to 100 employees",
      "1 survey cycle",
      "Standard question bank",
      "Summary report",
    ],
    featured: false,
  },
  {
    name: "Growth",
    planId: "growth" as const,
    price: "₹75",
    amountInr: 75,
    period: "/ employee / month",
    blurb: "For organisations running recurring engagement cycles.",
    features: [
      "100–500 employees",
      "Custom question design",
      "Dashboard access",
      "Quarterly cycles",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    planId: "enterprise" as const,
    price: "Custom",
    amountInr: null,
    period: "quote",
    blurb: "Multi-site rollouts with manager dashboards and dedicated analysis.",
    features: [
      "500+ employees",
      "Multi-site rollout",
      "Manager dashboards",
      "Dedicated analyst",
    ],
    featured: false,
  },
] as const;
