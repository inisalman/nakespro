import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function PatientBookingsPage() {
  const user = await requireRole(UserRole.PATIENT);
  const bookings = user.patientProfile?.id
    ? await prisma.booking.findMany({
        where: { patientId: user.patientProfile.id },
        orderBy: { bookingDate: "desc" },
        include: {
          practitioner: { include: { user: { select: { name: true } } } },
          service: { select: { name: true, price: true } },
          invoice: { select: { paymentStatus: true, total: true } },
        },
      })
    : [];

  return (
    <DashboardShell title="Riwayat Booking" description="Pantau status permintaan layanan dan akses detail kunjungan Anda.">
      {bookings.length ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Link key={booking.id} href={`/dashboard/patient/bookings/${booking.id}`}>
              <Card className="transition hover:border-teal-200 hover:bg-teal-50/40">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-slate-950">{booking.service.name}</h2>
                      <Badge variant="slate">{booking.status.replaceAll("_", " ")}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{booking.practitioner.user.name ?? "Tenaga Kesehatan"}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {booking.bookingDate.toLocaleDateString("id-ID")} {booking.bookingTime}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {booking.address}</span>
                    </div>
                  </div>
                  {booking.invoice ? <Badge>{booking.invoice.paymentStatus}</Badge> : null}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="Belum ada booking" description="Cari tenaga kesehatan dan kirim booking pertama Anda." action={<Link href="/practitioners" className="inline-flex h-11 items-center rounded-xl bg-teal-500 px-5 text-sm font-semibold text-white hover:bg-teal-600">Cari Nakes</Link>} />
      )}
    </DashboardShell>
  );
}
