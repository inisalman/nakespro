import Link from "next/link";
import { ArrowUpRight, CalendarPlus, Sparkles } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type WelcomePanelProps = {
  name: string;
  todayCount: number;
  monthRevenue: number;
};

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}

export function WelcomePanel({ name, todayCount, monthRevenue }: WelcomePanelProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 p-6 text-white shadow-[0_20px_50px_-20px_rgba(13,148,136,0.6)] sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl"
      />
      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {greeting()}, {name.split(" ")[0]}
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Hari ini ada {todayCount} pasien menunggu kunjungan Anda.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-teal-50/90">
            Lengkapi catatan tindakan setelah kunjungan agar pasien dapat mengakses hasil layanan dan invoice secara digital.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard/practitioner/bookings"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50"
            >
              <CalendarPlus className="h-4 w-4" />
              Kelola booking
            </Link>
            <Link
              href="/dashboard/practitioner/cppt/new"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Tambah CPPT
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-50/80">
            Pendapatan bulan ini
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{formatCurrency(monthRevenue)}</p>
          <div className="mt-4 grid grid-cols-7 items-end gap-1.5">
            {[42, 28, 56, 72, 64, 88, 95].map((h, i) => (
              <span
                key={i}
                className="block rounded-md bg-white/40 transition hover:bg-white/60"
                style={{ height: `${h * 0.6}px` }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-teal-50/80">7 hari terakhir</p>
        </div>
      </div>
    </section>
  );
}
