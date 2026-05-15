import Link from "next/link";
import { notFound } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminInvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id }, include: { booking: { include: { patient: { include: { user: true } }, practitioner: { include: { user: true } }, service: true } } } });
  if (!invoice) notFound();
  return (
    <DashboardShell title={invoice.invoiceNumber} description="Detail invoice read-only dan relasi booking.">
      <div className="grid gap-5 lg:grid-cols-3"><Card><p className="text-sm font-semibold text-slate-500">Status pembayaran</p><p className="mt-2 text-2xl font-bold text-slate-950">{invoice.paymentStatus}</p></Card><Card><p className="text-sm font-semibold text-slate-500">Tanggal terbit</p><p className="mt-2 font-semibold text-slate-950">{invoice.issuedAt.toLocaleDateString("id-ID")}</p></Card><Card><p className="text-sm font-semibold text-slate-500">Tanggal bayar</p><p className="mt-2 font-semibold text-slate-950">{invoice.paidAt?.toLocaleDateString("id-ID") ?? "-"}</p></Card></div>
      <Card className="mt-6"><h2 className="font-semibold text-slate-950">Rincian biaya</h2><dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{formatCurrency(invoice.subtotal)}</dd></div><div className="flex justify-between"><dt>Biaya tambahan</dt><dd>{formatCurrency(invoice.additionalFee)}</dd></div><div className="flex justify-between"><dt>Diskon</dt><dd>{formatCurrency(invoice.discount)}</dd></div><div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-950"><dt>Total</dt><dd>{formatCurrency(invoice.total)}</dd></div></dl></Card>
      <Card className="mt-6"><h2 className="font-semibold text-slate-950">Booking & peserta</h2><div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><p className="text-slate-500">Pasien</p><p className="font-medium text-slate-950">{invoice.booking.patient.user.name ?? invoice.booking.patient.user.email}</p></div><div><p className="text-slate-500">Nakes</p><p className="font-medium text-slate-950">{invoice.booking.practitioner.user.name ?? invoice.booking.practitioner.user.email}</p></div><div><p className="text-slate-500">Layanan</p><p className="font-medium text-slate-950">{invoice.booking.service.name}</p></div><div><p className="text-slate-500">Booking</p><Link href={`/dashboard/admin/bookings/${invoice.bookingId}`} className="font-semibold text-teal-700">Lihat detail booking</Link></div></div></Card>
    </DashboardShell>
  );
}
