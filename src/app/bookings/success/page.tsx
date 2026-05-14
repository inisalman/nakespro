import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { UserRole } from "@/generated/prisma/enums";
import { Navbar } from "@/components/marketing/navbar";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function BookingSuccessPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireRole(UserRole.PATIENT);
  const params = await searchParams;
  const bookingId = valueOf(params, "bookingId");
  const booking = bookingId && user.patientProfile?.id
    ? await prisma.booking.findFirst({ where: { id: bookingId, patientId: user.patientProfile.id }, select: { id: true } })
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-teal-600" />
          <h1 className="mt-5 text-2xl font-bold text-slate-950">Booking berhasil dikirim</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Permintaan Anda sudah masuk dan menunggu konfirmasi tenaga kesehatan.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {booking ? <Link href={`/dashboard/patient/bookings/${booking.id}`} className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-500 px-5 text-sm font-semibold text-white hover:bg-teal-600">Lihat Detail Booking</Link> : null}
            <Link href="/dashboard/patient/bookings" className="inline-flex h-11 items-center justify-center rounded-xl border border-teal-100 bg-white px-5 text-sm font-semibold text-teal-700 hover:bg-teal-50">Riwayat Booking</Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
