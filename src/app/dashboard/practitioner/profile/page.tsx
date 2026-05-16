import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { deletePractitionerDocument, submitPractitionerForVerification } from "@/lib/practitioner/actions";
import { PractitionerDocumentForm } from "./practitioner-document-form";
import { PractitionerProfileForm } from "./practitioner-profile-form";

export default async function PractitionerProfilePage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const practitionerId = user.practitionerProfile?.id;

  const profile = practitionerId
    ? await prisma.practitionerProfile.findUnique({ where: { id: practitionerId }, include: { user: true, documents: { orderBy: { createdAt: "desc" } } } })
    : null;

  if (!profile) {
    return <DashboardShell title="Profil Nakes" description="Lengkapi data profil tenaga kesehatan."><Card>Profil belum tersedia.</Card></DashboardShell>;
  }

  return (
    <DashboardShell title="Profil Nakes" description="Kelola profil, area layanan, dan dokumen verifikasi.">
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Data profil</h2>
              <p className="mt-1 text-sm text-slate-500">Slug profil publik tetap {profile.slug}.</p>
            </div>
            <Badge variant={profile.verificationStatus === "VERIFIED" ? "teal" : "amber"}>{profile.verificationStatus}</Badge>
          </div>
          <PractitionerProfileForm practitioner={{
            name: profile.user.name ?? "",
            email: profile.user.email,
            phone: profile.user.phone ?? "",
            image: profile.user.image ?? "",
            profession: profile.profession,
            specialization: profile.specialization ?? "",
            bio: profile.bio ?? "",
            experienceYears: profile.experienceYears ?? "",
            serviceArea: profile.serviceArea ?? "",
            licenseNumber: profile.licenseNumber ?? "",
            isAvailable: profile.isAvailable,
          }} />
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-slate-950">Dokumen verifikasi</h2>
            <p className="mt-1 text-sm text-slate-500">Gunakan URL dokumen untuk tahap MVP.</p>
            <div className="mt-4"><PractitionerDocumentForm /></div>
            <div className="mt-4 space-y-3">
              {profile.documents.map((document) => (
                <div key={document.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{document.documentType}</p>
                      <a href={document.fileUrl} className="mt-1 block break-all text-sm text-teal-700">{document.fileUrl}</a>
                      <Badge variant="slate" className="mt-2">{document.status}</Badge>
                    </div>
                    <form action={deletePractitionerDocument}>
                      <input type="hidden" name="documentId" value={document.id} />
                      <Button type="submit" variant="danger" className="h-9 px-3">Hapus</Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold text-slate-950">Ajukan verifikasi</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Pastikan profil dan dokumen sudah lengkap sebelum diajukan ke admin.</p>
            <form action={submitPractitionerForVerification} className="mt-4">
              <Button type="submit">Submit Verifikasi</Button>
            </form>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
