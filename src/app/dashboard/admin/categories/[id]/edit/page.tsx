import { notFound } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "../../category-form";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { id } = await params;
  const category = await prisma.serviceCategory.findUnique({ where: { id }, select: { id: true, name: true, slug: true, description: true, isActive: true } });
  if (!category) notFound();
  return <DashboardShell title="Edit Kategori" description="Perbarui nama, slug, deskripsi, dan status kategori."><Card><CategoryForm category={category} /></Card></DashboardShell>;
}
