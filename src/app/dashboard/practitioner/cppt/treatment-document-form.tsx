"use client";

import { useActionState } from "react";
import { TreatmentDocumentType } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addTreatmentDocument, type PractitionerActionState } from "@/lib/practitioner/actions";

const initialState: PractitionerActionState = {};

export function TreatmentDocumentForm({ bookingId, cpptId }: { bookingId: string; cpptId?: string }) {
  const [state, action, pending] = useActionState(addTreatmentDocument, initialState);
  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <input type="hidden" name="bookingId" value={bookingId} />
      {cpptId ? <input type="hidden" name="cpptId" value={cpptId} /> : null}
      <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-semibold text-slate-700">Tipe</label><Select name="documentType" defaultValue={TreatmentDocumentType.ATTACHMENT}>{Object.values(TreatmentDocumentType).map((type) => <option key={type} value={type}>{type}</option>)}</Select></div><div><label className="mb-2 block text-sm font-semibold text-slate-700">URL file</label><Input name="fileUrl" type="url" placeholder="https://..." required />{state.errors?.fileUrl ? <p className="mt-2 text-sm text-red-600">{state.errors.fileUrl[0]}</p> : null}</div></div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-700">Deskripsi</label><Textarea name="description" /></div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" name="consentGiven" required /> Pasien menyetujui dokumentasi</label>
      {state.errors?.consentGiven ? <p className="text-sm text-red-600">{state.errors.consentGiven[0]}</p> : null}
      {state.message ? <p className={state.message.includes("berhasil") ? "text-sm text-teal-700" : "text-sm text-red-600"}>{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Tambah Dokumentasi</Button>
    </form>
  );
}
