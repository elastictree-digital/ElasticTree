/** Public demo URL for the Table Share® interactive dashboard app. */
export const TABLE_SHARE_DEMO_URL = "https://table-share-production.up.railway.app/";

export const tableShareStats = [
  { val: "3,468", label: "Households", accent: "#2dd4bf" },
  { val: "16", label: "Cities", accent: "#38bdf8" },
  { val: "400+", label: "Dishes", accent: "#5eead4" },
  { val: "1-day", label: "Recall", accent: "#e8a820" },
] as const;

export const tableShareInsights = [
  {
    title: "Purchase ≠ Consumption",
    desc: "Our data goes beyond the cart — capturing what's served and eaten at the table.",
    accent: "#e8a820",
  },
  {
    title: "Recall distorts reality",
    desc: "Monthly recall misses everyday food behaviour. Day-after recall captures what actually happened.",
    accent: "#38bdf8",
  },
  {
    title: "Categories hide occasions",
    desc: "Growth happens at the meal moment, not the shelf. Table Share® maps occasions independently.",
    accent: "#2dd4bf",
  },
] as const;

export const tableShareOccasions = [
  { name: "Before Breakfast", desc: "Early morning tea, coffee, and light bites" },
  { name: "Breakfast", desc: "Morning meals at home, cafes, and hotels" },
  { name: "Morning Snack", desc: "Mid-morning bite at QSRs and kiosks" },
  { name: "Lunch", desc: "Primary meal including corporate canteens" },
  { name: "Evening Snack", desc: "Tea-time snacking and street food" },
  { name: "Dinner", desc: "Restaurants, takeaway, and food delivery" },
  { name: "Late Night", desc: "Post-event dining and late-night delivery" },
] as const;

export const tableShareBusinessUses = [
  {
    title: "Marketing",
    desc: "Occasion-led messaging & positioning",
    accent: "#e8a820",
  },
  {
    title: "Innovation",
    desc: "RTC / RTE white-space identification",
    accent: "#38bdf8",
  },
  {
    title: "Sales",
    desc: "City & channel prioritisation",
    accent: "#2dd4bf",
  },
  {
    title: "Strategy",
    desc: "Portfolio gaps & long-term bets",
    accent: "#5eead4",
  },
] as const;

export const tableShareDeliverables = [
  "Executive overview report",
  "Interactive dashboard",
  "Analysis support & interpretation",
] as const;

export const tableShareCities = [
  "Chennai", "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad",
  "Kolkata", "Pune", "Ahmedabad", "Coimbatore", "Kochi",
  "Jaipur", "Lucknow", "Bhopal", "Chandigarh", "Vizag", "Indore",
] as const;

export const tableShareFeatures = [
  "Real eating behaviour — dish-by-dish, occasion-by-occasion",
  "Opportunity identification for RTC / RTE categories",
  "Occasion-led growth strategy & city prioritisation",
  "Day-after recall methodology for maximum accuracy",
] as const;

/** Syndicated access — quarterly tiered plans. */
export const tableSharePricing = [
  {
    name: "Single Category",
    price: "₹20,000",
    amountInr: 20000,
    period: "/ quarter",
    blurb: "One food category, one geography.",
    features: [
      "One food category",
      "One geography",
      "Dashboard + overview report",
      "Analysis support",
    ],
    featured: false,
  },
  {
    name: "Multi-Category",
    price: "₹35,000",
    amountInr: 35000,
    period: "/ quarter",
    blurb: "Up to three categories or geographies.",
    features: [
      "Up to 3 categories / geographies",
      "Comparative cuts across selections",
      "Dashboard + overview report",
      "Analysis support",
    ],
    featured: true,
  },
  {
    name: "Full Access",
    price: "₹45,000",
    amountInr: 45000,
    period: "/ quarter",
    blurb: "All categories and geographies with priority refresh.",
    features: [
      "All categories",
      "All geographies",
      "Priority data refresh",
      "Full dashboard access + analysis support",
    ],
    featured: false,
  },
] as const;
