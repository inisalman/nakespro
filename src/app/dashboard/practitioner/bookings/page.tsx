import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function PractitionerBookingsPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const practitionerId = user.practitionerProfile?.id;
  const bookings = practitionerId ? await prisma.booking.findMany({ where: { practitionerId }, orderBy: [{ bookingDate: "desc" }, { bookingTime: "desc" }], include: { patient: { include: { user: { select: { name: true } } } }, service: { select: { name: true, price: true } } } }) : [];
  const rows = bookings.map((b) => ({ id: b.id, patientName: b.patient.user.name ?? "Pasien", serviceName: b.service.name, bookingDate: b.bookingDate, bookingTime: b.bookingTime, address: b.address, price: b.service.price, status: b.status }));
  return <DashboardShell title="Booking" description="Kelola permintaan dan status layanan pasien."><BookingsTable rows={rows} /></DashboardShell>;
}
