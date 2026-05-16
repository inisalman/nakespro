"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BookingStatus, UserRole, VerificationStatus } from "@/generated/prisma/enums";
import { requireRole } from "@/lib/auth/dal";
import { createNotification } from "@/lib/notifications/create";
import { prisma } from "@/lib/prisma";
import { createInvoiceForBooking } from "@/lib/practitioner/invoice";
import {
  availabilityScheduleSchema,
  bookingIdSchema,
  cpptSchema,
  practitionerDocumentSchema,
  practitionerProfileSchema,
  practitionerServiceSchema,
  rejectBookingSchema,
  scheduleIdSchema,
  serviceToggleSchema,
  treatmentDocumentIdSchema,
  treatmentDocumentSchema,
} from "@/lib/practitioner/schemas";

export type PractitionerActionState = { message?: string; errors?: Record<string, string[]> };

function formErrors(error: { flatten: () => { fieldErrors: Record<string, string[]> } }) {
  return { errors: error.flatten().fieldErrors };
}

async function requirePractitionerProfileId() {
  const user = await requireRole(UserRole.PRACTITIONER);
  if (!user.practitionerProfile?.id) redirect("/login");
  return { user, practitionerId: user.practitionerProfile.id };
}

async function requireBooking(practitionerId: string, bookingId: string) {
  return prisma.booking.findFirst({
    where: { id: bookingId, practitionerId },
    select: { id: true, status: true, patient: { select: { userId: true } }, service: { select: { name: true } } },
  });
}

function revalidatePractitionerBooking(bookingId: string) {
  revalidatePath("/dashboard/practitioner");
  revalidatePath("/dashboard/practitioner/bookings");
  revalidatePath(`/dashboard/practitioner/bookings/${bookingId}`);
  revalidatePath("/dashboard/practitioner/cppt");
}

export async function updatePractitionerProfile(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = practitionerProfileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);

  const { user, practitionerId } = await requirePractitionerProfileId();
  const existingPhone = await prisma.user.findFirst({ where: { phone: parsed.data.phone, NOT: { id: user.id } }, select: { id: true } });
  if (existingPhone) return { message: "Nomor HP sudah digunakan." };

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      image: parsed.data.image,
      practitionerProfile: {
        update: {
          where: { id: practitionerId },
          data: {
            profession: parsed.data.profession,
            specialization: parsed.data.specialization,
            bio: parsed.data.bio,
            experienceYears: parsed.data.experienceYears,
            serviceArea: parsed.data.serviceArea,
            licenseNumber: parsed.data.licenseNumber,
            isAvailable: parsed.data.isAvailable,
          },
        },
      },
    },
  });

  revalidatePath("/dashboard/practitioner");
  revalidatePath("/dashboard/practitioner/profile");
  return { message: "Profil nakes berhasil diperbarui." };
}

export async function addPractitionerDocument(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = practitionerDocumentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);

  const { practitionerId } = await requirePractitionerProfileId();
  await prisma.practitionerDocument.create({ data: { practitionerId, documentType: parsed.data.documentType, fileUrl: parsed.data.fileUrl } });
  revalidatePath("/dashboard/practitioner/profile");
  return { message: "Dokumen berhasil ditambahkan." };
}

export async function removePractitionerDocument(formData: FormData): Promise<void> {
  return deletePractitionerDocument(formData);
}

export async function submitForVerification(): Promise<void> {
  return submitPractitionerForVerification();
}

export async function upsertAvailabilitySchedule(state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  return formData.get("scheduleId") ? updateSchedule(state, formData) : createSchedule(state, formData);
}

export async function deleteAvailabilitySchedule(formData: FormData): Promise<void> {
  return deleteSchedule(formData);
}

export async function togglePractitionerAvailability(): Promise<void> {
  const { practitionerId } = await requirePractitionerProfileId();
  const profile = await prisma.practitionerProfile.findUnique({ where: { id: practitionerId }, select: { isAvailable: true } });
  if (!profile) return;
  await prisma.practitionerProfile.update({ where: { id: practitionerId }, data: { isAvailable: !profile.isAvailable } });
  revalidatePath("/dashboard/practitioner/schedule");
  revalidatePath("/dashboard/practitioner/schedules");
}

export async function removeTreatmentDocument(formData: FormData): Promise<void> {
  return deleteTreatmentDocument(formData);
}

export async function deletePractitionerDocument(formData: FormData): Promise<void> {
  const parsed = practitionerDocumentSchema.pick({ documentId: true }).safeParse(Object.fromEntries(formData));
  if (!parsed.success || !parsed.data.documentId) return;
  const { practitionerId } = await requirePractitionerProfileId();
  await prisma.practitionerDocument.deleteMany({ where: { id: parsed.data.documentId, practitionerId } });
  revalidatePath("/dashboard/practitioner/profile");
}

export async function submitPractitionerForVerification(): Promise<void> {
  const { practitionerId } = await requirePractitionerProfileId();
  await prisma.practitionerProfile.update({ where: { id: practitionerId }, data: { verificationStatus: VerificationStatus.PENDING } });
  revalidatePath("/dashboard/practitioner/profile");
}

export async function createPractitionerService(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState | never> {
  const parsed = practitionerServiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  const { practitionerId } = await requirePractitionerProfileId();
  const category = await prisma.serviceCategory.findFirst({ where: { id: parsed.data.categoryId, isActive: true }, select: { id: true } });
  if (!category) return { message: "Kategori layanan tidak tersedia." };
  const { serviceId, ...data } = parsed.data;
  void serviceId;
  await prisma.practitionerService.create({ data: { ...data, practitionerId } });
  revalidatePath("/dashboard/practitioner/services");
  redirect("/dashboard/practitioner/services");
}

export async function updatePractitionerService(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState | never> {
  const parsed = practitionerServiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  if (!parsed.data.serviceId) return { message: "Layanan tidak ditemukan." };
  const { practitionerId } = await requirePractitionerProfileId();
  const category = await prisma.serviceCategory.findFirst({ where: { id: parsed.data.categoryId, isActive: true }, select: { id: true } });
  if (!category) return { message: "Kategori layanan tidak tersedia." };
  const { serviceId, ...data } = parsed.data;
  await prisma.practitionerService.updateMany({ where: { id: serviceId, practitionerId }, data });
  revalidatePath("/dashboard/practitioner/services");
  redirect("/dashboard/practitioner/services");
}

export async function togglePractitionerService(formData: FormData): Promise<void> {
  const parsed = serviceToggleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const { practitionerId } = await requirePractitionerProfileId();
  const service = await prisma.practitionerService.findFirst({ where: { id: parsed.data.serviceId, practitionerId }, select: { id: true, isActive: true } });
  if (!service) return;
  await prisma.practitionerService.update({ where: { id: service.id }, data: { isActive: !service.isActive } });
  revalidatePath("/dashboard/practitioner/services");
}

async function hasScheduleOverlap(practitionerId: string, dayOfWeek: number, startTime: string, endTime: string, scheduleId?: string) {
  const schedules = await prisma.availabilitySchedule.findMany({ where: { practitionerId, dayOfWeek, ...(scheduleId ? { NOT: { id: scheduleId } } : {}) } });
  return schedules.some((schedule) => startTime < schedule.endTime && endTime > schedule.startTime);
}

export async function createSchedule(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = availabilityScheduleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  const { practitionerId } = await requirePractitionerProfileId();
  if (await hasScheduleOverlap(practitionerId, parsed.data.dayOfWeek, parsed.data.startTime, parsed.data.endTime)) return { message: "Jadwal bertabrakan dengan jadwal lain." };
  const { scheduleId, ...data } = parsed.data;
  void scheduleId;
  await prisma.availabilitySchedule.create({ data: { ...data, practitionerId } });
  revalidatePath("/dashboard/practitioner/schedule");
  revalidatePath("/dashboard/practitioner/schedules");
  return { message: "Jadwal berhasil ditambahkan." };
}

export async function updateSchedule(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = availabilityScheduleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  if (!parsed.data.scheduleId) return { message: "Jadwal tidak ditemukan." };
  const { practitionerId } = await requirePractitionerProfileId();
  if (await hasScheduleOverlap(practitionerId, parsed.data.dayOfWeek, parsed.data.startTime, parsed.data.endTime, parsed.data.scheduleId)) return { message: "Jadwal bertabrakan dengan jadwal lain." };
  const { scheduleId, ...data } = parsed.data;
  await prisma.availabilitySchedule.updateMany({ where: { id: scheduleId, practitionerId }, data });
  revalidatePath("/dashboard/practitioner/schedule");
  revalidatePath("/dashboard/practitioner/schedules");
  return { message: "Jadwal berhasil diperbarui." };
}

export async function deleteSchedule(formData: FormData): Promise<void> {
  const parsed = scheduleIdSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const { practitionerId } = await requirePractitionerProfileId();
  await prisma.availabilitySchedule.deleteMany({ where: { id: parsed.data.scheduleId, practitionerId } });
  revalidatePath("/dashboard/practitioner/schedule");
}

export async function setPractitionerAvailability(formData: FormData): Promise<void> {
  const { practitionerId } = await requirePractitionerProfileId();
  await prisma.practitionerProfile.update({ where: { id: practitionerId }, data: { isAvailable: formData.get("isAvailable") === "on" } });
  revalidatePath("/dashboard/practitioner/schedule");
}

async function transitionBooking(formData: FormData, from: BookingStatus, to: BookingStatus): Promise<PractitionerActionState> {
  const parsed = bookingIdSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  const { practitionerId } = await requirePractitionerProfileId();
  const booking = await requireBooking(practitionerId, parsed.data.bookingId);
  if (!booking) return { message: "Booking tidak ditemukan." };
  if (booking.status !== from) return { message: "Status booking tidak valid untuk aksi ini." };
  await prisma.booking.update({ where: { id: booking.id }, data: { status: to } });
  if (to === BookingStatus.ACCEPTED) {
    await createNotification({ userId: booking.patient.userId, title: "Booking diterima", message: `Booking ${booking.service.name} diterima oleh nakes.`, type: "BOOKING_ACCEPTED" });
  }
  if (to === BookingStatus.COMPLETED) await createInvoiceForBooking(booking.id);
  revalidatePractitionerBooking(booking.id);
  revalidatePath(`/dashboard/patient/bookings/${booking.id}`);
  return { message: "Status booking berhasil diperbarui." };
}

export async function acceptBooking(_state: PractitionerActionState, formData: FormData) { return transitionBooking(formData, BookingStatus.PENDING, BookingStatus.ACCEPTED); }
export async function startBooking(_state: PractitionerActionState, formData: FormData) { return transitionBooking(formData, BookingStatus.ACCEPTED, BookingStatus.IN_PROGRESS); }
export async function completeBooking(_state: PractitionerActionState, formData: FormData) { return transitionBooking(formData, BookingStatus.IN_PROGRESS, BookingStatus.COMPLETED); }

export async function rejectBooking(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = rejectBookingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  const { practitionerId } = await requirePractitionerProfileId();
  const booking = await requireBooking(practitionerId, parsed.data.bookingId);
  if (!booking) return { message: "Booking tidak ditemukan." };
  if (booking.status !== BookingStatus.PENDING) return { message: "Status booking tidak valid untuk ditolak." };
  await prisma.booking.update({ where: { id: booking.id }, data: { status: BookingStatus.REJECTED, cancellationReason: parsed.data.cancellationReason } });
  await createNotification({ userId: booking.patient.userId, title: "Booking ditolak", message: `Booking ${booking.service.name} ditolak: ${parsed.data.cancellationReason}`, type: "BOOKING_REJECTED" });
  revalidatePractitionerBooking(booking.id);
  revalidatePath(`/dashboard/patient/bookings/${booking.id}`);
  return { message: "Booking ditolak." };
}

export async function upsertCppt(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = cpptSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  const { practitionerId } = await requirePractitionerProfileId();
  const booking = await requireBooking(practitionerId, parsed.data.bookingId);
  if (!booking || (booking.status !== BookingStatus.IN_PROGRESS && booking.status !== BookingStatus.COMPLETED)) return { message: "CPPT hanya dapat diisi untuk layanan berlangsung atau selesai." };
  await prisma.cPPT.upsert({ where: { bookingId: booking.id }, update: parsed.data, create: parsed.data });
  if (booking.status === BookingStatus.COMPLETED) {
    await createNotification({ userId: booking.patient.userId, title: "CPPT tersedia", message: `Catatan tindakan untuk ${booking.service.name} sudah tersedia.`, type: "CPPT_AVAILABLE" });
  }
  revalidatePractitionerBooking(booking.id);
  revalidatePath(`/dashboard/practitioner/cppt/${booking.id}/edit`);
  revalidatePath(`/dashboard/patient/bookings/${booking.id}`);
  return { message: "CPPT berhasil disimpan." };
}

export async function addTreatmentDocument(_state: PractitionerActionState, formData: FormData): Promise<PractitionerActionState> {
  const parsed = treatmentDocumentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  if (!parsed.data.consentGiven) return { message: "Persetujuan pasien wajib dicentang." };
  const { practitionerId } = await requirePractitionerProfileId();
  const booking = await requireBooking(practitionerId, parsed.data.bookingId);
  if (!booking) return { message: "Booking tidak ditemukan." };
  await prisma.treatmentDocument.create({ data: parsed.data });
  if (booking.status === BookingStatus.COMPLETED) {
    await createNotification({ userId: booking.patient.userId, title: "Dokumentasi tindakan tersedia", message: `Dokumentasi tindakan untuk ${booking.service.name} sudah tersedia.`, type: "CPPT_AVAILABLE" });
  }
  revalidatePractitionerBooking(booking.id);
  revalidatePath(`/dashboard/patient/bookings/${booking.id}`);
  return { message: "Dokumentasi berhasil ditambahkan." };
}

export async function deleteTreatmentDocument(formData: FormData): Promise<void> {
  const parsed = treatmentDocumentIdSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const { practitionerId } = await requirePractitionerProfileId();
  const document = await prisma.treatmentDocument.findFirst({ where: { id: parsed.data.documentId, booking: { practitionerId } }, select: { id: true, bookingId: true } });
  if (!document) return;
  await prisma.treatmentDocument.delete({ where: { id: document.id } });
  revalidatePractitionerBooking(document.bookingId);
  revalidatePath(`/dashboard/patient/bookings/${document.bookingId}`);
}
