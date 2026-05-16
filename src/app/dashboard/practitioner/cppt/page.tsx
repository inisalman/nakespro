import Link from "next/link";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function PractitionerCpptPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const practitionerId = user.practitionerProfile?.id;
  const bookings = practitionerId ? await prisma.booking.findMany({ where: { practitionerId, status: { in: [BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED] } }, include: { patient: { include: { user: { select: { name: true } } } }, service: true, cppt: true }, orderBy: { updatedAt: "desc" } }) : [];
  return <DashboardShell title="CPPT Digital" description="Isi dan edit catatan tindakan pasien."><div className="grid gap-4">{bookings.map((booking) => <Card key={booking.id}><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><Badge variant={booking.cppt ? "teal" : "amber"}>{booking.cppt ? "Sudah diisi" : "Belum diisi"}</Badge><h2 className="mt-2 text-xl font-bold text-slate-950">{booking.service.name}</h2><p className="text-sm text-slate-500">{booking.patient.user.name ?? "Pasien"} · {booking.bookingDate.toLocaleDateString("id-ID")} {booking.bookingTime}</p></div><Link href={`/dashboard/practitioner/cppt/${booking.id}/edit`} className="text-sm font-semibold text-teal-700">{booking.cppt ? "Edit" : "Isi"} CPPT</Link></div></Card>)}{bookings.length === 0 ? <Card><p className="text-sm text-slate-600">Belum ada booking yang dapat dibuatkan CPPT.</p></Card> : null}</div></DashboardShell>;
}
