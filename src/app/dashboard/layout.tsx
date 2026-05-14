import { requireAuth } from "@/lib/auth/dal";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return children;
}
