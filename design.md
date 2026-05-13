# Design Guidelines — NakesPro

## 1. Ringkasan Desain

Desain NakesPro menggunakan pendekatan **modern light**, bersih, profesional, dan mudah digunakan oleh pasien maupun tenaga kesehatan. Tampilan harus terasa ramah, terpercaya, dan tidak membingungkan, terutama karena salah satu target utama pengguna adalah tenaga kesehatan yang belum terbiasa dengan teknologi.

Tujuan utama desain adalah menghadirkan pengalaman yang:

- Sederhana.
- Terang dan bersih.
- Profesional.
- Mudah dipahami.
- Mobile-friendly.
- Terpercaya untuk layanan kesehatan.

## 2. Font

### 2.1 Font Utama

Font utama yang digunakan adalah:

**Plus Jakarta Sans**

Font ini dipilih karena memiliki karakter modern, bersih, profesional, dan tetap mudah dibaca di berbagai ukuran layar.

### 2.2 Penggunaan Font

Gunakan Plus Jakarta Sans untuk seluruh elemen teks, termasuk:

- Heading.
- Body text.
- Label form.
- Button.
- Navigasi.
- Card.
- Invoice.
- CPPT digital.

### 2.3 Fallback Font

Jika Plus Jakarta Sans gagal dimuat, gunakan fallback berikut:

```css
font-family: "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## 3. Style Utama

### 3.1 Konsep Visual

Style visual NakesPro adalah **modern light healthcare marketplace**.

Karakter visual:

- Background terang.
- Banyak ruang kosong.
- Card dengan sudut membulat.
- Warna lembut dan tidak terlalu kontras.
- Komponen mudah dikenali.
- Ikon sederhana.
- Tampilan profesional tetapi tetap hangat.

### 3.2 Kesan yang Ingin Dibangun

Desain harus memberi kesan:

- Aman.
- Terpercaya.
- Bersih.
- Tenang.
- Profesional.
- Mudah digunakan.
- Ramah untuk pasien dan keluarga pasien.

## 4. Warna

### 4.1 Primary Color

Gunakan warna utama bernuansa biru-hijau kesehatan.

```css
--color-primary: #14B8A6;
--color-primary-dark: #0F766E;
--color-primary-light: #CCFBF1;
```

### 4.2 Secondary Color

Gunakan warna biru lembut sebagai warna pendukung.

```css
--color-secondary: #38BDF8;
--color-secondary-dark: #0284C7;
--color-secondary-light: #E0F2FE;
```

### 4.3 Neutral Color

```css
--color-background: #F8FAFC;
--color-surface: #FFFFFF;
--color-border: #E2E8F0;
--color-text-primary: #0F172A;
--color-text-secondary: #475569;
--color-text-muted: #94A3B8;
```

### 4.4 Status Color

```css
--color-success: #22C55E;
--color-warning: #F59E0B;
--color-danger: #EF4444;
--color-info: #3B82F6;
```

### 4.5 Prinsip Penggunaan Warna

- Gunakan warna putih atau abu sangat muda sebagai background utama.
- Gunakan primary color untuk CTA utama seperti “Cari Nakes”, “Booking”, dan “Simpan”.
- Gunakan secondary color untuk elemen pendukung seperti badge, highlight, atau info.
- Hindari penggunaan warna terlalu gelap sebagai background utama.
- Warna merah hanya untuk error, pembatalan, atau aksi berbahaya.

## 5. Layout

### 5.1 Prinsip Layout

Layout harus sederhana dan mudah dipindai secara visual.

Prinsip utama:

- Gunakan grid yang rapi.
- Prioritaskan konten penting.
- Jaga jarak antar elemen.
- Hindari halaman yang terlalu padat.
- Gunakan card untuk memisahkan informasi.

### 5.2 Desktop Layout

Untuk desktop:

- Gunakan max-width container agar konten tidak terlalu lebar.
- Navbar berada di bagian atas.
- Gunakan layout 2 kolom untuk halaman detail jika diperlukan.
- Gunakan sidebar untuk dashboard tenaga kesehatan dan admin.

Rekomendasi container:

```css
max-width: 1200px;
margin: 0 auto;
padding: 24px;
```

### 5.3 Mobile Layout

Untuk mobile:

- Gunakan layout satu kolom.
- Prioritaskan tombol besar dan mudah ditekan.
- Form harus pendek dan bertahap jika terlalu banyak input.
- Navigasi utama dapat menggunakan bottom navigation.
- Card harus mudah dibaca tanpa horizontal scroll.

## 6. Komponen UI

## 6.1 Button

### Primary Button

Digunakan untuk aksi utama.

Contoh:

- Cari Nakes.
- Booking Sekarang.
- Simpan CPPT.
- Bayar.

Style:

```css
background: #14B8A6;
color: #FFFFFF;
border-radius: 12px;
padding: 12px 20px;
font-weight: 600;
```

### Secondary Button

Digunakan untuk aksi sekunder.

```css
background: #FFFFFF;
color: #0F766E;
border: 1px solid #99F6E4;
border-radius: 12px;
padding: 12px 20px;
font-weight: 600;
```

### Danger Button

Digunakan untuk aksi pembatalan atau penghapusan.

```css
background: #EF4444;
color: #FFFFFF;
border-radius: 12px;
```

## 6.2 Card

Card digunakan untuk:

- Profil tenaga kesehatan.
- Ringkasan booking.
- Invoice.
- CPPT.
- Riwayat layanan.
- Statistik dashboard.

Style:

```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 16px;
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
padding: 20px;
```

## 6.3 Input Form

Input harus besar, jelas, dan mudah digunakan.

Style:

```css
background: #FFFFFF;
border: 1px solid #CBD5E1;
border-radius: 12px;
padding: 12px 14px;
font-size: 14px;
```

Focus state:

```css
border-color: #14B8A6;
box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.16);
```

## 6.4 Badge

Badge digunakan untuk status seperti:

- Terverifikasi.
- Menunggu Konfirmasi.
- Selesai.
- Belum Dibayar.
- CPPT Lengkap.

Contoh style badge terverifikasi:

```css
background: #CCFBF1;
color: #0F766E;
border-radius: 999px;
padding: 4px 10px;
font-size: 12px;
font-weight: 600;
```

## 6.5 Navbar

Navbar harus sederhana dan mudah dikenali.

Elemen navbar:

- Logo NakesPro.
- Cari Layanan.
- Jadi Mitra Nakes.
- Masuk.
- Daftar.

Style navbar:

```css
background: rgba(255, 255, 255, 0.9);
border-bottom: 1px solid #E2E8F0;
backdrop-filter: blur(12px);
```

## 6.6 Bottom Navigation Mobile

Untuk mobile app atau mobile web, bottom navigation dapat berisi:

- Beranda.
- Cari.
- Booking.
- Riwayat.
- Profil.

## 7. Halaman Utama

### 7.1 Hero Section

Hero section harus langsung menjelaskan manfaat NakesPro.

Contoh headline:

**Temukan Tenaga Kesehatan Terpercaya untuk Layanan di Rumah**

Contoh subheadline:

Cari perawat luka, bidan pijat bayi, fisioterapis, dan layanan home care lainnya dengan mudah, aman, dan profesional.

CTA utama:

- Cari Nakes Sekarang.

CTA sekunder:

- Daftar sebagai Tenaga Kesehatan.

### 7.2 Search Bar

Search bar menjadi elemen penting di halaman utama.

Input yang disarankan:

- Jenis layanan.
- Lokasi.
- Tanggal layanan.

### 7.3 Kategori Layanan

Tampilkan kategori layanan dalam bentuk card atau icon menu.

Contoh kategori:

- Perawatan Luka.
- Pijat Bayi.
- Fisioterapi.
- Home Care.
- Perawatan Lansia.
- Pasca Operasi.

## 8. Halaman Profil Tenaga Kesehatan

Halaman profil harus fokus pada kepercayaan dan kemudahan booking.

Informasi utama:

- Foto profil.
- Nama tenaga kesehatan.
- Profesi.
- Badge terverifikasi.
- Rating.
- Area layanan.
- Pengalaman.
- Layanan dan harga.
- Jadwal tersedia.
- Ulasan pasien.
- Tombol Booking.

Tombol booking harus selalu mudah ditemukan, terutama di mobile.

## 9. Dashboard Tenaga Kesehatan

Dashboard nakes harus sangat sederhana.

Prioritas informasi:

- Booking hari ini.
- Permintaan booking baru.
- CPPT yang belum lengkap.
- Invoice belum dibayar.
- Total pendapatan.

Gunakan bahasa yang mudah dipahami, misalnya:

- “Pasien Hari Ini”
- “Booking Baru”
- “Catatan Tindakan Belum Diisi”
- “Invoice Belum Dibayar”

Hindari istilah teknis yang tidak perlu.

## 10. CPPT Digital

Form CPPT harus dibuat sesederhana mungkin.

Prinsip desain CPPT:

- Gunakan section bertahap.
- Berikan label jelas.
- Gunakan placeholder contoh.
- Simpan otomatis jika memungkinkan.
- Sediakan template berdasarkan layanan.
- Jangan tampilkan semua field sekaligus jika terlalu panjang.

Contoh section:

1. Data Pasien.
2. Keluhan.
3. Pemeriksaan.
4. Tindakan.
5. Edukasi.
6. Rencana Tindak Lanjut.
7. Dokumentasi Foto.

## 11. Invoice

Desain invoice harus bersih dan profesional.

Informasi invoice:

- Logo NakesPro.
- Nomor invoice.
- Tanggal.
- Nama pasien.
- Nama tenaga kesehatan.
- Jenis layanan.
- Rincian biaya.
- Total pembayaran.
- Status pembayaran.

Invoice harus mudah dibaca di mobile dan dapat diunduh sebagai PDF di tahap berikutnya.

## 12. Ikon dan Ilustrasi

Gunakan ikon yang:

- Sederhana.
- Konsisten.
- Tidak terlalu dekoratif.
- Mendukung konteks layanan kesehatan.

Gaya ikon:

- Outline.
- Rounded.
- Stroke sedang.

Ilustrasi boleh digunakan pada landing page, empty state, dan onboarding, tetapi jangan berlebihan.

## 13. Spacing dan Radius

### 13.1 Spacing

Gunakan skala spacing konsisten:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### 13.2 Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 999px;
```

Rekomendasi:

- Button: 12px.
- Card: 16px.
- Modal: 20px.
- Avatar: 999px.

## 14. Shadow

Gunakan shadow lembut agar tetap clean.

```css
--shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
--shadow-md: 0 8px 24px rgba(15, 23, 42, 0.06);
--shadow-lg: 0 16px 40px rgba(15, 23, 42, 0.08);
```

Hindari shadow terlalu gelap atau terlalu tebal.

## 15. Accessibility

Desain harus memperhatikan aksesibilitas:

- Kontras teks harus cukup.
- Ukuran font body minimal 14px, ideal 16px.
- Tombol mobile minimal tinggi 44px.
- Label form harus selalu terlihat.
- Jangan hanya mengandalkan warna untuk status.
- Error message harus jelas dan mudah dipahami.

## 16. Tone Copywriting

Bahasa produk harus:

- Ramah.
- Jelas.
- Tidak terlalu teknis.
- Menenangkan.
- Profesional.

Contoh gaya bahasa:

- “Cari tenaga kesehatan sesuai kebutuhan Anda.”
- “Booking berhasil dikirim. Menunggu konfirmasi tenaga kesehatan.”
- “Lengkapi catatan tindakan agar pasien dapat melihat hasil layanan.”
- “Invoice otomatis telah dibuat.”

Hindari bahasa yang terlalu teknis seperti:

- “Submit data berhasil dieksekusi.”
- “Request booking telah diproses oleh sistem.”

## 17. Responsive Design

Breakpoint yang disarankan:

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

Prinsip responsif:

- Mobile first.
- Card menjadi satu kolom di mobile.
- Sidebar dashboard berubah menjadi bottom navigation atau drawer.
- CTA utama tetap mudah ditemukan.
- Form panjang dapat dibagi menjadi beberapa langkah.

## 18. Referensi Nuansa Visual

Nuansa visual yang dituju:

- Clean healthcare platform.
- Modern SaaS dashboard.
- Marketplace layanan profesional.
- Light mode first.
- Friendly but trustworthy.

Contoh karakter desain:

- Putih dominan.
- Aksen teal dan biru.
- Card rounded.
- Tipografi jelas.
- Ilustrasi ringan.
- Dashboard sederhana.

## 19. Do and Don't

### Do

- Gunakan layout terang dan lapang.
- Gunakan bahasa yang sederhana.
- Buat tombol utama mudah ditemukan.
- Gunakan warna status secara konsisten.
- Buat form CPPT mudah diisi dari HP.
- Jaga tampilan tetap profesional.

### Don't

- Jangan membuat UI terlalu ramai.
- Jangan menggunakan warna gelap sebagai tema utama.
- Jangan terlalu banyak istilah teknis.
- Jangan menyembunyikan tombol booking.
- Jangan membuat form terlalu panjang tanpa struktur.
- Jangan menggunakan kontras warna yang menyulitkan pembacaan.

## 20. Kesimpulan

Desain NakesPro harus mengutamakan kemudahan, kepercayaan, dan kesederhanaan. Dengan font Plus Jakarta Sans dan style modern light, NakesPro dapat tampil profesional sebagai platform layanan kesehatan digital yang tetap ramah untuk pasien dan tenaga kesehatan yang belum terbiasa dengan teknologi.
