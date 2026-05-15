import Link from "next/link";
import { notFound } from "next/navigation";
import { UserRole, VerificationStatus } from "@/generated/prisma/enums";
import { BookingStatusBadge } from "@/components/dashboard/booking-status-badge";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/dal";
import { formatCurrency } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { ToggleUserForm } from "../../users/toggle-user-form";
import { VerifyPractitionerForm } from "./verify-practitioner-form";

export default async function AdminPractitionerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(UserRole.ADMIN);
  const { id } = await params;
  const practitioner = await prisma.practitionerProfile.findUnique({
    where: { id },
    include: {
      user: true,
      documents: { orderBy: { createdAt: "desc" } },
      services: { include: { category: true } },
      bookings: { orderBy: { createdAt: "desc" }, take: 8, include: { patient: { include: { user: true } }, service: true } },
      reviews: true,
      _count: { select: { services: true, bookings: true, reviews: true } },
    },
  });
  if (!practitioner) notFound();
  const averageRating = practitioner.reviews.length ? (practitioner.reviews.reduce((sum, review) => sum + review.rating, 0) / practitioner.reviews.length).toFixed(1) : "-";

  return (
    <DashboardShell title={practitioner.user.name ?? practitioner.user.email} description="Detail nakes, dokumen, layanan, ulasan, dan booking." actions={<ToggleUserForm userId={practitioner.userId} isActive={practitioner.user.isActive} />}>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <p className="text-sm font-semibold text-slate-500">Profil nakes</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-slate-500">Email</dt><dd className="font-medium text-slate-950">{practitioner.user.email}</dd></div>
            <div><dt className="text-slate-500">Profesi</dt><dd className="font-medium text-slate-950">{practitioner.profession}</dd></div>
            <div><dt className="text-slate-500">Area layanan</dt><dd className="font-medium text-slate-950">{practitioner.serviceArea ?? "-"}</dd></div>
            <div><dt className="text-slate-500">Status</dt><dd className="font-medium text-slate-950">{practitioner.verificationStatus}</dd></div>
          </dl>
        </Card>
        <Card><p className="text-sm font-semibold text-slate-500">Layanan / booking</p><p className="mt-2 text-3xl font-bold text-slate-950">{practitioner._count.services} / {practitioner._count.bookings}</p></Card>
        <Card><p className="text-sm font-semibold text-slate-500">Rating rata-rata</p><p className="mt-2 text-3xl font-bold text-slate-950">{averageRating}</p><p className="mt-1 text-xs text-slate-500">{practitioner._count.reviews} ulasan</p></Card>
      </div>
      {practitioner.verificationStatus === VerificationStatus.PENDING ? <div className="mt-6"><VerifyPractitionerForm practitionerId={practitioner.id} /></div> : null}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card><h2 className="font-semibold text-slate-950">Dokumen</h2><div className="mt-4 space-y-3">{practitioner.documents.map((doc) => <a key={doc.id} href={doc.fileUrl} target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-100 p-4 hover:bg-slate-50"><p className="font-medium text-slate-950">{doc.documentType}</p><p className="text-sm text-slate-500">{doc.status}{doc.rejectionReason ? ` · ${doc.rejectionReason}` : ""}</p></a>)}</div></Card>
        <Card><h2 className="font-semibold text-slate-950">Layanan</h2><div className="mt-4 space-y-3">{practitioner.services.map((service) => <div key={service.id} className="rounded-xl border border-slate-100 p-4"><p className="font-medium text-slate-950">{service.name}</p><p className="text-sm text-slate-500">{service.category.name} · {formatCurrency(service.price)} · {service.durationMinutes} menit</p></div>)}</div></Card>
      </div>
      <Card className="mt-6"><h2 className="font-semibold text-slate-950">Booking terbaru</h2><div className="mt-4 space-y-3">{practitioner.bookings.map((booking) => <Link key={booking.id} href={`/dashboard/admin/bookings/${booking.id}`} className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50"><div><p className="font-medium text-slate-950">{booking.patient.user.name ?? booking.patient.user.email}</p><p className="text-sm text-slate-500">{booking.service.name} · {booking.bookingDate.toLocaleDateString("id-ID")} {booking.bookingTime}</p></div><BookingStatusBadge status={booking.status} /></Link>)}</div></Card>
    </DashboardShell>
  );
}
