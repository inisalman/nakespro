"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBooking, type PatientActionState } from "@/lib/patient/actions";

type BookingFormProps = {
  practitionerId: string;
  selectedServiceId: string;
  defaultAddress: string;
  services: { id: string; name: string; price: number; durationMinutes: number }[];
};

const initialState: PatientActionState = {};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export function BookingForm({ practitionerId, selectedServiceId, defaultAddress, services }: BookingFormProps) {
  const [state, action, pending] = useActionState(createBooking, initialState);

  return (
    <form action={action} className="mt-8 grid gap-5">
      <input type="hidden" name="practitionerId" value={practitionerId} />
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Layanan</label>
        <Select name="serviceId" defaultValue={selectedServiceId} required>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} — {formatCurrency(service.price)} / {service.durationMinutes} menit
            </option>
          ))}
        </Select>
        {state.errors?.serviceId ? <p className="mt-2 text-sm text-red-600">{state.errors.serviceId[0]}</p> : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Tanggal</label>
          <Input name="bookingDate" type="date" required />
          {state.errors?.bookingDate ? <p className="mt-2 text-sm text-red-600">{state.errors.bookingDate[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Jam</label>
          <Input name="bookingTime" type="time" required />
          {state.errors?.bookingTime ? <p className="mt-2 text-sm text-red-600">{state.errors.bookingTime[0]}</p> : null}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Alamat layanan</label>
        <Textarea name="address" defaultValue={defaultAddress} placeholder="Masukkan alamat lengkap" required />
        {state.errors?.address ? <p className="mt-2 text-sm text-red-600">{state.errors.address[0]}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Catatan tambahan</label>
        <Textarea name="notes" placeholder="Contoh: kondisi luka, akses rumah, atau kebutuhan khusus" />
        {state.errors?.notes ? <p className="mt-2 text-sm text-red-600">{state.errors.notes[0]}</p> : null}
      </div>
      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>Kirim Booking</Button>
    </form>
  );
}
