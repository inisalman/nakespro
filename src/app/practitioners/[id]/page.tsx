import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PractitionerDetailRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const practitioner = await prisma.practitionerProfile.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!practitioner) {
    notFound();
  }

  redirect(`/${practitioner.slug}`);
}
