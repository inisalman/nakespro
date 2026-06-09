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
  { num: "02", title: "Bayar", desc: "Mulai Rp25.000/bulan atau tahunan. QRIS instant, langsung diproses." },
  { num: "03", title: "Live", desc: "Dalam 1-3 hari website Anda sudah online dan siap terima pasien." },
  { num: "04", title: "Support", desc: "Ada yang perlu diubah? Tinggal chat kami via WhatsApp." },
];

export const plans = [
  {
    name: "Paket Hemat",
    tagline: "Cepat, hemat, siap pakai. Paling cocok untuk mayoritas nakes.",
    highlight: true,
    monthly: {
      price: "Rp39.000",
      period: "/bulan",
      note: "Ditagih bulanan",
    },
    yearly: {
      price: "Rp25.000",
      period: "/bulan",
      note: "Ditagih Rp300.000/tahun",
    },
    features: [
      "Website jadi dalam 1-3 hari (kami yang urus)",
      "Domain sudah included (nama.nakespro.id)",
      "Hosting & server sudah included — tanpa bayar terpisah",
      "Booking online & profil layanan lengkap",
      "Responsif di semua perangkat",
      "Support gratis via WhatsApp",
    ],
    cta: "Daftar Sekarang",
    ctaTarget: "#order",
    badge: "Rekomendasi",
  },
  {
    name: "Paket Advance",
    tagline: "Desain sesuai branding Anda. Untuk nakes yang punya budget lebih.",
    highlight: false,
    monthly: {
      price: "Rp200.000",
      period: "/bulan",
      note: "Ditagih bulanan",
    },
    yearly: {
      price: "Rp166.000",
      period: "/bulan",
      note: "Ditagih Rp2.000.000/tahun",
    },
    features: [
      "Desain custom sesuai branding Anda",
      "Domain sendiri (namaanda.com)",
      "Fitur khusus sesuai kebutuhan",
      "Optimasi SEO & performa",
      "Booking online & manajemen pasien",
      "Pendampingan penuh dari tim kami",
    ],
    cta: "Konsultasi via WhatsApp",
    ctaTarget: "wa",
    badge: null,
  },
  {
    name: "Paket Enterprise",
    tagline: "Untuk klinik, jaringan praktik, atau kebutuhan skala besar.",
    highlight: false,
    enterprise: true,
    monthly: {
      price: "Custom",
      period: "",
      note: "Sesuai kebutuhan",
    },
    yearly: {
      price: "Custom",
      period: "",
      note: "Sesuai kebutuhan",
    },
    features: [
      "Multi-website atau multi-cabang",
      "Integrasi sistem internal & rekam medis",
      "Dashboard manajemen terpusat",
      "Dukungan teknis prioritas",
      "SLA & keamanan tingkat enterprise",
      "Konsultasi langsung dengan tim kami",
    ],
    cta: "Diskusi via WhatsApp",
    ctaTarget: "wa",
    badge: null,
  },
];

export const billingOptions = {
  monthly: { label: "Bulanan", saving: null },
  yearly: { label: "Tahunan", saving: "Hemat hingga 36%" },
};

export const portfolio = [
  { name: "Klinik Luka Sehat", category: "Perawat Luka", color: "from-teal/20 to-teal/5" },
  { name: "Bidan Sari Praktik", category: "Bidan Mandiri", color: "from-sky-blue/20 to-sky-blue/5" },
  { name: "FisioCare Studio", category: "Fisioterapi", color: "from-sage/20 to-sage/5" },
  { name: "HomeCare Nusantara", category: "Home Care", color: "from-peach/30 to-peach/5" },
];

export const faqs = [
  { q: "Berapa biaya tersembunyi?", a: "Tidak ada. Mulai Rp25.000/bulan (tagihan tahunan). Domain dan hosting sudah included, tidak ada biaya lain." },
  { q: "Berapa lama sampai website live?", a: "1-3 hari setelah pembayaran. Kami yang urus server dan teknisnya. Anda tinggal upload foto dan data praktik." },
  { q: "Apakah saya perlu beli domain atau server sendiri?", a: "Tidak. Paket Template sudah termasuk subdomain (nama.nakespro.id), hosting, dan server. Kalau mau domain sendiri (namaanda.com), pakai paket Custom." },
  { q: "Gimana kalau website perlu diubah?", a: "Tinggal chat kami via WhatsApp. Perubahan kecil seperti foto, jam praktik, dan deskripsi gratis. Perubahan besar seperti desain atau fitur ada biaya tergantung kompleksitas." },
  { q: "Apakah website bisa menerima booking pasien?", a: "Ya. Paket Template dan Custom keduanya mendukung booking online. Pasien bisa request janji langsung dari website Anda." },
  { q: "Bagaimana cara memulai?", a: "Klik \"Daftar Sekarang\" atau isi form di bawah. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi." },
];
