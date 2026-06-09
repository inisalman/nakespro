import { Stethoscope, Heart, Activity, Baby, Home, Syringe } from "lucide-react";

export const WHATSAPP_NUMBER = "628568461024";

export const services = [
  { icon: Stethoscope, title: "Perawat Luka", desc: "Website profil untuk praktik perawatan luka mandiri." },
  { icon: Baby, title: "Bidan & Pijat Bayi", desc: "Tampilkan layanan kebidanan dan jadwal praktik." },
  { icon: Activity, title: "Fisioterapis", desc: "Website branded untuk klinik fisioterapi." },
  { icon: Home, title: "Home Care", desc: "Promosikan layanan perawatan di rumah." },
  { icon: Syringe, title: "Praktik Mandiri", desc: "Profil layanan, kontak, dan booking online." },
  { icon: Heart, title: "Klinik Kecil", desc: "Website profesional untuk klinik atau praktik bersama." },
];

export const steps = [
  { num: "01", title: "Daftar", desc: "2 menit. Pilih template, isi data basic, verifikasi via WhatsApp. Selesai." },
  { num: "02", title: "Bayar", desc: "20 ribu/bulan atau sekali bayar. QRIS instant, langsung diproses." },
  { num: "03", title: "Live", desc: "Dalam 1-3 hari website Anda sudah online dan siap terima pasien." },
  { num: "04", title: "Support", desc: "Ada yang perlu diubah? Tinggal chat kami via WhatsApp." },
];

export const plans = [
  {
    name: "Website Template",
    tagline: "Cepat, hemat, siap pakai. Paling cocok untuk mayoritas nakes.",
    price: "Rp20.000",
    period: "/bulan",
    highlight: true,
    features: [
      "Website jadi dalam 1-3 hari (kami yang urus)",
      "Domain sudah included (nama.nakespro.id)",
      "Hosting & server sudah included — tanpa bayar terpisah",
      "Booking online & profil layanan lengkap",
      "Responsif di semua perangkat",
      "Support gratis via WhatsApp",
    ],
    cta: "Daftar Sekarang",
    note: "Rekomendasi",
  },
  {
    name: "Website Custom",
    tagline: "Desain sesuai branding Anda. Untuk nakes yang punya budget lebih.",
    price: "Rp2.000.000",
    period: "/sekali bayar",
    highlight: false,
    features: [
      "Desain custom sesuai branding Anda",
      "Domain sendiri (namaanda.com)",
      "Fitur khusus sesuai kebutuhan",
      "Optimasi SEO & performa",
      "Booking online & manajemen pasien",
      "Pendampingan penuh dari tim kami",
    ],
    cta: "Konsultasi via WhatsApp",
    note: "Untuk yang mau unik",
  },
];

export const portfolio = [
  { name: "Klinik Luka Sehat", category: "Perawat Luka", color: "from-teal/20 to-teal/5" },
  { name: "Bidan Sari Praktik", category: "Bidan Mandiri", color: "from-sky-blue/20 to-sky-blue/5" },
  { name: "FisioCare Studio", category: "Fisioterapi", color: "from-sage/20 to-sage/5" },
  { name: "HomeCare Nusantara", category: "Home Care", color: "from-peach/30 to-peach/5" },
];

export const faqs = [
  { q: "Berapa biaya tersembunyi?", a: "Tidak ada. Hanya Rp20.000/bulan. Domain dan hosting sudah included, tidak ada biaya lain." },
  { q: "Berapa lama sampai website live?", a: "1-3 hari setelah pembayaran. Kami yang urus server dan teknisnya. Anda tinggal upload foto dan data praktik." },
  { q: "Apakah saya perlu beli domain atau server sendiri?", a: "Tidak. Paket Template sudah termasuk subdomain (nama.nakespro.id), hosting, dan server. Kalau mau domain sendiri (namaanda.com), pakai paket Custom." },
  { q: "Gimana kalau website perlu diubah?", a: "Tinggal chat kami via WhatsApp. Perubahan kecil seperti foto, jam praktik, dan deskripsi gratis. Perubahan besar seperti desain atau fitur ada biaya tergantung kompleksitas." },
  { q: "Apakah website bisa menerima booking pasien?", a: "Ya. Paket Template dan Custom keduanya mendukung booking online. Pasien bisa request janji langsung dari website Anda." },
  { q: "Bagaimana cara memulai?", a: "Klik \"Daftar Sekarang\" atau isi form di bawah. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi." },
];
