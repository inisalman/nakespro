"use client";

import { useActionState } from "react";
import { BookingStatus } from "@/generated/prisma/enums";
import { acceptBooking, completeBooking, rejectBooking, startBooking, type PractitionerActionState } from "@/lib/practitioner/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const initialState: PractitionerActionState = {};

type TransitionAction = (_state: PractitionerActionState, formData: FormData) => Promise<PractitionerActionState>;

function TransitionForm({ bookingId, action, label }: { bookingId: string; action: TransitionAction; label: string }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  return <form action={formAction}><input type="hidden" name="bookingId" value={bookingId} /><Button disabled={pending}>{label}</Button>{state.message ? <p className="mt-2 text-sm text-slate-600">{state.message}</p> : null}</form>;
}

export function BookingActions({ bookingId, status }: { bookingId: string; status: BookingStatus }) {
  const [rejectState, rejectAction, rejectPending] = useActionState(rejectBooking, initialState);

  if (status === BookingStatus.PENDING) {
    return <div className="space-y-3"><TransitionForm bookingId={bookingId} action={acceptBooking} label="Terima booking" /><form action={rejectAction} className="space-y-2"><input type="hidden" name="bookingId" value={bookingId} /><Textarea name="cancellationReason" placeholder="Alasan penolakan" required /><Button variant="danger" disabled={rejectPending}>Tolak booking</Button>{rejectState.message ? <p className="text-sm text-red-600">{rejectState.message}</p> : null}</form></div>;
  }
  if (status === BookingStatus.ACCEPTED) return <TransitionForm bookingId={bookingId} action={startBooking} label="Mulai layanan" />;
  if (status === BookingStatus.IN_PROGRESS) return <TransitionForm bookingId={bookingId} action={completeBooking} label="Selesaikan layanan" />;
  return null;
}
