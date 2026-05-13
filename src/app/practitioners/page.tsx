import Link from "next/link";
import { MapPin, Search, Star } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const practitioners = [
  ["Ns. Rani Pratama", "Perawat Luka", "Jakarta Selatan", "Rp175.000", "4.9"],
  ["Bd. Siti Rahma", "Bidan Pijat Bayi", "Bekasi", "Rp120.000", "4.8"],
  ["Ftr. Dimas Arya", "Fisioterapis", "Tangerang", "Rp200.000", "4.9"],
  ["Ns. Aditya Nugraha", "Home Care", "Depok", "Rp150.000", "4.7"],
];

export default function PractitionersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge>Direktori Nakes</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Cari tenaga kesehatan</h1>
          <p className="mt-2 text-slate-600">Filter berdasarkan layanan, lokasi, harga, dan rating.</p>
        </div>
        <Card className="mb-8 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input className="pl-10" placeholder="Cari layanan atau nama nakes" />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input className="pl-10" placeholder="Lokasi" />
          </div>
          <button className="h-11 rounded-xl bg-teal-500 px-6 text-sm font-semibold text-white hover:bg-teal-600">Cari</button>
        </Card>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {practitioners.map(([name, profession, location, price, rating]) => (
            <Link href="/practitioners/demo" key={name}>
              <Card className="h-full transition hover:-translate-y-1 hover:border-teal-200">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-teal-100" />
                    <div>
                      <h2 className="font-bold text-slate-950">{name}</h2>
                      <p className="text-sm text-slate-500">{profession}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {rating}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="slate">{location}</Badge>
                  <Badge>{price}</Badge>
                  <Badge variant="blue">Terverifikasi</Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
