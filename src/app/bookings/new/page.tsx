import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewBookingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/practitioners/demo" className="text-sm font-semibold text-teal-700">Kembali ke profil nakes</Link>
        <Card className="mt-6 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-950">Booking Layanan</h1>
          <p className="mt-2 text-sm text-slate-600">Isi detail jadwal dan alamat layanan. Nakes akan mengonfirmasi permintaan Anda.</p>
          <form className="mt-8 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Layanan</label>
              <Input defaultValue="Perawatan Luka Dasar" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Tanggal</label>
                <Input type="date" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Jam</label>
                <Input type="time" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Alamat layanan</label>
              <Input placeholder="Masukkan alamat lengkap" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Catatan tambahan</label>
              <textarea className="min-h-28 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15" placeholder="Contoh: kondisi luka, akses rumah, atau kebutuhan khusus" />
            </div>
            <Button type="button">Kirim Booking</Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
