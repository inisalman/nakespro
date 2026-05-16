import { redirect } from "next/navigation";
import { dashboardPathForRole, requireAuth } from "@/lib/auth/dal";

export default async function DashboardIndexPage() {
  const user = await requireAuth();
  redirect(dashboardPathForRole(user.role));
}
