"use client";

import { useActionState } from "react";
import { BookingStatus } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { acceptBooking, completeBooking, rejectBooking, startBooking, type PractitionerActionState } from "@/lib/practitioner/actions";

const initialState: PractitionerActionState = {};

function ActionForm({ bookingId, action, label }: { bookingId: string; action: typeof acceptBooking; label: string }) {
  const [state, formAction, pending] = useActionState(action, initialState);
  return <form action={formAction}><input type="hidden" name="bookingId" value={bookingId} /><Button type="submit" disabled={pending}>{label}</Button>{state.message ? <p className="mt-2 text-sm text-slate-600">{state.message}</p> : null}</form>;
}

export function BookingActions({ bookingId, status }: { bookingId: string; status: BookingStatus }) {
  const [rejectState, rejectAction, rejectPending] = useActionState(rejectBooking, initialState);
  if (status === BookingStatus.PENDING) {
    return <div className="space-y-4"><ActionForm bookingId={bookingId} action={acceptBooking} label="Terima Booking" /><form action={rejectAction} className="space-y-3"><input type="hidden" name="bookingId" value={bookingId} /><Textarea name="cancellationReason" placeholder="Alasan penolakan" required />{rejectState.errors?.cancellationReason ? <p className="text-sm text-red-600">{rejectState.errors.cancellationReason[0]}</p> : null}{rejectState.message ? <p className="text-sm text-red-600">{rejectState.message}</p> : null}<Button type="submit" variant="danger" disabled={rejectPending}>Tolak Booking</Button></form></div>;
  }
  if (status === BookingStatus.ACCEPTED) return <ActionForm bookingId={bookingId} action={startBooking} label="Mulai Layanan" />;
  if (status === BookingStatus.IN_PROGRESS) return <ActionForm bookingId={bookingId} action={completeBooking} label="Selesaikan Layanan" />;
  return <p className="text-sm text-slate-600">Tidak ada aksi untuk status ini.</p>;
}
