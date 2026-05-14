"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerPractitioner, signInWithGoogle, type AuthActionState } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export function PractitionerRegisterForm() {
  const [state, action, pending] = useActionState(registerPractitioner, initialState);

  return (
    <div className="mt-8 space-y-4">
      <form action={action} className="grid gap-4">
        <Input name="name" placeholder="Nama lengkap" required />
        {state.errors?.name ? <p className="text-sm text-red-600">{state.errors.name[0]}</p> : null}
        <Input name="profession" placeholder="Profesi, contoh: Perawat Luka" required />
        {state.errors?.profession ? <p className="text-sm text-red-600">{state.errors.profession[0]}</p> : null}
        <Input name="email" type="email" placeholder="Email" required />
        {state.errors?.email ? <p className="text-sm text-red-600">{state.errors.email[0]}</p> : null}
        <Input name="phone" placeholder="Nomor HP" required />
        {state.errors?.phone ? <p className="text-sm text-red-600">{state.errors.phone[0]}</p> : null}
        <Input name="password" type="password" placeholder="Password" required />
        {state.errors?.password ? <p className="text-sm text-red-600">{state.errors.password[0]}</p> : null}
        {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
        <Button type="submit" disabled={pending}>Buat Akun Nakes</Button>
      </form>
      <form action={async () => {
        await signInWithGoogle("PRACTITIONER");
      }}>
        <Button className="w-full" type="submit" variant="secondary">Daftar Nakes dengan Google</Button>
      </form>
    </div>
  );
}
