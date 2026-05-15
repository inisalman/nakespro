"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DocumentStatus, UserRole, VerificationStatus } from "@/generated/prisma/enums";
import { requireRole } from "@/lib/auth/dal";
import { createNotification } from "@/lib/notifications/create";
import { prisma } from "@/lib/prisma";
import { categoryToggleSchema, serviceCategorySchema, toggleUserStatusSchema, verifyPractitionerSchema } from "@/lib/admin/schemas";

export type AdminActionState = { message?: string; errors?: Record<string, string[]> };

async function requireAdmin() {
  return requireRole(UserRole.ADMIN);
}

function formErrors(error: { flatten: () => { fieldErrors: Record<string, string[]> } }) {
  return { errors: error.flatten().fieldErrors };
}

function revalidateAdminPaths() {
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/admin/users");
  revalidatePath("/dashboard/admin/practitioners");
  revalidatePath("/dashboard/admin/verifications");
  revalidatePath("/dashboard/admin/categories");
  revalidatePath("/dashboard/admin/bookings");
  revalidatePath("/dashboard/admin/invoices");
}

export async function toggleUserActive(formData: FormData): Promise<void> {
  const parsed = toggleUserStatusSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const admin = await requireAdmin();
  if (parsed.data.userId === admin.id) return;

  const user = await prisma.user.findUnique({ where: { id: parsed.data.userId }, select: { id: true, role: true, isActive: true } });
  if (!user || user.role === UserRole.ADMIN) return;

  await prisma.user.update({ where: { id: user.id }, data: { isActive: !user.isActive } });
  revalidateAdminPaths();
}

export async function approvePractitionerVerification(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = verifyPractitionerSchema.safeParse({ ...Object.fromEntries(formData), decision: "APPROVE" });
  if (!parsed.success) return formErrors(parsed.error);
  await requireAdmin();

  const practitioner = await prisma.practitionerProfile.findUnique({ where: { id: parsed.data.practitionerId }, select: { id: true, userId: true } });
  if (!practitioner) return { message: "Nakes tidak ditemukan." };

  await prisma.$transaction([
    prisma.practitionerProfile.update({ where: { id: practitioner.id }, data: { verificationStatus: VerificationStatus.VERIFIED } }),
    prisma.practitionerDocument.updateMany({ where: { practitionerId: practitioner.id }, data: { status: DocumentStatus.APPROVED, rejectionReason: null } }),
  ]);
  await createNotification({ userId: practitioner.userId, title: "Verifikasi disetujui", message: "Profil nakes Anda sudah terverifikasi.", type: "PRACTITIONER_VERIFICATION_APPROVED" });
  revalidateAdminPaths();
  revalidatePath(`/dashboard/admin/practitioners/${practitioner.id}`);
  return { message: "Verifikasi nakes disetujui." };
}

export async function rejectPractitionerVerification(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = verifyPractitionerSchema.safeParse({ ...Object.fromEntries(formData), decision: "REJECT" });
  if (!parsed.success) return formErrors(parsed.error);
  await requireAdmin();

  const practitioner = await prisma.practitionerProfile.findUnique({ where: { id: parsed.data.practitionerId }, select: { id: true, userId: true } });
  if (!practitioner) return { message: "Nakes tidak ditemukan." };

  await prisma.$transaction([
    prisma.practitionerProfile.update({ where: { id: practitioner.id }, data: { verificationStatus: VerificationStatus.REJECTED } }),
    prisma.practitionerDocument.updateMany({ where: { practitionerId: practitioner.id, status: DocumentStatus.PENDING }, data: { status: DocumentStatus.REJECTED, rejectionReason: parsed.data.rejectionReason } }),
  ]);
  await createNotification({ userId: practitioner.userId, title: "Verifikasi ditolak", message: `Verifikasi profil nakes ditolak: ${parsed.data.rejectionReason}`, type: "PRACTITIONER_VERIFICATION_REJECTED" });
  revalidateAdminPaths();
  revalidatePath(`/dashboard/admin/practitioners/${practitioner.id}`);
  return { message: "Verifikasi nakes ditolak." };
}

export async function createServiceCategory(_state: AdminActionState, formData: FormData): Promise<AdminActionState | never> {
  const parsed = serviceCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  await requireAdmin();

  const existing = await prisma.serviceCategory.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } });
  if (existing) return { message: "Slug kategori sudah digunakan." };

  const { categoryId, ...data } = parsed.data;
  void categoryId;
  await prisma.serviceCategory.create({ data });
  revalidatePath("/dashboard/admin/categories");
  redirect("/dashboard/admin/categories");
}

export async function updateServiceCategory(_state: AdminActionState, formData: FormData): Promise<AdminActionState | never> {
  const parsed = serviceCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return formErrors(parsed.error);
  if (!parsed.data.categoryId) return { message: "Kategori tidak ditemukan." };
  await requireAdmin();

  const category = await prisma.serviceCategory.findUnique({ where: { id: parsed.data.categoryId }, select: { id: true } });
  if (!category) return { message: "Kategori tidak ditemukan." };
  const duplicate = await prisma.serviceCategory.findFirst({ where: { slug: parsed.data.slug, NOT: { id: category.id } }, select: { id: true } });
  if (duplicate) return { message: "Slug kategori sudah digunakan." };

  const { categoryId, ...data } = parsed.data;
  await prisma.serviceCategory.update({ where: { id: categoryId }, data });
  revalidatePath("/dashboard/admin/categories");
  redirect("/dashboard/admin/categories");
}

export async function toggleServiceCategory(formData: FormData): Promise<void> {
  const parsed = categoryToggleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await requireAdmin();

  const category = await prisma.serviceCategory.findUnique({ where: { id: parsed.data.categoryId }, select: { id: true, isActive: true } });
  if (!category) return;
  await prisma.serviceCategory.update({ where: { id: category.id }, data: { isActive: !category.isActive } });
  revalidatePath("/dashboard/admin/categories");
}
