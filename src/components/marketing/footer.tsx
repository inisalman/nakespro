import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            NakesPro
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Marketplace layanan tenaga kesehatan rumahan untuk booking, CPPT digital, dokumentasi tindakan, dan invoice.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-950">Produk</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <Link href="/#layanan" className="hover:text-teal-700">Layanan</Link>
            <Link href="/practitioners" className="hover:text-teal-700">Cari Nakes</Link>
            <Link href="/bookings/new" className="hover:text-teal-700">Booking</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-950">Akun</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <Link href="/login" className="hover:text-teal-700">Masuk</Link>
            <Link href="/register/patient" className="hover:text-teal-700">Daftar Pasien</Link>
            <Link href="/register/practitioner" className="hover:text-teal-700">Daftar Nakes</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
