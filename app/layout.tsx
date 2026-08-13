import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/privacy/CookieConsent";
import GrowthAnalyticsBeacon from "@/components/analytics/GrowthAnalyticsBeacon";
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL = "https://www.elastictree.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1f4a" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f4a" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elastic Tree | Market Research — Smart Decisions, Simply Made.",
    template: "%s | Elastic Tree",
  },
  description:
    "Elastic Tree is an AI-powered market research firm with 12 years of experience serving 200+ brands. Analytics, sensory science, syndicated research (Table Share®), impact studies, and AI Gaze™ — India & global.",
  applicationName: "Elastic Tree",
  authors: [{ name: "Elastic Tree Research", url: SITE_URL }],
  creator: "Elastic Tree",
  publisher: "Elastic Tree",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "market research India",
    "AI market research",
    "behavioural research India",
    "consumer insights",
    "sensory science research",
    "Table Share",
    "syndicated research",
    "impact research",
    "MaxDiff conjoint analysis",
    "AI Gaze eye tracking",
    "brand health tracking",
    "FMCG research India",
    "food service research",
    "out-of-home dining research",
    "Elastic Tree",
    "elastictree.com",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Elastic Tree",
    title: "Elastic Tree | AI-Powered Market Research",
    description:
      "AI-powered market research: analytics, sensory science, syndicated & impact research. 200+ clients, 800+ projects, 74% repeat rate. Since 2014.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elastic Tree | AI-Powered Market Research",
    description: "Smart Decisions, Simply Made. AI-powered market research from India's specialist FMCG and food-service research firm.",
    creator: "@elastictree",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=etscout", sizes: "any" },
      { url: "/favicon-32.png?v=etscout", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=etscout", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=etscout", sizes: "180x180" }],
    shortcut: "/favicon.png?v=etscout",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${outfit.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased page-spectrum">
        <AuthSessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
          <GrowthAnalyticsBeacon />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
