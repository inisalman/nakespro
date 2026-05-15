import Link from "next/link";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { toggleServiceCategory } from "@/lib/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  await requireRole(UserRole.ADMIN);
  const categories = await prisma.serviceCategory.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { services: true } } } });
  return (
    <DashboardShell title="Kategori Layanan" description="Kelola kategori layanan tanpa menghapus referensi layanan." actions={<Link href="/dashboard/admin/categories/new" className="inline-flex h-11 items-center rounded-xl bg-teal-500 px-5 text-sm font-semibold text-white hover:bg-teal-600">Tambah kategori</Link>}>
      <Card className="overflow-hidden p-0"><ul className="divide-y divide-slate-100">{categories.map((category) => <li key={category.id} className="grid gap-3 p-5 md:grid-cols-12 md:items-center"><div className="md:col-span-5"><p className="font-semibold text-slate-950">{category.name}</p><p className="text-sm text-slate-500">/{category.slug}</p><p className="mt-1 text-sm text-slate-600">{category.description ?? "-"}</p></div><span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold md:col-span-2 ${category.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{category.isActive ? "Aktif" : "Nonaktif"}</span><p className="text-sm text-slate-600 md:col-span-2">{category._count.services} layanan</p><div className="flex gap-2 md:col-span-3 md:justify-end"><Link href={`/dashboard/admin/categories/${category.id}/edit`} className="inline-flex h-9 items-center rounded-xl border border-teal-100 px-3 text-sm font-semibold text-teal-700 hover:bg-teal-50">Edit</Link><form action={toggleServiceCategory}><input type="hidden" name="categoryId" value={category.id} /><Button type="submit" variant="ghost" className="h-9 px-3">{category.isActive ? "Nonaktifkan" : "Aktifkan"}</Button></form></div></li>)}</ul></Card>
    </DashboardShell>
  );
}
