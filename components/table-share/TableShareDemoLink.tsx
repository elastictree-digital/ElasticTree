"use client";

import { useState } from "react";
import { ExternalLink, Monitor, Play, X } from "lucide-react";
import { TABLE_SHARE_DEMO_URL } from "@/lib/table-share";

interface Props {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  label?: string;
  showIcon?: boolean;
  href?: string;
}

export default function TableShareDemoLink({
  variant = "primary",
  size = "md",
  className = "",
  label = "Explore Demo",
  showIcon = true,
  href = TABLE_SHARE_DEMO_URL,
}: Props) {
  const [showMobileNotice, setShowMobileNotice] = useState(false);

  const sizeClass = size === "sm" ? "text-sm px-5 py-2.5" : "";
  const variantClass = variant === "primary" ? "btn-primary btn-glow" : "btn-secondary";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      e.preventDefault();
      setShowMobileNotice(true);
    }
  };

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`${variantClass} ${sizeClass} ${className}`.trim()}
      >
        {showIcon && <Play size={size === "sm" ? 14 : 16} fill="currentColor" aria-hidden />}
        {label}
        <ExternalLink size={size === "sm" ? 13 : 15} aria-hidden />
      </a>

      {showMobileNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="table-share-mobile-notice-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          onClick={() => setShowMobileNotice(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />
          <div
            className="highlight-panel section-stack-sm relative z-10 max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowMobileNotice(false)}
              aria-label="Close"
              className="absolute right-3 top-3 text-white/50 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            <Monitor size={32} className="text-gradient-amber mx-auto" aria-hidden />
            <h3 id="table-share-mobile-notice-title" className="text-lg font-semibold">
              Best viewed on a computer
            </h3>
            <p className="text-body-sm">
              The Table&nbsp;Share demo is an interactive dashboard designed for larger
              screens. Please log in from a computer to explore it.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
