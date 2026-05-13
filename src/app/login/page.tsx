import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <form className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
            <Input type="email" placeholder="nama@email.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
            <Input type="password" placeholder="Masukkan password" />
          </div>
          <Button className="w-full" type="button">Masuk</Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Belum punya akun? <Link href="/register" className="font-semibold text-teal-700">Daftar</Link>
        </p>
      </Card>
    </main>
  );
}
