"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addPractitionerDocument, type PractitionerActionState } from "@/lib/practitioner/actions";

const initialState: PractitionerActionState = {};

export function PractitionerDocumentForm() {
  const [state, action, pending] = useActionState(addPractitionerDocument, initialState);

  return (
    <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Jenis dokumen</label>
          <Input name="documentType" placeholder="STR, SIP, sertifikat" required />
          {state.errors?.documentType ? <p className="mt-2 text-sm text-red-600">{state.errors.documentType[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">URL dokumen</label>
          <Input name="fileUrl" type="url" placeholder="https://..." required />
          {state.errors?.fileUrl ? <p className="mt-2 text-sm text-red-600">{state.errors.fileUrl[0]}</p> : null}
        </div>
      </div>
      {state.message ? <p className="text-sm text-teal-700">{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Tambah Dokumen</Button>
    </form>
  );
}
