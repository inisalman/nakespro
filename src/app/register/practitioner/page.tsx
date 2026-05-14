import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PractitionerRegisterForm } from "./practitioner-register-form";

export default function PractitionerRegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-lg p-8">
        <Link href="/register" className="text-sm font-semibold text-teal-700">Pilih jenis akun</Link>
        <h1 className="mt-5 text-2xl font-bold">Daftar sebagai Tenaga Kesehatan</h1>
        <p className="mt-2 text-sm text-slate-600">Buat profil profesional dan mulai promosikan layanan Anda.</p>
        <PractitionerRegisterForm />
      </Card>
    </main>
  );
}
