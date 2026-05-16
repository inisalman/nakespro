import { UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { deleteSchedule, setPractitionerAvailability } from "@/lib/practitioner/actions";
import { ScheduleForm } from "./schedule-form";

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default async function PractitionerSchedulePage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const practitionerId = user.practitionerProfile?.id;
  const profile = practitionerId ? await prisma.practitionerProfile.findUnique({ where: { id: practitionerId }, include: { schedules: { orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }] } } }) : null;

  return (
    <DashboardShell title="Jadwal" description="Atur jadwal praktik dan status menerima pasien.">
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Tambah jadwal</h2>
          <div className="mt-4"><ScheduleForm /></div>
          <div className="mt-6 space-y-4">
            {profile?.schedules.map((schedule) => (
              <div key={schedule.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div><p className="font-bold text-slate-950">{days[schedule.dayOfWeek]}</p><p className="text-sm text-slate-500">{schedule.startTime}–{schedule.endTime}</p></div>
                  <Badge variant={schedule.isActive ? "teal" : "slate"}>{schedule.isActive ? "Aktif" : "Nonaktif"}</Badge>
                </div>
                <ScheduleForm schedule={schedule} />
                <form action={deleteSchedule} className="mt-3">
                  <input type="hidden" name="scheduleId" value={schedule.id} />
                  <Button type="submit" variant="danger" className="h-9">Hapus Jadwal</Button>
                </form>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">Status praktik</h2>
          <p className="mt-2 text-sm text-slate-600">Status saat ini: <strong>{profile?.isAvailable ? "Menerima pasien" : "Tidak menerima pasien"}</strong></p>
          <form action={setPractitionerAvailability} className="mt-4 space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" name="isAvailable" defaultChecked={profile?.isAvailable ?? false} /> Menerima pasien baru</label>
            <Button type="submit">Simpan Status</Button>
          </form>
        </Card>
      </div>
    </DashboardShell>
  );
}
