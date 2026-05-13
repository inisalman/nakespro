import Link from "next/link";
import { HeartPulse } from "lucide-react";

const nav = [
  ["/dashboard/patient", "Pasien"],
  ["/dashboard/practitioner", "Nakes"],
  ["/dashboard/admin", "Admin"],
];

export function DashboardShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-6 lg:block">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white">
            <HeartPulse className="h-5 w-5" />
          </span>
          NakesPro
        </Link>
        <nav className="mt-10 space-y-2">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              Dashboard {label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="lg:pl-64">
        <header className="border-b border-slate-200 bg-white px-4 py-6 sm:px-8">
          <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </header>
        <div className="p-4 sm:p-8">{children}</div>
      </section>
    </main>
  );
}
