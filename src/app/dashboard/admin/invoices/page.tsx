import Link from "next/link";
import { PaymentStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminInvoicesPage({ searchParams }: { searchParams: Promise<{ paymentStatus?: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { paymentStatus } = await searchParams;
  const validStatus = Object.values(PaymentStatus).includes(paymentStatus as PaymentStatus) ? (paymentStatus as PaymentStatus) : undefined;
  const invoices = await prisma.invoice.findMany({ where: validStatus ? { paymentStatus: validStatus } : undefined, orderBy: { issuedAt: "desc" }, include: { booking: { include: { patient: { include: { user: true } }, practitioner: { include: { user: true } }, service: true } } } });
  return <DashboardShell title="Monitoring Invoice" description="Pantau invoice dan status pembayaran." actions={<div className="flex flex-wrap gap-2"><Link href="/dashboard/admin/invoices" className="text-sm font-semibold text-teal-700">Semua</Link>{Object.values(PaymentStatus).map((s) => <Link key={s} href={`/dashboard/admin/invoices?paymentStatus=${s}`} className="text-sm text-slate-600 hover:text-teal-700">{s}</Link>)}</div>}><Card className="overflow-hidden p-0"><ul className="divide-y divide-slate-100">{invoices.map((invoice) => <li key={invoice.id}><Link href={`/dashboard/admin/invoices/${invoice.id}`} className="grid gap-3 p-5 hover:bg-slate-50 md:grid-cols-12 md:items-center"><div className="md:col-span-3"><p className="font-semibold text-slate-950">{invoice.invoiceNumber}</p><p className="text-sm text-slate-500">{invoice.issuedAt.toLocaleDateString("id-ID")}</p></div><div className="md:col-span-3"><p className="text-sm font-medium text-slate-950">{invoice.booking.patient.user.name ?? invoice.booking.patient.user.email}</p><p className="text-sm text-slate-500">{invoice.booking.practitioner.user.name ?? invoice.booking.practitioner.user.email}</p></div><p className="text-sm text-slate-600 md:col-span-2">{invoice.booking.service.name}</p><span className="w-fit rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 md:col-span-2">{invoice.paymentStatus}</span><p className="font-semibold text-slate-950 md:col-span-2 md:text-right">{formatCurrency(invoice.total)}</p></Link></li>)}</ul></Card></DashboardShell>;
}
