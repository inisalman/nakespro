import { UserRole } from "@/generated/prisma/enums";
import { requireRole } from "@/lib/auth/dal";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(UserRole.ADMIN);
  return children;
}
