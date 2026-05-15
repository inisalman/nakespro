import Link from "next/link";
import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ToggleUserForm } from "./toggle-user-form";

export default async function AdminUsersPage() {
  await requireRole(UserRole.ADMIN);
  const users = await prisma.user.findMany({
    where: { role: UserRole.PATIENT },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, phone: true, isActive: true, createdAt: true },
  });

  return (
    <DashboardShell title="Manajemen Pengguna" description="Kelola akun pasien dan status aktif pengguna.">
      <Card className="overflow-hidden p-0">
        <ul className="divide-y divide-slate-100">
          {users.map((user) => (
            <li key={user.id} className="grid gap-3 p-5 md:grid-cols-12 md:items-center">
              <Link href={`/dashboard/admin/users/${user.id}`} className="md:col-span-4">
                <p className="font-semibold text-slate-950">{user.name ?? "Tanpa nama"}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </Link>
              <p className="text-sm text-slate-600 md:col-span-2">{user.phone ?? "-"}</p>
              <p className="text-sm text-slate-600 md:col-span-2">{user.createdAt.toLocaleDateString("id-ID")}</p>
              <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold md:col-span-2 ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{user.isActive ? "Aktif" : "Nonaktif"}</span>
              <div className="md:col-span-2 md:flex md:justify-end"><ToggleUserForm userId={user.id} isActive={user.isActive} /></div>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardShell>
  );
}
