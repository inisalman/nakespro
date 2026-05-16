"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { upsertCppt, type PractitionerActionState } from "@/lib/practitioner/actions";

const fields = [["subjective", "Subjektif"], ["objective", "Objektif"], ["assessment", "Assessment"], ["plan", "Plan"], ["actionTaken", "Tindakan"], ["education", "Edukasi"], ["followUpPlan", "Rencana tindak lanjut"], ["additionalNotes", "Catatan tambahan"]] as const;
const initialState: PractitionerActionState = {};

type Cppt = Partial<Record<(typeof fields)[number][0], string | null>>;

export function CpptForm({ bookingId, cppt }: { bookingId: string; cppt?: Cppt | null }) {
  const [state, action, pending] = useActionState(upsertCppt, initialState);
  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="bookingId" value={bookingId} />
      {fields.map(([name, label]) => <div key={name}><label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label><Textarea name={name} defaultValue={cppt?.[name] ?? ""} /></div>)}
      {state.message ? <p className={state.message.includes("berhasil") ? "text-sm text-teal-700" : "text-sm text-red-600"}>{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Simpan CPPT</Button>
    </form>
  );
}
