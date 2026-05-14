import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { VerificationStatus } from "@/generated/prisma/enums";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type PractitionerCardData = {
  id: string;
  slug: string;
  profession: string;
  specialization: string | null;
  serviceArea: string | null;
  verificationStatus: VerificationStatus;
  user: { name: string | null; image: string | null };
  services: { price: number }[];
  reviews: { rating: number }[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function averageRating(reviews: { rating: number }[]) {
  if (!reviews.length) {
    return null;
  }

  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function PractitionerCard({ practitioner }: { practitioner: PractitionerCardData }) {
  const name = practitioner.user.name ?? "Tenaga Kesehatan";
  const minimumPrice = practitioner.services.length ? Math.min(...practitioner.services.map((service) => service.price)) : null;
  const rating = averageRating(practitioner.reviews);

  return (
    <Link href={`/${practitioner.slug}`}>
      <Card className="h-full transition hover:-translate-y-1 hover:border-teal-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <Avatar name={name} src={practitioner.user.image ?? undefined} className="h-12 w-12 rounded-2xl" />
            <div>
              <h2 className="font-bold text-slate-950">{name}</h2>
              <p className="text-sm text-slate-500">{practitioner.specialization ?? practitioner.profession}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {rating ? rating.toFixed(1) : "Baru"}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {practitioner.serviceArea ? (
            <Badge variant="slate">
              <MapPin className="mr-1 h-3.5 w-3.5" /> {practitioner.serviceArea}
            </Badge>
          ) : null}
          {minimumPrice ? <Badge>Mulai {formatCurrency(minimumPrice)}</Badge> : null}
          {practitioner.verificationStatus === VerificationStatus.VERIFIED ? <Badge variant="blue">Terverifikasi</Badge> : null}
        </div>
      </Card>
    </Link>
  );
}
