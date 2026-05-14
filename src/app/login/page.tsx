import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="mb-8 flex items-center gap-2 font-bold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
            <HeartPulse className="h-5 w-5" />
          </span>
          NakesPro
        </Link>
        <h1 className="text-2xl font-bold">Masuk ke akun Anda</h1>
        <p className="mt-2 text-sm text-slate-600">Kelola booking, CPPT, invoice, dan layanan kesehatan Anda.</p>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-slate-600">
          Belum punya akun? <Link href="/register" className="font-semibold text-teal-700">Daftar</Link>
        </p>
      </Card>
    </main>
  );
}
