import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Activity,
  CalendarCheck,
  ClipboardList,
  FileText,
  Heart,
  HeartHandshake,
  Home as HomeIcon,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";

const featuredPractitioners = [
  {
    name: "Ns. Rani Pratama",
    profession: "Perawat Luka Bersertifikat",
    location: "Jakarta Selatan",
    price: "Rp175.000",
    rating: "4.9",
    reviews: 128,
    experience: "8 tahun",
    services: ["Perawatan Luka Diabetes", "Ganti Verban"],
    verified: true,
    accent: "teal" as const,
  },
  {
    name: "Bd. Siti Rahma",
    profession: "Bidan & Terapis Pijat Bayi",
    location: "Bekasi",
    price: "Rp120.000",
    rating: "4.8",
    reviews: 96,
    experience: "6 tahun",
    services: ["Pijat Bayi", "Edukasi Ibu Menyusui"],
    verified: true,
    accent: "sky" as const,
  },
  {
    name: "Ftr. Dimas Arya",
    profession: "Fisioterapis Home Care",
    location: "Tangerang",
    price: "Rp200.000",
    rating: "4.9",
    reviews: 154,
    experience: "10 tahun",
    services: ["Fisioterapi Pasca Stroke", "Terapi Lansia"],
    verified: true,
    accent: "amber" as const,
  },
  {
    name: "Ns. Aulia Wijaya",
    profession: "Perawat Lansia",
    location: "Depok",
    price: "Rp160.000",
    rating: "4.7",
    reviews: 71,
    experience: "5 tahun",
    services: ["Perawatan Lansia", "Pasca Operasi"],
    verified: true,
    accent: "teal" as const,
  },
];

const categories = [
  {
    icon: Heart,
    title: "Perawatan Luka",
    description: "Ganti verban, perawatan luka diabetes, dan luka pasca operasi.",
    practitioners: "120+ nakes",
  },
  {
    icon: Baby,
    title: "Pijat Bayi",
    description: "Pijat bayi profesional dan edukasi ibu untuk tumbuh kembang optimal.",
    practitioners: "85+ nakes",
  },
  {
    icon: Activity,
    title: "Fisioterapi",
    description: "Terapi pemulihan pasca stroke, cedera olahraga, dan rehabilitasi.",
    practitioners: "64+ nakes",
  },
  {
    icon: HomeIcon,
    title: "Home Care",
    description: "Layanan keperawatan menyeluruh langsung di rumah pasien.",
    practitioners: "150+ nakes",
  },
  {
    icon: HeartHandshake,
    title: "Perawatan Lansia",
    description: "Pendampingan harian dan pemantauan kesehatan untuk lansia.",
    practitioners: "92+ nakes",
  },
  {
    icon: Stethoscope,
    title: "Pasca Operasi",
    description: "Pemulihan pasca operasi dengan tenaga kesehatan tersertifikasi.",
    practitioners: "58+ nakes",
  },
];

const accentClasses = {
  teal: {
    avatar: "bg-teal-100 text-teal-700 ring-teal-200",
    chip: "bg-teal-50 text-teal-700",
  },
  sky: {
    avatar: "bg-sky-100 text-sky-700 ring-sky-200",
    chip: "bg-sky-50 text-sky-700",
  },
  amber: {
    avatar: "bg-amber-100 text-amber-700 ring-amber-200",
    chip: "bg-amber-50 text-amber-700",
  },
};

function getInitials(name: string) {
  return name
    .replace(/\b(Ns\.|Bd\.|Ftr\.|Dr\.)/g, "")
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-teal-100/70 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
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
              <Link
                href="/practitioners"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 text-sm font-semibold text-white shadow-sm hover:bg-teal-600"
              >
                Cari Nakes Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register/practitioner"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-teal-100 bg-white px-6 text-sm font-semibold text-teal-700 hover:bg-teal-50"
              >
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
              <Link
                href="/practitioners"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Cari
              </Link>
            </Card>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <div>
                <dt className="text-sm text-slate-500">Nakes terverifikasi</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-950">500+</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Layanan selesai</dt>
                <dd className="mt-1 text-2xl font-bold text-slate-950">12.4K</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Rating rata-rata</dt>
                <dd className="mt-1 flex items-center gap-1 text-2xl font-bold text-slate-950">
                  4.9 <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                </dd>
              </div>
            </dl>
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
              {featuredPractitioners.slice(0, 3).map((item) => (
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
                    <Badge variant="teal">Mulai {item.price}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* PRACTITIONERS — directly after hero */}
      <section id="nakes-pilihan" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge>Nakes pilihan minggu ini</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Tenaga kesehatan terverifikasi siap datang ke rumah Anda
            </h2>
            <p className="mt-3 text-slate-600">
              Profil lengkap, ulasan pasien, dan harga transparan. Pilih nakes yang paling cocok dengan kebutuhan keluarga.
            </p>
          </div>
          <Link
            href="/practitioners"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:border-teal-200 hover:text-teal-700"
          >
            Lihat semua nakes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPractitioners.map((item) => {
            const accent = accentClasses[item.accent];
            return (
              <Card
                key={item.name}
                className="group flex h-full flex-col gap-5 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold ring-1 ${accent.avatar}`}
                    >
                      {getInitials(item.name)}
                    </span>
                    <div>
                      <h3 className="font-bold leading-tight text-slate-950">{item.name}</h3>
                      <p className="text-xs text-slate-500">{item.profession}</p>
                    </div>
                  </div>
                  {item.verified ? (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span>{item.reviews} ulasan</span>
                  <span className="text-slate-400">·</span>
                  <span>{item.experience}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.services.map((service) => (
                    <span
                      key={service}
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${accent.chip}`}
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-slate-400">Mulai</p>
                    <p className="text-base font-bold text-slate-950">{item.price}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <MapPin className="h-3.5 w-3.5" /> {item.location}
                  </span>
                </div>

                <Link
                  href="/practitioners"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white transition group-hover:bg-teal-500"
                >
                  Lihat profil <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES — after practitioners */}
      <section id="layanan" className="border-t border-slate-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="blue">Kategori layanan</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Pilih kategori layanan sesuai kebutuhan pasien
            </h2>
            <p className="mt-3 text-slate-600">
              Mulai dari perawatan luka sampai fisioterapi, pasien bisa memilih kategori dan langsung melihat nakes terdekat.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.title}
                  className="group flex flex-col gap-4 transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {category.practitioners}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{category.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
                  </div>
                  <Link
                    href="/practitioners"
                    className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Lihat nakes <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
      </section>

      {/* FOR NAKES */}
      <section id="nakes" className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Card className="bg-teal-500 p-8 text-white">
          <Users className="h-10 w-10" />
          <h2 className="mt-6 text-3xl font-bold">Bantu nakes promosi tanpa ribet teknologi.</h2>
          <p className="mt-4 leading-7 text-teal-50">
            NakesPro menyediakan profil profesional, manajemen booking, CPPT digital, dokumentasi tindakan, dan invoice otomatis dalam satu tempat.
          </p>
          <Link
            href="/register/practitioner"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-teal-700 hover:bg-teal-50"
          >
            Mulai jadi mitra nakes
          </Link>
        </Card>
        <div className="grid gap-4">
          {[
            [FileText, "Invoice otomatis", "Bukti pembayaran terlihat lebih profesional dan mudah dibagikan."],
            [ClipboardList, "CPPT digital", "Catatan tindakan bisa dibuat langsung dari website dan dilihat pasien."],
            [Sparkles, "Profil terverifikasi", "Membangun kepercayaan pasien melalui data profesi dan dokumen pendukung."],
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

      {/* AUDIENCE SPLIT */}
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

      {/* FAQ */}
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
