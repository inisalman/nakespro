import { CalendarCheck, ClipboardList, FileText, Star } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";

const stats = [
  [CalendarCheck, "Booking aktif", "2"],
  [FileText, "Invoice", "4"],
  [ClipboardList, "CPPT tersedia", "3"],
  [Star, "Ulasan tertunda", "1"],
];

export default function PatientDashboardPage() {
  return (
    <DashboardShell title="Dashboard Pasien" description="Pantau booking, invoice, CPPT, dan dokumentasi tindakan Anda.">
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
