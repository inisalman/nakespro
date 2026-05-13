import Link from "next/link";
import { CalendarDays, MapPin, ShieldCheck, Star } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function PractitionerDetailPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="h-24 w-24 rounded-3xl bg-teal-100" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold text-slate-950">Ns. Rani Pratama</h1>
                  <Badge><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Terverifikasi</Badge>
                </div>
                <p className="mt-2 text-slate-600">Perawat luka dengan pengalaman 6 tahun menangani luka diabetes, pasca operasi, dan perawatan luka kronis.</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 dari 82 ulasan</span>
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Jakarta Selatan</span>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Layanan</h2>
            <div className="mt-4 space-y-3">
              {[
                ["Perawatan Luka Dasar", "Pembersihan luka, balutan, edukasi keluarga", "Rp175.000"],
                ["Perawatan Luka Diabetes", "Evaluasi luka, perawatan, dan rencana tindak lanjut", "Rp250.000"],
              ].map(([name, desc, price]) => (
                <div key={name} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{desc}</p>
                    </div>
                    <p className="font-bold text-teal-700">{price}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="h-fit p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">Booking layanan</h2>
          <p className="mt-2 text-sm text-slate-600">Pilih layanan dan jadwal, lalu nakes akan mengonfirmasi permintaan Anda.</p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-slate-600">
              <CalendarDays className="h-4 w-4" /> Jadwal tersedia minggu ini
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-slate-600">
              <MapPin className="h-4 w-4" /> Area: Jakarta Selatan
            </div>
          </div>
          <Link href="/bookings/new" className="mt-6 flex h-12 items-center justify-center rounded-xl bg-teal-500 text-sm font-semibold text-white hover:bg-teal-600">
            Booking Sekarang
          </Link>
        </Card>
      </section>
    </main>
  );
}
