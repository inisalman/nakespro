import { z } from "zod";

const passwordSchema = z.string().min(8, "Password minimal 8 karakter.").trim();
const phoneSchema = z.string().min(8, "Nomor HP tidak valid.").max(20, "Nomor HP tidak valid.").trim();

export const loginSchema = z.object({
  email: z.email("Email tidak valid.").trim().toLowerCase(),
  password: z.string().min(1, "Password wajib diisi."),
});

export const patientRegisterSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter.").trim(),
  email: z.email("Email tidak valid.").trim().toLowerCase(),
  phone: phoneSchema,
  password: passwordSchema,
});

export const practitionerRegisterSchema = patientRegisterSchema.extend({
  profession: z.string().min(2, "Profesi wajib diisi.").trim(),
});

export const practitionerCompleteSchema = z.object({
  profession: z.string().min(2, "Profesi wajib diisi.").trim(),
});
