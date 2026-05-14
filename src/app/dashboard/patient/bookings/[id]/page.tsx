import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, FileText, MapPin, Star } from "lucide-react";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireRole } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";
import { ReviewForm } from "../review-form";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default async function PatientBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(UserRole.PATIENT);
  const { id } = await params;

  if (!user.patientProfile?.id) {
    notFound();
  }

  const booking = await prisma.booking.findFirst({
    where: { id, patientId: user.patientProfile.id },
    include: {
      practitioner: { include: { user: { select: { name: true } } } },
      service: { include: { category: { select: { name: true } } } },
      invoice: true,
      cppt: { include: { documents: true } },
      documents: true,
      review: true,
    },
  });

  if (!booking) {
    notFound();
  }

  const canReview = booking.status === BookingStatus.COMPLETED && !booking.review;

  return (
    <DashboardShell title="Detail Booking" description="Lihat detail layanan, invoice, CPPT, dokumentasi, dan ulasan untuk booking ini.">
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Badge variant="slate">{booking.status.replaceAll("_", " ")}</Badge>
                <h2 className="mt-3 text-2xl font-bold text-slate-950">{booking.service.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{booking.practitioner.user.name ?? "Tenaga Kesehatan"} · {booking.service.category.name}</p>
              </div>
              <Link href={`/${booking.practitioner.slug}`} className="text-sm font-semibold text-teal-700">Profil nakes</Link>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><CalendarDays className="h-4 w-4" /> {booking.bookingDate.toLocaleDateString("id-ID")} {booking.bookingTime}</div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3"><MapPin className="h-4 w-4" /> {booking.address}</div>
            </div>
            {booking.notes ? <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{booking.notes}</p> : null}
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><FileText className="h-5 w-5 text-teal-600" /> Invoice</h2>
            {booking.invoice ? (
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between"><span>Nomor invoice</span><span className="font-semibold text-slate-950">{booking.invoice.invoiceNumber}</span></div>
                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(booking.invoice.subtotal)}</span></div>
                <div className="flex justify-between"><span>Biaya tambahan</span><span>{formatCurrency(booking.invoice.additionalFee)}</span></div>
                <div className="flex justify-between"><span>Diskon</span><span>{formatCurrency(booking.invoice.discount)}</span></div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-950"><span>Total</span><span>{formatCurrency(booking.invoice.total)}</span></div>
                <Badge>{booking.invoice.paymentStatus}</Badge>
              </div>
            ) : (
              <EmptyState title="Invoice belum tersedia" description="Invoice akan tampil setelah layanan selesai dan dibuat oleh sistem." />
            )}
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-slate-950">CPPT dan dokumentasi</h2>
            {booking.status === BookingStatus.COMPLETED && booking.cppt ? (
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
                {[
                  ["Subjektif", booking.cppt.subjective],
                  ["Objektif", booking.cppt.objective],
                  ["Assessment", booking.cppt.assessment],
                  ["Plan", booking.cppt.plan],
                  ["Tindakan", booking.cppt.actionTaken],
                  ["Edukasi", booking.cppt.education],
                  ["Tindak lanjut", booking.cppt.followUpPlan],
                ].map(([label, value]) => value ? <div key={label}><p className="font-semibold text-slate-950">{label}</p><p>{value}</p></div> : null)}
                {[...booking.documents, ...booking.cppt.documents].length ? (
                  <div>
                    <p className="font-semibold text-slate-950">Dokumentasi</p>
                    <div className="mt-2 grid gap-2">
                      {[...booking.documents, ...booking.cppt.documents].map((document) => (
                        <a key={document.id} href={document.fileUrl} className="rounded-xl border border-slate-200 p-3 text-teal-700 hover:bg-teal-50">{document.documentType} — {document.description ?? document.fileUrl}</a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <EmptyState title="CPPT belum tersedia" description="CPPT dan dokumentasi tindakan hanya tampil setelah layanan selesai." />
            )}
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><Star className="h-5 w-5 text-amber-500" /> Ulasan</h2>
            {booking.review ? (
              <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                <p className="font-bold text-amber-600">{booking.review.rating}/5</p>
                {booking.review.comment ? <p className="mt-2 text-sm leading-6 text-slate-600">{booking.review.comment}</p> : null}
              </div>
            ) : canReview ? (
              <div className="mt-4"><ReviewForm bookingId={booking.id} /></div>
            ) : (
              <p className="mt-3 text-sm leading-6 text-slate-600">Ulasan dapat diberikan setelah booking selesai.</p>
            )}
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
