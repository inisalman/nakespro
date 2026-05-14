import { z } from "zod";

const optionalTrimmedString = z.preprocess((value) => (typeof value === "string" && value.trim() === "" ? undefined : value), z.string().trim().optional());
const requiredString = z.string().trim().min(1, "Wajib diisi.");

export const patientProfileSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  phone: z.string().trim().min(8, "Nomor HP tidak valid.").max(20, "Nomor HP tidak valid."),
  address: optionalTrimmedString,
  birthDate: optionalTrimmedString,
  gender: optionalTrimmedString,
  emergencyContact: optionalTrimmedString,
});

export const bookingSchema = z.object({
  practitionerId: requiredString,
  serviceId: requiredString,
  bookingDate: requiredString,
  bookingTime: requiredString,
  address: z.string().trim().min(10, "Alamat layanan minimal 10 karakter."),
  notes: optionalTrimmedString,
});

export const reviewSchema = z.object({
  bookingId: requiredString,
  rating: z.coerce.number().int().min(1, "Rating minimal 1.").max(5, "Rating maksimal 5."),
  comment: optionalTrimmedString,
});
