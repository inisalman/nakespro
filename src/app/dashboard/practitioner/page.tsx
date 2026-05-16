import Link from "next/link";
import {
  CalendarDays,
  ClipboardList,
  FilePlus,
  FileText,
  Star,
} from "lucide-react";
import { BookingStatus, PaymentStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { BookingsTable } from "@/components/dashboard/bookings-table";
import { ScheduleTimeline } from "@/components/dashboard/schedule-timeline";
import { WelcomePanel } from "@/components/dashboard/welcome-panel";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";

const upcomingStatuses = [BookingStatus.PENDING, BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export default async function PractitionerDashboardPage() {
  const user = await requireRole(UserRole.PRACTITIONER);
  const practitionerId = user.practitionerProfile?.id;

  const today = new Date();

  const headerActions = (
    <>
      <Link
        href="/dashboard/practitioner/cppt"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        <FilePlus className="h-4 w-4" />
        CPPT
      </Link>
      <Link
        href="/dashboard/practitioner/bookings"
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-teal-500 px-4 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(20,184,166,0.7)] transition hover:bg-teal-600"
      >
        <CalendarDays className="h-4 w-4" />
        Kelola Booking
      </Link>
    </>
  );

  if (!practitionerId) {
    return (
      <DashboardShell
        title="Dashboard Nakes"
        description="Lengkapi profil terlebih dahulu untuk mulai menerima booking."
      >
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <p className="text-sm font-semibold text-slate-700">Profil tenaga kesehatan belum lengkap.</p>
          <p className="mt-1 text-xs text-slate-500">Silakan lengkapi profil dari menu pengaturan.</p>
        </div>
      </DashboardShell>
    );
  }

  const [
    todayBookingsCount,
    pendingRequestsCount,
    pendingCpptCount,
    monthInvoiceCount,
    monthRevenueAgg,
    reviewAgg,
    recentBookings,
    pendingBookings,
    upcomingBookings,
  ] = await Promise.all([
    prisma.booking.count({
      where: {
        practitionerId,
        bookingDate: { gte: startOfDay(today), lte: endOfDay(today) },
        status: { in: upcomingStatuses },
      },
    }),
    prisma.booking.count({ where: { practitionerId, status: BookingStatus.PENDING } }),
    prisma.booking.count({
      where: {
        practitionerId,
        status: { in: [BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED] },
        cppt: null,
      },
    }),
    prisma.invoice.count({
      where: {
        booking: { practitionerId },
        issuedAt: { gte: startOfMonth(today), lte: endOfMonth(today) },
      },
    }),
    prisma.invoice.aggregate({
      _sum: { total: true },
      where: {
        booking: { practitionerId },
        paymentStatus: PaymentStatus.PAID,
        paidAt: { gte: startOfMonth(today), lte: endOfMonth(today) },
      },
    }),
    prisma.review.aggregate({
      _avg: { rating: true },
      _count: { rating: true },
      where: { practitionerId },
    }),
    prisma.booking.findMany({
      where: { practitionerId },
      orderBy: [{ bookingDate: "desc" }, { createdAt: "desc" }],
      take: 8,
      include: {
        patient: { include: { user: { select: { name: true } } } },
        service: { select: { name: true, price: true } },
      },
    }),
    prisma.booking.findMany({
      where: { practitionerId, status: BookingStatus.PENDING },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        patient: { include: { user: { select: { name: true } } } },
        service: { select: { name: true, price: true } },
      },
    }),
    prisma.booking.findMany({
      where: {
        practitionerId,
        status: { in: [BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS] },
        bookingDate: { gte: startOfDay(today) },
      },
      orderBy: [{ bookingDate: "asc" }, { bookingTime: "asc" }],
      take: 5,
      include: {
        patient: { include: { user: { select: { name: true } } } },
        service: { select: { name: true } },
      },
    }),
  ]);

  const monthRevenue = monthRevenueAgg._sum.total ?? 0;
  const averageRating = reviewAgg._avg.rating ? reviewAgg._avg.rating.toFixed(1) : "-";

  const tableRows = recentBookings.map((b) => ({
    id: b.id,
    patientName: b.patient.user.name ?? "Pasien",
    serviceName: b.service.name,
    bookingDate: b.bookingDate,
    bookingTime: b.bookingTime,
    address: b.address,
    price: b.service.price,
    status: b.status,
  }));

  const scheduleItems = upcomingBookings.map((b) => ({
    id: b.id,
    time: b.bookingTime,
    patientName: b.patient.user.name ?? "Pasien",
    serviceName: b.service.name,
    address: b.address,
  }));

  const pendingRows = pendingBookings.map((b) => ({
    id: b.id,
    patientName: b.patient.user.name ?? "Pasien",
    serviceName: b.service.name,
    bookingDate: b.bookingDate,
    bookingTime: b.bookingTime,
    address: b.address,
    price: b.service.price,
    status: b.status,
  }));

  return (
    <DashboardShell
      title="Dashboard Nakes"
      description="Pantau pasien hari ini, catatan tindakan, dan invoice secara ringkas."
      actions={headerActions}
    >
      <WelcomePanel
        name={user.name ?? "Nakes"}
        todayCount={todayBookingsCount}
        monthRevenue={monthRevenue}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={CalendarDays} label="Booking hari ini" value={todayBookingsCount} tone="teal" hint="Booking aktif hari ini." />
        <StatCard icon={CalendarDays} label="Permintaan baru" value={pendingRequestsCount} tone="rose" hint="Menunggu konfirmasi." />
        <StatCard
          icon={ClipboardList}
          label="CPPT belum lengkap"
          value={pendingCpptCount}
          tone="amber"
          hint={pendingCpptCount > 0 ? "Selesaikan agar pasien melihat hasil." : "Semua tercatat."}
        />
        <StatCard icon={FileText} label="Invoice bulan ini" value={`${monthInvoiceCount} · ${formatCurrency(monthRevenue)}`} tone="sky" />
        <StatCard icon={Star} label="Rating rata-rata" value={averageRating} tone="violet" hint={`${reviewAgg._count.rating} ulasan`} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="xl:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">Booking terbaru</h2>
              <p className="text-xs text-slate-500">8 booking terakhir dari pasien Anda.</p>
            </div>
            <Link
              href="/dashboard/practitioner/bookings"
              className="text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              Lihat semua
            </Link>
          </div>
          <BookingsTable rows={tableRows} />
        </section>

        <aside className="space-y-6">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-950">Permintaan baru</h2>
              <Link href="/dashboard/practitioner/bookings" className="text-xs font-semibold text-teal-700 hover:text-teal-800">Lihat</Link>
            </div>
            <BookingsTable rows={pendingRows} />
          </section>
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-950">Jadwal mendatang</h2>
              <Link
                href="/dashboard/practitioner/bookings"
                className="text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                Lihat
              </Link>
            </div>
            <ScheduleTimeline items={scheduleItems} />
          </section>
        </aside>
      </div>
    </DashboardShell>
  );
}
