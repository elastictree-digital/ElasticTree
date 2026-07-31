import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing use of elastictree.com and Elastic Tree research products (DataWiz, QualView, TScribe, AI Gaze, Ethos Pulse).",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms of <span className="text-gradient-amber">Use</span>
          </>
        }
        subtitle="Rules for using Elastic Tree’s website and Soft Launch research studios."
      />

      <div className="page-content section-py max-w-3xl">
        <p className="text-body-sm text-slate-400 mb-10">Last updated: 31 July 2026</p>

        <div className="space-y-10 text-body-md text-slate-300 leading-relaxed [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-[var(--amber)] [&_a]:underline-offset-2 hover:[&_a]:underline [&_p+p]:mt-4">
          <section id="acceptance" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">1. Acceptance</h2>
            <p>
              By accessing elastictree.com or any Elastic Tree digital product (DataWiz,
              QualView, TScribe, AI Gaze, Ethos Pulse — the “Services”), you agree to these
              Terms and our{" "}
              <Link href="/privacy">Privacy Policy</Link>. If you use a Service on behalf of
              an organisation, you represent that you have authority to bind that organisation.
            </p>
          </section>

          <section id="soft-launch" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">2. Soft Launch</h2>
            <p>
              Many studios are offered as Soft Launch / pilot access. Features, availability,
              pricing, and data handling may change. Soft Launch access may use a shared
              password and is not a substitute for production-grade identity management.
              Do not run regulated fieldwork or store highly sensitive personal data in Soft
              Launch environments without a written agreement with Elastic Tree.
            </p>
          </section>

          <section id="accounts" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">3. Accounts and access</h2>
            <p>
              You are responsible for credentials issued to you, for activity under your
              session, and for ensuring only authorised people access your projects. Notify us
              promptly of suspected unauthorised use at{" "}
              <a href="mailto:sunil@elastictree.com">sunil@elastictree.com</a>.
            </p>
          </section>

          <section id="customer-data" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">4. Your content</h2>
            <p>
              You retain rights in files, rosters, creatives, A/V, and other content you
              upload (“Customer Content”). You grant Elastic Tree a limited licence to host,
              process, and transmit Customer Content solely to provide the Services you
              request (including via subprocessors such as AI and media providers named in the
              Privacy Policy). You represent that you have all rights and notices/consents
              needed to upload and process Customer Content — especially for QualView
              participants, Ethos employee respondents, and any personal data in survey files.
            </p>
          </section>

          <section id="ai" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">5. AI-assisted features</h2>
            <p>
              Transcription, summarisation, predictive eye-tracking, and similar features are
              assistive tools. Outputs may contain errors. You remain responsible for
              reviewing research deliverables before commercial or clinical decisions.
            </p>
          </section>

          <section id="acceptable" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">6. Acceptable use</h2>
            <ul>
              <li>No unlawful, harmful, or infringing use of the Services;</li>
              <li>No attempts to bypass Soft Launch access controls or probe other tenants’ data;</li>
              <li>No uploading of malware or scraping that degrades the Services;</li>
              <li>No processing of children’s data or special-category data without written agreement.</li>
            </ul>
          </section>

          <section id="ip" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">7. Intellectual property</h2>
            <p>
              Elastic Tree branding, software, and site content remain our property (or our
              licensors’). Product names including AI Gaze™ and Table Share® are used as
              Elastic Tree marks. Feedback you provide may be used to improve the Services
              without obligation to you.
            </p>
          </section>

          <section id="disclaimer" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">8. Disclaimer and liability</h2>
            <p>
              Soft Launch Services are provided “as is” to the fullest extent permitted by law.
              We do not warrant uninterrupted or error-free operation. To the maximum extent
              permitted, Elastic Tree’s aggregate liability arising from the Services is limited
              to fees you paid us for the Service in the three months before the claim (or INR
              10,000 if no fees were paid). Nothing in these Terms excludes liability that
              cannot be limited under applicable law.
            </p>
          </section>

          <section id="law" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">9. Governing law</h2>
            <p>
              These Terms are governed by the laws of India. Courts in Chennai, Tamil Nadu
              shall have exclusive jurisdiction, without prejudice to mandatory consumer or
              data-protection rights you may have in your place of residence.
            </p>
          </section>

          <section id="contact" className="scroll-mt-28">
            <h2 className="font-display font-bold text-xl text-white mb-4">10. Contact</h2>
            <p>
              Questions about these Terms:{" "}
              <a href="mailto:sunil@elastictree.com">sunil@elastictree.com</a>.
            </p>
          </section>
        </div>

        <p className="mt-12 text-body-sm text-slate-500">
          See also our{" "}
          <Link href="/privacy" className="text-[var(--amber)] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}
