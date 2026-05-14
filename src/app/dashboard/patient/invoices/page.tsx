import Link from "next/link";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default async function PatientInvoicesPage() {
  const user = await requireRole(UserRole.PATIENT);
  const invoices = user.patientProfile?.id
    ? await prisma.invoice.findMany({
        where: { booking: { patientId: user.patientProfile.id } },
        orderBy: { issuedAt: "desc" },
        include: { booking: { include: { service: { select: { name: true } }, practitioner: { include: { user: { select: { name: true } } } }, cppt: { select: { id: true } } } } },
      })
    : [];

  return (
    <DashboardShell title="Invoice & CPPT" description="Lihat invoice pembayaran dan akses CPPT dari layanan yang sudah selesai.">
      {invoices.length ? (
        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <Link key={invoice.id} href={`/dashboard/patient/bookings/${invoice.bookingId}`}>
              <Card className="transition hover:border-teal-200 hover:bg-teal-50/40">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-bold text-slate-950">{invoice.invoiceNumber}</h2>
                    <p className="mt-1 text-sm text-slate-600">{invoice.booking.service.name} · {invoice.booking.practitioner.user.name ?? "Tenaga Kesehatan"}</p>
                    <p className="mt-1 text-xs text-slate-500">Terbit {invoice.issuedAt.toLocaleDateString("id-ID")}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Badge>{invoice.paymentStatus}</Badge>
                    {invoice.booking.cppt ? <Badge variant="blue">CPPT tersedia</Badge> : null}
                    <p className="w-full text-lg font-bold text-slate-950 sm:w-auto">{formatCurrency(invoice.total)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="Belum ada invoice" description="Invoice akan muncul setelah layanan selesai dan dibuat oleh sistem." />
      )}
    </DashboardShell>
  );
}
