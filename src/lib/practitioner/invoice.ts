import { PaymentStatus } from "@/generated/prisma/enums";
import { createNotification } from "@/lib/notifications/create";
import { prisma } from "@/lib/prisma";

function invoiceNumber() {
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `INV-${ymd}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function createInvoiceForBooking(bookingId: string) {
  const existing = await prisma.invoice.findUnique({ where: { bookingId } });
  if (existing) return existing;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { patient: { select: { userId: true } }, service: { select: { price: true, name: true } } },
  });

  if (!booking) {
    throw new Error("Booking tidak ditemukan.");
  }

  const subtotal = booking.service.price;

  const invoice = await prisma.invoice.create({
    data: {
      bookingId,
      invoiceNumber: invoiceNumber(),
      subtotal,
      additionalFee: 0,
      discount: 0,
      total: subtotal,
      paymentStatus: PaymentStatus.UNPAID,
    },
  });

  await createNotification({
    userId: booking.patient.userId,
    title: "Invoice dibuat",
    message: `Invoice ${invoice.invoiceNumber} untuk ${booking.service.name} sudah tersedia.`,
    type: "INVOICE_CREATED",
  });

  return invoice;
}
