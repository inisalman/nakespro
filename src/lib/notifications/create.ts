import { prisma } from "@/lib/prisma";

type CreateNotificationInput = {
  userId: string;
  title: string;
  message: string;
  type: string;
};

export async function createNotification({ userId, title, message, type }: CreateNotificationInput) {
  return prisma.notification.create({ data: { userId, title, message, type } });
}
