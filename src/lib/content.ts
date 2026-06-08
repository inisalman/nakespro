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
  { num: "01", title: "Konsultasi", desc: "Ceritakan kebutuhan dan layanan kesehatan Anda. Gratis, tanpa komitmen." },
  { num: "02", title: "Desain", desc: "Kami rancang website sesuai branding dan kebutuhan praktik Anda." },
  { num: "03", title: "Revisi", desc: "Tinjau dan beri masukan hingga hasilnya sesuai keinginan." },
  { num: "04", title: "Launch", desc: "Website Anda online dan siap menerima pasien baru." },
];

export const plans = [
  {
    name: "Template",
    tagline: "Website siap pakai untuk nakes",
    price: "Rp20.000",
    period: "/bulan",
    highlight: false,
    features: [
      "Website otomatis dari template profesional",
      "Subdomain nama.nakespro.id",
      "Profil layanan & informasi praktik",
      "Halaman kontak & booking sederhana",
      "Responsif di semua perangkat",
      "Cocok untuk nakes yang ingin cepat & hemat",
    ],
    cta: "Daftar Template",
    note: "Segera hadir",
  },
  {
    name: "Custom",
    tagline: "Website branded sesuai kebutuhan",
    price: "Rp2.000.000",
    period: "/sekali bayar",
    highlight: true,
    features: [
      "Desain custom sesuai branding Anda",
      "Domain sendiri (namaanda.com)",
      "Fitur khusus sesuai kebutuhan",
      "Optimasi SEO & performa",
      "Booking online & manajemen pasien",
      "Pendampingan penuh dari tim kami",
    ],
    cta: "Konsultasi via WhatsApp",
    note: "Paling populer",
  },
];

export const portfolio = [
  { name: "Klinik Luka Sehat", category: "Perawat Luka", color: "from-teal/20 to-teal/5" },
  { name: "Bidan Sari Praktik", category: "Bidan Mandiri", color: "from-sky-blue/20 to-sky-blue/5" },
  { name: "FisioCare Studio", category: "Fisioterapi", color: "from-sage/20 to-sage/5" },
  { name: "HomeCare Nusantara", category: "Home Care", color: "from-peach/30 to-peach/5" },
];

export const faqs = [
  { q: "Berapa lama pengerjaan website custom?", a: "Umumnya 1-2 minggu tergantung kompleksitas fitur, dihitung sejak konsultasi dan materi lengkap diterima." },
  { q: "Apakah saya perlu beli domain sendiri?", a: "Untuk paket Custom, Anda bisa pakai domain sendiri. Untuk paket Template, Anda otomatis dapat subdomain nama.nakespro.id." },
  { q: "Apa beda paket Template dan Custom?", a: "Template adalah website siap pakai yang otomatis dibuat dari desain standar (langganan bulanan). Custom adalah website yang dirancang khusus sesuai branding dan kebutuhan Anda (sekali bayar)." },
  { q: "Apakah website bisa menerima booking pasien?", a: "Ya. Paket Custom mendukung booking online dan manajemen pasien. Paket Template menyediakan booking sederhana." },
  { q: "Bagaimana cara memulai?", a: "Klik tombol konsultasi WhatsApp atau isi form di bawah. Tim kami akan menghubungi Anda untuk diskusi gratis." },
];
