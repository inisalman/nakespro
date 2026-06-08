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
  bg?: "cream" | "white" | "soft" | "dark" | "tint";
}) {
  const bgMap = {
    cream: "bg-cream",
    white: "bg-white",
    soft: "bg-bg-soft",
    dark: "bg-cta-dark",
    tint: "bg-bg-tint",
  };

  return (
    <section
      id={id}
      className={cn("w-full px-6 py-20 md:py-28", bgMap[bg], className)}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
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
        "mb-4 inline-flex items-center gap-1.5 rounded-pill bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal",
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
  const titleColor = dark ? "text-text-on-dark" : "text-text-heading";
  const subColor = dark ? "text-text-on-dark/70" : "text-text-body";

  // Render title with optional italic accent word
  function renderTitle() {
    if (!titleAccent) return title;
    const parts = title.split(titleAccent);
    if (parts.length !== 2) return title;
    return (
      <>
        {parts[0]}
        <span className="italic font-semibold">{titleAccent}</span>
        {parts[1]}
      </>
    );
  }

  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
      <h2 className={"text-3xl font-bold md:text-4xl " + titleColor}>
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={"mt-4 text-lg leading-relaxed " + subColor}>{subtitle}</p>
      )}
    </div>
  );
}
