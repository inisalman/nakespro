# PRD — NakesPro App (Template SaaS Multi-Tenant)

**Repo:** `inisalman/nakespro-app` (belum dibuat)  
**Versi:** 0.1  
**Tanggal:** Juni 2026  
**Pemilik:** Salman Al Farisi  
**Status:** Draft — fase 2

---

## 1. Ringkasan Produk

**NakesPro App** adalah platform **SaaS multi-tenant** yang memberikan setiap tenaga kesehatan mandiri sebuah website siap pakai di subdomain sendiri (`nama.nakespro.id`). Nakes dapat menampilkan profil layanan, menerima booking pasien via WhatsApp, memiliki admin panel untuk mengelola jadwal dan CPPT, serta membagikan ringkasan tindakan ke pasien.

**Harga:** Rp20.000/bulan (paket Starter)

---

## 2. Value Proposition

| Pain Nakes | Solusi |
|---|---|
| Tidak punya website profesional | Website siap pakai dalam hitungan menit, subdomain sendiri |
| Pasien sulit booking | Form booking online → notifikasi WhatsApp otomatis ke nakes |
| Administrasi berantakan | Admin panel: kelola jadwal, booking, CPPT, dokumentasi |
| Pasien minta hasil tindakan | Share CPPT via link publik tanpa login |
| Budget terbatas | Rp20rb/bln — kurang dari harga kopi sebulan |

---

## 3. Arsitektur Multi-Tenant

### Prinsip: **Satu Aplikasi, Banyak Tenant**

Semua nakes berbagi **satu container Next.js**, **satu database PostgreSQL**. Data dipisahkan per tenant di level aplikasi (shared database, shared schema), bukan per container.

```
                       ┌─────────────────────────────┐
                       │   askep_nakespro-app          │
                       │   (1 container Next.js)       │
                       │   ~500MB-1GB RAM              │
                       │                               │
budi.nakespro.id ─────→│   Middleware: detect subdomain │──→ DB: nakespro_template
siti.nakespro.id ─────→│   Query: WHERE tenantId = ?   │
andi.nakespro.id ─────→│   Auth: per-tenant scope      │
                       └─────────────────────────────┘
```

### Subdomain Routing (Next.js Middleware)

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const subdomain = host.split(".")[0]; // "budi" dari "budi.nakespro.id"
  
  if (subdomain !== "www" && subdomain !== "nakespro") {
    // Ini request ke tenant subdomain
    const tenant = await getTenantBySlug(subdomain);
    if (!tenant) return NextResponse.redirect("https://nakespro.id");
    
    // Inject tenantId ke semua request downstream
    const headers = new Headers(request.headers);
    headers.set("x-tenant-id", tenant.id);
    headers.set("x-tenant-slug", tenant.slug);
    return NextResponse.next({ request: { headers } });
  }
}
```

### Data Isolation Pattern

```typescript
// SEMUA query harus punya tenantId filter
async function getBookings(tenantId: string) {
  return prisma.booking.findMany({
    where: { tenantId }, // ← ini kunci: per-tenant isolation
  });
}

async function createCppt(tenantId: string, data: CpptInput) {
  return prisma.cPPT.create({
    data: { ...data, tenantId }, // ← tenantId auto-attach
  });
}
```

---

## 4. Fitur Per Tenant

### 4.1 Website Publik (subdomain)

Setiap nakes dapat halaman publik di `nama.nakespro.id`:

| Halaman | Isi | Akses |
|---|---|---|
| `/` | Profil nakes: nama, foto, spesialisasi, layanan, lokasi praktik | Publik |
| `/booking` | Form booking: nama pasien, kontak WA, keluhan, tanggal & jam pilihan | Publik |
| `/booking/sukses` | Konfirmasi booking terkirim + link WhatsApp nakes | Publik |

### 4.2 Booking via WhatsApp

Alur booking:
1. Pasien isi form di `nama.nakespro.id/booking`
2. Data disimpan ke DB (tenant-scoped)
3. Notifikasi **otomatis dikirim ke WhatsApp nakes** via open WhatsApp URL + template pesan:

```
Halo Budi, ada booking baru!

Nama Pasien: Ibu Sari
Keluhan: Luka diabetes perlu perawatan
Kontak: 0856xxxxx
Tanggal: Selasa, 10 Juni 2026

Balas "OK" untuk konfirmasi.
```

4. Nakes bisa akses admin panel untuk melihat & mengelola booking

### 4.3 Admin Panel (`/admin`)

Halaman login-protected untuk nakes. Fitur:

| Menu | Fungsi |
|---|---|
| **Dashboard** | Ringkasan: booking hari ini, booking pending, total pasien bulan ini |
| **Booking** | List booking (pending, dikonfirmasi, selesai, dibatalkan). Filter tanggal. |
| **CPPT** | Buat & edit CPPT per booking (SOAP + tindakan + edukasi + follow-up) |
| **Profil** | Edit profil: foto, nama, spesialisasi, layanan, nomor WA, jam praktik |
| **Dokumentasi** | Upload & kelola foto dokumentasi tindakan |

### 4.4 Share CPPT

Mirip fitur yang udah dibuat di marketplace:
- **Share link publik:** `nakespro.id/cppt/share/{shareToken}`
- Halaman ringkasan tanpa login: nama pasien, tindakan, edukasi, follow-up
- Detail SOAP lengkap di-collapse
- Link bisa dikirim ke pasien via WhatsApp

### 4.5 Autentikasi

- Login via **Google OAuth** (paling simpel buat nakes — nggak perlu ingat password)
- Atau **magic link via WhatsApp** (kirim token login ke nomor WA nakes)
- MVP: Google OAuth dulu, magic link menyusul

---

## 5. Data Model

### 5.1 Tabel Baru: `Tenant`

```prisma
model Tenant {
  id            String   @id @default(cuid())
  slug          String   @unique   // subdomain: "budi"
  name          String             // nama nakes: "Budi Setiawan, S.Kep"
  email         String?  @unique
  phone         String?            // WA: "628568461024"
  
  // Profil publik
  title         String?            // "Perawat Luka Mandiri"
  description   String?            // bio/tentang
  services      String?            // JSON: ["Perawatan luka", "Home care"]
  avatarUrl     String?
  location      String?            // "Jakarta Selatan"
  practiceHours String?            // "Senin-Sabtu, 08:00-17:00"
  
  // Subscription
  plan          String   @default("starter") // starter | pro | premium
  status        String   @default("active")  // active | suspended | cancelled
  subscribedAt  DateTime @default(now())
  expiresAt     DateTime?
  
  // Relations
  bookings      Booking[]
  cppts         CPPT[]
  documents     TreatmentDocument[]
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### 5.2 Tabel Dimodifikasi: `Booking`

```prisma
model Booking {
  id            String   @id @default(cuid())
  tenantId      String
  tenant        Tenant   @relation(fields: [tenantId], references: [id])
  
  patientName   String
  patientPhone  String
  complaint     String?
  preferredDate DateTime?
  notes         String?
  
  status        String   @default("pending") // pending | confirmed | completed | cancelled
  cppt          CPPT?
  
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### 5.3 Tabel Dimodifikasi: `CPPT`

```prisma
model CPPT {
  id              String   @id @default(cuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  bookingId       String   @unique
  booking         Booking  @relation(fields: [bookingId], references: [id])
  
  subjective      String?
  objective       String?
  assessment      String?
  plan            String?
  actionTaken     String?
  education       String?
  followUpPlan    String?
  additionalNotes String?
  
  shareToken      String?  @unique  // buat public share link
  
  documents       TreatmentDocument[]
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 5.4 Tabel Dimodifikasi: `TreatmentDocument`

```prisma
model TreatmentDocument {
  id        String   @id @default(cuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  cpptId    String?
  cppt      CPPT?    @relation(fields: [cpptId], references: [id])
  
  url       String
  caption   String?
  
  createdAt DateTime @default(now())
}
```

### 5.5 Tabel: `Account` (Auth)

```prisma
model Account {
  id            String  @id @default(cuid())
  tenantId      String  @unique
  tenant        Tenant  @relation(fields: [tenantId], references: [id])
  
  provider      String  // "google"
  providerAccountId String
  email         String
  
  createdAt     DateTime @default(now())
}
```

### 5.6 Entity Relationship Diagram (Konseptual)

```
Tenant (1) ──→ (*) Booking ──→ (0..1) CPPT ──→ (*) TreatmentDocument
  │
  └── (0..1) Account
```

**Semua tabel punya `tenantId`** — ini yang menjamin isolasi data.

---

## 6. Stack Teknis

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSR + API routes + middleware subdomain |
| Styling | Tailwind CSS v4 | Sama seperti landing, Plus Jakarta Sans |
| Database | PostgreSQL (askep_postgres) | Reuse container existing, nambah DB `nakespro_template` |
| ORM | Prisma v7 | Tipe aman, migration, udah familiar |
| Auth | NextAuth.js v5 / Better Auth | Google OAuth untuk login nakes |
| Icons | lucide-react | Ringan, konsisten dengan landing |
| Deploy | Easypanel (VPS 96.9.231.66) | Service `askep_nakespro-app`, Dockerfile multi-stage |
| Domain | `*.nakespro.id` (wildcard) | Subdomain per nakes |

---

## 7. Struktur Folder (Repo `nakespro-app`)

```
nakespro-app/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css
│   │   ├── page.tsx                # Halaman utama (diakses dari subdomain)
│   │   ├── booking/
│   │   │   ├── page.tsx            # Form booking publik
│   │   │   └── sukses/
│   │   │       └── page.tsx        # Konfirmasi booking
│   │   ├── (admin)/                # Route group — admin panel
│   │   │   ├── layout.tsx          # Admin layout (sidebar)
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx        # Dashboard
│   │   │   │   ├── booking/
│   │   │   │   │   └── page.tsx    # Kelola booking
│   │   │   │   ├── cppt/
│   │   │   │   │   ├── page.tsx    # List CPPT
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx # Edit CPPT
│   │   │   │   └── profil/
│   │   │   │       └── page.tsx    # Edit profil
│   │   ├── cppt/
│   │   │   └── share/
│   │   │       └── [token]/
│   │   │           └── page.tsx    # Share CPPT publik
│   │   └── api/
│   │       └── auth/
│   │           └── [...nextauth]/  # Auth endpoints
│   ├── components/
│   │   ├── ui/                     # Button, Card, Input, Badge
│   │   ├── booking-form.tsx        # Form booking publik
│   │   ├── admin-sidebar.tsx       # Sidebar admin
│   │   └── cppt-form.tsx           # Form CPPT (reuse marketplace)
│   ├── lib/
│   │   ├── prisma.ts               # Prisma client
│   │   ├── auth.ts                 # Auth config
│   │   ├── tenant.ts               # Tenant helpers (getTenant, useTenant)
│   │   ├── utils.ts                # cn(), formatters
│   │   └── booking/
│   │       ├── actions.ts          # Server actions: createBooking, confirmBooking
│   │       └── notifications.ts    # Generate WhatsApp message URL
│   └── middleware.ts               # Subdomain detection + tenant injection
├── Dockerfile
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 8. Alur Kunci

### 8.1 Registrasi Nakes Baru

```
1. Nakes buka nakespro.id → lihat paket Template → klik "Daftar"
2. Landing page redirect ke halaman registrasi (atau langsung ke app)
3. Nakes login dengan Google → akun dibuat otomatis
4. Pilih subdomain (budi.nakespro.id) → cek ketersediaan
5. Isi profil: nama, spesialisasi, nomor WA, jam praktik
6. Website langsung live di subdomain
```

### 8.2 Pasien Booking

```
1. Pasien buka budi.nakespro.id → lihat profil nakes
2. Klik "Booking" → isi form (nama, WA, keluhan, tanggal)
3. Submit → data masuk DB (tenantId = "budi")
4. Sistem generate WhatsApp link otomatis ke nakes
   - Opsi A: redirect pasien ke WA nakes dengan template pesan
   - Opsi B: kirim notifikasi terpisah (butuh WA Business API, fase 2)
5. Nakes buka admin panel → lihat booking baru → konfirmasi/tolak
```

### 8.3 Nakes Kelola CPPT

```
1. Nakes buka admin panel → pilih booking yang sudah "confirmed"
2. Isi form CPPT (SOAP + tindakan + edukasi + follow-up)
3. Upload foto dokumentasi (opsional)
4. Simpan → shareToken otomatis digenerate
5. Nakes klik "Bagikan ke Pasien" → copy link atau kirim via WA
6. Pasien buka link → lihat ringkasan tindakan
```

---

## 9. Roadmap

### Fase 2A — MVP (target: 2 minggu)

- [ ] Buat repo `inisalman/nakespro-app`
- [ ] Setup Next.js 16 + Prisma + Tailwind v4
- [ ] Data model: Tenant, Booking, CPPT, TreatmentDocument, Account
- [ ] Middleware subdomain detection
- [ ] Halaman publik: profil nakes + form booking
- [ ] WhatsApp notification (redirect URL template)
- [ ] Admin panel: dashboard, booking list, CPPT
- [ ] Share CPPT publik (reuse marketplace code)
- [ ] Google OAuth login
- [ ] Dockerfile + deploy Easypanel (service `askep_nakespro-app`)
- [ ] Domain wildcard `*.nakespro.id`

### Fase 2B — Polish

- [ ] Halaman profil nakes yang lebih bagus (foto, galeri)
- [ ] Notifikasi WhatsApp otomatis (via WA Business API atau cron job)
- [ ] Reminder booking ke pasien
- [ ] Statistik dashboard (booking/bulan, pasien baru)
- [ ] Custom domain (nakes bisa pakai domain sendiri)

### Fase 2C — Scale

- [ ] Tier Pro (Rp49rb/bln): booking online real-time, domain sendiri, notifikasi WA otomatis
- [ ] Tier Premium (Rp99rb/bln): multi-nakes, rekam medis ringan, laporan
- [ ] Landing page update: tombol "Daftar Template" aktif, integrasi registrasi

---

## 10. Pertanyaan Terbuka

1. **Registrasi self-service atau manual?** — Nakes daftar sendiri via Google login, atau lu daftarin manual per nakes?
2. **Free trial?** — 7-14 hari gratis sebelum mulai bayar?
3. **Pembayaran otomatis?** — Perlu payment gateway (Midtrans/Xendit) atau transfer manual dulu?
4. **WhatsApp notifikasi otomatis?** — Fase 1 cukup redirect URL template (gratis), atau langsung WA Business API (berbayar ~Rp500/bln)?
5. **Domain wildcard SSL?** — Let's Encrypt wildcard butuh DNS challenge. Cloudflare API bisa automasi ini.

---

*Dokumen ini akan diperbarui seiring development.*
