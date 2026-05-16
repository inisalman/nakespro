import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function PractitionerPatientsPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const bookings = await prisma.booking.findMany({ where: { practitionerId: user.practitionerProfile?.id }, distinct: ["patientId"], include: { patient: { include: { user: { select: { name: true, phone: true, email: true } } } } }, orderBy: { createdAt: "desc" } });
  return <DashboardShell title="Pasien" description="Daftar pasien unik dari riwayat booking."><div className="grid gap-4 md:grid-cols-2">{bookings.map((booking) => <div key={booking.patientId} className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-bold text-slate-950">{booking.patient.user.name ?? "Pasien"}</h2><p className="text-sm text-slate-500">{booking.patient.user.phone ?? booking.patient.user.email}</p></div>)}{!bookings.length ? <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Belum ada pasien.</p> : null}</div></DashboardShell>;
}
