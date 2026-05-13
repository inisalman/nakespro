import Link from "next/link";
import { ArrowRight, CalendarCheck, ClipboardList, FileText, MapPin, Search, ShieldCheck, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";

const categories = [
  "Perawatan Luka",
  "Pijat Bayi",
  "Fisioterapi",
  "Home Care",
  "Perawatan Lansia",
  "Pasca Operasi",
];

const practitioners = [
  {
    name: "Ns. Rani Pratama",
    profession: "Perawat Luka",
    location: "Jakarta Selatan",
    price: "Mulai Rp175.000",
    rating: "4.9",
  },
  {
    name: "Bd. Siti Rahma",
    profession: "Bidan Pijat Bayi",
    location: "Bekasi",
    price: "Mulai Rp120.000",
    rating: "4.8",
  },
  {
    name: "Ftr. Dimas Arya",
    profession: "Fisioterapis",
    location: "Tangerang",
    price: "Mulai Rp200.000",
    rating: "4.9",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-100/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <Badge className="mb-5 w-fit">Platform layanan kesehatan rumahan</Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Temukan tenaga kesehatan terpercaya untuk layanan di rumah.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Cari perawat luka, bidan pijat bayi, fisioterapis, dan layanan home care lainnya dengan booking mudah, invoice otomatis, dan CPPT digital.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/practitioners" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 text-sm font-semibold text-white shadow-sm hover:bg-teal-600">
                Cari Nakes Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/register/practitioner" className="inline-flex h-12 items-center justify-center rounded-xl border border-teal-100 bg-white px-6 text-sm font-semibold text-teal-700 hover:bg-teal-50">
                Daftar sebagai Nakes
              </Link>
            </div>
            <Card className="mt-10 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input className="pl-10" placeholder="Cari layanan, contoh: perawatan luka" />
              </div>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input className="pl-10" placeholder="Lokasi Anda" />
              </div>
              <Link href="/practitioners" className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
                Cari
              </Link>
            </Card>
          </div>
          <Card className="relative p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">Booking hari ini</p>
                <h2 className="mt-1 text-2xl font-bold">12 layanan aktif</h2>
              </div>
              <Badge variant="blue">MVP Preview</Badge>
            </div>
            <div className="space-y-4">
              {practitioners.map((item) => (
                <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-950">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.profession}</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-amber-600 ring-1 ring-slate-200">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {item.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                    <Badge variant="slate">{item.location}</Badge>
                    <Badge variant="teal">{item.price}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="layanan" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge>Layanan populer</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Kategori layanan untuk kebutuhan pasien</h2>
          <p className="mt-3 text-slate-600">Mulai dari perawatan luka sampai fisioterapi, pasien bisa mencari nakes sesuai kebutuhan dan lokasi.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category} className="flex items-center gap-4 transition hover:-translate-y-1 hover:border-teal-200">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold">{category}</h3>
                <p className="text-sm text-slate-500">Layanan profesional di rumah</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section id="cara-kerja" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="blue">Cara kerja</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Alur sederhana untuk pasien dan nakes</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [Search, "Cari nakes", "Pasien memilih layanan, lokasi, jadwal, dan tenaga kesehatan yang sesuai."],
              [CalendarCheck, "Booking layanan", "Nakes menerima permintaan dan datang sesuai jadwal layanan."],
              [ClipboardList, "CPPT & invoice", "Dokumentasi tindakan dan invoice otomatis tersedia setelah layanan selesai."],
            ].map(([Icon, title, description]) => (
              <Card key={String(title)}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{String(description)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="nakes" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card className="bg-teal-500 p-8 text-white">
          <Users className="h-10 w-10" />
          <h2 className="mt-6 text-3xl font-bold">Bantu nakes promosi tanpa ribet teknologi.</h2>
          <p className="mt-4 leading-7 text-teal-50">
            NakesPro menyediakan profil profesional, manajemen booking, CPPT digital, dokumentasi tindakan, dan invoice otomatis dalam satu tempat.
          </p>
          <Link href="/register/practitioner" className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-teal-700 hover:bg-teal-50">
            Mulai jadi mitra nakes
          </Link>
        </Card>
        <div className="grid gap-4">
          {[
            [FileText, "Invoice otomatis", "Bukti pembayaran terlihat lebih profesional dan mudah dibagikan."],
            [ClipboardList, "CPPT digital", "Catatan tindakan bisa dibuat langsung dari website dan dilihat pasien."],
            [ShieldCheck, "Profil terverifikasi", "Membangun kepercayaan pasien melalui data profesi dan dokumen pendukung."],
          ].map(([Icon, title, description]) => (
            <Card key={String(title)} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold">{String(title)}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{String(description)}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["Untuk pasien", "Cari layanan kesehatan rumahan yang sesuai lokasi, jadwal, kebutuhan tindakan, dan riwayat layanan."],
              ["Untuk tenaga kesehatan", "Bangun profil profesional, kelola layanan, dan dokumentasikan tindakan tanpa sistem yang rumit."],
            ].map(([title, description]) => (
              <Card key={title}>
                <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Badge variant="blue">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Pertanyaan umum</h2>
          </div>
          <div className="grid gap-4">
            {[
              ["Apakah nakes diverifikasi?", "NakesPro menyiapkan alur verifikasi profil dan dokumen untuk membangun kepercayaan pasien."],
              ["Apakah pasien bisa melihat CPPT?", "CPPT digital akan tersedia untuk pasien terkait setelah layanan selesai."],
              ["Apakah invoice dibuat otomatis?", "Invoice disiapkan otomatis berdasarkan layanan, biaya tambahan, diskon, dan status pembayaran."],
            ].map(([question, answer]) => (
              <Card key={question}>
                <h3 className="font-bold text-slate-950">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
