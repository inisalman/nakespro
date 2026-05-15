"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { approvePractitionerVerification, rejectPractitionerVerification, type AdminActionState } from "@/lib/admin/actions";

const initialState: AdminActionState = {};

export function VerifyPractitionerForm({ practitionerId }: { practitionerId: string }) {
  const [approveState, approveAction, approvePending] = useActionState(approvePractitionerVerification, initialState);
  const [rejectState, rejectAction, rejectPending] = useActionState(rejectPractitionerVerification, initialState);

  return (
    <div className="grid gap-4 rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
      <div>
        <p className="font-semibold text-slate-950">Keputusan verifikasi</p>
        <p className="mt-1 text-sm text-slate-600">Setujui jika profil dan dokumen valid, atau tolak dengan alasan.</p>
      </div>
      <form action={approveAction}>
        <input type="hidden" name="practitionerId" value={practitionerId} />
        {approveState.message ? <p className="mb-2 text-sm text-slate-600">{approveState.message}</p> : null}
        <Button type="submit" disabled={approvePending}>Setujui verifikasi</Button>
      </form>
      <form action={rejectAction} className="grid gap-3">
        <input type="hidden" name="practitionerId" value={practitionerId} />
        <Textarea name="rejectionReason" placeholder="Alasan penolakan" required />
        {rejectState.errors?.rejectionReason ? <p className="text-sm text-red-600">{rejectState.errors.rejectionReason[0]}</p> : null}
        {rejectState.message ? <p className="text-sm text-slate-600">{rejectState.message}</p> : null}
        <Button type="submit" variant="danger" disabled={rejectPending} className="w-fit">Tolak verifikasi</Button>
      </form>
    </div>
  );
}
