"use client";

import { useState } from "react";
import { Mail, MapPin, Send, AlertCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import {
  CONTACT_EMAIL,
  contactChannels,
  socialLinks,
} from "@/lib/contact";

const socialIcons = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
} as const;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!consent) {
      setError("Please agree to the Privacy Policy before sending.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent: true }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please email us directly.",
        );
        return;
      }

      setSent(true);
    } catch {
      setError(`Could not send your message. Please email ${CONTACT_EMAIL} directly.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>Let&apos;s Talk <span className="text-gradient-amber">Research</span></>}
        subtitle="Whether you have a specific brief or just want to explore what's possible, our team is happy to have a conversation."
      />

      <div className="page-content section-py">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-5xl">
          <div className="lg:col-span-2 flex flex-col gap-10">
            {contactChannels.map((channel) => {
              const Icon =
                channel.kind === "email"
                  ? Mail
                  : channel.kind === "phone"
                    ? Phone
                    : MapPin;

              return (
                <div key={channel.label} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 items-start">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[rgba(232,168,32,0.1)] border border-[rgba(232,168,32,0.2)]">
                    <Icon size={18} className="text-[#e8a820]" aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="label-field !mb-2">{channel.label}</p>
                    {channel.kind === "email" && (
                      <>
                        <a href={channel.href} className="text-title hover:text-[var(--amber)] transition-colors break-words">
                          {channel.value}
                        </a>
                        {channel.sub && <p className="text-body-sm mt-1.5">{channel.sub}</p>}
                      </>
                    )}
                    {channel.kind === "phone" && (
                      <div className="flex flex-col gap-1.5">
                        {channel.numbers.map((n) => (
                          <a
                            key={n.href}
                            href={n.href}
                            className="text-title hover:text-[var(--amber)] transition-colors"
                          >
                            {n.display}
                          </a>
                        ))}
                      </div>
                    )}
                    {channel.kind === "address" && (
                      <p className="text-body-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {channel.lines.join("\n")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 items-start pt-2 border-t border-white/[0.06]">
              <div aria-hidden className="w-11" />
              <div className="pt-6">
                <p className="label-field mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => {
                    const Icon = socialIcons[s.label as keyof typeof socialIcons];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.06] text-slate-300 hover:text-[var(--amber)] hover:border-[var(--amber)]/30 transition-all"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 surface-ghost p-8 lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(232,168,32,0.15)] flex items-center justify-center mb-4">
                  <Send size={28} className="text-[#e8a820]" aria-hidden />
                </div>
                <h2 className="font-display font-black text-display-md text-white mb-2">Message Sent!</h2>
                <p className="text-body-md">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="section-stack-sm">
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-body-sm text-red-200">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden />
                    <p>{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Your Name", type: "text", placeholder: "Your name" },
                    { name: "company", label: "Company", type: "text", placeholder: "Your company" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="label-field">{field.label}</label>
                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="input-field"
                        required
                        disabled={submitting}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="email" className="label-field">Business Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="input-field"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label-field">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your research objective, timeline, and any key questions you'd like answered..."
                    className="input-field resize-none"
                    required
                    disabled={submitting}
                  />
                </div>
                <label className="flex items-start gap-3 text-body-sm text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded border-white/20 bg-white/5"
                    required
                    disabled={submitting}
                  />
                  <span>
                    I agree that Elastic Tree may process my contact details to respond to this
                    enquiry, as described in the{" "}
                    <a href="/privacy" className="text-[var(--amber)] hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center !rounded-xl"
                  disabled={submitting || !consent}
                >
                  <Send size={16} aria-hidden /> {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
