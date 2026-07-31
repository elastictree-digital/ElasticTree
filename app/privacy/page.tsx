import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Elastic Tree Research collects, uses, stores, and shares personal data across elastictree.com and our research products — aligned with India's DPDPA and international privacy expectations.",
  robots: { index: true, follow: true },
};

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who",
    title: "1. Who we are",
    body: (
      <>
        <p>
          This Privacy Policy applies to Elastic Tree Research (“Elastic Tree”, “we”, “us”)
          and our digital products and services, including elastictree.com and the research
          studios: DataWiz, QualView, TScribe, AI Gaze, and Ethos Pulse (together, the
          “Services”).
        </p>
        <p>
          Controller / Data Fiduciary: Elastic Tree Research, Chennai, India.
          Contact for privacy requests:{" "}
          <a href="mailto:sunil@elastictree.com">sunil@elastictree.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "2. Scope and laws",
    body: (
      <>
        <p>
          We process personal data in line with applicable law, including India’s Digital
          Personal Data Protection Act, 2023 (DPDPA) and Digital Personal Data Protection
          Rules, 2025 (as they come into force), the Information Technology Act, 2000 and
          SPDI Rules where still relevant, and — where we offer Services to people in the
          EEA/UK or otherwise process EU/UK personal data — the GDPR/UK GDPR. For California
          residents, we honour “notice at collection” and deletion/know-style requests on
          request where applicable.
        </p>
        <p>
          This policy is an engineering and operational notice. It is not legal advice. We
          will update it as our processing and legal obligations evolve.
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "3. Personal data we process",
    body: (
      <>
        <p>Depending on which Service you use, we may process:</p>
        <ul>
          <li>
            <strong>Website & contact:</strong> name, company, email, message content, and
            technical logs (IP, user agent) needed to deliver the site and respond.
          </li>
          <li>
            <strong>Pilot / studio access:</strong> email address and access-session cookies
            used to unlock Soft Launch studios.
          </li>
          <li>
            <strong>DataWiz:</strong> uploaded survey / crosstab files (which may contain
            respondent or customer identifiers if you include them).
          </li>
          <li>
            <strong>QualView:</strong> account details; session chat; audio/video streams;
            transcripts; engagement / attention signals; and exports you generate.
          </li>
          <li>
            <strong>TScribe:</strong> uploaded audio/video; transcripts; role labels; and AI
            research reports.
          </li>
          <li>
            <strong>Ethos Pulse:</strong> organisation users; employee roster fields you
            upload (e.g. email, name, department); survey responses.
          </li>
          <li>
            <strong>AI Gaze:</strong> uploaded creative images/videos (which may depict
            people).
          </li>
        </ul>
        <p>
          Please do not upload special-category or sensitive data (health, biometrics used
          for identification, children’s data, government IDs, etc.) unless we have a written
          agreement covering that processing.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "4. Purposes and legal bases",
    body: (
      <>
        <p>We process personal data to:</p>
        <ul>
          <li>Provide, secure, and improve the Services you request;</li>
          <li>Respond to enquiries and manage Soft Launch access;</li>
          <li>Generate research outputs (tables, transcripts, reports, heatmaps) you ask for;</li>
          <li>Process payments where billing is enabled;</li>
          <li>Meet legal, security, and fraud-prevention obligations.</li>
        </ul>
        <p>
          Under DPDPA we rely on consent and/or legitimate uses for providing requested
          Services. Under GDPR we rely on contract performance, legitimate interests
          (security, product improvement in a privacy-preserving way), and consent where
          required (e.g. non-essential cookies, certain marketing).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies and similar technologies",
    body: (
      <>
        <p>
          We use <strong>essential</strong> cookies for Soft Launch access sessions and
          security. We may store a local preference when you accept or decline non-essential
          cookies via our cookie banner. Analytics or marketing cookies are only used if you
          consent (or as otherwise permitted by law). You can change your choice by clearing
          site data for elastictree.com.
        </p>
      </>
    ),
  },
  {
    id: "processors",
    title: "6. Processors and international transfers",
    body: (
      <>
        <p>
          We use carefully selected processors to run the Services. Depending on product,
          these may include hosting and infrastructure (e.g. Vercel, Railway, AWS/S3), email
          (Resend), payments (Stripe, Razorpay, or PayU when enabled), realtime media
          (LiveKit), speech/AI providers (OpenAI, Deepgram, Google Gemini), and related cloud
          tools.
        </p>
        <p>
          Some processors are located outside India (including the United States and EEA).
          Where required, we use appropriate transfer safeguards (such as standard
          contractual clauses / equivalent contractual protections) and purpose limitation.
          By using AI-assisted features (transcription, summarisation, predictive gaze), you
          instruct us to send relevant content to those providers solely to deliver the
          feature.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "7. Retention",
    body: (
      <>
        <p>
          Soft Launch session cookies expire on a short schedule. QualView ended and stale
          sessions are purged automatically after{" "}
          <strong>90 days</strong> by default (configurable via{" "}
          <code>QUALVIEW_RETENTION_DAYS</code>). Account holders can also delete owned
          sessions and accounts in-product. Remote recording objects in object storage should
          use matching bucket lifecycle rules. TScribe uploads and Ethos campaign data are
          retained until you delete them or request erasure.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "8. Your rights",
    body: (
      <>
        <p>
          Subject to applicable law, you may request access, correction, erasure, withdrawal
          of consent, grievance redressal, and (where GDPR applies) restriction, portability,
          or objection.
        </p>
        <p>
          In-product: DataWiz, QualView, and TScribe provide export and account deletion under
          Privacy / data rights settings. You may also email{" "}
          <a href="mailto:sunil@elastictree.com">sunil@elastictree.com</a> with the subject
          “Privacy request”, naming the Service. We aim to respond within{" "}
          <strong>72 hours</strong> and complete verified requests within{" "}
          <strong>30 days</strong> where feasible.
        </p>
        <p>
          If you are an employee respondent on Ethos Pulse, contact your employer (the
          organisation running the campaign) first; we process roster and survey data on their
          instructions.
        </p>
      </>
    ),
  },
  {
    id: "grievance",
    title: "9. Grievance officer",
    body: (
      <>
        <p>
          Grievance Officer (India DPDPA): Sunil Mukkath, Elastic Tree Research, Chennai.
          Contact: <a href="mailto:sunil@elastictree.com">sunil@elastictree.com</a> · +91 98408
          50057. Please include “Grievance” in the subject line.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "10. Security",
    body: (
      <>
        <p>
          We apply technical and organisational measures appropriate to Soft Launch risk:
          HTTPS, httpOnly session cookies with Secure in production, hashed passwords, access
          controls, and security headers on our web apps. QualView requires itemised consent
          before camera/microphone preview and live publish. No method of transmission or
          storage is 100% secure.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "11. Children",
    body: (
      <p>
        Our Services are directed to business and research professionals. We do not knowingly
        collect personal data from children. Do not use QualView, Ethos Pulse, or other
        Services to process children’s data without a suitable written agreement.
      </p>
    ),
  },
  {
    id: "updates",
    title: "12. Updates",
    body: (
      <p>
        We may update this Policy. The “Last updated” date below will change when we do. Material
        changes affecting Soft Launch users will be reflected on this page and, where
        appropriate, in-product notices.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="text-gradient-amber">Policy</span>
          </>
        }
        subtitle="How Elastic Tree handles personal data across our website and research products — India and international."
      />

      <div className="page-content section-py max-w-3xl">
        <p className="text-body-sm text-slate-400 mb-10">Last updated: 31 July 2026</p>

        <div className="space-y-10 text-body-md text-slate-300 leading-relaxed [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-[var(--amber)] [&_a]:underline-offset-2 hover:[&_a]:underline [&_p+p]:mt-4">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display font-bold text-xl text-white mb-4">{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>

        <p className="mt-12 text-body-sm text-slate-500">
          See also our{" "}
          <Link href="/terms" className="text-[var(--amber)] hover:underline">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </>
  );
}
