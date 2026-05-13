# NakesPro

NakesPro adalah web aplikasi marketplace layanan tenaga kesehatan untuk pasien dan tenaga kesehatan seperti perawat luka, bidan pijat bayi, fisioterapis, dan layanan home care.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Docker Compose untuk database lokal

## Menjalankan di Lokal

Pastikan sudah terinstall:

- Node.js
- npm
- Docker Desktop

### 1. Install dependency

```bash
npm install
```

### 2. Jalankan PostgreSQL lokal

```bash
npm run db:up
```

Database lokal akan berjalan di:

```txt
postgresql://nakespro:nakespro@localhost:5432/nakespro?schema=public
```

### 3. Jalankan migration

```bash
npm run prisma:migrate
```

Jika diminta nama migration, gunakan:

```txt
init
```

### 4. Isi seed kategori layanan

```bash
npm run prisma:seed
```

### 5. Jalankan development server

```bash
npm run dev
```

Buka aplikasi di:

```txt
http://localhost:3000
```

## Perintah Cepat

Setup awal dalam satu perintah:

```bash
npm run setup:local
```

Buka Prisma Studio:

```bash
npm run prisma:studio
```

Matikan database lokal:

```bash
npm run db:down
```

Reset database lokal:

```bash
npm run db:reset
```

## Halaman Awal

- `/` — landing page
- `/login` — login
- `/register` — pilihan registrasi
- `/register/patient` — registrasi pasien
- `/register/practitioner` — registrasi tenaga kesehatan
- `/practitioners` — daftar tenaga kesehatan
- `/practitioners/demo` — detail tenaga kesehatan demo
- `/bookings/new` — form booking demo
- `/dashboard/patient` — dashboard pasien
- `/dashboard/practitioner` — dashboard nakes
- `/dashboard/admin` — dashboard admin
