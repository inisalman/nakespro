"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  bg = "cream",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "cream" | "white" | "paper" | "soft" | "dark" | "tint";
}) {
  const bgMap = {
    cream: "bg-cream",
    white: "bg-white",
    paper: "bg-paper",
    soft: "bg-bg-soft",
    dark: "bg-cta-dark",
    tint: "bg-bg-tint",
  };

  return (
    <section
      id={id}
      className={cn("w-full px-6 py-20 md:py-28 overflow-hidden", bgMap[bg], className)}
    >
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-6xl"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 inline-flex items-center gap-1.5 rounded-full border border-teal/20 bg-teal-tint px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-strong",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  className,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}) {
  const titleColor = dark ? "text-text-on-dark" : "text-ink";
  const subColor = dark ? "text-text-on-dark/60" : "text-text-body";

  function renderTitle() {
    if (!titleAccent) return title;
    const parts = title.split(titleAccent);
    if (parts.length !== 2) return title;
    return (
      <>
        {parts[0]}
        <span className="relative">
          <span className="relative z-10 text-teal">{titleAccent}</span>
          <span className="absolute -bottom-0.5 left-0 right-0 z-0 h-1.5 rounded-full bg-teal/15" />
        </span>
        {parts[1]}
      </>
    );
  }

  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2
        className={
          "text-3xl font-bold leading-[1.12] tracking-tight md:text-4xl " +
          titleColor
        }
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={"mt-4 text-base leading-relaxed " + subColor}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
