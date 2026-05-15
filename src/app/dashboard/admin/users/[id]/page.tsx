import Link from "next/link";
import { notFound } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { BookingStatusBadge } from "@/components/dashboard/booking-status-badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { ToggleUserForm } from "../toggle-user-form";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { id } = await params;
  const user = await prisma.user.findFirst({
    where: { id, role: UserRole.PATIENT },
    include: {
      patientProfile: {
        include: {
          bookings: { orderBy: { createdAt: "desc" }, take: 8, include: { service: true, practitioner: { include: { user: true } }, invoice: true } },
          _count: { select: { bookings: true } },
        },
      },
    },
  });
  if (!user) notFound();
  const invoiceCount = await prisma.invoice.count({ where: { booking: { patient: { userId: user.id } } } });

  return (
    <DashboardShell title={user.name ?? user.email} description="Detail pasien, riwayat booking, dan ringkasan invoice." actions={<ToggleUserForm userId={user.id} isActive={user.isActive} />}>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Profil pasien</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-950">{user.email}</dd></div>
            <div><dt className="text-slate-500">Telepon</dt><dd className="font-medium text-slate-950">{user.phone ?? "-"}</dd></div>
            <div><dt className="text-slate-500">Alamat</dt><dd className="font-medium text-slate-950">{user.patientProfile?.address ?? "-"}</dd></div>
            <div><dt className="text-slate-500">Kontak darurat</dt><dd className="font-medium text-slate-950">{user.patientProfile?.emergencyContact ?? "-"}</dd></div>
          </dl>
        </Card>
        <Card><p className="text-sm font-semibold text-slate-500">Total booking</p><p className="mt-2 text-3xl font-bold text-slate-950">{user.patientProfile?._count.bookings ?? 0}</p></Card>
        <Card><p className="text-sm font-semibold text-slate-500">Total invoice</p><p className="mt-2 text-3xl font-bold text-slate-950">{invoiceCount}</p></Card>
      </div>
      <Card className="mt-6">
        <h2 className="font-semibold text-slate-950">Booking terbaru</h2>
        <div className="mt-4 space-y-3">
          {user.patientProfile?.bookings.map((booking) => (
            <Link key={booking.id} href={`/dashboard/admin/bookings/${booking.id}`} className="flex flex-col gap-2 rounded-xl border border-slate-100 p-4 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="font-medium text-slate-950">{booking.service.name}</p><p className="text-sm text-slate-500">{booking.practitioner.user.name ?? booking.practitioner.user.email} · {booking.bookingDate.toLocaleDateString("id-ID")} {booking.bookingTime}</p></div>
              <div className="flex items-center gap-3"><span className="text-sm font-semibold">{formatCurrency(booking.invoice?.total ?? booking.service.price)}</span><BookingStatusBadge status={booking.status} /></div>
            </Link>
          )) ?? <p className="text-sm text-slate-500">Belum ada booking.</p>}
        </div>
      </Card>
    </DashboardShell>
  );
}
