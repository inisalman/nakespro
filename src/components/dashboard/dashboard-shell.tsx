import Link from "next/link";
import { Bell, CalendarDays, ClipboardList, FileText, HeartPulse, LayoutGrid, Search, Settings, Users, Wallet } from "lucide-react";
import { UserRole } from "@/generated/prisma/enums";
import { LogoutButton } from "@/components/auth/logout-button";
import { getCurrentUser } from "@/lib/auth/dal";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutGrid;
  badge?: string;
};

type NavSection = { title: string; items: NavItem[] };

const navByRole: Record<string, NavSection[]> = {
  [UserRole.PATIENT]: [
    {
      title: "Beranda",
      items: [
        { href: "/dashboard/patient", label: "Dashboard", icon: LayoutGrid },
        { href: "/practitioners", label: "Cari Nakes", icon: Search },
      ],
    },
    {
      title: "Layanan",
      items: [
        { href: "/dashboard/patient/bookings", label: "Riwayat Booking", icon: CalendarDays },
        { href: "/dashboard/patient/invoices", label: "Invoice & CPPT", icon: FileText },
        { href: "/dashboard/patient/profile", label: "Profil", icon: Settings },
      ],
    },
  ],
  [UserRole.PRACTITIONER]: [
    {
      title: "Beranda",
      items: [{ href: "/dashboard/practitioner", label: "Dashboard", icon: LayoutGrid }],
    },
    {
      title: "Praktik",
      items: [
        { href: "/dashboard/practitioner/bookings", label: "Booking", icon: CalendarDays },
        { href: "/dashboard/practitioner/cppt", label: "Catatan Tindakan", icon: ClipboardList },
        { href: "/dashboard/practitioner/invoices", label: "Invoice", icon: FileText },
        { href: "/dashboard/practitioner/patients", label: "Pasien", icon: Users },
      ],
    },
    {
      title: "Pengaturan",
      items: [
        { href: "/dashboard/practitioner/earnings", label: "Pendapatan", icon: Wallet },
        { href: "/dashboard/practitioner/profile", label: "Profil", icon: Settings },
      ],
    },
  ],
  [UserRole.ADMIN]: [
    {
      title: "Beranda",
      items: [{ href: "/dashboard/admin", label: "Dashboard", icon: LayoutGrid }],
    },
  ],
};

function initials(name: string | null | undefined) {
  if (!name) return "NP";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export async function DashboardShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const sections = user ? navByRole[user.role] ?? [] : [];
  const displayName = user?.name ?? user?.email ?? "Pengguna";
  const roleLabel =
    user?.role === UserRole.PRACTITIONER
      ? user.practitionerProfile?.profession ?? "Tenaga Kesehatan"
      : user?.role === UserRole.ADMIN
        ? "Admin Platform"
        : "Pasien";

  return (
    <main className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col justify-between border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white shadow-[0_4px_12px_rgba(20,184,166,0.4)]">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-base font-bold text-slate-950">NakesPro</span>
          </Link>

          <nav className="mt-8 space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {section.title}
                </p>
                <ul className="mt-2 space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-teal-50 hover:text-teal-700"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{item.label}</span>
                          {item.badge ? (
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-100 px-1.5 text-[10px] font-bold text-teal-700">
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
              {initials(displayName)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-950">{displayName}</p>
              <p className="truncate text-xs text-slate-500">{roleLabel}</p>
            </div>
          </div>
          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <section className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
          <div className="flex items-center gap-4 px-4 py-3 sm:px-8">
            <div className="relative flex-1 max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Cari pasien, layanan, invoice..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-teal-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <button
              type="button"
              aria-label="Notifikasi"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <span className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
              {initials(displayName)}
            </span>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
