import { prisma } from "@/lib/prisma";

const reservedSlugs = new Set([
  "api",
  "bookings",
  "dashboard",
  "login",
  "practitioners",
  "register",
]);

export function slugifyPractitionerName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export async function createUniquePractitionerSlug(name: string) {
  const baseSlug = slugifyPractitionerName(name) || "nakes";
  let slug = reservedSlugs.has(baseSlug) ? `${baseSlug}-nakes` : baseSlug;
  let suffix = 2;

  while (await prisma.practitionerProfile.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}
