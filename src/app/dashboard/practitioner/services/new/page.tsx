import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../service-form";

export default async function NewPractitionerServicePage() {
  await requireRole(UserRole.PRACTITIONER);
  const categories = await prisma.serviceCategory.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { id: true, name: true } });
  return <DashboardShell title="Tambah Layanan" description="Buat layanan baru untuk pasien."><Card><ServiceForm categories={categories} /></Card></DashboardShell>;
}
