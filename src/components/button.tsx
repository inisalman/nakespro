import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
};

const variants = {
  primary: "bg-teal text-white hover:bg-teal/90 shadow-sm",
  secondary: "bg-sky-blue text-white hover:bg-sky-blue/90 shadow-sm",
  outline: "border border-teal text-teal hover:bg-teal/5",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all",
    variants[variant],
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
