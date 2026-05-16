"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAuth } from "@/lib/auth/dal";
import { prisma } from "@/lib/prisma";

const notificationIdSchema = z.object({ notificationId: z.string().trim().min(1) });

export async function markNotificationRead(formData: FormData): Promise<void> {
  const parsed = notificationIdSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const user = await requireAuth();

  await prisma.notification.updateMany({
    where: { id: parsed.data.notificationId, userId: user.id, readAt: null },
    data: { readAt: new Date() },
  });

  revalidatePath("/dashboard/notifications");
}

export async function markNotificationUnread(formData: FormData): Promise<void> {
  const parsed = notificationIdSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  const user = await requireAuth();

  await prisma.notification.updateMany({
    where: { id: parsed.data.notificationId, userId: user.id },
    data: { readAt: null },
  });

  revalidatePath("/dashboard/notifications");
}

export async function markAllNotificationsRead(): Promise<void> {
  const user = await requireAuth();

  await prisma.notification.updateMany({
    where: { userId: user.id, readAt: null },
    data: { readAt: new Date() },
  });

  revalidatePath("/dashboard/notifications");
}
