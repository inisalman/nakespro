import Link from "next/link";
import { notFound } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { Navbar } from "@/components/marketing/navbar";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "./booking-form";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewBookingPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireRole(UserRole.PATIENT);
  const params = await searchParams;
  const practitionerId = valueOf(params, "practitionerId");
  const serviceId = valueOf(params, "serviceId");

  if (!practitionerId) {
    notFound();
  }

  const practitioner = await prisma.practitionerProfile.findFirst({
    where: { id: practitionerId, isAvailable: true },
    include: {
      user: { select: { name: true } },
      services: { where: { isActive: true }, orderBy: { price: "asc" }, select: { id: true, name: true, price: true, durationMinutes: true } },
    },
  });

  if (!practitioner || !practitioner.services.length) {
    notFound();
  }

  const matchedService = serviceId ? practitioner.services.find((service) => service.id === serviceId) : undefined;
  const selectedServiceId = matchedService?.id ?? practitioner.services[0].id;
  const profile = user.patientProfile?.id
    ? await prisma.patientProfile.findUnique({ where: { id: user.patientProfile.id }, select: { address: true } })
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={`/${practitioner.slug}`} className="text-sm font-semibold text-teal-700">Kembali ke profil nakes</Link>
        <Card className="mt-6 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-950">Booking Layanan</h1>
          <p className="mt-2 text-sm text-slate-600">Isi detail jadwal dan alamat layanan untuk {practitioner.user.name ?? "tenaga kesehatan"}. Nakes akan mengonfirmasi permintaan Anda.</p>
          <BookingForm practitionerId={practitioner.id} selectedServiceId={selectedServiceId} defaultAddress={profile?.address ?? ""} services={practitioner.services} />
        </Card>
      </section>
    </main>
  );
}
