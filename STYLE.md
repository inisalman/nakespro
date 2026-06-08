# NakesPro.id — Design System

**Versi:** 1.0  
**Tanggal:** Juni 2026  
**Referensi:** Finsyc landing page (clean, nature-tinged, soft green-white)  
**Font:** Plus Jakarta Sans (weights: 400, 500, 600, 700)

---

## 1. Prinsip Desain

**Tenang & Terpercaya.** Website untuk tenaga kesehatan. Warna soft, whitespace lega, nggak ramai. Pasien/klien harus merasa aman dan profesional.

**Alam & Pertumbuhan.** Palet hijau-teal alami dengan aksen langit biru lembut. Nuansa pertumbuhan, kesembuhan, dan kepercayaan.

**Editorial & Rapi.** Typography bersih, spacing generous, section label pills sebagai penanda. Tidak ada elemen yang berteriak.

**Soft, bukan Flat.** Shadow difus rendah opasitas, border radius generous, transisi halus. Depth dari layering dan blur, bukan dari warna gelap.

---

## 2. Palet Warna

### Brand Green (Teal)

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--brand` | `#14B8A6` | `teal` | Primary accent, wordmark, check icons, link |
| `--brand-strong` | `#0D9488` | `teal-strong` | Hover states, active |
| `--brand-light` | `#CCFBF1` | `teal-light` | Soft tint backgrounds, badges |

### CTA Dark

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--cta-dark` | `#1A2E2A` | `cta-dark` | Primary buttons, dark CTA sections |
| `--cta-dark-hover` | `#243B36` | `cta-dark-hover` | Button hover |

### Backgrounds

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--bg-page` | `#FAF7F2` | `cream` | Base page background |
| `--bg-white` | `#FFFFFF` | `white` | Alternating section backgrounds |
| `--bg-soft` | `#F5F9F8` | `bg-soft` | Very faint green-gray section bands |
| `--bg-tint` | `#E8F5F2` | `bg-tint` | Soft green tinted stat cards, badges |

### Cards

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--card-bg` | `#FFFFFF` | — | Default card background |
| `--card-border` | `#E5EAE8` | `border-slate-100` | Card borders |
| `--card-highlight` | `#CCFBF1` | `bg-teal/10` | Highlighted/popular plan card bg |

### Text

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `--text-heading` | `#1A2E2A` | `text-cta-dark` | Headings |
| `--text-body` | `#5A6562` | `text-slate-600` | Body copy |
| `--text-muted` | `#8A9492` | `text-slate-400` | Captions, labels, footer |
| `--text-on-dark` | `#F4F6F3` | `text-cream` | Text on dark backgrounds |
| `--text-accent` | `#14B8A6` | `text-teal` | Accent text, eyebrow labels |

---

## 3. Typography

### Font Stack

```
--font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Scale

| Role | Size | Weight | Line | Usage |
|---|---|---|---|---|
| Eyebrow pill | 12px | 600 | 1.2 | Section label pills (uppercase) |
| Body small | 14px | 400 | 1.6 | Card body, form labels, footer |
| Body | 16px | 400 | 1.7 | Paragraphs, list items |
| Body lg | 18px | 400 | 1.7 | Hero subtitle, large body |
| Heading 3 | 18px | 600 | 1.3 | Card titles, FAQ questions |
| Heading 2 | 28px | 700 | 1.2 | Section titles |
| Heading 1 | 44px–60px | 700 | 1.1 | Hero headline |

### Accent Words (Italic Serif Substitute)

Karena Plus Jakarta Sans nggak punya italic serif companion, kita pakai **Plus Jakarta Sans Italic weight 600** buat emphasis words dalam heading. Warna sama dengan teks sekitarnya — kontras dari style italic, bukan warna.

```
.heading .accent {
  font-style: italic;
  font-weight: 600;
}
```

---

## 4. Radius & Shapes

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Tags, inputs, small chips |
| `--radius-md` | 12px | Feature cards, screenshot containers |
| `--radius-lg` | 16px | Large feature/step cards, pricing cards |
| `--radius-xl` | 20px | Large CTAs, hero cards |
| `--radius-pill` | 999px | Buttons, label pills, badge chips |

Buttons: **always full pill (999px)**. Cards: 16-20px rounded. Form inputs: 12px.

---

## 5. Shadows

Soft, diffuse, green-undertone. Dipakai sparingly.

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(26,46,42,0.04)` | Card default, subtle lift |
| `--shadow-md` | `0 8px 24px rgba(26,46,42,0.06)` | Hovered cards, dropdowns |
| `--shadow-lg` | `0 16px 40px rgba(26,46,42,0.08)` | Floating elements, highlighted cards |

Elevation mostly dari blur + spread, bukan opacity tinggi.

---

## 6. Spacing

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| Section padding | 80–120px | `py-20 md:py-28` | Between major sections |
| Block gap | 48px | `mb-12` | Heading group to content |
| Grid gap | 24px | `gap-6` | Card grids |
| Inline gap | 8–12px | `gap-2` / `gap-3` | Icon + text, flex rows |
| Max width | 1152px | `max-w-6xl` | Content column |

---

## 7. Komponen

### Section Label Pill

Setiap section dimulai dengan eyebrow pill kecil.

```html
<p class="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
  <span class="h-1.5 w-1.5 rounded-full bg-teal"></span>
  KEY FEATURES
</p>
```

### Button (Primary — Dark CTA)

Full pill, dark green/charcoal, white text, soft shadow.

```css
.btn-primary {
  background: var(--cta-dark);
  color: var(--text-on-dark);
  border-radius: 999px;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: var(--shadow-sm);
  transition: all 200ms;
}
.btn-primary:hover {
  background: var(--cta-dark-hover);
  box-shadow: var(--shadow-md);
}
```

### Button (Secondary — Outline)

```css
.btn-outline {
  background: transparent;
  color: var(--brand);
  border: 1.5px solid var(--brand);
  border-radius: 999px;
  padding: 14px 28px;
  font-weight: 600;
  font-size: 14px;
  transition: all 200ms;
}
.btn-outline:hover {
  background: var(--teal-light);
}
```

### Card

```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 200ms, border-color 200ms;
}
.card:hover {
  border-color: var(--brand);
  box-shadow: var(--shadow-md);
}
```

### Pricing Card (Highlighted)

```css
.card-highlight {
  background: var(--card-highlight);
  border: 2px solid var(--brand);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
```

---

## 8. Section Order (Landing Page)

1. **Nav** — sticky, backdrop-blur, border-bottom
2. **Hero** — headline + subtitle + 2 CTA pills + soft blob decor
3. **Layanan** — white bg, 6 icon cards grid
4. **Cara Kerja** — cream bg, 4 step numbered cards
5. **Harga** — white bg, 2 plan cards (Template + Custom highlighted)
6. **Portofolio** — cream bg, 4 example cards
7. **FAQ** — white bg, accordion list
8. **CTA Final** — dark bg, form + WhatsApp CTA
9. **Footer** — white bg, logo + copyright

---

*Dokumen ini jadi acuan styling. Setiap perubahan desain besar harus update STYLE.md dulu.*
