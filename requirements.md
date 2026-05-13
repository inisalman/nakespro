# Requirements — NakesPro

## 1. Ringkasan

NakesPro akan dikembangkan sebagai aplikasi web marketplace layanan tenaga kesehatan menggunakan **Next.js**, **Prisma**, dan **PostgreSQL**. Aplikasi ini dirancang agar dapat dikembangkan lebih lanjut menjadi aplikasi mobile Android dan iOS menggunakan API backend yang sama.

Dokumen ini berisi kebutuhan sistem, teknologi, fitur, database, keamanan, dan rencana kesiapan mobile app.

## 2. Tujuan Sistem

Sistem NakesPro bertujuan untuk:

- Mempertemukan pasien dengan tenaga kesehatan profesional.
- Memudahkan pasien mencari, memilih, dan melakukan booking layanan kesehatan.
- Membantu tenaga kesehatan mempromosikan layanan secara digital.
- Menyediakan CPPT digital untuk dokumentasi tindakan.
- Membuat invoice otomatis setelah layanan selesai.
- Menyediakan fondasi backend yang dapat digunakan oleh web dan mobile app.

## 3. Stack Teknologi

### 3.1 Frontend Web

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Style:** Modern light
- **Font:** Plus Jakarta Sans
- **Rendering:** Server-side rendering dan client-side interaction sesuai kebutuhan

### 3.2 Backend

- **Backend:** Next.js API Routes atau Route Handlers
- **Business Logic:** Service layer di dalam aplikasi Next.js
- **Validation:** Zod
- **Authentication:** Auth.js atau custom JWT/session-based authentication
- **Authorization:** Role-based access control

### 3.3 Database

- **Database:** PostgreSQL
- **ORM:** Prisma
- **Migration:** Prisma Migrate
- **Seeding:** Prisma Seed

### 3.4 Mobile App Future Plan

- **Framework:** Expo / React Native
- **Platform:** Android dan iOS
- **API:** Menggunakan backend yang sama dengan web
- **Auth:** Menggunakan session/token yang kompatibel dengan mobile
- **Storage:** Menggunakan storage terpusat untuk foto dokumentasi tindakan

### 3.5 File Storage

Dibutuhkan untuk menyimpan:

- Foto profil tenaga kesehatan.
- Dokumen verifikasi tenaga kesehatan.
- Dokumentasi tindakan.
- Lampiran CPPT jika diperlukan.

Pilihan storage:

- Supabase Storage.
- AWS S3.
- Cloudflare R2.
- Object storage lain yang kompatibel dengan S3.

### 3.6 Payment Gateway Future Plan

Untuk tahap lanjutan, sistem dapat diintegrasikan dengan payment gateway seperti:

- Midtrans.
- Xendit.
- Duitku.
- Payment provider lain yang mendukung Indonesia.

## 4. Platform yang Didukung

### 4.1 Web App

Web app menjadi prioritas MVP dan harus mendukung:

- Desktop browser.
- Tablet browser.
- Mobile browser.

Browser minimum:

- Chrome versi terbaru.
- Safari versi terbaru.
- Edge versi terbaru.
- Firefox versi terbaru.

### 4.2 Mobile App

Mobile app direncanakan setelah MVP web stabil.

Target platform:

- Android.
- iOS.

Mobile app harus menggunakan API yang sama agar data pasien, booking, CPPT, invoice, dan profil tenaga kesehatan tetap terpusat.

## 5. Role Pengguna

Sistem harus memiliki minimal 3 role utama:

### 5.1 Pasien

Pasien dapat:

- Mendaftar dan login.
- Mencari tenaga kesehatan.
- Melihat profil tenaga kesehatan.
- Melakukan booking layanan.
- Melihat riwayat booking.
- Melihat invoice.
- Melihat CPPT dan dokumentasi tindakan.
- Memberikan rating dan ulasan.

### 5.2 Tenaga Kesehatan

Tenaga kesehatan dapat:

- Mendaftar dan login.
- Mengisi profil profesional.
- Mengatur layanan dan harga.
- Mengatur jadwal.
- Menerima atau menolak booking.
- Mengisi CPPT digital.
- Mengunggah dokumentasi tindakan.
- Melihat invoice dan pendapatan.
- Melihat riwayat pasien yang pernah ditangani.

### 5.3 Admin

Admin dapat:

- Login ke admin panel.
- Mengelola pasien.
- Mengelola tenaga kesehatan.
- Memverifikasi tenaga kesehatan.
- Mengelola kategori layanan.
- Memantau booking.
- Memantau invoice dan transaksi.
- Mengelola laporan dan keluhan.

## 6. Kebutuhan Fungsional

## 6.1 Authentication dan Authorization

### 6.1.1 Registrasi

Sistem harus mendukung registrasi untuk:

- Pasien.
- Tenaga kesehatan.

Data registrasi pasien minimal:

- Nama lengkap.
- Nomor HP.
- Email.
- Password.

Data registrasi tenaga kesehatan minimal:

- Nama lengkap.
- Profesi.
- Nomor HP.
- Email.
- Password.

### 6.1.2 Login

Sistem harus mendukung login menggunakan:

- Email dan password.
- Nomor HP dan password jika dibutuhkan.

### 6.1.3 Role-based Access Control

Sistem harus membatasi akses berdasarkan role:

- Pasien hanya dapat melihat data miliknya.
- Tenaga kesehatan hanya dapat melihat booking dan CPPT miliknya.
- Admin dapat mengelola seluruh data sesuai hak akses.

### 6.1.4 Session dan Token

Sistem harus dirancang agar kompatibel dengan mobile app di masa depan.

Rekomendasi:

- Gunakan session untuk web.
- Sediakan token-based authentication untuk mobile jika dibutuhkan.
- Hindari menyimpan data sensitif di local storage.

## 6.2 Profil Pengguna

### 6.2.1 Profil Pasien

Pasien dapat mengelola:

- Nama lengkap.
- Nomor HP.
- Email.
- Alamat utama.
- Data keluarga atau pasien tambahan jika diperlukan di tahap lanjutan.

### 6.2.2 Profil Tenaga Kesehatan

Tenaga kesehatan dapat mengelola:

- Foto profil.
- Nama lengkap.
- Profesi.
- Spesialisasi.
- Deskripsi singkat.
- Area layanan.
- Pengalaman kerja.
- Nomor STR/SIP jika tersedia.
- Dokumen pendukung.
- Status menerima pasien.

## 6.3 Verifikasi Tenaga Kesehatan

Sistem harus menyediakan proses verifikasi tenaga kesehatan.

Status verifikasi:

- Draft.
- Menunggu verifikasi.
- Terverifikasi.
- Ditolak.
- Dinonaktifkan.

Admin dapat:

- Melihat dokumen verifikasi.
- Menyetujui verifikasi.
- Menolak verifikasi dengan alasan.
- Menonaktifkan profil jika diperlukan.

## 6.4 Kategori dan Layanan

### 6.4.1 Kategori Layanan

Admin dapat mengelola kategori layanan seperti:

- Perawatan luka.
- Pijat bayi.
- Fisioterapi.
- Home care.
- Perawatan lansia.
- Pasca operasi.

### 6.4.2 Layanan Tenaga Kesehatan

Tenaga kesehatan dapat membuat layanan dengan data:

- Nama layanan.
- Kategori.
- Deskripsi.
- Durasi estimasi.
- Harga.
- Area layanan.
- Status aktif atau nonaktif.

## 6.5 Pencarian Tenaga Kesehatan

Sistem harus menyediakan fitur pencarian tenaga kesehatan berdasarkan:

- Kategori layanan.
- Lokasi.
- Nama tenaga kesehatan.
- Profesi.
- Harga.
- Rating.
- Status verifikasi.
- Jadwal tersedia.

Hasil pencarian harus menampilkan:

- Foto profil.
- Nama tenaga kesehatan.
- Profesi.
- Rating.
- Area layanan.
- Layanan utama.
- Harga mulai dari.
- Badge terverifikasi.

## 6.6 Booking Layanan

### 6.6.1 Membuat Booking

Pasien dapat membuat booking dengan memilih:

- Tenaga kesehatan.
- Layanan.
- Tanggal.
- Jam.
- Alamat layanan.
- Catatan tambahan.

### 6.6.2 Status Booking

Sistem harus mendukung status booking:

- Menunggu konfirmasi.
- Diterima.
- Ditolak.
- Dibatalkan pasien.
- Dibatalkan tenaga kesehatan.
- Berlangsung.
- Selesai.

### 6.6.3 Konfirmasi Booking

Tenaga kesehatan dapat:

- Menerima booking.
- Menolak booking dengan alasan.
- Melihat detail booking.
- Mengubah status layanan menjadi selesai setelah tindakan dilakukan.

## 6.7 CPPT Digital

Sistem harus menyediakan fitur CPPT digital untuk mencatat tindakan tenaga kesehatan.

Data CPPT minimal:

- Booking terkait.
- Pasien terkait.
- Tenaga kesehatan terkait.
- Tanggal dan jam tindakan.
- Keluhan utama.
- Data subjektif.
- Data objektif.
- Assessment.
- Plan.
- Tindakan yang dilakukan.
- Edukasi pasien.
- Rencana tindak lanjut.
- Catatan tambahan.

Akses CPPT:

- Tenaga kesehatan pembuat dapat mengisi dan melihat CPPT.
- Pasien terkait dapat melihat CPPT setelah layanan selesai.
- Admin dapat melihat CPPT sesuai kebutuhan operasional dan kebijakan privasi.

## 6.8 Dokumentasi Tindakan

Sistem harus mendukung upload dokumentasi tindakan.

Jenis dokumentasi:

- Foto sebelum tindakan.
- Foto setelah tindakan.
- Foto perkembangan.
- Lampiran pendukung.

Ketentuan:

- Dokumentasi hanya dapat diakses oleh pasien terkait, tenaga kesehatan terkait, dan admin sesuai kewenangan.
- Sistem harus menyimpan metadata upload.
- Sistem harus membatasi tipe file dan ukuran file.
- Sistem harus memiliki persetujuan pasien untuk dokumentasi sensitif.

## 6.9 Invoice Otomatis

Sistem harus membuat invoice otomatis setelah layanan selesai atau setelah booking dikonfirmasi, sesuai aturan bisnis yang dipilih.

Data invoice minimal:

- Nomor invoice.
- Tanggal invoice.
- Nama pasien.
- Nama tenaga kesehatan.
- Jenis layanan.
- Rincian biaya.
- Biaya tambahan jika ada.
- Diskon jika ada.
- Total pembayaran.
- Status pembayaran.

Status invoice:

- Belum dibayar.
- Dibayar.
- Dibatalkan.
- Refund jika payment gateway sudah tersedia.

## 6.10 Rating dan Ulasan

Sistem harus memungkinkan pasien memberi rating setelah booking selesai.

Ketentuan:

- Hanya pasien dengan booking selesai yang dapat memberi ulasan.
- Satu booking hanya dapat memiliki satu ulasan.
- Rating ditampilkan di profil tenaga kesehatan.
- Admin dapat memoderasi ulasan jika diperlukan.

## 6.11 Notifikasi

Sistem perlu mendukung notifikasi untuk:

- Booking baru.
- Booking diterima.
- Booking ditolak.
- Pengingat jadwal layanan.
- Invoice dibuat.
- CPPT selesai.
- Pembayaran berhasil jika payment gateway aktif.

Channel notifikasi tahap awal:

- Email.
- In-app notification.

Channel tahap lanjutan:

- WhatsApp notification.
- Push notification mobile.

## 6.12 Dashboard

### 6.12.1 Dashboard Pasien

Menampilkan:

- Booking aktif.
- Riwayat layanan.
- Invoice.
- CPPT dan dokumentasi.
- Rating yang belum diberikan.

### 6.12.2 Dashboard Tenaga Kesehatan

Menampilkan:

- Booking hari ini.
- Permintaan booking baru.
- CPPT belum lengkap.
- Invoice dan pendapatan.
- Rating rata-rata.
- Riwayat pasien.

### 6.12.3 Dashboard Admin

Menampilkan:

- Total pasien.
- Total tenaga kesehatan.
- Tenaga kesehatan menunggu verifikasi.
- Total booking.
- Total invoice.
- Laporan layanan.

## 7. Kebutuhan Database Awal

Entitas database awal yang dibutuhkan:

### 7.1 User

Menyimpan akun dasar semua pengguna.

Field utama:

- id.
- name.
- email.
- phone.
- passwordHash.
- role.
- createdAt.
- updatedAt.

### 7.2 PatientProfile

Menyimpan data pasien.

Field utama:

- id.
- userId.
- address.
- birthDate.
- gender.
- emergencyContact.

### 7.3 PractitionerProfile

Menyimpan data tenaga kesehatan.

Field utama:

- id.
- userId.
- profession.
- specialization.
- bio.
- experienceYears.
- serviceArea.
- licenseNumber.
- verificationStatus.
- isAvailable.

### 7.4 PractitionerDocument

Menyimpan dokumen verifikasi tenaga kesehatan.

Field utama:

- id.
- practitionerId.
- documentType.
- fileUrl.
- status.
- rejectionReason.

### 7.5 ServiceCategory

Menyimpan kategori layanan.

Field utama:

- id.
- name.
- slug.
- description.
- isActive.

### 7.6 PractitionerService

Menyimpan layanan yang dibuat tenaga kesehatan.

Field utama:

- id.
- practitionerId.
- categoryId.
- name.
- description.
- price.
- durationMinutes.
- isActive.

### 7.7 AvailabilitySchedule

Menyimpan jadwal tenaga kesehatan.

Field utama:

- id.
- practitionerId.
- dayOfWeek.
- startTime.
- endTime.
- isActive.

### 7.8 Booking

Menyimpan data booking.

Field utama:

- id.
- patientId.
- practitionerId.
- serviceId.
- bookingDate.
- bookingTime.
- address.
- notes.
- status.
- cancellationReason.
- createdAt.
- updatedAt.

### 7.9 CPPT

Menyimpan catatan tindakan.

Field utama:

- id.
- bookingId.
- subjective.
- objective.
- assessment.
- plan.
- actionTaken.
- education.
- followUpPlan.
- additionalNotes.
- createdAt.
- updatedAt.

### 7.10 TreatmentDocument

Menyimpan dokumentasi tindakan.

Field utama:

- id.
- bookingId.
- cpptId.
- fileUrl.
- documentType.
- description.
- consentGiven.
- createdAt.

### 7.11 Invoice

Menyimpan invoice.

Field utama:

- id.
- bookingId.
- invoiceNumber.
- subtotal.
- additionalFee.
- discount.
- total.
- paymentStatus.
- issuedAt.
- paidAt.

### 7.12 Review

Menyimpan rating dan ulasan.

Field utama:

- id.
- bookingId.
- patientId.
- practitionerId.
- rating.
- comment.
- createdAt.

### 7.13 Notification

Menyimpan notifikasi in-app.

Field utama:

- id.
- userId.
- title.
- message.
- type.
- readAt.
- createdAt.

## 8. Kebutuhan API

API harus dirancang agar dapat digunakan oleh web dan mobile app.

### 8.1 Prinsip API

- Response konsisten.
- Error message jelas.
- Validasi input menggunakan schema.
- Authorization dicek di server.
- Tidak mengirim data sensitif yang tidak diperlukan.

### 8.2 Endpoint Awal

Endpoint awal yang dibutuhkan:

#### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

#### Practitioners

- `GET /api/practitioners`
- `GET /api/practitioners/:id`
- `PATCH /api/practitioners/me`
- `POST /api/practitioners/documents`

#### Services

- `GET /api/service-categories`
- `POST /api/practitioner-services`
- `PATCH /api/practitioner-services/:id`
- `DELETE /api/practitioner-services/:id`

#### Bookings

- `POST /api/bookings`
- `GET /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/status`

#### CPPT

- `POST /api/bookings/:id/cppt`
- `GET /api/bookings/:id/cppt`
- `PATCH /api/cppt/:id`

#### Documents

- `POST /api/bookings/:id/documents`
- `GET /api/bookings/:id/documents`

#### Invoices

- `GET /api/invoices`
- `GET /api/invoices/:id`

#### Reviews

- `POST /api/bookings/:id/review`
- `GET /api/practitioners/:id/reviews`

#### Admin

- `GET /api/admin/dashboard`
- `GET /api/admin/practitioners/pending`
- `PATCH /api/admin/practitioners/:id/verification`
- `POST /api/admin/service-categories`
- `PATCH /api/admin/service-categories/:id`

## 9. Kebutuhan Keamanan

Sistem harus memenuhi kebutuhan keamanan berikut:

- Password harus di-hash menggunakan algoritma aman.
- Semua endpoint sensitif harus membutuhkan autentikasi.
- Semua endpoint harus memvalidasi authorization berdasarkan role.
- Data CPPT dan dokumentasi tindakan harus dibatasi aksesnya.
- Upload file harus membatasi tipe file dan ukuran file.
- Sistem harus mencegah SQL injection melalui ORM dan validasi input.
- Sistem harus mencegah XSS dengan sanitasi output jika menampilkan input bebas.
- Sistem harus memiliki rate limiting untuk endpoint login dan upload.
- Sistem harus mencatat aktivitas penting seperti login, verifikasi, dan perubahan status booking.

## 10. Kebutuhan Privasi Data Medis

Karena sistem menyimpan data kesehatan, platform harus memperhatikan:

- Persetujuan pasien untuk dokumentasi foto.
- Pembatasan akses CPPT.
- Penghapusan atau anonimisasi data sesuai kebijakan.
- Kebijakan privasi yang jelas.
- Penyimpanan data medis hanya untuk kebutuhan layanan.
- Audit akses untuk data sensitif di tahap lanjutan.

## 11. Kebutuhan UI/UX

UI/UX harus mengikuti `design.md`.

Ketentuan utama:

- Font menggunakan Plus Jakarta Sans.
- Style modern light.
- Mobile-first.
- Form sederhana.
- Navigasi jelas.
- Dashboard tenaga kesehatan dibuat semudah mungkin.
- CPPT digital tidak boleh terasa rumit.
- Tombol booking harus mudah ditemukan.

## 12. Kebutuhan Mobile Readiness

Agar mudah dikembangkan menjadi mobile app, sistem web harus dirancang dengan prinsip berikut:

- Business logic tidak boleh terlalu terikat pada UI web.
- API harus dapat dikonsumsi oleh mobile app.
- Auth harus memiliki strategi yang kompatibel dengan mobile.
- Upload dokumentasi harus menggunakan storage terpusat.
- Response API harus stabil dan terdokumentasi.
- Validasi data sebaiknya dapat digunakan ulang.
- Database schema harus mendukung penggunaan lintas platform.

## 13. Struktur Proyek yang Disarankan

Untuk MVP sederhana:

```txt
nakespro/
  app/
  components/
  features/
  lib/
  prisma/
  public/
  styles/
```

Untuk jangka panjang dengan mobile app:

```txt
nakespro/
  apps/
    web/
    mobile/
  packages/
    db/
    api/
    validators/
    ui/
```

Rekomendasi:

- Mulai dari struktur sederhana jika hanya web MVP.
- Pertimbangkan monorepo sejak awal jika mobile app akan segera dikembangkan.

## 14. MVP Requirements

### 14.1 MVP Pasien

- Registrasi dan login.
- Melihat daftar tenaga kesehatan.
- Filter kategori dan lokasi.
- Melihat profil tenaga kesehatan.
- Membuat booking.
- Melihat status booking.
- Melihat invoice.
- Melihat CPPT dan dokumentasi setelah layanan selesai.
- Memberikan rating.

### 14.2 MVP Tenaga Kesehatan

- Registrasi dan login.
- Mengisi profil.
- Membuat layanan.
- Mengatur jadwal sederhana.
- Menerima atau menolak booking.
- Mengisi CPPT.
- Upload dokumentasi tindakan.
- Melihat invoice.

### 14.3 MVP Admin

- Login admin.
- Melihat dashboard ringkas.
- Verifikasi tenaga kesehatan.
- Mengelola kategori layanan.
- Melihat daftar booking.
- Melihat daftar pengguna.

## 15. Non-MVP / Future Requirements

Fitur yang tidak wajib di MVP tetapi perlu disiapkan:

- Payment gateway.
- Chat pasien dan tenaga kesehatan.
- WhatsApp notification.
- Push notification mobile.
- Mobile app Android dan iOS.
- PDF invoice.
- Template CPPT per kategori layanan.
- Multi-pasien dalam satu akun keluarga.
- Sistem komisi platform.
- Subscription tenaga kesehatan.
- Promo dan voucher.
- Integrasi kalender.
- Audit log lanjutan.

## 16. Acceptance Criteria Umum

Aplikasi dianggap memenuhi kebutuhan awal jika:

- Pasien dapat mendaftar, login, mencari tenaga kesehatan, dan membuat booking.
- Tenaga kesehatan dapat mendaftar, membuat profil, membuat layanan, dan menerima booking.
- Admin dapat memverifikasi tenaga kesehatan.
- CPPT dapat dibuat oleh tenaga kesehatan setelah layanan dilakukan.
- Pasien dapat melihat CPPT dan dokumentasi layanan miliknya.
- Invoice dapat dibuat otomatis untuk booking.
- Akses data dibatasi berdasarkan role.
- UI mengikuti modern light style dengan Plus Jakarta Sans.
- Database menggunakan PostgreSQL dan Prisma.
- API dirancang agar bisa digunakan oleh mobile app di masa depan.

## 17. Rekomendasi Implementasi Awal

Tahapan implementasi awal yang disarankan:

1. Setup Next.js, TypeScript, Tailwind CSS, Prisma, dan PostgreSQL.
2. Buat schema database awal.
3. Implementasi authentication dan role.
4. Buat dashboard dasar untuk pasien, tenaga kesehatan, dan admin.
5. Implementasi profil tenaga kesehatan dan kategori layanan.
6. Implementasi pencarian tenaga kesehatan.
7. Implementasi booking.
8. Implementasi CPPT digital.
9. Implementasi invoice otomatis.
10. Implementasi dokumentasi tindakan.
11. Implementasi rating dan ulasan.
12. Persiapkan API agar siap digunakan mobile app.

## 18. Kesimpulan

NakesPro direkomendasikan menggunakan Next.js, Prisma, dan PostgreSQL untuk MVP web. Stack ini cukup kuat untuk membangun marketplace layanan tenaga kesehatan dengan fitur booking, CPPT, invoice, dan dashboard.

Agar mudah dikembangkan menjadi aplikasi Android dan iOS, backend harus dibuat API-first, business logic harus dipisahkan dari UI web, dan sistem autentikasi serta file storage harus dirancang kompatibel dengan mobile app.
