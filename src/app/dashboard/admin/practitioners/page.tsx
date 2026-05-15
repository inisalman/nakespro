import Link from "next/link";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ToggleUserForm } from "../users/toggle-user-form";

export default async function AdminPractitionersPage() {
  await requireRole(UserRole.ADMIN);
  const practitioners = await prisma.practitionerProfile.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, _count: { select: { services: true, bookings: true } } },
  });

  return (
    <DashboardShell title="Manajemen Nakes" description="Kelola akun, status verifikasi, layanan, dan aktivitas nakes.">
      <Card className="overflow-hidden p-0">
        <ul className="divide-y divide-slate-100">
          {practitioners.map((practitioner) => (
            <li key={practitioner.id} className="grid gap-3 p-5 lg:grid-cols-12 lg:items-center">
              <Link href={`/dashboard/admin/practitioners/${practitioner.id}`} className="lg:col-span-4">
                <p className="font-semibold text-slate-950">{practitioner.user.name ?? practitioner.user.email}</p>
                <p className="text-sm text-slate-500">{practitioner.profession}{practitioner.specialization ? ` · ${practitioner.specialization}` : ""}</p>
              </Link>
              <span className="w-fit rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700 lg:col-span-2">{practitioner.verificationStatus}</span>
              <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold lg:col-span-2 ${practitioner.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{practitioner.isAvailable ? "Tersedia" : "Tidak tersedia"}</span>
              <p className="text-sm text-slate-600 lg:col-span-2">{practitioner._count.services} layanan · {practitioner._count.bookings} booking</p>
              <div className="lg:col-span-2 lg:flex lg:justify-end"><ToggleUserForm userId={practitioner.userId} isActive={practitioner.user.isActive} /></div>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardShell>
  );
}
