import { notFound } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../../service-form";

export default async function EditPractitionerServicePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(UserRole.PRACTITIONER);
  const { id } = await params;
  const practitionerId = user.practitionerProfile?.id;
  const [categories, service] = await Promise.all([
    prisma.serviceCategory.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }),
    practitionerId ? prisma.practitionerService.findFirst({ where: { id, practitionerId } }) : null,
  ]);
  if (!service) notFound();
  return <DashboardShell title="Edit Layanan" description="Perbarui informasi layanan."><Card><ServiceForm categories={categories} service={service} /></Card></DashboardShell>;
}
