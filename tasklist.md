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

- [ ] Tentukan pendekatan auth: Auth.js atau custom session/JWT.
- [ ] Implementasi register pasien.
- [ ] Implementasi register tenaga kesehatan.
- [ ] Implementasi login.
- [ ] Implementasi logout.
- [ ] Implementasi proteksi route.
- [ ] Implementasi role-based access control.
- [ ] Buat middleware auth.
- [ ] Buat helper untuk mendapatkan current user.
- [ ] Buat halaman login.
- [ ] Buat halaman register pasien.
- [ ] Buat halaman register tenaga kesehatan.

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
- [ ] Buat halaman profil pasien.
- [ ] Implementasi edit profil pasien.
- [ ] Implementasi alamat utama pasien.

### 6.2 Pencarian Tenaga Kesehatan

- [x] Buat halaman daftar tenaga kesehatan.
- [ ] Implementasi filter kategori layanan.
- [ ] Implementasi filter lokasi.
- [ ] Implementasi filter harga.
- [ ] Implementasi filter rating.
- [ ] Implementasi pencarian berdasarkan nama/profesi.
- [ ] Buat card tenaga kesehatan.
- [ ] Buat empty state jika hasil pencarian kosong.

### 6.3 Detail Tenaga Kesehatan

- [ ] Buat halaman detail tenaga kesehatan.
- [ ] Tampilkan profil tenaga kesehatan.
- [ ] Tampilkan badge verifikasi.
- [ ] Tampilkan daftar layanan dan harga.
- [ ] Tampilkan area layanan.
- [ ] Tampilkan jadwal tersedia.
- [ ] Tampilkan rating dan ulasan.
- [ ] Tambahkan tombol booking.

### 6.4 Booking Pasien

- [x] Buat form booking.
- [ ] Validasi pilihan layanan.
- [ ] Validasi tanggal dan jam.
- [ ] Validasi alamat layanan.
- [ ] Simpan booking ke database.
- [ ] Tampilkan halaman sukses booking.
- [ ] Buat halaman riwayat booking pasien.
- [ ] Buat halaman detail booking pasien.

### 6.5 Invoice dan CPPT Pasien

- [ ] Tampilkan invoice pasien.
- [ ] Tampilkan status pembayaran.
- [ ] Tampilkan CPPT setelah layanan selesai.
- [ ] Tampilkan dokumentasi tindakan.
- [ ] Batasi akses hanya untuk pasien terkait.

### 6.6 Rating dan Ulasan

- [ ] Buat form rating setelah booking selesai.
- [ ] Validasi satu booking hanya satu ulasan.
- [ ] Simpan rating dan ulasan.
- [ ] Tampilkan rating di profil nakes.

## 7. Fitur Tenaga Kesehatan

### 7.1 Dashboard Nakes

- [x] Buat halaman dashboard nakes.
- [ ] Tampilkan booking hari ini.
- [ ] Tampilkan permintaan booking baru.
- [ ] Tampilkan CPPT belum lengkap.
- [ ] Tampilkan invoice dan pendapatan.
- [ ] Tampilkan rating rata-rata.

### 7.2 Profil Nakes

- [ ] Buat halaman profil nakes.
- [ ] Implementasi edit profil nakes.
- [ ] Upload foto profil.
- [ ] Input profesi.
- [ ] Input spesialisasi.
- [ ] Input pengalaman kerja.
- [ ] Input area layanan.
- [ ] Input nomor STR/SIP jika tersedia.
- [ ] Upload dokumen verifikasi.
- [ ] Submit profil untuk verifikasi.

### 7.3 Manajemen Layanan

- [ ] Buat halaman daftar layanan nakes.
- [ ] Buat form tambah layanan.
- [ ] Buat form edit layanan.
- [ ] Implementasi aktif/nonaktif layanan.
- [ ] Validasi harga layanan.
- [ ] Validasi durasi layanan.

### 7.4 Manajemen Jadwal

- [ ] Buat halaman jadwal nakes.
- [ ] Tambah jadwal berdasarkan hari.
- [ ] Edit jadwal.
- [ ] Hapus jadwal.
- [ ] Set status menerima pasien.

### 7.5 Manajemen Booking Nakes

- [ ] Buat halaman daftar booking nakes.
- [ ] Buat halaman detail booking nakes.
- [ ] Implementasi terima booking.
- [ ] Implementasi tolak booking dengan alasan.
- [ ] Implementasi ubah status menjadi berlangsung.
- [ ] Implementasi ubah status menjadi selesai.

### 7.6 CPPT Digital

- [ ] Buat form CPPT digital.
- [ ] Isi data subjektif.
- [ ] Isi data objektif.
- [ ] Isi assessment.
- [ ] Isi plan.
- [ ] Isi tindakan yang dilakukan.
- [ ] Isi edukasi pasien.
- [ ] Isi rencana tindak lanjut.
- [ ] Simpan CPPT.
- [ ] Edit CPPT sebelum final.
- [ ] Tampilkan CPPT ke pasien setelah booking selesai.

### 7.7 Dokumentasi Tindakan

- [ ] Upload foto sebelum tindakan.
- [ ] Upload foto setelah tindakan.
- [ ] Upload foto perkembangan.
- [ ] Simpan metadata dokumentasi.
- [ ] Validasi ukuran file.
- [ ] Validasi tipe file.
- [ ] Batasi akses dokumentasi.

## 8. Invoice

- [ ] Buat aturan pembuatan invoice.
- [ ] Generate nomor invoice otomatis.
- [ ] Buat invoice setelah booking selesai.
- [ ] Hitung subtotal.
- [ ] Hitung biaya tambahan.
- [ ] Hitung diskon jika ada.
- [ ] Hitung total pembayaran.
- [ ] Simpan invoice ke database.
- [ ] Tampilkan invoice untuk pasien.
- [ ] Tampilkan invoice untuk nakes.
- [ ] Tampilkan invoice untuk admin.
- [ ] Siapkan struktur untuk PDF invoice di tahap berikutnya.

## 9. Admin Panel

### 9.1 Dashboard Admin

- [ ] Buat layout admin panel.
- [x] Buat dashboard ringkasan admin.
- [ ] Tampilkan total pasien.
- [ ] Tampilkan total tenaga kesehatan.
- [ ] Tampilkan nakes menunggu verifikasi.
- [ ] Tampilkan total booking.
- [ ] Tampilkan total invoice.

### 9.2 Manajemen Pengguna

- [ ] Buat halaman daftar pasien.
- [ ] Buat halaman daftar tenaga kesehatan.
- [ ] Buat halaman detail pasien.
- [ ] Buat halaman detail tenaga kesehatan.
- [ ] Implementasi aktif/nonaktif user.

### 9.3 Verifikasi Tenaga Kesehatan

- [ ] Buat halaman daftar verifikasi nakes.
- [ ] Tampilkan dokumen verifikasi.
- [ ] Implementasi approve verifikasi.
- [ ] Implementasi reject verifikasi dengan alasan.
- [ ] Kirim notifikasi hasil verifikasi.

### 9.4 Manajemen Kategori Layanan

- [ ] Buat halaman daftar kategori layanan.
- [ ] Tambah kategori layanan.
- [ ] Edit kategori layanan.
- [ ] Aktif/nonaktif kategori layanan.

### 9.5 Monitoring Booking dan Invoice

- [ ] Buat halaman semua booking.
- [ ] Buat halaman detail booking admin.
- [ ] Buat halaman semua invoice.
- [ ] Buat halaman detail invoice admin.

## 10. Notifikasi

- [ ] Buat model notifikasi.
- [ ] Buat helper create notification.
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
