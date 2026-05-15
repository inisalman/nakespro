import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { CategoryForm } from "../category-form";

export default async function NewCategoryPage() {
  await requireRole(UserRole.ADMIN);
  return <DashboardShell title="Tambah Kategori" description="Buat kategori layanan baru."><Card><CategoryForm /></Card></DashboardShell>;
}
