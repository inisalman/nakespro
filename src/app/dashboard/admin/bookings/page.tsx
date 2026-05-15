import Link from "next/link";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function AdminBookingsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { status } = await searchParams;
  const validStatus = Object.values(BookingStatus).includes(status as BookingStatus) ? (status as BookingStatus) : undefined;
  const bookings = await prisma.booking.findMany({ where: validStatus ? { status: validStatus } : undefined, orderBy: { createdAt: "desc" }, include: { patient: { include: { user: true } }, service: true, invoice: true } });
  const rows = bookings.map((booking) => ({ id: booking.id, patientName: booking.patient.user.name ?? booking.patient.user.email, serviceName: booking.service.name, bookingDate: booking.bookingDate, bookingTime: booking.bookingTime, address: booking.address, price: booking.invoice?.total ?? booking.service.price, status: booking.status }));
  return (
    <DashboardShell title="Monitoring Booking" description="Pantau seluruh booking pasien dan nakes.">
      <div className="mb-4 flex flex-wrap gap-2"><Link href="/dashboard/admin/bookings" className="text-sm font-semibold text-teal-700">Semua</Link>{Object.values(BookingStatus).map((s) => <Link key={s} href={`/dashboard/admin/bookings?status=${s}`} className="text-sm text-slate-600 hover:text-teal-700">{s}</Link>)}</div>
      <BookingsTable rows={rows} hrefPrefix="/dashboard/admin/bookings" />
    </DashboardShell>
  );
}
