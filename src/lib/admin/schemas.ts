import { z } from "zod";

export const optionalTrimmedString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional(),
);
export const requiredString = z.string().trim().min(1, "Wajib diisi.");
export const optionalBoolean = z.preprocess((value) => value === "on" || value === "true" || value === true, z.boolean());

export const userIdSchema = z.object({ userId: requiredString });
export const toggleUserStatusSchema = userIdSchema;

export const verifyPractitionerSchema = z.object({
  practitionerId: requiredString,
  decision: z.enum(["APPROVE", "REJECT"]),
  rejectionReason: optionalTrimmedString,
}).refine((data) => data.decision !== "REJECT" || Boolean(data.rejectionReason), {
  path: ["rejectionReason"],
  message: "Alasan penolakan wajib diisi.",
});

export const serviceCategorySchema = z.object({
  categoryId: optionalTrimmedString,
  name: z.string().trim().min(3, "Nama kategori minimal 3 karakter."),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung."),
  description: optionalTrimmedString,
  isActive: optionalBoolean,
});

export const categoryToggleSchema = z.object({ categoryId: requiredString });
