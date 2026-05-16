"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma/client";
import { BookingStatus, UserRole } from "@/generated/prisma/enums";
import { requireRole } from "@/lib/auth/dal";
import { createNotification } from "@/lib/notifications/create";
import { prisma } from "@/lib/prisma";
import { bookingSchema, patientProfileSchema, reviewSchema } from "@/lib/patient/schemas";

export type PatientActionState = {
  message?: string;
  errors?: Record<string, string[]>;
};

function formErrors(error: { flatten: () => { fieldErrors: Record<string, string[]> } }) {
  return { errors: error.flatten().fieldErrors };
}

async function requirePatientProfileId() {
  const user = await requireRole(UserRole.PATIENT);

  if (!user.patientProfile?.id) {
    redirect("/login");
  }

  return { user, patientId: user.patientProfile.id };
}

export async function updatePatientProfile(_state: PatientActionState, formData: FormData): Promise<PatientActionState> {
  const parsed = patientProfileSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  const { user, patientId } = await requirePatientProfileId();
  const existingPhone = await prisma.user.findFirst({
    where: { phone: parsed.data.phone, NOT: { id: user.id } },
    select: { id: true },
  });

  if (existingPhone) {
    return { message: "Nomor HP sudah digunakan." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      patientProfile: {
        update: {
          where: { id: patientId },
          data: {
            address: parsed.data.address,
            birthDate: parsed.data.birthDate ? new Date(parsed.data.birthDate) : null,
            gender: parsed.data.gender,
            emergencyContact: parsed.data.emergencyContact,
          },
        },
      },
    },
  });

  revalidatePath("/dashboard/patient");
  revalidatePath("/dashboard/patient/profile");

  return { message: "Profil pasien berhasil diperbarui." };
}

export async function createBooking(_state: PatientActionState, formData: FormData): Promise<PatientActionState | never> {
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  const { user, patientId } = await requirePatientProfileId();
  const service = await prisma.practitionerService.findFirst({
    where: {
      id: parsed.data.serviceId,
      practitionerId: parsed.data.practitionerId,
      isActive: true,
      practitioner: { isAvailable: true },
    },
    select: { id: true, name: true, practitionerId: true, practitioner: { select: { userId: true, user: { select: { name: true } } } } },
  });

  if (!service) {
    return { message: "Layanan tidak tersedia untuk booking." };
  }

  const booking = await prisma.booking.create({
    data: {
      patientId,
      practitionerId: service.practitionerId,
      serviceId: service.id,
      bookingDate: new Date(parsed.data.bookingDate),
      bookingTime: parsed.data.bookingTime,
      address: parsed.data.address,
      notes: parsed.data.notes,
    },
    select: { id: true },
  });

  await createNotification({
    userId: service.practitioner.userId,
    title: "Booking baru",
    message: `${user.name ?? user.email} mengajukan booking untuk ${service.name} pada ${parsed.data.bookingDate} pukul ${parsed.data.bookingTime}.`,
    type: "BOOKING_CREATED",
  });

  revalidatePath("/dashboard/patient");
  revalidatePath("/dashboard/patient/bookings");
  revalidatePath("/dashboard/practitioner");
  revalidatePath("/dashboard/practitioner/bookings");
  redirect(`/bookings/success?bookingId=${booking.id}`);
}

export async function createReview(_state: PatientActionState, formData: FormData): Promise<PatientActionState> {
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  const { patientId } = await requirePatientProfileId();
  const booking = await prisma.booking.findFirst({
    where: { id: parsed.data.bookingId, patientId, status: BookingStatus.COMPLETED },
    select: { id: true, practitionerId: true, practitioner: { select: { slug: true } }, review: { select: { id: true } } },
  });

  if (!booking) {
    return { message: "Booking belum selesai atau tidak ditemukan." };
  }

  if (booking.review) {
    return { message: "Booking ini sudah memiliki ulasan." };
  }

  try {
    await prisma.review.create({
      data: {
        bookingId: booking.id,
        patientId,
        practitionerId: booking.practitionerId,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { message: "Booking ini sudah memiliki ulasan." };
    }

    throw error;
  }

  revalidatePath(`/dashboard/patient/bookings/${booking.id}`);
  revalidatePath(`/${booking.practitioner.slug}`);
  revalidatePath("/practitioners");

  return { message: "Ulasan berhasil disimpan." };
}
