import { notFound } from "next/navigation";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { CpptForm } from "../../cppt-form";
import { TreatmentDocumentForm } from "../../treatment-document-form";
import { TreatmentDocumentList } from "../../treatment-document-list";

export default async function EditCpptPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(UserRole.PRACTITIONER);
  const { id } = await params;
  const practitionerId = user.practitionerProfile?.id;
  const booking = practitionerId ? await prisma.booking.findFirst({ where: { id, practitionerId, status: { in: [BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED] } }, include: { patient: { include: { user: true } }, service: true, cppt: { include: { documents: true } }, documents: true } }) : null;
  if (!booking) notFound();
  return <DashboardShell title="Form CPPT" description={`${booking.service.name} untuk ${booking.patient.user.name ?? "Pasien"}`}><div className="grid gap-6 xl:grid-cols-[1fr_360px]"><Card><CpptForm bookingId={booking.id} cppt={booking.cppt} /></Card><Card><h2 className="text-xl font-bold text-slate-950">Dokumentasi</h2><div className="mt-4"><TreatmentDocumentList documents={[...booking.documents, ...(booking.cppt?.documents ?? [])]} /></div><div className="mt-4"><TreatmentDocumentForm bookingId={booking.id} cpptId={booking.cppt?.id} /></div></Card></div></DashboardShell>;
}
