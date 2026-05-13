import { CalendarCheck, FileText, ShieldCheck, Users } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";

const stats = [
  [Users, "Pasien", "128"],
  [ShieldCheck, "Nakes terverifikasi", "32"],
  [CalendarCheck, "Total booking", "214"],
  [FileText, "Invoice", "198"],
];

export default function AdminDashboardPage() {
  return (
    <DashboardShell title="Dashboard Admin" description="Pantau pengguna, verifikasi nakes, booking, invoice, dan kategori layanan.">
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
