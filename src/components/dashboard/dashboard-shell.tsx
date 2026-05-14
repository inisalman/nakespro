import Link from "next/link";
import { HeartPulse } from "lucide-react";
import { UserRole } from "@/generated/prisma/enums";
import { LogoutButton } from "@/components/auth/logout-button";
import { getCurrentUser } from "@/lib/auth/dal";

const nav = {
  [UserRole.PATIENT]: [["/dashboard/patient", "Dashboard Pasien"]],
  [UserRole.PRACTITIONER]: [["/dashboard/practitioner", "Dashboard Nakes"]],
  [UserRole.ADMIN]: [["/dashboard/admin", "Dashboard Admin"]],
};

export async function DashboardShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const user = await getCurrentUser();
  const links = user ? nav[user.role] : [];

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
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700">
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <LogoutButton />
        </div>
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
