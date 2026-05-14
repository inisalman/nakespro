"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updatePatientProfile, type PatientActionState } from "@/lib/patient/actions";

type PatientProfileFormProps = {
  patient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    gender: string;
    emergencyContact: string;
  };
};

const initialState: PatientActionState = {};

export function PatientProfileForm({ patient }: PatientProfileFormProps) {
  const [state, action, pending] = useActionState(updatePatientProfile, initialState);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nama lengkap</label>
          <Input name="name" defaultValue={patient.name} required />
          {state.errors?.name ? <p className="mt-2 text-sm text-red-600">{state.errors.name[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <Input value={patient.email} disabled />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nomor HP</label>
          <Input name="phone" defaultValue={patient.phone} required />
          {state.errors?.phone ? <p className="mt-2 text-sm text-red-600">{state.errors.phone[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Tanggal lahir</label>
          <Input name="birthDate" type="date" defaultValue={patient.birthDate} />
          {state.errors?.birthDate ? <p className="mt-2 text-sm text-red-600">{state.errors.birthDate[0]}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Jenis kelamin</label>
          <Select name="gender" defaultValue={patient.gender}>
            <option value="">Pilih jenis kelamin</option>
            <option value="Perempuan">Perempuan</option>
            <option value="Laki-laki">Laki-laki</option>
          </Select>
          {state.errors?.gender ? <p className="mt-2 text-sm text-red-600">{state.errors.gender[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Kontak darurat</label>
          <Input name="emergencyContact" defaultValue={patient.emergencyContact} placeholder="Nama/nomor keluarga" />
          {state.errors?.emergencyContact ? <p className="mt-2 text-sm text-red-600">{state.errors.emergencyContact[0]}</p> : null}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Alamat utama</label>
        <Textarea name="address" defaultValue={patient.address} placeholder="Masukkan alamat utama untuk layanan home care" />
        {state.errors?.address ? <p className="mt-2 text-sm text-red-600">{state.errors.address[0]}</p> : null}
      </div>
      {state.message ? <p className={state.errors || state.message.includes("digunakan") ? "text-sm text-red-600" : "text-sm text-teal-700"}>{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">
        Simpan Profil
      </Button>
    </form>
  );
}
