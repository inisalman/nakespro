import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, Mail, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { OrderForm } from "@/components/order-form";
import { Logo } from "@/components/logo";
import { PricingSection } from "@/components/pricing-section";
import { TypingWords } from "@/components/typing-words";
import { TemplateMockup } from "@/components/template-mockup";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { TestimonialSection } from "@/components/testimonial-section";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { MobileNav } from "@/components/mobile-nav";
import { StickyCTABar } from "@/components/sticky-cta-bar";
import { HeroCounters } from "@/components/hero-counters";
import { BenefitsSection } from "@/components/benefits-section";
import {
  services,
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
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Logo height={48} priority />

          {/* Nav links — centered */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {[
              { href: "#layanan", label: "Layanan" },
              { href: "#keuntungan", label: "Keuntungan" },
              { href: "#harga", label: "Harga" },
              { href: "#portofolio", label: "Portofolio" },
              { href: "#faq", label: "FAQ" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-text-body transition-colors hover:bg-paper hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Masuk + Mulai Sekarang — kanan (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://app.nakespro.id/auth/login"
              className="rounded-full border border-line px-4 py-2 text-sm font-medium text-text-body transition-colors hover:bg-paper hover:text-ink"
            >
              Masuk
            </a>
            <Button href="#harga" variant="secondary" size="sm">
              Mulai Sekarang
            </Button>
          </div>

          {/* Mobile hamburger */}
          <MobileNav />
        </div>
      </nav>

      {/* ──────── Hero ──────── */}
      <section className="relative overflow-hidden px-6 pt-16 pb-16 md:pt-24 md:pb-20 lg:pb-24">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal/4 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-teal/3 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
            <div className="pointer-events-none h-[600px] w-[800px] rounded-[100%] bg-gradient-to-b from-teal/[0.015] to-transparent blur-3xl" />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* ── Text content: center ── */}
          <div className="mx-auto max-w-3xl text-center">
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

            {/* Description */}
            <p
              className="fade-up mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-body md:text-lg"
              style={{ animationDelay: "0.15s" }} >
              Tanpa Bayar Domain, Tanpa Bayar Server. Kami handle semua teknis. Anda tinggal
              upload foto, atur jam praktik, terima pasien baru. Website live dalam hitungan hari.
            </p>

            {/* Dual CTAs */}
            <div
              className="fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "0.3s" }} >
              <Button href="#harga" variant="secondary" size="lg">
                Lihat Paket & Harga
              </Button>
              <Button href={waLink} variant="outline" size="lg">
                <MessageCircle className="h-5 w-5" />
                Konsultasi Gratis
              </Button>
            </div>

            {/* Animated counters */}
            <HeroCounters />
          </div>

          {/* ── Visual mockup below ── */}
          <div
            className="fade-up -mx-2 mt-14 md:mt-18"
            style={{ animationDelay: "0.6s" }} >
            <div className="relative">
              {/* Subtle shadow behind mockup */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-b from-teal/[0.03] via-teal/[0.01] to-transparent blur-2xl" />
              <TemplateMockup />
            </div>
          </div>
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

      {/* ──────── Keuntungan memiliki Website ──────── */}
      <Section id="keuntungan" bg="paper">
        <BenefitsSection
          header={
            <SectionHeading
              eyebrow="Keuntungan"
              title="Mengapa Nakes Homecare butuh website sendiri?"
              titleAccent="butuh website sendiri?"
              subtitle="Mudahkan promosi layanan Anda ke pasien baru dan optimalkan manajemen jadwal praktik secara terpusat."
              className="mb-2 lg:mb-6"
            />
          }
        />
      </Section>

      {/* ──────── Testimoni ──────── */}
      <Section id="testimoni" bg="white">
        <TestimonialSection />
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
          subtitle="Klik untuk melihat demo langsung. Semua template responsif dan bisa disesuaikan dengan kebutuhan praktik Anda."
        />
        <PortfolioShowcase />
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
              }} />
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
      <footer className="relative overflow-hidden border-t border-line bg-gradient-to-b from-white to-paper/60 px-6 pb-28 pt-16 md:pb-20 md:pt-20">
        {/* Ambient background decoration */}
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal/[0.03] blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-teal/[0.015] blur-3xl" />

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Logo height={42} />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-body">
                Platform pembuatan website profesional, cepat, dan handal khusus untuk tenaga kesehatan di seluruh Indonesia.
              </p>
              {/* Social links */}
              <div className="mt-6 flex gap-3">
                <a
                  href="https://instagram.com/nakespro.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-text-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-teal-tint hover:text-teal hover:shadow-md"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-text-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-teal-tint hover:text-teal hover:shadow-md"
                >
                  <MessageCircle className="h-4.5 w-4.5" strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Col 2: Navigasi */}
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-wider text-ink">Navigasi</p>
              <ul className="space-y-3">
                {[
                  { href: "#layanan", label: "Layanan" },
                  { href: "#keuntungan", label: "Keuntungan" },
                  { href: "#harga", label: "Harga" },
                  { href: "#portofolio", label: "Portofolio" },
                  { href: "#testimoni", label: "Testimoni" },
                  { href: "#faq", label: "FAQ" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group flex items-center gap-1.5 text-sm text-text-body transition-colors duration-200 hover:text-teal"
                    >
                      <span className="h-1 w-1 rounded-full bg-teal opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Paket */}
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-wider text-ink">Paket</p>
              <ul className="space-y-3">
                {[
                  { href: "https://app.nakespro.id/register?package=starter", label: "Paket Starter" },
                  { href: "https://app.nakespro.id/register?package=advance", label: "Paket Advance" },
                  { href: waLink, label: "Paket Professional" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 text-sm text-text-body transition-colors duration-200 hover:text-teal"
                    >
                      <span className="h-1 w-1 rounded-full bg-teal opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      <span className="transition-transform duration-200 group-hover:translate-x-1">{l.label}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Kontak */}
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-wider text-ink">Kontak</p>
              <ul className="space-y-4">
                <li>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-sm text-text-body transition-colors duration-200 hover:text-teal"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-text-muted transition-colors group-hover:border-teal/30 group-hover:bg-teal-tint group-hover:text-teal">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text-muted uppercase tracking-wide">WhatsApp</span>
                      <span className="text-sm font-medium text-ink group-hover:text-teal transition-colors">+62 856-846-1024</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:halo@nakespro.id"
                    className="group flex items-start gap-3 text-sm text-text-body transition-colors duration-200 hover:text-teal"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-text-muted transition-colors group-hover:border-teal/30 group-hover:bg-teal-tint group-hover:text-teal">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-text-muted uppercase tracking-wide">Email</span>
                      <span className="text-sm font-medium text-ink group-hover:text-teal transition-colors">halo@nakespro.id</span>
                    </div>
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <Button href="#harga" variant="secondary" size="sm" className="w-full sm:w-auto shadow-sm shadow-teal/10 hover:shadow-md hover:shadow-teal/20 transition-all duration-200">
                  Mulai Sekarang
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <p className="text-xs text-text-muted">
                &copy; {new Date().getFullYear()} NakesPro.id — All rights reserved.
              </p>
              <p className="text-[10px] text-text-muted/60 flex items-center gap-1">
                Dibuat dengan <span className="text-rose-500 animate-pulse">❤️</span> untuk pahlawan kesehatan Indonesia.
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/kebijakan-privasi" className="text-xs text-text-muted transition-colors hover:text-teal font-medium">Kebijakan Privasi</Link>
              <Link href="/syarat-ketentuan" className="text-xs text-text-muted transition-colors hover:text-teal font-medium">Syarat &amp; Ketentuan</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ──────── Fixed / Floating UI ──────── */}
      <WhatsappFab />
      <StickyCTABar />
    </main>
  );
}
