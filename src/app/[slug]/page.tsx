import { notFound } from "next/navigation";
import { Navbar } from "@/components/marketing/navbar";
import { PractitionerDetail } from "@/components/practitioners/practitioner-detail";
import { prisma } from "@/lib/prisma";

const reservedSlugs = new Set(["api", "bookings", "dashboard", "login", "practitioners", "register"]);

export default async function PublicPractitionerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (reservedSlugs.has(slug)) {
    notFound();
  }

  const practitioner = await prisma.practitionerProfile.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, image: true } },
      services: { where: { isActive: true }, include: { category: { select: { name: true } } }, orderBy: { price: "asc" } },
      schedules: { where: { isActive: true }, orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }] },
      reviews: {
        orderBy: { createdAt: "desc" },
        include: { patient: { include: { user: { select: { name: true, image: true } } } } },
      },
    },
  });

  if (!practitioner || !practitioner.isAvailable) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <PractitionerDetail practitioner={practitioner} />
    </main>
  );
}
