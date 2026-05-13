import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
            <HeartPulse className="h-5 w-5" />
          </span>
          NakesPro
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/#layanan" className="hover:text-teal-700">Layanan</Link>
          <Link href="/#cara-kerja" className="hover:text-teal-700">Cara Kerja</Link>
          <Link href="/#nakes" className="hover:text-teal-700">Untuk Nakes</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm font-semibold text-slate-600 hover:text-teal-700 sm:block">
            Masuk
          </Link>
          <Link href="/register" className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600">
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}
