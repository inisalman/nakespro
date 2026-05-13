import { CalendarDays, ClipboardList, FileText, Wallet } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";

const stats = [
  [CalendarDays, "Booking hari ini", "5"],
  [ClipboardList, "CPPT belum lengkap", "2"],
  [FileText, "Invoice bulan ini", "18"],
  [Wallet, "Pendapatan", "Rp3,2 jt"],
];

export default function PractitionerDashboardPage() {
  return (
    <DashboardShell title="Dashboard Nakes" description="Kelola jadwal, booking, CPPT, dokumentasi, dan invoice layanan Anda.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([Icon, label, value]) => (
          <Card key={String(label)}>
            <Icon className="h-6 w-6 text-teal-600" />
            <p className="mt-4 text-sm font-semibold text-slate-500">{String(label)}</p>
            <p className="mt-1 text-3xl font-bold text-slate-950">{String(value)}</p>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
