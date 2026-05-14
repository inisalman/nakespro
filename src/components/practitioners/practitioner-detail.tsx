import Link from "next/link";
import { CalendarDays, Clock, MapPin, ShieldCheck, Star } from "lucide-react";
import { VerificationStatus } from "@/generated/prisma/enums";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

type PractitionerDetailData = {
  id: string;
  slug: string;
  profession: string;
  specialization: string | null;
  bio: string | null;
  experienceYears: number | null;
  serviceArea: string | null;
  verificationStatus: VerificationStatus;
  user: { name: string | null; image: string | null };
  services: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    durationMinutes: number;
    category: { name: string };
  }[];
  schedules: { id: string; dayOfWeek: number; startTime: string; endTime: string }[];
  reviews: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    patient: { user: { name: string | null; image: string | null } };
  }[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function averageRating(reviews: { rating: number }[]) {
  if (!reviews.length) {
    return null;
  }

  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function PractitionerDetail({ practitioner }: { practitioner: PractitionerDetailData }) {
  const name = practitioner.user.name ?? "Tenaga Kesehatan";
  const rating = averageRating(practitioner.reviews);
  const firstService = practitioner.services[0];

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <Avatar name={name} src={practitioner.user.image ?? undefined} className="h-24 w-24 rounded-3xl text-2xl" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold text-slate-950">{name}</h1>
                {practitioner.verificationStatus === VerificationStatus.VERIFIED ? (
                  <Badge><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Terverifikasi</Badge>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-semibold text-teal-700">nakespro.id/{practitioner.slug}</p>
              <p className="mt-2 text-slate-600">{practitioner.bio ?? `${practitioner.profession}${practitioner.specialization ? ` — ${practitioner.specialization}` : ""}`}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {rating ? `${rating.toFixed(1)} dari ${practitioner.reviews.length} ulasan` : "Belum ada ulasan"}</span>
                {practitioner.serviceArea ? <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {practitioner.serviceArea}</span> : null}
                {practitioner.experienceYears ? <span>{practitioner.experienceYears} tahun pengalaman</span> : null}
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Layanan</h2>
          <div className="mt-4 space-y-3">
            {practitioner.services.length ? practitioner.services.map((service) => (
              <div key={service.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-950">{service.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{service.description ?? service.category.name}</p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500"><Clock className="h-3.5 w-3.5" /> {service.durationMinutes} menit</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-teal-700">{formatCurrency(service.price)}</p>
                    <Link href={`/bookings/new?practitionerId=${practitioner.id}&serviceId=${service.id}`} className="mt-3 inline-flex h-9 items-center rounded-xl bg-teal-500 px-4 text-xs font-semibold text-white hover:bg-teal-600">Booking</Link>
                  </div>
                </div>
              </div>
            )) : <EmptyState title="Belum ada layanan aktif" description="Nakes ini belum membuka layanan untuk pasien." />}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Rating dan ulasan</h2>
          <div className="mt-4 space-y-3">
            {practitioner.reviews.length ? practitioner.reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={review.patient.user.name ?? "Pasien"} src={review.patient.user.image ?? undefined} />
                    <div>
                      <p className="font-semibold text-slate-950">{review.patient.user.name ?? "Pasien"}</p>
                      <p className="text-xs text-slate-500">{review.createdAt.toLocaleDateString("id-ID")}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-600"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {review.rating}</span>
                </div>
                {review.comment ? <p className="mt-3 text-sm leading-6 text-slate-600">{review.comment}</p> : null}
              </div>
            )) : <EmptyState title="Belum ada ulasan" description="Ulasan pasien akan tampil setelah booking selesai." />}
          </div>
        </Card>
      </div>
      <Card className="h-fit p-6 lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-slate-950">Booking layanan</h2>
        <p className="mt-2 text-sm text-slate-600">Pilih layanan dan jadwal, lalu nakes akan mengonfirmasi permintaan Anda.</p>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-slate-600">
            <CalendarDays className="h-4 w-4" /> {practitioner.schedules.length ? "Jadwal tersedia" : "Jadwal belum diatur"}
          </div>
          {practitioner.schedules.map((schedule) => (
            <div key={schedule.id} className="rounded-xl bg-slate-50 p-3 text-slate-600">
              {dayNames[schedule.dayOfWeek]}: {schedule.startTime}–{schedule.endTime}
            </div>
          ))}
          {practitioner.serviceArea ? (
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-slate-600">
              <MapPin className="h-4 w-4" /> Area: {practitioner.serviceArea}
            </div>
          ) : null}
        </div>
        {firstService ? (
          <Link href={`/bookings/new?practitionerId=${practitioner.id}&serviceId=${firstService.id}`} className="mt-6 flex h-12 items-center justify-center rounded-xl bg-teal-500 text-sm font-semibold text-white hover:bg-teal-600">
            Booking Sekarang
          </Link>
        ) : null}
      </Card>
    </section>
  );
}
