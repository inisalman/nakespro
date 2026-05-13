import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PatientRegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-lg p-8">
        <Link href="/register" className="text-sm font-semibold text-teal-700">Pilih jenis akun</Link>
        <h1 className="mt-5 text-2xl font-bold">Daftar sebagai Pasien</h1>
        <p className="mt-2 text-sm text-slate-600">Mulai cari dan booking tenaga kesehatan terpercaya.</p>
        <form className="mt-8 grid gap-4">
          <Input placeholder="Nama lengkap" />
          <Input type="email" placeholder="Email" />
          <Input placeholder="Nomor HP" />
          <Input type="password" placeholder="Password" />
          <Button type="button">Buat Akun Pasien</Button>
        </form>
      </Card>
    </main>
  );
}
