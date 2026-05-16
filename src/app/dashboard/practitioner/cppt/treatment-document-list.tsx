import { Button } from "@/components/ui/button";
import { deleteTreatmentDocument } from "@/lib/practitioner/actions";

type Document = { id: string; fileUrl: string; documentType: string; description: string | null };

export function TreatmentDocumentList({ documents }: { documents: Document[] }) {
  if (documents.length === 0) return <p className="text-sm text-slate-500">Belum ada dokumentasi.</p>;
  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <div key={document.id} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 p-4">
          <div><p className="font-semibold text-slate-950">{document.documentType}</p><a href={document.fileUrl} className="mt-1 block break-all text-sm text-teal-700">{document.description ?? document.fileUrl}</a></div>
          <form action={deleteTreatmentDocument}><input type="hidden" name="documentId" value={document.id} /><Button type="submit" variant="danger" className="h-9 px-3">Hapus</Button></form>
        </div>
      ))}
    </div>
  );
}
