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
    name: "Paket Starter",
    tagline: "Awali perjalanan digital praktik Anda dengan tampilan yang meyakinkan.",
    highlight: false,
    monthly: {
      price: "Rp49.000",
      period: "/bulan",
      note: "Ditagih bulanan",
    },
    yearly: {
      price: "Rp25.000",
      period: "/bulan",
      note: "Ditagih Rp300.000/tahun",
    },
    features: [
      "Gratis domain .nakespro.id",
      "Pantau performa lewat dashboard dan analitik pengunjung",
      "Website rampung dalam 1-3 hari, semua kami yang urus",
      "Sudah termasuk hosting dan server, tanpa biaya tambahan",
      "Tampil sempurna di layar HP, tablet, hingga laptop",
    ],
    cta: "Daftar Sekarang",
    ctaTarget: "https://app.nakespro.id/register?package=starter",
    badge: null,
  },
  {
    name: "Paket Advance",
    tagline: "Paket lengkap untuk Anda yang ingin tampil maksimal dan dipercaya.",
    highlight: true,
    monthly: {
      price: "Rp150.000",
      period: "/bulan",
      note: "Ditagih bulanan",
    },
    yearly: {
      price: "Rp83.333",
      period: "/bulan",
      note: "Ditagih Rp999.999/tahun",
    },
    features: [
      "Tambahan domain gratis hingga .com untuk paket tahunan",
      "Optimasi SEO agar praktik Anda mudah ditemukan di Google",
      "Terhubung Google Maps & Google Bisnis untuk jangkauan lokal",
      "Booking online, pasien bisa pesan jadwal langsung dari website",
      "Buka seluruh fitur dashboard tanpa batasan",
      "Rekam dan tinjau riwayat tindakan pasien secara detail",
      "Invoice terkirim otomatis ke WhatsApp pasien",
      "Desain website dirancang sesuai identitas brand Anda",
      "Didampingi langsung oleh tim ahli kami dari awal",
    ],
    cta: "Daftar Sekarang",
    ctaTarget: "https://app.nakespro.id/register?package=advance",
    badge: "Rekomendasi",
  },
  {
    name: "Paket Professional",
    tagline: "Skala besar, fitur tanpa batas. Pilihan utama praktik yang terus bertumbuh.",
    highlight: false,
    enterprise: true,
    monthly: {
      price: "-",
      period: "",
      note: "Hanya tersedia tahunan",
    },
    yearly: {
      price: "Rp291.667",
      period: "/bulan",
      note: "Ditagih Rp3.500.000/tahun",
    },
    features: [
      "Semua yang ada di Advance, plus bonus domain .id eksklusif",
      "Revisi desain tidak dibatasi demi hasil yang sempurna",
      "Pengelolaan multi-website untuk banyak cabang praktik",
      "SEO tingkat lanjut & laporan performa bulanan",
      "Integrasi WhatsApp Business & chat otomatis ke pasien",
      "Halaman & layanan tanpa batas untuk kebutuhan apa pun",
      "Akses tim untuk kelola website bersama (multi-admin)",
      "Manajer akun khusus yang siap mendampingi Anda",
      "Prioritas utama untuk bantuan teknis & jaminan uptime",
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
  {
    id: "modern-light",
    name: "Modern Light",
    category: "Perawat Luka",
    character: "Bersih, terang, profesional",
    description: "Cocok untuk praktik mandiri, klinik kecil",
    url: "https://modernlight.nakespro.id/",
    accentColor: "teal",
  },
  {
    id: "clean-medical",
    name: "Clean Medical",
    category: "Fisioterapi",
    character: "Klinis, rapi, tepercaya",
    description: "Cocok untuk fisioterapi, rehabilitasi, klinik medis",
    url: "https://cleanmedical.nakespro.id/",
    accentColor: "cyan",
  },
  {
    id: "friendly-care",
    name: "Friendly Care",
    category: "Bidan & Anak",
    character: "Ceria, hangat, ramah keluarga",
    description: "Cocok untuk bidan, perawatan ibu & anak, laktasi",
    url: "https://friendlycare.nakespro.id/",
    accentColor: "purple",
  },
  {
    id: "calm-warm",
    name: "Calm & Warm",
    category: "Home Care",
    character: "Hangat, lembut, menenangkan",
    description: "Cocok untuk perawatan lansia, mental health, home nursing",
    url: "https://calmwarm.nakespro.id/",
    accentColor: "amber",
  },
];

export const faqs = [
  { q: "Berapa biaya tersembunyi?", a: "Tidak ada. Mulai Rp25.000/bulan (tagihan tahunan). Domain dan hosting sudah included, tidak ada biaya lain." },
  { q: "Berapa lama sampai website live?", a: "1-3 hari setelah pembayaran. Kami yang urus server dan teknisnya. Anda tinggal upload foto dan data praktik." },
  { q: "Apakah saya perlu beli domain atau server sendiri?", a: "Tidak. Paket Template sudah termasuk subdomain (nama.nakespro.id), hosting, dan server. Kalau mau domain sendiri (namaanda.com), pakai paket Custom." },
  { q: "Gimana kalau website perlu diubah?", a: "Tinggal chat kami via WhatsApp. Perubahan kecil seperti foto, jam praktik, dan deskripsi gratis. Perubahan besar seperti desain atau fitur ada biaya tergantung kompleksitas." },
  { q: "Apakah website bisa menerima booking pasien?", a: "Ya. Paket Template dan Custom keduanya mendukung booking online. Pasien bisa request janji langsung dari website Anda." },
  { q: "Bagaimana cara memulai?", a: "Klik \"Daftar Sekarang\" atau isi form di bawah. Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi." },
];

export const testimonials = [
  {
    initial: "SR",
    name: "Siti Rahmawati",
    role: "Perawat Luka Mandiri",
    city: "Jakarta Selatan",
    rating: 5,
    quote: "Saya nggak ngerti teknis sama sekali, tapi tim NakesPro bantu dari awal sampai website saya live. Dalam 2 hari pasien langsung bisa booking via website!",
    color: "bg-teal-tint text-teal-strong",
  },
  {
    initial: "DA",
    name: "dr. Dian Ayu, S.Kep",
    role: "Homecare & Injeksi",
    city: "Surabaya",
    rating: 5,
    quote: "Harganya terjangkau banget, sudah dapat domain dan hosting. Saya bilang ke teman-teman sesama perawat supaya daftar juga. Worth it!",
    color: "bg-amber-50 text-amber-700",
  },
  {
    initial: "BW",
    name: "Bidan Wulandari",
    role: "Bidan & Laktasi",
    city: "Yogyakarta",
    rating: 5,
    quote: "Tampilan websitenya bersih dan profesional. Pasien sering bilang dapat website saya dari Google. Alhamdulillah, sekarang jadwal lebih penuh.",
    color: "bg-purple-50 text-purple-700",
  },
  {
    initial: "RP",
    name: "Rizal Pratama, Amd.Fis",
    role: "Fisioterapis",
    city: "Bandung",
    rating: 5,
    quote: "Support-nya responsif banget. Setiap ada yang mau diubah, langsung direspon dalam hitungan jam. Tidak pernah kecewa sejak berlangganan.",
    color: "bg-blue-50 text-blue-700",
  },
  {
    initial: "NH",
    name: "Ns. Nurul Hidayah",
    role: "Perawat Home Visit",
    city: "Semarang",
    rating: 5,
    quote: "Dulu saya pikir buat website itu mahal dan ribet. Ternyata lewat NakesPro cukup isi form, bayar, dan websitenya sudah jadi. Praktis banget!",
    color: "bg-green-50 text-green-700",
  },
];

