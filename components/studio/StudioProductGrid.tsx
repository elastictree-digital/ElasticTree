"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import ProductStudioLink from "@/components/studio/ProductStudioLink";
import {
  studioProducts,
  studioStatusLabel,
  type StudioProduct,
} from "@/lib/studio-products";

function StatusPill({ product }: { product: StudioProduct }) {
  const label = studioStatusLabel[product.status];
  const color =
    product.status === "live"
      ? "#2dd4bf"
      : product.status === "pilot"
        ? "#e8a820"
        : "#38bdf8";

  return (
    <span
      className="text-[10px] font-mono uppercase tracking-[0.14em]"
      style={{ color }}
    >
      {label}
    </span>
  );
}

function ProductActions({ product }: { product: StudioProduct }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
      {product.launch && (
        <ProductStudioLink
          product={product.launch.product}
          studioUrl={product.launch.studioUrl}
          label={product.launch.label ?? "Open"}
          size="sm"
        />
      )}
      {product.external && (
        <a
          href={product.external.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-glow text-sm px-5 py-2.5"
        >
          <Play size={14} fill="currentColor" aria-hidden />
          {product.external.label}
        </a>
      )}
      {product.overviewHref && (
        <Link href={product.overviewHref} className="btn-secondary text-sm px-5 py-2.5">
          Overview
        </Link>
      )}
    </div>
  );
}

export default function StudioProductGrid() {
  return (
    <ul className="list-none p-0 m-0 divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {studioProducts.map((product) => (
        <li
          id={product.id}
          key={product.id}
          className="scroll-mt-28 group py-7 sm:py-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8">
            <div className="min-w-0 flex gap-4 sm:gap-5">
              <span
                className="mt-1.5 h-10 w-1 shrink-0 rounded-full opacity-90 transition-transform group-hover:scale-y-110"
                style={{ background: product.accent }}
                aria-hidden
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                    {product.name}
                    {product.mark && (
                      <span className="text-gradient-amber">{product.mark}</span>
                    )}
                  </h3>
                  <StatusPill product={product} />
                </div>
                <p
                  className="text-[11px] font-mono uppercase tracking-[0.12em] mb-2"
                  style={{ color: product.accent }}
                >
                  {product.category}
                </p>
                <p className="text-body-sm text-slate-400 max-w-xl leading-relaxed">
                  {product.blurb}
                </p>
              </div>
            </div>
            <ProductActions product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
}
