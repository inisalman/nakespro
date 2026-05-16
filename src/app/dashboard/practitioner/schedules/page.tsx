import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ScheduleManager } from "./schedule-manager";

export default async function PractitionerSchedulesPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const profile = await prisma.practitionerProfile.findUnique({
    where: { id: user.practitionerProfile?.id },
    include: { schedules: { orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }] } },
  });

  return (
    <DashboardShell title="Jadwal Praktik" description="Kelola hari dan jam praktik yang tersedia untuk pasien.">
      <ScheduleManager schedules={profile?.schedules ?? []} isAvailable={profile?.isAvailable ?? false} />
    </DashboardShell>
  );
}
