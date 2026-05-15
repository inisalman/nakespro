import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = { value: string; direction: "up" | "down" };

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  trend?: Trend;
  tone?: "teal" | "amber" | "sky" | "rose" | "violet";
};

const tones = {
  teal: {
    iconBg: "bg-teal-50 text-teal-700",
    accent: "from-teal-100/60 to-transparent",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-700",
    accent: "from-amber-100/60 to-transparent",
  },
  sky: {
    iconBg: "bg-sky-50 text-sky-700",
    accent: "from-sky-100/60 to-transparent",
  },
  rose: {
    iconBg: "bg-rose-50 text-rose-700",
    accent: "from-rose-100/60 to-transparent",
  },
  violet: {
    iconBg: "bg-violet-50 text-violet-700",
    accent: "from-violet-100/60 to-transparent",
  },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  trend,
  tone = "teal",
}: StatCardProps) {
  const t = tones[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b", t.accent)} />
      <div className="relative flex items-start justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", t.iconBg)}>
          <Icon className="h-5 w-5" />
        </span>
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              trend.direction === "up"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700",
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {trend.value}
          </span>
        ) : null}
      </div>
      <div className="relative mt-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
        {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      </div>
    </div>
  );
}
