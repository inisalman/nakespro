import Link from "next/link";
import { CalendarCheck, Home, Search, UserRound } from "lucide-react";

const items = [
  ["/dashboard/patient", "Beranda", Home],
  ["/practitioners", "Cari", Search],
  ["/bookings/new", "Booking", CalendarCheck],
  ["/register", "Profil", UserRound],
] as const;

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white px-2 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] lg:hidden">
      {items.map(([href, label, Icon]) => (
        <Link key={href} href={href} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-xs font-semibold text-slate-500 hover:bg-teal-50 hover:text-teal-700">
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
