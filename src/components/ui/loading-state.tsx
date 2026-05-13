import { cn } from "@/lib/utils";

export function LoadingState({ label = "Memuat data...", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-600", className)}>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500" />
      {label}
    </div>
  );
}
