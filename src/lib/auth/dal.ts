import { redirect } from "next/navigation";
import { UserRole, dashboardPathForRole } from "@/lib/auth/roles";
import { auth } from "../../../auth";
import { prisma } from "@/lib/prisma";

export { dashboardPathForRole };

export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      role: true,
      isActive: true,
      patientProfile: { select: { id: true } },
      practitionerProfile: { select: { id: true, profession: true } },
    },
  });
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user?.isActive) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireAuth();

  if (user.role !== role) {
    redirect(dashboardPathForRole(user.role));
  }

  return user;
}
