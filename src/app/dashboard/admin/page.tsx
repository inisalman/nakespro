import Link from "next/link";
import { CalendarCheck, FileText, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { UserRole, VerificationStatus } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  await requireRole(UserRole.ADMIN);
  const [patients, practitioners, pendingPractitioners, bookings, invoices] = await Promise.all([
    prisma.user.count({ where: { role: UserRole.PATIENT } }),
    prisma.user.count({ where: { role: UserRole.PRACTITIONER } }),
    prisma.practitionerProfile.count({ where: { verificationStatus: VerificationStatus.PENDING } }),
    prisma.booking.count(),
    prisma.invoice.count(),
  ]);

  return (
    <DashboardShell title="Dashboard Admin" description="Pantau pengguna, verifikasi nakes, booking, invoice, dan kategori layanan.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Users} label="Total pasien" value={patients} tone="teal" />
        <StatCard icon={Stethoscope} label="Total nakes" value={practitioners} tone="sky" />
        <StatCard icon={ShieldCheck} label="Menunggu verifikasi" value={pendingPractitioners} tone="amber" />
        <StatCard icon={CalendarCheck} label="Total booking" value={bookings} tone="violet" />
        <StatCard icon={FileText} label="Total invoice" value={invoices} tone="rose" />
      </div>
      {pendingPractitioners > 0 ? (
        <Card className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-950">Ada {pendingPractitioners} nakes menunggu verifikasi</p>
            <p className="mt-1 text-sm text-slate-600">Tinjau dokumen dan profil nakes sebelum mengaktifkan verifikasi.</p>
          </div>
          <Link href="/dashboard/admin/verifications" className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-500 px-5 text-sm font-semibold text-white hover:bg-teal-600">
            Buka antrean verifikasi
          </Link>
        </Card>
      ) : null}
    </DashboardShell>
  );
}
