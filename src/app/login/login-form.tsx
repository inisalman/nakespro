"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithCredentials, signInWithGoogle, type AuthActionState } from "@/lib/auth/actions";

const initialState: AuthActionState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginWithCredentials, initialState);

  return (
    <div className="mt-8 space-y-4">
      <form action={action} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <Input id="email" name="email" type="email" placeholder="nama@email.com" required />
          {state.errors?.email ? <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p> : null}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
          <Input id="password" name="password" type="password" placeholder="Masukkan password" required />
          {state.errors?.password ? <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p> : null}
        </div>
        {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
        <Button className="w-full" type="submit" disabled={pending}>Masuk</Button>
      </form>
      <form action={async () => {
        await signInWithGoogle("PATIENT");
      }}>
        <Button className="w-full" type="submit" variant="secondary">Masuk dengan Google</Button>
      </form>
    </div>
  );
}
