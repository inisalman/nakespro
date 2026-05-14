import { UserRole } from "@/generated/prisma/enums";
import { Card } from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { PatientProfileForm } from "./patient-profile-form";

function formatDateInput(date?: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export default async function PatientProfilePage() {
  const currentUser = await requireRole(UserRole.PATIENT);
  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: {
      name: true,
      email: true,
      phone: true,
      patientProfile: {
        select: {
          address: true,
          birthDate: true,
          gender: true,
          emergencyContact: true,
        },
      },
    },
  });

  return (
    <DashboardShell title="Profil Pasien" description="Lengkapi data diri dan alamat utama untuk mempercepat proses booking layanan.">
      <Card className="max-w-4xl p-6 sm:p-8">
        <PatientProfileForm
          patient={{
            name: user?.name ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            address: user?.patientProfile?.address ?? "",
            birthDate: formatDateInput(user?.patientProfile?.birthDate),
            gender: user?.patientProfile?.gender ?? "",
            emergencyContact: user?.patientProfile?.emergencyContact ?? "",
          }}
        />
      </Card>
    </DashboardShell>
  );
}
