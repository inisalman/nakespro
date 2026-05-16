"use client";

import { useActionState } from "react";
import { deleteAvailabilitySchedule, togglePractitionerAvailability, upsertAvailabilitySchedule } from "@/lib/practitioner/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
type Schedule = { id: string; dayOfWeek: number; startTime: string; endTime: string; isActive: boolean };

function ScheduleForm({ schedule }: { schedule?: Schedule }) {
  const [state, action, pending] = useActionState(upsertAvailabilitySchedule, {});
  return (
    <form action={action} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1fr_1fr_auto_auto] md:items-end">
      {schedule ? <input type="hidden" name="scheduleId" value={schedule.id} /> : null}
      <label className="text-sm font-semibold text-slate-700">Hari<Select name="dayOfWeek" defaultValue={schedule?.dayOfWeek ?? 1}>{days.map((d, i) => <option key={d} value={i}>{d}</option>)}</Select></label>
      <label className="text-sm font-semibold text-slate-700">Mulai<Input name="startTime" type="time" defaultValue={schedule?.startTime ?? "09:00"} /></label>
      <label className="text-sm font-semibold text-slate-700">Selesai<Input name="endTime" type="time" defaultValue={schedule?.endTime ?? "17:00"} /></label>
      <label className="flex h-11 items-center gap-2 text-sm font-semibold text-slate-700"><input name="isActive" type="checkbox" defaultChecked={schedule?.isActive ?? true} /> Aktif</label>
      <Button disabled={pending}>{schedule ? "Simpan" : "Tambah"}</Button>
      {state.message ? <p className="text-sm text-teal-700 md:col-span-5">{state.message}</p> : null}
    </form>
  );
}

export function ScheduleManager({ schedules, isAvailable }: { schedules: Schedule[]; isAvailable: boolean }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="font-bold text-slate-950">Status menerima pasien: {isAvailable ? "Aktif" : "Nonaktif"}</p><p className="text-sm text-slate-500">Status ini juga dipakai di halaman publik.</p></div>
        <form action={togglePractitionerAvailability}><Button variant="secondary">{isAvailable ? "Nonaktifkan" : "Aktifkan"}</Button></form>
      </div>
      <ScheduleForm />
      <div className="space-y-3">
        {schedules.map((schedule) => <div key={schedule.id} className="space-y-2"><ScheduleForm schedule={schedule} /><form action={deleteAvailabilitySchedule}><input type="hidden" name="scheduleId" value={schedule.id} /><Button variant="danger">Hapus {days[schedule.dayOfWeek]}</Button></form></div>)}
      </div>
    </div>
  );
}
