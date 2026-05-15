import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import { BookingStatus } from "@/generated/prisma/enums";
import { BookingStatusBadge } from "@/components/dashboard/booking-status-badge";
import { formatCurrency } from "@/lib/utils";

type Row = {
  id: string;
  patientName: string;
  serviceName: string;
  bookingDate: Date;
  bookingTime: string;
  address: string;
  price: number;
  status: BookingStatus;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function avatarInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

const avatarTones = [
  "bg-teal-100 text-teal-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
];

function tone(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return avatarTones[h % avatarTones.length];
}

export function BookingsTable({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">Belum ada booking</p>
        <p className="mt-1 text-xs text-slate-500">Permintaan booking dari pasien akan muncul di sini.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
        <span className="col-span-4">Pasien</span>
        <span className="col-span-3">Layanan</span>
        <span className="col-span-2">Jadwal</span>
        <span className="col-span-1 text-right">Harga</span>
        <span className="col-span-2 text-right">Status</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {rows.map((row) => (
          <li key={row.id}>
            <Link
              href={`/dashboard/practitioner/bookings/${row.id}`}
              className="grid grid-cols-1 gap-3 px-6 py-4 transition hover:bg-slate-50/80 lg:grid-cols-12 lg:items-center lg:gap-4"
            >
              <div className="col-span-4 flex items-center gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${tone(row.patientName)}`}>
                  {avatarInitials(row.patientName)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-950">{row.patientName}</p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500">
                    <MapPin className="h-3 w-3" /> {row.address}
                  </p>
                </div>
              </div>
              <div className="col-span-3">
                <p className="truncate text-sm text-slate-700">{row.serviceName}</p>
              </div>
              <div className="col-span-2">
                <p className="flex items-center gap-1 text-sm text-slate-700">
                  <CalendarClock className="h-4 w-4 text-slate-400" />
                  {formatDate(row.bookingDate)} · {row.bookingTime}
                </p>
              </div>
              <div className="col-span-1 text-sm font-semibold text-slate-950 lg:text-right">
                {formatCurrency(row.price)}
              </div>
              <div className="col-span-2 lg:text-right">
                <BookingStatusBadge status={row.status} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
