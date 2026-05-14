"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { dashboardPathForRole, requireAuth } from "@/lib/auth/dal";
import { loginSchema, patientRegisterSchema, practitionerCompleteSchema, practitionerRegisterSchema } from "@/lib/auth/schemas";
import { signIn, signOut } from "../../../auth";

export type AuthActionState = {
  message?: string;
  errors?: Record<string, string[]>;
};

function formErrors(error: { flatten: () => { fieldErrors: Record<string, string[]> } }) {
  return { errors: error.flatten().fieldErrors };
}

async function ensureUniqueUser(email: string, phone?: string) {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
    select: { email: true, phone: true },
  });

  if (!existingUser) {
    return null;
  }

  if (existingUser.email === email) {
    return "Email sudah terdaftar.";
  }

  return "Nomor HP sudah terdaftar.";
}

export async function loginWithCredentials(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "Email atau password salah." };
    }

    throw error;
  }

  return {};
}

export async function registerPatient(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = patientRegisterSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  const uniqueError = await ensureUniqueUser(parsed.data.email, parsed.data.phone);

  if (uniqueError) {
    return { message: uniqueError };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      passwordHash,
      role: UserRole.PATIENT,
      patientProfile: { create: {} },
    },
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/dashboard/patient",
  });

  return {};
}

export async function registerPractitioner(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = practitionerRegisterSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  const uniqueError = await ensureUniqueUser(parsed.data.email, parsed.data.phone);

  if (uniqueError) {
    return { message: uniqueError };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      passwordHash,
      role: UserRole.PRACTITIONER,
      practitionerProfile: { create: { profession: parsed.data.profession } },
    },
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/dashboard/practitioner",
  });

  return {};
}

export async function signInWithGoogle(role: "PATIENT" | "PRACTITIONER") {
  await signIn("google", {
    redirectTo: role === "PRACTITIONER" ? "/register/practitioner/complete" : "/dashboard/patient",
  });
}

export async function completePractitionerProfile(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = practitionerCompleteSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return formErrors(parsed.error);
  }

  const user = await requireAuth();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      role: UserRole.PRACTITIONER,
      patientProfile: user.patientProfile ? { delete: true } : undefined,
      practitionerProfile: {
        upsert: {
          create: { profession: parsed.data.profession },
          update: { profession: parsed.data.profession },
        },
      },
    },
  });

  redirect("/dashboard/practitioner");
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function redirectToOwnDashboard() {
  const user = await requireAuth();
  redirect(dashboardPathForRole(user.role));
}
