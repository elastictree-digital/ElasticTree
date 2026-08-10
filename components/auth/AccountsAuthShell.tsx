import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  /** Compact footer under the form */
  footer?: ReactNode;
};

/** Shared ambient shell for /accounts/* auth screens — brand-first, not a form card dump. */
export default function AccountsAuthShell({ children, footer }: Props) {
  return (
    <div className="accounts-auth relative overflow-hidden min-h-[calc(100vh-4rem)]">
      <div className="page-hero__ambient" aria-hidden>
        <div className="page-hero__glow page-hero__glow--cyan" />
        <div className="page-hero__glow page-hero__glow--amber" />
        <div className="page-hero__grid grid-cosmic" />
      </div>

      <div className="page-content relative z-[1] page-hero-offset pb-20 md:pb-28">
        <div className="max-w-md mx-auto md:max-w-lg">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm mb-12 md:mb-14"
          >
            <span aria-hidden>←</span> elastictree.com
          </Link>

          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--teal)] mb-5">
            Accounts
          </p>
          <h1 className="font-display font-black text-white tracking-tight text-[clamp(2.6rem,7vw,3.75rem)] leading-[1.08] mb-5">
            Elastic Tree<span className="text-gradient-amber">.</span>
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-slate-400 max-w-md mb-14 md:mb-16">
            One sign-in for your studios — TScribe, QualView, AI Gaze, Ethos Pulse, and DataWiz.
          </p>

          {children}

          {footer ? (
            <div className="mt-14 md:mt-16 pt-8 border-t border-white/8 text-center text-xs leading-relaxed text-slate-500">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
