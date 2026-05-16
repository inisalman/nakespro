import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function PractitionerInvoicesPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const invoices = await prisma.invoice.findMany({ where: { booking: { practitionerId: user.practitionerProfile?.id } }, include: { booking: { include: { patient: { include: { user: { select: { name: true } } } }, service: true } } }, orderBy: { issuedAt: "desc" } });
  return <DashboardShell title="Invoice" description="Daftar invoice layanan nakes secara read-only."><div className="grid gap-4">{invoices.map((invoice) => <div key={invoice.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex justify-between gap-3"><div><h2 className="font-bold text-slate-950">{invoice.invoiceNumber}</h2><p className="text-sm text-slate-500">{invoice.booking.patient.user.name ?? "Pasien"} · {invoice.booking.service.name}</p></div><Badge>{invoice.paymentStatus}</Badge></div><p className="mt-3 text-xl font-bold text-slate-950">{formatCurrency(invoice.total)}</p></div>)}{!invoices.length ? <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Belum ada invoice.</p> : null}</div></DashboardShell>;
}
