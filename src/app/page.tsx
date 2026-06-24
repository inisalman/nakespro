import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { OrderForm } from "@/components/order-form";
import { Logo } from "@/components/logo";
import { PricingSection } from "@/components/pricing-section";
import { TypingWords } from "@/components/typing-words";
import {
  services,
  steps,
  portfolio,
  WHATSAPP_NUMBER,
} from "@/lib/content";

export default function Home() {
  const waLink = `{{https://wa.me/${WHATSAPP_NUMBER}}}?text=${encodeURIComponent(
    "Halo NakesPro.id, saya ingin tanya soal website untuk nakes."
  )}`;

  return (
    <main className="grain relative">
      {/* ──────── Nav ──────── */}
      <nav className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Logo height={96} priority />

          {/* Nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {[
              { href: "#layanan", label: "Layanan" },
              { href: "#cara-kerja", label: "Cara Kerja" },
              { href: "#harga", label: "Harga" },
              { href: "#portofolio", label: "Portofolio" },
              { href: "#faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-text-body transition-colors hover:bg-paper hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Button href="#order" variant="primary" size="sm" className="ml-4">
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </nav>

      {/* ──────── Hero ──────── */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center">
            {/* ── Copy: center ── */}
            <div className="text-center">
              {/* Eyebrow badge */}
              <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-tint px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-strong">
                <Sparkles className="h-3.5 w-3.5" />
                Untuk Nakes yang Sibuk Melayani, Bukan Mikir Teknis
              </div>

              {/* Headline */}
              <h1 className="fade-up text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-6xl">
                Website untuk{" "}
                <TypingWords
                  words={[
                    "Nakes",
                    "Homecare",
                    "Bidan",
                    "Perawat Sunat",
                    "Fisioterapi",
                  ]}
                />
                <br className="hidden sm:block" />
                mulai dari{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-teal">25 Ribu</span>
                  <span className="absolute -bottom-1 left-0 right-0 z-0 h-2 rounded-full bg-teal/15" />
                </span>{" "}
                per Bulan
              </h1>

              {/* Subheadline */}
              <p
                className="fade-up mx-auto mt-4 max-w-xl text-lg font-medium text-ink md:text-xl"
                style={{ animationDelay: "0.1s" }} >
                Tanpa Bayar Domain, Tanpa Bayar Server
              </p>

              {/* Subtitle */}
              <p
                className="fade-up mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-body md:text-lg"
                style={{ animationDelay: "0.15s" }} >
                Kami handle semua teknis. Anda tinggal upload foto, atur jam praktik, terima pasien baru. Website live dalam hitungan hari.
              </p>

              {/* CTAs */}
              <div
                className="fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ animationDelay: "0.3s" }} >
                <Button href="#harga" variant="secondary" size="lg">
                  Lihat Paket
                </Button>
              </div>

              {/* Trust indicator */}
              <p
                className="fade-up mt-8 text-xs text-text-muted"
                style={{ animationDelay: "0.45s" }} >
                Banyak nakes sudah pakai. Rating 4.8/5 dari pengguna.
              </p>
            </div>

          </div>
        </div>

        {/* Subtle radial gradient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal/4 blur-3xl" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-teal/3 blur-3xl" />
        </div>
      </section>

      {/* ──────── Dotted Divider ──────── */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="dotted-divider w-full" />
      </div>

      {/* ──────── Layanan ──────── */}
      <Section id="layanan" bg="white">
        <SectionHeading
          eyebrow="Untuk Siapa?"
          title="Website siap untuk berbagai praktik kesehatan"
          titleAccent="praktik kesehatan"
          subtitle="Apapun bidang Anda, template kami sudah siap. Tinggal isi data, foto, dan jadwal. Selesai."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-line bg-white p-6 transition-all hover:border-teal/20 hover:shadow-card"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-tint transition-all group-hover:bg-teal/10">
                <s.icon className="h-5.5 w-5.5 text-teal-strong" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-ink">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-body">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──────── Cara Kerja ──────── */}
      <Section id="cara-kerja" bg="paper">
        <SectionHeading
          eyebrow="Dari Daftar hingga Live"
          title="Hanya 4 langkah, selesai dalam 1-3 hari"
          titleAccent="1-3 hari"
          subtitle="Daftar hari ini, website live minggu ini. Kami yang urus teknisnya."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-2xl border border-line bg-white p-6"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-sm font-bold text-white">
                {step.num}
              </span>
              <h3 className="mb-1.5 text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-body">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──────── Harga ──────── */}
      <Section id="harga" bg="white">
        <SectionHeading
          eyebrow="Paket Harga"
          title="Pilih paket yang sesuai dengan budget"
          titleAccent="sesuai dengan budget"
          subtitle="Mulai Rp25.000/bulan — domain, hosting, dan support sudah included. Pilih tagihan tahunan untuk hemat lebih banyak."
        />
        <PricingSection />
      </Section>

      {/* ──────── Portofolio / Template Preview ──────── */}
      <Section id="portofolio" bg="paper">
        <SectionHeading
          eyebrow="Template"
          title="Pilihan template siap pakai"
          titleAccent="siap pakai"
          subtitle="Klik untuk melihat demo langsung. Semua template responsif dan bisa disesuaikan."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-line bg-white transition-all hover:border-teal/30 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <iframe
                  src={item.url}
                  title={`Pratinjau ${item.name}`}
                  className="absolute inset-0 w-full h-full pointer-events-none border-0"
                  sandbox="allow-scripts allow-same-origin"
                  style={{ transform: "scale(0.35)", transformOrigin: "top left", width: "285%", height: "285%" }}
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-strong">
                  {item.category}
                </p>
                <h3 className="mt-1 font-semibold text-ink">{item.name}</h3>
                <p className="mt-0.5 text-xs text-text-muted">{item.character}</p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* ──────── FAQ ──────── */}
      <Section id="faq" bg="white">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          titleAccent="sering diajukan"
        />
        <FaqList />
      </Section>

      {/* ──────── Order / CTA ──────── */}
      <Section id="order" bg="white">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 md:p-14">
          {/* Subtle grain overlay for depth */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}/>
          </div>

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-text-on-dark/70">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                Mulai Sekarang
              </p>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-text-on-dark md:text-4xl">
                Sudah siap? <br />
                <span className="text-teal">Daftar dalam 2 menit</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-on-dark/60">
                Isi form di samping atau langsung chat WhatsApp kami. Bayar dan
                website Anda bisa langsung jadi dalam 1-3 hari.
              </p>
              <div className="mt-8">
                <Button href={waLink} variant="secondary" size="lg">
                  <MessageCircle className="h-5 w-5" />
                  Chat WhatsApp Sekarang
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white p-6 md:p-8">
              <OrderForm />
            </div>
          </div>
        </div>
      </Section>

      {/* ──────── Footer ──────── */}
      <footer className="border-t border-line bg-white px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <Logo height={84} />
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} NakesPro.id — Jasa pembuatan
            website tenaga kesehatan.
          </p>
        </div>
      </footer>
    </main>
  );
}
