import Link from "next/link";
import { cn } from "@/lib/utils";

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
    "bg-cta-dark text-text-on-dark hover:bg-cta-dark-hover shadow-sm hover:shadow-md",
  secondary:
    "bg-teal text-white hover:bg-teal-strong shadow-sm hover:shadow-md",
  outline:
    "border-1.5 border-teal text-teal hover:bg-teal-light bg-transparent",
  ghost:
    "text-text-body hover:text-teal hover:bg-bg-soft",
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
    "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
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
