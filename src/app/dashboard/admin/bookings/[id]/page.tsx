import Link from "next/link";
import { notFound } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { BookingStatusBadge } from "@/components/dashboard/booking-status-badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id }, include: { patient: { include: { user: true } }, practitioner: { include: { user: true } }, service: { include: { category: true } }, cppt: true, documents: true, invoice: true } });
  if (!booking) notFound();
  return (
    <DashboardShell title="Detail Booking" description="Monitoring read-only booking, CPPT, dokumen, dan invoice.">
      <div className="grid gap-5 lg:grid-cols-3"><Card><p className="text-sm font-semibold text-slate-500">Pasien</p><p className="mt-2 font-semibold text-slate-950">{booking.patient.user.name ?? booking.patient.user.email}</p><p className="text-sm text-slate-500">{booking.patient.user.email}</p></Card><Card><p className="text-sm font-semibold text-slate-500">Nakes</p><p className="mt-2 font-semibold text-slate-950">{booking.practitioner.user.name ?? booking.practitioner.user.email}</p><p className="text-sm text-slate-500">{booking.practitioner.profession}</p></Card><Card><p className="text-sm font-semibold text-slate-500">Status</p><div className="mt-2"><BookingStatusBadge status={booking.status} /></div>{booking.cancellationReason ? <p className="mt-2 text-sm text-slate-600">{booking.cancellationReason}</p> : null}</Card></div>
      <Card className="mt-6"><h2 className="font-semibold text-slate-950">Layanan & jadwal</h2><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-slate-500">Layanan</dt><dd className="font-medium text-slate-950">{booking.service.name}</dd></div><div><dt className="text-slate-500">Kategori</dt><dd>{booking.service.category.name}</dd></div><div><dt className="text-slate-500">Jadwal</dt><dd>{booking.bookingDate.toLocaleDateString("id-ID")} · {booking.bookingTime}</dd></div><div><dt className="text-slate-500">Alamat</dt><dd>{booking.address}</dd></div><div><dt className="text-slate-500">Catatan</dt><dd>{booking.notes ?? "-"}</dd></div></dl></Card>
      <div className="mt-6 grid gap-5 lg:grid-cols-2"><Card><h2 className="font-semibold text-slate-950">CPPT</h2>{booking.cppt ? <dl className="mt-4 space-y-2 text-sm"><div><dt className="text-slate-500">Assessment</dt><dd>{booking.cppt.assessment ?? "-"}</dd></div><div><dt className="text-slate-500">Plan</dt><dd>{booking.cppt.plan ?? "-"}</dd></div><div><dt className="text-slate-500">Tindakan</dt><dd>{booking.cppt.actionTaken ?? "-"}</dd></div></dl> : <p className="mt-4 text-sm text-slate-500">Belum ada CPPT.</p>}</Card><Card><h2 className="font-semibold text-slate-950">Dokumen tindakan</h2><div className="mt-4 space-y-2">{booking.documents.map((doc) => <a key={doc.id} href={doc.fileUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-100 p-3 text-sm hover:bg-slate-50">{doc.documentType} · {doc.description ?? "Dokumen"}</a>)}{booking.documents.length === 0 ? <p className="text-sm text-slate-500">Tidak ada dokumen.</p> : null}</div></Card></div>
      <Card className="mt-6"><h2 className="font-semibold text-slate-950">Invoice</h2>{booking.invoice ? <div className="mt-4 flex items-center justify-between"><div><p className="font-medium text-slate-950">{booking.invoice.invoiceNumber}</p><p className="text-sm text-slate-500">{booking.invoice.paymentStatus}</p></div><Link href={`/dashboard/admin/invoices/${booking.invoice.id}`} className="font-semibold text-teal-700">{formatCurrency(booking.invoice.total)}</Link></div> : <p className="mt-4 text-sm text-slate-500">Belum ada invoice.</p>}</Card>
    </DashboardShell>
  );
}
