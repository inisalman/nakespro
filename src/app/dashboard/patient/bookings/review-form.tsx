"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReview, type PatientActionState } from "@/lib/patient/actions";

const initialState: PatientActionState = {};

export function ReviewForm({ bookingId }: { bookingId: string }) {
  const [state, action, pending] = useActionState(createReview, initialState);

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="bookingId" value={bookingId} />
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
        <Select name="rating" defaultValue="5" required>
          <option value="5">5 - Sangat baik</option>
          <option value="4">4 - Baik</option>
          <option value="3">3 - Cukup</option>
          <option value="2">2 - Kurang</option>
          <option value="1">1 - Buruk</option>
        </Select>
        {state.errors?.rating ? <p className="mt-2 text-sm text-red-600">{state.errors.rating[0]}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Ulasan</label>
        <Textarea name="comment" placeholder="Bagikan pengalaman Anda setelah layanan selesai" />
        {state.errors?.comment ? <p className="mt-2 text-sm text-red-600">{state.errors.comment[0]}</p> : null}
      </div>
      {state.message ? <p className={state.errors || state.message.includes("belum") || state.message.includes("sudah") ? "text-sm text-red-600" : "text-sm text-teal-700"}>{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Kirim Ulasan</Button>
    </form>
  );
}
