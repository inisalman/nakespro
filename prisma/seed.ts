import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { UserRole } from "../src/generated/prisma/enums";
import { PrismaClient } from "../src/generated/prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Perawatan Luka",
    slug: "perawatan-luka",
    description: "Layanan perawatan luka di rumah oleh tenaga kesehatan profesional.",
  },
  {
    name: "Pijat Bayi",
    slug: "pijat-bayi",
    description: "Layanan pijat bayi dan edukasi perawatan bayi oleh bidan atau tenaga terlatih.",
  },
  {
    name: "Fisioterapi",
    slug: "fisioterapi",
    description: "Layanan fisioterapi untuk pemulihan gerak, nyeri, dan rehabilitasi.",
  },
  {
    name: "Home Care",
    slug: "home-care",
    description: "Layanan perawatan kesehatan umum di rumah pasien.",
  },
  {
    name: "Perawatan Lansia",
    slug: "perawatan-lansia",
    description: "Layanan pendampingan dan perawatan lansia di rumah.",
  },
  {
    name: "Pasca Operasi",
    slug: "pasca-operasi",
    description: "Layanan pemantauan dan perawatan pasien setelah operasi.",
  },
];

async function main() {
  const adminPasswordHash = await hashPassword("adminsalman");

  await prisma.user.upsert({
    where: { email: "adminsalman@nakespro.local" },
    update: {
      name: "adminsalman",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      name: "adminsalman",
      email: "adminsalman@nakespro.local",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  for (const category of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
