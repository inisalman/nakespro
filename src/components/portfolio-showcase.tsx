"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { portfolio } from "@/lib/content";
import { cn } from "@/lib/utils";

// ─── Accent color map ───
const accentMap: Record<string, string> = {
  teal:   "from-teal/20 to-teal/5 border-teal/30 group-hover:shadow-teal/10",
  cyan:   "from-cyan/20 to-cyan/5 border-cyan/30 group-hover:shadow-cyan/10",
  purple: "from-purple/20 to-purple/5 border-purple/30 group-hover:shadow-purple/10",
  amber:  "from-amber/20 to-amber/5 border-amber/30 group-hover:shadow-amber/10",
};

const dotMap: Record<string, string> = {
  teal:   "bg-teal shadow-[0_0_6px_rgba(63,114,175,0.5)]",
  cyan:   "bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.5)]",
  purple: "bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.5)]",
  amber:  "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]",
};

const btnHoverMap: Record<string, string> = {
  teal:   "group-hover:bg-teal group-hover:border-teal group-hover:text-white",
  cyan:   "group-hover:bg-cyan-600 group-hover:border-cyan-600 group-hover:text-white",
  purple: "group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white",
  amber:  "group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white",
};

export function PortfolioShowcase() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {portfolio.map((item, i) => (
        <motion.a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="group relative block"
        >
          {/* ── Browser frame ── */}
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border transition-all duration-500",
              "bg-gradient-to-b",
              "shadow-sm group-hover:shadow-lg group-hover:-translate-y-1",
              accentMap[item.accentColor] ?? accentMap.teal
            )}
          >
            {/* Browser chrome / address bar */}
            <div className="flex items-center gap-1.5 border-b border-inherit bg-white/90 px-4 py-2.5 backdrop-blur-sm">
              {/* Traffic light dots */}
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              {/* Fake URL bar */}
              <div className="ml-3 flex-1 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-500 font-medium truncate">
                {item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </div>
              {/* Accent dot */}
              <span className={cn("ml-2 h-2 w-2 rounded-full", dotMap[item.accentColor] ?? dotMap.teal)} />
            </div>

            {/* ── Screenshot area ── */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
              <Image
                src={`/${item.id}.webp`}
                alt={`Pratinjau template ${item.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-all duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Hover overlay — glass morphism */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-all duration-400 group-hover:opacity-100">
                <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                  <ExternalLink className="h-4 w-4" />
                  Lihat Demo
                </span>
              </div>

              {/* Bottom gradient fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* ── Info section below card ── */}
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-strong">
                {item.category}
              </p>
              <h3 className="mt-0.5 text-base font-semibold text-ink">
                {item.name}
              </h3>
              <p className="mt-0.5 text-sm text-text-muted">
                {item.character}
              </p>
            </div>
            <span
              className={cn(
                "mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-300",
                "border-neutral-200 text-neutral-500",
                btnHoverMap[item.accentColor] ?? btnHoverMap.teal
              )}
            >
              Demo
              <ExternalLink className="h-3 w-3" />
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
