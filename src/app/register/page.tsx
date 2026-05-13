import Link from "next/link";
import { Stethoscope, UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Link href="/" className="text-sm font-semibold text-teal-700">Kembali ke beranda</Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">Pilih jenis akun</h1>
        <p className="mt-3 text-slate-600">Daftar sebagai pasien untuk booking layanan, atau sebagai nakes untuk menawarkan layanan profesional.</p>
      </div>
      <div className="mx-auto mt-10 grid max-w-3xl gap-5 md:grid-cols-2">
        <Link href="/register/patient">
          <Card className="h-full transition hover:-translate-y-1 hover:border-teal-200">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <UserRound className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-xl font-bold">Daftar sebagai Pasien</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Cari nakes, booking layanan, lihat invoice, dan akses dokumentasi tindakan.</p>
          </Card>
        </Link>
        <Link href="/register/practitioner">
          <Card className="h-full transition hover:-translate-y-1 hover:border-teal-200">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
              <Stethoscope className="h-6 w-6" />
            </span>
            <h2 className="mt-6 text-xl font-bold">Daftar sebagai Nakes</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Promosikan layanan, kelola booking, buat CPPT, dan invoice otomatis.</p>
          </Card>
        </Link>
      </div>
    </main>
  );
}
