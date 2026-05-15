import Link from "next/link";
import { UserRole, VerificationStatus } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

export default async function AdminVerificationsPage() {
  await requireRole(UserRole.ADMIN);
  const practitioners = await prisma.practitionerProfile.findMany({
    where: { verificationStatus: VerificationStatus.PENDING },
    orderBy: { updatedAt: "asc" },
    include: { user: true, _count: { select: { documents: true, services: true } } },
  });

  return (
    <DashboardShell title="Verifikasi Nakes" description="Antrean nakes yang menunggu tinjauan dokumen dan profil.">
      <Card className="overflow-hidden p-0">
        <ul className="divide-y divide-slate-100">
          {practitioners.map((practitioner) => (
            <li key={practitioner.id}>
              <Link href={`/dashboard/admin/practitioners/${practitioner.id}`} className="grid gap-2 p-5 hover:bg-slate-50 md:grid-cols-12 md:items-center">
                <div className="md:col-span-5"><p className="font-semibold text-slate-950">{practitioner.user.name ?? practitioner.user.email}</p><p className="text-sm text-slate-500">{practitioner.profession}</p></div>
                <p className="text-sm text-slate-600 md:col-span-3">{practitioner._count.documents} dokumen · {practitioner._count.services} layanan</p>
                <p className="text-sm text-slate-600 md:col-span-2">Diajukan {practitioner.updatedAt.toLocaleDateString("id-ID")}</p>
                <span className="text-sm font-semibold text-teal-700 md:col-span-2 md:text-right">Review</span>
              </Link>
            </li>
          ))}
          {practitioners.length === 0 ? <li className="p-8 text-center text-sm text-slate-500">Tidak ada antrean verifikasi.</li> : null}
        </ul>
      </Card>
    </DashboardShell>
  );
}
