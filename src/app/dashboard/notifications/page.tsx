import { Bell, CalendarCheck, CheckCircle2, ClipboardList, FileText, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireAuth } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { MarkAllReadButton, NotificationReadToggle } from "./notification-actions";

const icons = {
  BOOKING_CREATED: CalendarCheck,
  BOOKING_ACCEPTED: CheckCircle2,
  BOOKING_REJECTED: CalendarCheck,
  INVOICE_CREATED: FileText,
  CPPT_AVAILABLE: ClipboardList,
  PRACTITIONER_VERIFICATION_APPROVED: ShieldCheck,
  PRACTITIONER_VERIFICATION_REJECTED: ShieldCheck,
};

function notificationIcon(type: string) {
  return icons[type as keyof typeof icons] ?? Bell;
}

function relativeDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function NotificationsPage() {
  const user = await requireAuth();
  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.notification.count({ where: { userId: user.id, readAt: null } }),
  ]);

  return (
    <DashboardShell
      title="Notifikasi"
      description="Pusat kabar untuk booking, invoice, CPPT, dan verifikasi akun."
      actions={<MarkAllReadButton disabled={unreadCount === 0} />}
    >
      <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
        <Card className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-400/30 blur-2xl" />
          <div className="absolute -bottom-12 left-6 h-28 w-28 rounded-full bg-sky-400/20 blur-2xl" />
          <div className="relative">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal-200 ring-1 ring-white/10">
              <Bell className="h-6 w-6" />
            </span>
            <p className="mt-6 text-sm font-medium text-slate-300">Belum dibaca</p>
            <p className="mt-1 text-5xl font-bold tracking-tight">{unreadCount}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">Notifikasi disimpan sebagai audit ringan agar pasien, nakes, dan admin tidak kehilangan status penting.</p>
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <ul className="divide-y divide-slate-100">
            {notifications.map((notification) => {
              const Icon = notificationIcon(notification.type);
              const isRead = Boolean(notification.readAt);
              return (
                <li key={notification.id} className={`grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-start ${isRead ? "bg-white" : "bg-teal-50/50"}`}>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isRead ? "bg-slate-100 text-slate-500" : "bg-teal-500 text-white shadow-[0_8px_24px_rgba(20,184,166,0.25)]"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-950">{notification.title}</p>
                      {!isRead ? <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-bold text-teal-700">Baru</span> : null}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{notification.message}</p>
                    <p className="mt-2 text-xs font-medium text-slate-400">{relativeDate(notification.createdAt)}</p>
                  </div>
                  <NotificationReadToggle notificationId={notification.id} isRead={isRead} />
                </li>
              );
            })}
            {notifications.length === 0 ? (
              <li className="p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                  <Bell className="h-6 w-6" />
                </div>
                <p className="mt-4 font-semibold text-slate-950">Belum ada notifikasi</p>
                <p className="mt-1 text-sm text-slate-500">Aktivitas booking dan invoice akan muncul di sini.</p>
              </li>
            ) : null}
          </ul>
        </Card>
      </div>
    </DashboardShell>
  );
}
