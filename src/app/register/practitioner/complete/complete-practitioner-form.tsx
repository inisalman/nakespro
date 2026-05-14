"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { completePractitionerProfile, type AuthActionState } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export function CompletePractitionerForm() {
  const [state, action, pending] = useActionState(completePractitionerProfile, initialState);

  return (
    <form action={action} className="mt-8 grid gap-4">
      <Input name="profession" placeholder="Profesi, contoh: Perawat Luka" required />
      {state.errors?.profession ? <p className="text-sm text-red-600">{state.errors.profession[0]}</p> : null}
      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
      <Button type="submit" disabled={pending}>Lengkapi Profil Nakes</Button>
    </form>
  );
}
