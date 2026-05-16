"use client";

import { useActionState } from "react";
import { addPractitionerDocument, removePractitionerDocument, submitForVerification } from "@/lib/practitioner/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Document = { id: string; documentType: string; fileUrl: string; status: string; createdAt: Date };

export function DocumentsSection({ documents }: { documents: Document[] }) {
  const [state, action, pending] = useActionState(addPractitionerDocument, {});

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-lg font-bold text-slate-950">Dokumen verifikasi</h2><p className="text-sm text-slate-500">Gunakan URL dokumen sampai fitur upload tersedia.</p></div>
        <form action={submitForVerification}><Button variant="secondary">Submit verifikasi</Button></form>
      </div>
      <div className="grid gap-3">
        {documents.length ? documents.map((doc) => (
          <div key={doc.id} className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-semibold text-slate-950">{doc.documentType}</p><a href={doc.fileUrl} className="text-sm text-teal-700">{doc.fileUrl}</a><p className="text-xs text-slate-500">Status: {doc.status}</p></div>
            <form action={removePractitionerDocument}><input type="hidden" name="documentId" value={doc.id} /><Button variant="danger">Hapus</Button></form>
          </div>
        )) : <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">Belum ada dokumen.</p>}
      </div>
      <form action={action} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
        <Input name="documentType" placeholder="Jenis dokumen" required />
        <Input name="fileUrl" type="url" placeholder="https://..." required />
        <Button disabled={pending}>{pending ? "Menambah..." : "Tambah"}</Button>
      </form>
      {state.message ? <p className="text-sm text-teal-700">{state.message}</p> : null}
    </section>
  );
}
