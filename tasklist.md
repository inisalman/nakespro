# Task List — NakesPro

## Status Legend

- `[ ]` Belum dikerjakan
- `[~]` Sedang dikerjakan
- `[x]` Selesai

## 1. Persiapan Proyek

- [x] Inisialisasi project Next.js dengan TypeScript.
- [x] Install dan konfigurasi Tailwind CSS.
- [x] Install dan konfigurasi Plus Jakarta Sans.
- [x] Setup struktur folder awal.
- [x] Setup environment variable.
- [x] Setup konfigurasi linting dan formatting.
- [x] Buat layout utama aplikasi.
- [x] Buat halaman landing page awal.
- [x] Buat konfigurasi warna dan design token sesuai `design.md`.

## 2. Setup Database dan Prisma

- [x] Install Prisma.
- [x] Setup koneksi PostgreSQL.
- [x] Buat file schema Prisma awal.
- [x] Buat model `User`.
- [x] Buat model `PatientProfile`.
- [x] Buat model `PractitionerProfile`.
- [x] Buat model `PractitionerDocument`.
- [x] Buat model `ServiceCategory`.
- [x] Buat model `PractitionerService`.
- [x] Buat model `AvailabilitySchedule`.
- [x] Buat model `Booking`.
- [x] Buat model `CPPT`.
- [x] Buat model `TreatmentDocument`.
- [x] Buat model `Invoice`.
- [x] Buat model `Review`.
- [x] Buat model `Notification`.
- [ ] Jalankan migration awal.
- [x] Buat seed data kategori layanan awal.
- [x] Buat Prisma client helper.

## 3. Authentication dan Authorization

- [x] Tentukan pendekatan auth: Auth.js atau custom session/JWT.
- [x] Implementasi register pasien.
- [x] Implementasi register tenaga kesehatan.
- [x] Implementasi login.
- [x] Implementasi logout.
- [x] Implementasi proteksi route.
- [x] Implementasi role-based access control.
- [x] Buat middleware auth.
- [x] Buat helper untuk mendapatkan current user.
- [x] Buat halaman login.
- [x] Buat halaman register pasien.
- [x] Buat halaman register tenaga kesehatan.

## 4. Layout dan UI Dasar

- [x] Buat komponen `Button`.
- [x] Buat komponen `Input`.
- [x] Buat komponen `Textarea`.
- [x] Buat komponen `Select`.
- [x] Buat komponen `Card`.
- [x] Buat komponen `Badge`.
- [x] Buat komponen `Avatar`.
- [x] Buat komponen `Navbar`.
- [x] Buat komponen `Footer`.
- [x] Buat komponen `DashboardSidebar`.
- [x] Buat komponen `MobileBottomNav`.
- [x] Buat komponen `EmptyState`.
- [x] Buat komponen `LoadingState`.
- [x] Buat komponen `ErrorMessage`.

## 5. Landing Page

- [x] Buat hero section.
- [x] Buat search layanan di landing page.
- [x] Buat section kategori layanan.
- [x] Buat section cara kerja NakesPro.
- [x] Buat section manfaat untuk pasien.
- [x] Buat section manfaat untuk tenaga kesehatan.
- [x] Buat section tenaga kesehatan unggulan.
- [x] Buat section CTA daftar sebagai nakes.
- [x] Buat section FAQ sederhana.
- [x] Pastikan landing page responsive.

## 6. Fitur Pasien

### 6.1 Profil Pasien

- [x] Buat halaman dashboard pasien.
- [x] Buat halaman profil pasien.
- [x] Implementasi edit profil pasien.
- [x] Implementasi alamat utama pasien.

### 6.2 Pencarian Tenaga Kesehatan

- [x] Buat halaman daftar tenaga kesehatan.
- [x] Implementasi filter kategori layanan.
- [x] Implementasi filter lokasi.
- [x] Implementasi filter harga.
- [x] Implementasi filter rating.
- [x] Implementasi pencarian berdasarkan nama/profesi.
- [x] Buat card tenaga kesehatan.
- [x] Buat empty state jika hasil pencarian kosong.

### 6.3 Detail Tenaga Kesehatan

- [x] Buat halaman detail tenaga kesehatan.
- [x] Tampilkan profil tenaga kesehatan.
- [x] Tampilkan badge verifikasi.
- [x] Tampilkan daftar layanan dan harga.
- [x] Tampilkan area layanan.
- [x] Tampilkan jadwal tersedia.
- [x] Tampilkan rating dan ulasan.
- [x] Tambahkan tombol booking.

### 6.4 Booking Pasien

- [x] Buat form booking.
- [x] Validasi pilihan layanan.
- [x] Validasi tanggal dan jam.
- [x] Validasi alamat layanan.
- [x] Simpan booking ke database.
- [x] Tampilkan halaman sukses booking.
- [x] Buat halaman riwayat booking pasien.
- [x] Buat halaman detail booking pasien.

### 6.5 Invoice dan CPPT Pasien

- [x] Tampilkan invoice pasien.
- [x] Tampilkan status pembayaran.
- [x] Tampilkan CPPT setelah layanan selesai.
- [x] Tampilkan dokumentasi tindakan.
- [x] Batasi akses hanya untuk pasien terkait.

### 6.6 Rating dan Ulasan

- [x] Buat form rating setelah booking selesai.
- [x] Validasi satu booking hanya satu ulasan.
- [x] Simpan rating dan ulasan.
- [x] Tampilkan rating di profil nakes.

## 7. Fitur Tenaga Kesehatan

### 7.1 Dashboard Nakes

- [x] Buat halaman dashboard nakes.
- [x] Tampilkan booking hari ini.
- [x] Tampilkan permintaan booking baru.
- [x] Tampilkan CPPT belum lengkap.
- [x] Tampilkan invoice dan pendapatan.
- [x] Tampilkan rating rata-rata.

### 7.2 Profil Nakes

- [x] Buat halaman profil nakes.
- [x] Implementasi edit profil nakes.
- [x] Upload foto profil. (URL sementara; upload file asli di Section 11.)
- [x] Input profesi.
- [x] Input spesialisasi.
- [x] Input pengalaman kerja.
- [x] Input area layanan.
- [x] Input nomor STR/SIP jika tersedia.
- [x] Upload dokumen verifikasi. (URL sementara; upload file asli di Section 11.)
- [x] Submit profil untuk verifikasi.

### 7.3 Manajemen Layanan

- [x] Buat halaman daftar layanan nakes.
- [x] Buat form tambah layanan.
- [x] Buat form edit layanan.
- [x] Implementasi aktif/nonaktif layanan.
- [x] Validasi harga layanan.
- [x] Validasi durasi layanan.

### 7.4 Manajemen Jadwal

- [x] Buat halaman jadwal nakes.
- [x] Tambah jadwal berdasarkan hari.
- [x] Edit jadwal.
- [x] Hapus jadwal.
- [x] Set status menerima pasien.

### 7.5 Manajemen Booking Nakes

- [x] Buat halaman daftar booking nakes.
- [x] Buat halaman detail booking nakes.
- [x] Implementasi terima booking.
- [x] Implementasi tolak booking dengan alasan.
- [x] Implementasi ubah status menjadi berlangsung.
- [x] Implementasi ubah status menjadi selesai.

### 7.6 CPPT Digital

- [x] Buat form CPPT digital.
- [x] Isi data subjektif.
- [x] Isi data objektif.
- [x] Isi assessment.
- [x] Isi plan.
- [x] Isi tindakan yang dilakukan.
- [x] Isi edukasi pasien.
- [x] Isi rencana tindak lanjut.
- [x] Simpan CPPT.
- [x] Edit CPPT sebelum final.
- [x] Tampilkan CPPT ke pasien setelah booking selesai.

### 7.7 Dokumentasi Tindakan

- [x] Upload foto sebelum tindakan. (URL sementara; upload file asli di Section 11.)
- [x] Upload foto setelah tindakan. (URL sementara; upload file asli di Section 11.)
- [x] Upload foto perkembangan. (URL sementara; upload file asli di Section 11.)
- [x] Simpan metadata dokumentasi.
- [ ] Validasi ukuran file. (Dilanjutkan saat storage/upload Section 11.)
- [ ] Validasi tipe file. (Dilanjutkan saat storage/upload Section 11.)
- [x] Batasi akses dokumentasi.

## 8. Invoice

- [x] Buat aturan pembuatan invoice.
- [x] Generate nomor invoice otomatis.
- [x] Buat invoice setelah booking selesai.
- [x] Hitung subtotal.
- [x] Hitung biaya tambahan.
- [x] Hitung diskon jika ada.
- [x] Hitung total pembayaran.
- [x] Simpan invoice ke database.
- [ ] Tampilkan invoice untuk pasien.
- [ ] Tampilkan invoice untuk nakes.
- [x] Tampilkan invoice untuk admin.
- [ ] Siapkan struktur untuk PDF invoice di tahap berikutnya.

## 9. Admin Panel

### 9.1 Dashboard Admin

- [x] Buat layout admin panel.
- [x] Buat dashboard ringkasan admin.
- [x] Tampilkan total pasien.
- [x] Tampilkan total tenaga kesehatan.
- [x] Tampilkan nakes menunggu verifikasi.
- [x] Tampilkan total booking.
- [x] Tampilkan total invoice.

### 9.2 Manajemen Pengguna

- [x] Buat halaman daftar pasien.
- [x] Buat halaman daftar tenaga kesehatan.
- [x] Buat halaman detail pasien.
- [x] Buat halaman detail tenaga kesehatan.
- [x] Implementasi aktif/nonaktif user.

### 9.3 Verifikasi Tenaga Kesehatan

- [x] Buat halaman daftar verifikasi nakes.
- [x] Tampilkan dokumen verifikasi.
- [x] Implementasi approve verifikasi.
- [x] Implementasi reject verifikasi dengan alasan.
- [x] Kirim notifikasi hasil verifikasi.

### 9.4 Manajemen Kategori Layanan

- [x] Buat halaman daftar kategori layanan.
- [x] Tambah kategori layanan.
- [x] Edit kategori layanan.
- [x] Aktif/nonaktif kategori layanan.

### 9.5 Monitoring Booking dan Invoice

- [x] Buat halaman semua booking.
- [x] Buat halaman detail booking admin.
- [x] Buat halaman semua invoice.
- [x] Buat halaman detail invoice admin.

## 10. Notifikasi

- [ ] Buat model notifikasi.
- [x] Buat helper create notification.
- [ ] Notifikasi booking baru untuk nakes.
- [ ] Notifikasi booking diterima untuk pasien.
- [ ] Notifikasi booking ditolak untuk pasien.
- [ ] Notifikasi invoice dibuat.
- [ ] Notifikasi CPPT tersedia.
- [ ] Buat halaman/list notifikasi pengguna.
- [ ] Implementasi read/unread notification.

## 11. File Upload dan Storage

- [ ] Tentukan provider storage.
- [ ] Setup konfigurasi storage.
- [ ] Buat helper upload file.
- [ ] Upload foto profil nakes.
- [ ] Upload dokumen verifikasi nakes.
- [ ] Upload dokumentasi tindakan.
- [ ] Validasi file image.
- [ ] Batasi ukuran upload.
- [ ] Simpan URL file ke database.

## 12. API Readiness untuk Mobile

- [ ] Pastikan endpoint auth siap digunakan mobile.
- [ ] Pastikan endpoint practitioners siap digunakan mobile.
- [ ] Pastikan endpoint bookings siap digunakan mobile.
- [ ] Pastikan endpoint CPPT siap digunakan mobile.
- [ ] Pastikan endpoint invoice siap digunakan mobile.
- [ ] Pastikan endpoint notification siap digunakan mobile.
- [ ] Standarkan format response API.
- [ ] Standarkan format error API.
- [ ] Dokumentasikan endpoint utama.

## 13. Keamanan dan Privasi

- [ ] Hash password dengan algoritma aman.
- [ ] Validasi semua input menggunakan schema.
- [ ] Proteksi endpoint berdasarkan role.
- [ ] Batasi akses CPPT.
- [ ] Batasi akses dokumentasi tindakan.
- [ ] Tambahkan rate limit untuk login.
- [ ] Tambahkan rate limit untuk upload.
- [ ] Hindari expose data sensitif ke client.
- [ ] Buat kebijakan privasi awal.
- [ ] Buat syarat dan ketentuan awal.

## 14. Testing

- [ ] Test registrasi pasien.
- [ ] Test registrasi tenaga kesehatan.
- [ ] Test login dan logout.
- [ ] Test role-based access.
- [ ] Test pencarian tenaga kesehatan.
- [ ] Test booking pasien.
- [ ] Test konfirmasi booking nakes.
- [ ] Test CPPT digital.
- [ ] Test upload dokumentasi tindakan.
- [ ] Test invoice otomatis.
- [ ] Test rating dan ulasan.
- [ ] Test verifikasi nakes oleh admin.
- [ ] Test responsive mobile.
- [ ] Test akses data antar role.

## 15. Deployment

- [ ] Tentukan platform deployment.
- [ ] Setup database production PostgreSQL.
- [ ] Setup environment production.
- [ ] Jalankan migration production.
- [ ] Setup domain.
- [ ] Setup HTTPS.
- [ ] Setup storage production.
- [ ] Setup monitoring error.
- [ ] Setup backup database.

## 16. Prioritas Sprint Awal

### Sprint 1 — Foundation

- [x] Inisialisasi Next.js TypeScript.
- [x] Setup Tailwind CSS.
- [x] Setup Plus Jakarta Sans.
- [x] Setup Prisma dan PostgreSQL.
- [x] Buat schema database awal.
- [x] Buat layout utama.
- [x] Buat landing page awal.

### Sprint 2 — Auth dan Role

- [ ] Implementasi register pasien.
- [ ] Implementasi register tenaga kesehatan.
- [ ] Implementasi login.
- [ ] Implementasi logout.
- [ ] Implementasi role-based access control.
- [x] Buat dashboard kosong untuk pasien, nakes, dan admin.

### Sprint 3 — Profil dan Layanan Nakes

- [ ] Buat profil tenaga kesehatan.
- [ ] Buat manajemen layanan.
- [ ] Buat manajemen jadwal.
- [ ] Buat verifikasi nakes oleh admin.
- [ ] Tampilkan daftar nakes di halaman publik.

### Sprint 4 — Booking

- [ ] Buat pencarian tenaga kesehatan.
- [ ] Buat detail tenaga kesehatan.
- [ ] Buat form booking.
- [ ] Buat manajemen booking nakes.
- [ ] Buat riwayat booking pasien.

### Sprint 5 — CPPT, Dokumentasi, dan Invoice

- [ ] Buat form CPPT.
- [ ] Buat upload dokumentasi tindakan.
- [ ] Buat invoice otomatis.
- [ ] Tampilkan CPPT dan invoice ke pasien.

### Sprint 6 — Admin, Testing, dan MVP Polish

- [ ] Lengkapi admin panel.
- [ ] Tambahkan rating dan ulasan.
- [ ] Tambahkan notifikasi dasar.
- [ ] Test alur end-to-end.
- [ ] Polish UI mobile responsive.
- [ ] Persiapan deployment MVP.

## 17. Urutan Kerja Langsung

Mulai dari urutan berikut:

1. [x] Inisialisasi Next.js TypeScript.
2. [x] Setup Tailwind CSS.
3. [x] Setup Plus Jakarta Sans.
4. [x] Setup Prisma.
5. [x] Setup PostgreSQL.
6. [x] Buat schema Prisma awal.
7. [x] Buat layout utama.
8. [x] Buat landing page.
9. [ ] Buat authentication.
10. [ ] Buat role pasien, nakes, dan admin.

## 18. Catatan Penting

- Fokus awal adalah MVP web.
- Semua fitur harus mobile-friendly.
- Backend harus API-ready agar mudah digunakan mobile app nanti.
- Hindari membuat fitur terlalu kompleks di awal.
- Prioritaskan alur utama: cari nakes, booking, CPPT, invoice.
- Desain mengikuti `design.md`.
- Kebutuhan teknis mengikuti `requirements.md`.
- Scope produk mengikuti `PRD_NakesPro.md`.
