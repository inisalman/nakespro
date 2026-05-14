"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerPatient, signInWithGoogle, type AuthActionState } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export function PatientRegisterForm() {
  const [state, action, pending] = useActionState(registerPatient, initialState);

  return (
    <div className="mt-8 space-y-4">
      <form action={action} className="grid gap-4">
        <Input name="name" placeholder="Nama lengkap" required />
        {state.errors?.name ? <p className="text-sm text-red-600">{state.errors.name[0]}</p> : null}
        <Input name="email" type="email" placeholder="Email" required />
        {state.errors?.email ? <p className="text-sm text-red-600">{state.errors.email[0]}</p> : null}
        <Input name="phone" placeholder="Nomor HP" required />
        {state.errors?.phone ? <p className="text-sm text-red-600">{state.errors.phone[0]}</p> : null}
        <Input name="password" type="password" placeholder="Password" required />
        {state.errors?.password ? <p className="text-sm text-red-600">{state.errors.password[0]}</p> : null}
        {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
        <Button type="submit" disabled={pending}>Buat Akun Pasien</Button>
      </form>
      <form action={async () => {
        await signInWithGoogle("PATIENT");
      }}>
        <Button className="w-full" type="submit" variant="secondary">Daftar Pasien dengan Google</Button>
      </form>
    </div>
  );
}
