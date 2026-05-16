import Link from "next/link";
import { Plus } from "lucide-react";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { togglePractitionerService } from "@/lib/practitioner/actions";
import { formatCurrency } from "@/lib/utils";

export default async function PractitionerServicesPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const practitionerId = user.practitionerProfile?.id;
  const services = practitionerId ? await prisma.practitionerService.findMany({ where: { practitionerId }, include: { category: true }, orderBy: { createdAt: "desc" } }) : [];

  return (
    <DashboardShell title="Layanan" description="Kelola layanan, harga, durasi, dan status aktif." actions={<Link href="/dashboard/practitioner/services/new" className="inline-flex h-10 items-center gap-2 rounded-xl bg-teal-500 px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Tambah Layanan</Link>}>
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-950">{service.name}</h2>
                  <Badge variant={service.isActive ? "teal" : "slate"}>{service.isActive ? "Aktif" : "Nonaktif"}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{service.category.name} · {service.durationMinutes} menit · {formatCurrency(service.price)}</p>
                {service.description ? <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p> : null}
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/practitioner/services/${service.id}/edit`} className="inline-flex h-10 items-center rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700">Edit</Link>
                <form action={togglePractitionerService}>
                  <input type="hidden" name="serviceId" value={service.id} />
                  <Button type="submit" variant="secondary" className="h-10">{service.isActive ? "Nonaktifkan" : "Aktifkan"}</Button>
                </form>
              </div>
            </div>
          </Card>
        ))}
        {services.length === 0 ? <Card><p className="text-sm text-slate-600">Belum ada layanan.</p></Card> : null}
      </div>
    </DashboardShell>
  );
}
