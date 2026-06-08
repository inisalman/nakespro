# PRD — NakesPro.id

**Versi:** 0.1
**Tanggal:** Juni 2026
**Pemilik:** Salman Al Farisi
**Status:** Draft

---

## 1. Latar Belakang

NakesPro awalnya dirancang sebagai marketplace yang mempertemukan pasien dengan tenaga kesehatan mandiri (perawat luka, bidan, fisioterapis, home care). Proyek marketplace tersebut kini **diarsipkan** (`inisalman/nakespro-marketplace`) dan di-pending.

Arah baru: **NakesPro.id menjadi penyedia jasa pembuatan website untuk tenaga kesehatan mandiri**, dengan model bisnis **hybrid**:

- **Paket Custom (one-off):** jasa pembuatan website branded sesuai kebutuhan nakes/klinik.
- **Paket Template (langganan):** website siap pakai multi-tenant, tiap nakes dapat subdomain + dashboard booking. (fase berikutnya, repo terpisah)

Repo ini (`inisalman/nakespro`) berfokus pada **landing page / situs marketing** yang menjual kedua paket tersebut (Opsi 2: landing dulu, app template dipisah).

---

## 2. Tujuan & Sasaran

### Tujuan
- Membangun situs marketing nakespro.id yang meyakinkan nakes untuk membeli jasa pembuatan website.
- Menyediakan kanal lead generation (form order/konsultasi).
- Menampilkan portofolio & paket harga secara jelas.

### Metrik Sukses (MVP)
- Situs live di nakespro.id, skor Lighthouse Performance ≥ 90.
- Form order berfungsi & lead masuk (email/WhatsApp/database).
- Minimal 3 contoh portofolio tampil.

---

## 3. Target Pengguna

| Persona | Kebutuhan | Paket yang cocok |
|---|---|---|
| Perawat mandiri (praktik luka, home care) | Website profil + booking, branding pribadi | Custom / Template |
| Bidan praktik mandiri | Profil layanan, jadwal, kontak | Template |
| Fisioterapis / klinik kecil | Website branded, fitur khusus | Custom |
| Nakes baru/budget terbatas | Website cepat & murah | Template |

---

## 4. Lingkup MVP (Repo Ini — Landing)

### 4.1 Halaman & Section

1. **Hero** — headline, value proposition, CTA utama (Konsultasi Gratis / Lihat Paket).
2. **Masalah & Solusi** — kenapa nakes butuh website profesional.
3. **Layanan / Cara Kerja** — 3-4 langkah proses (konsultasi → desain → revisi → launch).
4. **Paket Harga** — kartu paket:
   - **Template** (langganan bulanan/tahunan) — website siap pakai, subdomain.
   - **Custom** (one-off) — website branded, domain sendiri, fitur khusus.
5. **Portofolio** — contoh website yang sudah dibuat.
6. **Testimoni** — (opsional, bisa placeholder dulu).
7. **FAQ** — pertanyaan umum (harga, waktu pengerjaan, domain, dll).
8. **Form Order / Konsultasi** — nama, kontak (WA/email), jenis nakes, paket diminati, pesan.
9. **Footer** — kontak, sosial media, link.

### 4.2 Fitur Teknis
- Responsif (desktop-first, tetap mobile-friendly).
- SEO dasar (metadata, OpenGraph, sitemap).
- Form submission → simpan ke database + notifikasi (email/WA). Detail backend menyusul.
- Tema warna: teal `#14B8A6`, sky blue `#38BDF8`, sage `#7FA88E`, cream `#FAF7F2`. Font: Plus Jakarta Sans.

### 4.3 Di Luar Lingkup MVP
- App template multi-tenant (repo terpisah `nakespro-app`).
- Sistem pembayaran/langganan otomatis.
- Dashboard nakes.
- Login/autentikasi.

---

## 5. Arsitektur & Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@import "tailwindcss"`).
- **Icon:** lucide-react. Utility: clsx + tailwind-merge.
- **Deploy:** VPS Easypanel, domain `nakespro.id`.
- **Form backend:** TBD (opsi: server action + Postgres `askep_postgres`, atau kirim ke WhatsApp/email).

### Pemetaan Repo
| Repo | Peran | Status |
|---|---|---|
| `inisalman/nakespro` | Landing/marketing jasa | Aktif (repo ini) |
| `inisalman/nakespro-marketplace` | Marketplace lama | Arsip (read-only) |
| `inisalman/nakespro-app` | App template multi-tenant | Belum dibuat (fase 2) |

---

## 6. Roadmap

### Fase 1 — Landing (repo ini)
1. Setup project Next.js + Tailwind v4. ✅ (sebagian)
2. Bikin komponen dasar (Button, Section, Card).
3. Bangun semua section landing.
4. Form order (frontend + backend sederhana).
5. SEO + optimasi performa.
6. Deploy ke nakespro.id via Easypanel.

### Fase 2 — Template App (repo terpisah)
- Extract modul praktisi/booking/CPPT dari marketplace jadi multi-tenant.
- Subdomain per nakes (`nama.nakespro.id`).
- Langganan & billing.

---

## 7. Pertanyaan Terbuka

- Backend form: simpan ke DB, kirim ke WhatsApp, atau email? (perlu keputusan)
- Harga konkret tiap paket? (perlu input Salman)
- Apakah perlu blog/konten SEO sejak awal?
- Portofolio: pakai data dummy dulu atau tunggu proyek nyata?

---

*Dokumen ini akan diperbarui seiring perkembangan proyek.*
