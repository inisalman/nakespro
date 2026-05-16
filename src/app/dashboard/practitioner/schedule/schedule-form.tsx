"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createSchedule, updateSchedule, type PractitionerActionState } from "@/lib/practitioner/actions";

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const initialState: PractitionerActionState = {};

type Schedule = { id: string; dayOfWeek: number; startTime: string; endTime: string; isActive: boolean };

export function ScheduleForm({ schedule }: { schedule?: Schedule }) {
  const [state, action, pending] = useActionState(schedule ? updateSchedule : createSchedule, initialState);
  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      {schedule ? <input type="hidden" name="scheduleId" value={schedule.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Hari</label>
          <Select name="dayOfWeek" defaultValue={String(schedule?.dayOfWeek ?? 1)}>{days.map((day, index) => <option key={day} value={index}>{day}</option>)}</Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Mulai</label>
          <Input name="startTime" type="time" defaultValue={schedule?.startTime ?? "09:00"} required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Selesai</label>
          <Input name="endTime" type="time" defaultValue={schedule?.endTime ?? "17:00"} required />
          {state.errors?.endTime ? <p className="mt-2 text-sm text-red-600">{state.errors.endTime[0]}</p> : null}
        </div>
        <label className="flex items-end gap-2 pb-3 text-sm font-semibold text-slate-700"><input type="checkbox" name="isActive" defaultChecked={schedule?.isActive ?? true} /> Aktif</label>
      </div>
      {state.message ? <p className={state.message.includes("berhasil") ? "text-sm text-teal-700" : "text-sm text-red-600"}>{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">{schedule ? "Update" : "Tambah"} Jadwal</Button>
    </form>
  );
}
