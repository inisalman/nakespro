import Link from "next/link";
import { CalendarCheck, ClipboardList, FileText, Search, Star, UserRound } from "lucide-react";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

const activeStatuses = [BookingStatus.PENDING, BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS];

export default async function PatientDashboardPage() {
  const user = await requireRole(UserRole.PATIENT);
  const patientId = user.patientProfile?.id;

  const [activeBookings, invoices, availableCppt, pendingReviews] = patientId
    ? await Promise.all([
        prisma.booking.count({ where: { patientId, status: { in: activeStatuses } } }),
        prisma.invoice.count({ where: { booking: { patientId } } }),
        prisma.cPPT.count({ where: { booking: { patientId, status: BookingStatus.COMPLETED } } }),
        prisma.booking.count({ where: { patientId, status: BookingStatus.COMPLETED, review: null } }),
      ])
    : [0, 0, 0, 0];

  const stats = [
    [CalendarCheck, "Booking aktif", activeBookings],
    [FileText, "Invoice", invoices],
    [ClipboardList, "CPPT tersedia", availableCppt],
    [Star, "Ulasan tertunda", pendingReviews],
  ] as const;

  return (
    <DashboardShell title="Dashboard Pasien" description="Pantau booking, invoice, CPPT, dan dokumentasi tindakan Anda.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([Icon, label, value]) => (
          <Card key={label}>
            <Icon className="h-6 w-6 text-teal-600" />
            <p className="mt-4 text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-950">{value}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Link href="/practitioners" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-200 hover:bg-teal-50">
          <Search className="h-6 w-6 text-teal-600" />
          <h2 className="mt-4 font-bold text-slate-950">Cari nakes</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">Temukan tenaga kesehatan berdasarkan layanan, lokasi, harga, dan rating.</p>
        </Link>
        <Link href="/dashboard/patient/bookings" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-200 hover:bg-teal-50">
          <CalendarCheck className="h-6 w-6 text-teal-600" />
          <h2 className="mt-4 font-bold text-slate-950">Riwayat booking</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">Lihat status permintaan layanan dan detail kunjungan Anda.</p>
        </Link>
        <Link href="/dashboard/patient/profile" className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-200 hover:bg-teal-50">
          <UserRound className="h-6 w-6 text-teal-600" />
          <h2 className="mt-4 font-bold text-slate-950">Lengkapi profil</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">Simpan alamat utama dan kontak darurat untuk proses booking lebih cepat.</p>
        </Link>
      </div>
    </DashboardShell>
  );
}
