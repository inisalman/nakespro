import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { BookingStatusBadge } from "@/components/dashboard/booking-status-badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { TreatmentDocumentForm } from "../../cppt/treatment-document-form";
import { TreatmentDocumentList } from "../../cppt/treatment-document-list";
import { BookingActions } from "../booking-actions";

export default async function PractitionerBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(UserRole.PRACTITIONER);
  const { id } = await params;
  const practitionerId = user.practitionerProfile?.id;
  const booking = practitionerId ? await prisma.booking.findFirst({ where: { id, practitionerId }, include: { patient: { include: { user: true } }, service: { include: { category: true } }, invoice: true, cppt: true, documents: true } }) : null;
  if (!booking) notFound();

  return (
    <DashboardShell title="Detail Booking" description="Kelola status booking, CPPT, dan dokumentasi tindakan.">
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><BookingStatusBadge status={booking.status} /><h2 className="mt-3 text-2xl font-bold text-slate-950">{booking.service.name}</h2><p className="mt-1 text-sm text-slate-600">{booking.patient.user.name ?? "Pasien"} · {booking.service.category.name}</p></div><p className="font-bold text-slate-950">{formatCurrency(booking.service.price)}</p></div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2"><div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><CalendarDays className="h-4 w-4" /> {booking.bookingDate.toLocaleDateString("id-ID")} {booking.bookingTime}</div><div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><MapPin className="h-4 w-4" /> {booking.address}</div></div>
            {booking.notes ? <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{booking.notes}</p> : null}
            {booking.cancellationReason ? <p className="mt-4 text-sm text-red-600">Alasan: {booking.cancellationReason}</p> : null}
          </Card>
          <Card>
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-950">CPPT</h2>{(booking.status === BookingStatus.IN_PROGRESS || booking.status === BookingStatus.COMPLETED) ? <Link className="text-sm font-semibold text-teal-700" href={`/dashboard/practitioner/cppt/${booking.id}/edit`}>{booking.cppt ? "Edit CPPT" : "Isi CPPT"}</Link> : null}</div>
            {booking.cppt ? <div className="mt-4 space-y-2 text-sm text-slate-600"><p><strong>Assessment:</strong> {booking.cppt.assessment ?? "-"}</p><p><strong>Tindakan:</strong> {booking.cppt.actionTaken ?? "-"}</p></div> : <p className="mt-3 text-sm text-slate-500">CPPT belum diisi.</p>}
          </Card>
          <Card>
            <h2 className="text-xl font-bold text-slate-950">Dokumentasi tindakan</h2>
            <div className="mt-4"><TreatmentDocumentList documents={booking.documents} /></div>
            <div className="mt-4"><TreatmentDocumentForm bookingId={booking.id} cpptId={booking.cppt?.id} /></div>
          </Card>
        </div>
        <div className="space-y-6"><Card><h2 className="mb-4 text-xl font-bold text-slate-950">Aksi booking</h2><BookingActions bookingId={booking.id} status={booking.status} /></Card><Card><h2 className="text-xl font-bold text-slate-950">Invoice</h2>{booking.invoice ? <div className="mt-3 text-sm text-slate-600"><p>{booking.invoice.invoiceNumber}</p><p className="font-bold text-slate-950">{formatCurrency(booking.invoice.total)}</p><p>{booking.invoice.paymentStatus}</p></div> : <p className="mt-3 text-sm text-slate-500">Invoice dibuat otomatis saat layanan selesai.</p>}</Card></div>
      </div>
    </DashboardShell>
  );
}
