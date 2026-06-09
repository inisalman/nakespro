# PRD — NakesPro.id (Landing Page)

**Repo:** `inisalman/nakespro`
**Versi:** 1.0
**Tanggal:** Juni 2026
**Pemilik:** Salman Al Farisi
**Status:** Live — maintain mode

---

## 1. Latar Belakang

NakesPro.id adalah situs marketing + landing page untuk jasa pembuatan website tenaga kesehatan mandiri.

**Arah lama** (di-archive): Marketplace yang mempertemukan pasien dengan nakes.

**Arah sekarang:** Penyedia jasa pembuatan website untuk nakes dengan **dua paket**:

| Paket | Harga | Model |
|---|---|---|
| **Custom** | Rp2.000.000 one-off | Salman build manual |
| **Template** | Rp20.000/bulan | Salman build manual juga (self-service CMS target Fase 2) |

Landing page ini menjual kedua paket tersebut dan mengarahkan client ke app (`nakespro-app`) untuk register, bayar, dan isi form detail.

---

## 2. Tujuan & Sasaran

### Tujuan
- Landing page yang meyakinkan nakes untuk membeli jasa pembuatan website.
- Arahkan traffic ke flow: register → bayar → isi form → Salman build.

### Metrik Sukses
- Landing live di nakespro.id ✅
- CTA "Custom Website" dan "Template Website" mengarahkan ke app
- Minimal 1 portofolio nyata

---

## 3. Target Pengguna

| Persona | Kebutuhan | Paket |
|---|---|---|
| Perawat mandiri (praktik luka, home care) | Website profil + branding | Custom / Template |
| Bidan praktik mandiri | Profil layanan, kontak | Template |
| Fisioterapis / klinik kecil | Website branded | Custom |
| Nakes baru / budget terbatas | Website cepat & murah | Template |

---

## 4. Lingkup (Repo Ini — Landing)

### 4.1 Halaman & Section

1. **Hero** — headline, value proposition, CTA ("Custom Website" + "Template Website")
2. **Masalah & Solusi** — kenapa nakes butuh website profesional
3. **Paket Harga** — kartu paket:
   - **Custom** (Rp2.000.000 one-off) → CTA: "Pesan Custom"
   - **Template** (Rp20.000/bulan) → CTA: "Langganan Template"
4. **Portofolio** — contoh website yang sudah dibuat
5. **FAQ** — pertanyaan umum
6. **Footer** — kontak, sosial media, link

> Section "Form Order / Konsultasi" digantikan oleh flow app. Landing fokus ke selling, bukan form lead generation.

### 4.2 CTA Flow

```
Landing (nakespro.id)
├── "Pesan Custom Website" → /custom → /auth/login → register → payment → form
└── "Langganan Template"   → /template → /auth/login → register → payment → form
```

Landing NAKES PROMO di section harga, bukan tombol ke app.

### 4.3 Fitur Teknis

- Responsif (desktop-first)
- SEO dasar (metadata, OpenGraph, sitemap)
- Tema warna: teal `#14B8A6`, CTA dark `#1A2D23`, cream `#FFFDF5`. Font: Plus Jakarta Sans.

---

## 5. Arsitektur & Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Deploy | Easypanel VPS (`askep_nakespro`), domain `nakespro.id` |

### Pemetaan Repo

| Repo | Peran | Status |
|---|---|---|
| `inisalman/nakespro` | Landing page marketing | ✅ Live |
| `inisalman/nakespro-marketplace` | Marketplace lama | 📦 Archive |
| `inisalman/nakespro-app` | App: register, payment, form, admin | 📋 MVP-SPEC.md ready |

---

## 6. Roadmap

### Done ✅
- Landing page live di nakespro.id
- Section: Hero, Harga, FAQ, Footer

### In Progress 🔨
- Update CTA section harga: tombol "Pesan Custom" dan "Langganan Template" → arahkan ke `/custom` dan `/template` (app routes)

### Planned 📋
- Portofolio nyata (setelah ada proyek pertama)
- SEO optimization

---

### 7. Hubungan dengan MVP-SPEC

MVP-SPEC adalah dokumen teknis untuk **app** (`nakespro-app`). Landing page (repo ini) adalah bagian depan yang menjual dan mengarahkan ke app.

```
nakespro.id (landing) ──CTA──> nakespro-app (register, payment, form, admin)
```

Untuk detail flow app, lihat **MVP-SPEC.md** di repo yang sama.

---

## 8. Keputusan (Final)

| # | Pertanyaan | Keputusan |
|---|---|---|
| 1 | Paket | Custom (Rp2jt one-off) + Template (Rp20rb/bulan) |
| 2 | Build | Keduanya manual oleh Salman di MVP (vibe coding) |
| 3 | Landing CTA | Arahkan ke `/custom` dan `/template` (app routes) |
| 4 | Form lead | Dihapus — digantikan oleh flow app |
| 5 | Payment | QRIS Manual (MVP), auto-payment di Fase 2 |

---

*Dokumen ini fokus pada landing page. Detail teknis ada di MVP-SPEC.md.*