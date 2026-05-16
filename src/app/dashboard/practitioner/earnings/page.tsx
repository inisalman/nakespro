import { PaymentStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Wallet, FileText } from "lucide-react";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

export default async function PractitionerEarningsPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const [paidAgg, paidCount] = await Promise.all([
    prisma.invoice.aggregate({ _sum: { total: true }, where: { paymentStatus: PaymentStatus.PAID, booking: { practitionerId: user.practitionerProfile?.id } } }),
    prisma.invoice.count({ where: { paymentStatus: PaymentStatus.PAID, booking: { practitionerId: user.practitionerProfile?.id } } }),
  ]);
  return <DashboardShell title="Pendapatan" description="Ringkasan pendapatan dari invoice yang sudah dibayar."><div className="grid gap-4 md:grid-cols-2"><StatCard icon={Wallet} label="Total pendapatan" value={formatCurrency(paidAgg._sum.total ?? 0)} tone="violet" /><StatCard icon={FileText} label="Invoice terbayar" value={paidCount} tone="teal" /></div></DashboardShell>;
}
