"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePractitionerProfile, type PractitionerActionState } from "@/lib/practitioner/actions";

type Props = {
  practitioner: {
    name: string;
    email: string;
    phone: string;
    image: string;
    profession: string;
    specialization: string;
    bio: string;
    experienceYears: number | string;
    serviceArea: string;
    licenseNumber: string;
    isAvailable: boolean;
  };
};

const initialState: PractitionerActionState = {};

export function PractitionerProfileForm({ practitioner }: Props) {
  const [state, action, pending] = useActionState(updatePractitionerProfile, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nama lengkap</label>
          <Input name="name" defaultValue={practitioner.name} required />
          {state.errors?.name ? <p className="mt-2 text-sm text-red-600">{state.errors.name[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <Input value={practitioner.email} disabled />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nomor HP</label>
          <Input name="phone" defaultValue={practitioner.phone} required />
          {state.errors?.phone ? <p className="mt-2 text-sm text-red-600">{state.errors.phone[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">URL foto profil</label>
          <Input name="image" type="url" defaultValue={practitioner.image} placeholder="https://..." />
          {state.errors?.image ? <p className="mt-2 text-sm text-red-600">{state.errors.image[0]}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Profesi</label>
          <Input name="profession" defaultValue={practitioner.profession} required />
          {state.errors?.profession ? <p className="mt-2 text-sm text-red-600">{state.errors.profession[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Spesialisasi</label>
          <Input name="specialization" defaultValue={practitioner.specialization} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Pengalaman kerja (tahun)</label>
          <Input name="experienceYears" type="number" min={0} defaultValue={practitioner.experienceYears} />
          {state.errors?.experienceYears ? <p className="mt-2 text-sm text-red-600">{state.errors.experienceYears[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nomor STR/SIP</label>
          <Input name="licenseNumber" defaultValue={practitioner.licenseNumber} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Area layanan</label>
        <Input name="serviceArea" defaultValue={practitioner.serviceArea} placeholder="Contoh: Jakarta Selatan, Depok" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Bio</label>
        <Textarea name="bio" defaultValue={practitioner.bio} />
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <input name="isAvailable" type="checkbox" defaultChecked={practitioner.isAvailable} className="h-4 w-4 rounded border-slate-300 text-teal-600" />
        Menerima pasien baru
      </label>
      {state.message ? <p className={state.errors || state.message.includes("digunakan") ? "text-sm text-red-600" : "text-sm text-teal-700"}>{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Simpan Profil</Button>
    </form>
  );
}
