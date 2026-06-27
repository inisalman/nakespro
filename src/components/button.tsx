"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-ink text-white hover:bg-ink-soft shadow-sm",
  secondary:
    "bg-teal text-white hover:bg-teal-strong shadow-sm",
  outline:
    "border border-line-strong text-ink hover:bg-paper",
  ghost:
    "text-text-body hover:text-ink hover:bg-paper",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    const isAnchor = href.startsWith("#");
    if (isAnchor) {
      const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      };

      return (
        <a href={href} onClick={handleAnchorClick} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
