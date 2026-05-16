import { z } from "zod";
import { TreatmentDocumentType } from "@/generated/prisma/enums";

const optionalTrimmedString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional(),
);
const requiredString = z.string().trim().min(1, "Wajib diisi.");
const optionalBoolean = z.preprocess((value) => value === "on" || value === "true" || value === true, z.boolean());

export const practitionerProfileSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  phone: z.string().trim().min(8, "Nomor HP tidak valid.").max(20, "Nomor HP tidak valid."),
  image: optionalTrimmedString,
  profession: requiredString,
  specialization: optionalTrimmedString,
  bio: optionalTrimmedString,
  experienceYears: z.coerce.number().int().min(0, "Pengalaman tidak valid.").max(80, "Pengalaman tidak valid.").optional().or(z.literal("").transform(() => undefined)),
  serviceArea: optionalTrimmedString,
  licenseNumber: optionalTrimmedString,
  isAvailable: optionalBoolean,
});

export const practitionerDocumentSchema = z.object({
  documentId: optionalTrimmedString,
  documentType: requiredString,
  fileUrl: z.string().trim().url("URL dokumen tidak valid."),
});

export const practitionerServiceSchema = z.object({
  serviceId: optionalTrimmedString,
  categoryId: requiredString,
  name: z.string().trim().min(3, "Nama layanan minimal 3 karakter."),
  description: optionalTrimmedString,
  price: z.coerce.number().int().min(1000, "Harga layanan tidak valid."),
  durationMinutes: z.coerce.number().int().min(15, "Durasi minimal 15 menit.").max(1440, "Durasi terlalu panjang."),
  isActive: optionalBoolean,
});

export const serviceToggleSchema = z.object({
  serviceId: requiredString,
});

export const availabilityScheduleSchema = z.object({
  scheduleId: optionalTrimmedString,
  dayOfWeek: z.coerce.number().int().min(0, "Hari tidak valid.").max(6, "Hari tidak valid."),
  startTime: z.string().trim().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Jam mulai tidak valid."),
  endTime: z.string().trim().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Jam selesai tidak valid."),
  isActive: optionalBoolean,
}).refine((data) => data.startTime < data.endTime, { path: ["endTime"], message: "Jam selesai harus setelah jam mulai." });

export const scheduleIdSchema = z.object({
  scheduleId: requiredString,
});

export const bookingIdSchema = z.object({
  bookingId: requiredString,
});

export const rejectBookingSchema = z.object({
  bookingId: requiredString,
  cancellationReason: z.string().trim().min(3, "Alasan penolakan wajib diisi."),
});

export const cpptSchema = z.object({
  bookingId: requiredString,
  subjective: optionalTrimmedString,
  objective: optionalTrimmedString,
  assessment: optionalTrimmedString,
  plan: optionalTrimmedString,
  actionTaken: optionalTrimmedString,
  education: optionalTrimmedString,
  followUpPlan: optionalTrimmedString,
  additionalNotes: optionalTrimmedString,
});

export const treatmentDocumentSchema = z.object({
  bookingId: requiredString,
  cpptId: optionalTrimmedString,
  documentType: z.nativeEnum(TreatmentDocumentType),
  fileUrl: z.string().trim().url("URL dokumentasi tidak valid."),
  description: optionalTrimmedString,
  consentGiven: optionalBoolean.refine(Boolean, "Persetujuan pasien wajib dicentang."),
});

export const treatmentDocumentIdSchema = z.object({
  documentId: requiredString,
});
