import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";
import { Navbar } from "@/components/marketing/navbar";
import { PractitionerCard } from "@/components/practitioners/practitioner-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { prisma } from "@/lib/prisma";

const practitionerInclude = {
  user: { select: { name: true, image: true } },
  services: { where: { isActive: true }, select: { price: true } },
  reviews: { select: { rating: true } },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(searchParams: Record<string, string | string[] | undefined>, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function numberValue(value?: string) {
  if (!value) {
    return undefined;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export default async function PractitionersPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = valueOf(params, "q")?.trim();
  const category = valueOf(params, "category")?.trim();
  const location = valueOf(params, "location")?.trim();
  const minPrice = numberValue(valueOf(params, "minPrice"));
  const maxPrice = numberValue(valueOf(params, "maxPrice"));
  const minRating = numberValue(valueOf(params, "minRating"));

  const priceFilter: Prisma.IntFilter | undefined = minPrice || maxPrice ? {} : undefined;

  if (priceFilter && minPrice) {
    priceFilter.gte = minPrice;
  }

  if (priceFilter && maxPrice) {
    priceFilter.lte = maxPrice;
  }

  const serviceFilter: Prisma.PractitionerServiceWhereInput = {
    isActive: true,
    ...(category ? { category: { slug: category } } : {}),
    ...(priceFilter ? { price: priceFilter } : {}),
  };

  const where: Prisma.PractitionerProfileWhereInput = {
    isAvailable: true,
    services: { some: serviceFilter },
    ...(location ? { serviceArea: { contains: location, mode: "insensitive" } } : {}),
    ...(q
      ? {
          OR: [
            { profession: { contains: q, mode: "insensitive" } },
            { specialization: { contains: q, mode: "insensitive" } },
            { user: { name: { contains: q, mode: "insensitive" } } },
            { services: { some: { isActive: true, name: { contains: q, mode: "insensitive" } } } },
          ],
        }
      : {}),
  };

  const [categories, allPractitioners] = await Promise.all([
    prisma.serviceCategory.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, select: { name: true, slug: true } }),
    prisma.practitionerProfile.findMany({ where, include: practitionerInclude, orderBy: { createdAt: "desc" } }),
  ]);

  const practitioners = minRating
    ? allPractitioners.filter((practitioner) => {
        if (!practitioner.reviews.length) {
          return false;
        }

        const average = practitioner.reviews.reduce((sum, review) => sum + review.rating, 0) / practitioner.reviews.length;
        return average >= minRating;
      })
    : allPractitioners;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Badge>Direktori Nakes</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Cari tenaga kesehatan</h1>
          <p className="mt-2 text-slate-600">Filter berdasarkan layanan, lokasi, harga, dan rating.</p>
        </div>
        <Card className="mb-8 p-5">
          <form className="grid gap-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input name="q" defaultValue={q} className="pl-10" placeholder="Cari nama, profesi, layanan" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input name="location" defaultValue={location} className="pl-10" placeholder="Lokasi" />
            </div>
            <Select name="category" defaultValue={category ?? ""}>
              <option value="">Semua kategori</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>{item.name}</option>
              ))}
            </Select>
            <Input name="maxPrice" type="number" min="0" defaultValue={maxPrice} placeholder="Harga maks" />
            <Select name="minRating" defaultValue={minRating?.toString() ?? ""}>
              <option value="">Semua rating</option>
              <option value="4">Rating 4+</option>
              <option value="4.5">Rating 4.5+</option>
            </Select>
            <button className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-500 px-6 text-sm font-semibold text-white hover:bg-teal-600">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
            </button>
          </form>
        </Card>
        {practitioners.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {practitioners.map((practitioner) => <PractitionerCard key={practitioner.id} practitioner={practitioner} />)}
          </div>
        ) : (
          <EmptyState title="Nakes tidak ditemukan" description="Coba ubah kata kunci, lokasi, kategori, harga, atau rating untuk melihat hasil lain." />
        )}
      </section>
    </main>
  );
}
