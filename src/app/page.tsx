import Link from "next/link";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { Button } from "@/components/button";
import { FaqList } from "@/components/faq-list";
import { OrderForm } from "@/components/order-form";
import {
  services,
  steps,
  plans,
  portfolio,
  WHATSAPP_NUMBER,
} from "@/lib/content";

export default function Home() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo NakesPro.id, saya ingin konsultasi pembuatan website."
  )}`;

  return (
    <main>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-cream/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-text-heading">
            Nakes<span className="text-teal">Pro</span>.id
          </span>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#layanan"
              className="text-sm font-medium text-text-body hover:text-teal"
            >
              Layanan
            </Link>
            <Link
              href="#cara-kerja"
              className="text-sm font-medium text-text-body hover:text-teal"
            >
              Cara Kerja
            </Link>
            <Link
              href="#harga"
              className="text-sm font-medium text-text-body hover:text-teal"
            >
              Harga
            </Link>
            <Link
              href="#portofolio"
              className="text-sm font-medium text-text-body hover:text-teal"
            >
              Portofolio
            </Link>
            <Button
              href="#order"
              variant="primary"
              size="sm"
            >
              Mulai Sekarang
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-1.5 rounded-pill bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Untuk Tenaga Kesehatan Mandiri
            </p>
            <h1 className="text-4xl font-bold leading-tight text-text-heading md:text-6xl">
              Website Profesional untuk{" "}
              <span className="italic font-semibold text-teal">
                Praktik Kesehatan
              </span>{" "}
              Anda
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-body md:text-xl">
              Tingkatkan kepercayaan pasien dan jangkau lebih banyak orang
              dengan website yang dirancang khusus untuk perawat, bidan,
              fisioterapis, dan praktisi kesehatan mandiri.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={waLink} variant="primary" size="lg">
                <MessageCircle className="h-5 w-5" />
                Konsultasi Gratis
              </Button>
              <Button href="#harga" variant="outline" size="lg">
                Lihat Paket
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* Blob decor */}
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-teal/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-bg-tint blur-3xl" />
      </section>

      {/* Layanan */}
      <Section id="layanan" bg="white">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Dibuat untuk berbagai praktik kesehatan"
          titleAccent="praktik kesehatan"
          subtitle="Apapun bidang Anda, kami bantu hadirkan kehadiran digital yang profesional dan terpercaya."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:border-teal/20 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10">
                <s.icon className="h-6 w-6 text-teal" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text-heading">
                {s.title}
              </h3>
              <p className="text-text-body">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cara Kerja */}
      <Section id="cara-kerja" bg="soft">
        <SectionHeading
          eyebrow="Proses"
          title="Empat langkah menuju website Anda"
          titleAccent="empat langkah"
          subtitle="Proses sederhana dan transparan, dari konsultasi hingga website online."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 text-4xl font-bold text-teal/20">
                {step.num}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text-heading">
                {step.title}
              </h3>
              <p className="text-sm text-text-body">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Harga */}
      <Section id="harga" bg="white">
        <SectionHeading
          eyebrow="Paket Harga"
          title="Pilih paket yang sesuai dengan kebutuhan"
          titleAccent="paket"
          subtitle="Mulai dari yang hemat dan otomatis, hingga website custom yang sepenuhnya sesuai kebutuhan Anda."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const isHighlighted = plan.highlight;
            return (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-2xl p-8 ${
                  isHighlighted
                    ? "border-2 border-teal bg-teal/5 shadow-lg"
                    : "border border-slate-100 bg-white shadow-sm"
                }`}
              >
                {plan.note && (
                  <span
                    className={`absolute left-8 top-0 -translate-y-1/2 rounded-pill px-3 py-1 text-xs font-semibold shadow-sm ${
                      isHighlighted
                        ? "bg-teal text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {plan.note}
                  </span>
                )}
                <h3 className="text-2xl font-bold text-text-heading">
                  {plan.name}
                </h3>
                <p className="mt-1 text-text-body">{plan.tagline}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-heading">
                    {plan.price}
                  </span>
                  <span className="text-text-muted">{plan.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal" />
                      <span className="text-text-body">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href={isHighlighted ? waLink : "#order"}
                    variant={isHighlighted ? "secondary" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Portofolio */}
      <Section id="portofolio" bg="soft">
        <SectionHeading
          eyebrow="Portofolio"
          title="Beberapa karya kami"
          titleAccent="karya kami"
          subtitle="Contoh website yang kami buat untuk para tenaga kesehatan."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${item.color} flex items-center justify-center`}
              >
                <span className="text-sm font-medium text-text-muted">
                  Pratinjau
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                  {item.category}
                </p>
                <h3 className="mt-1 font-semibold text-text-heading">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          * Portofolio contoh. Akan diperbarui dengan proyek nyata.
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" bg="white">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          titleAccent="sering diajukan"
        />
        <FaqList />
      </Section>

      {/* Order / Kontak */}
      <Section id="order" bg="dark">
        <div className="rounded-2xl bg-cta-dark p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-text-on-dark md:text-4xl">
                Siap punya website sendiri?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-text-on-dark/70">
                Isi form di samping atau langsung chat WhatsApp kami. Konsultasi
                pertama gratis, tanpa komitmen.
              </p>
              <div className="mt-8">
                <Button href={waLink} variant="secondary" size="lg">
                  <MessageCircle className="h-5 w-5" />
                  Chat WhatsApp Sekarang
                </Button>
              </div>
            </div>
            <div className="rounded-2xl bg-cream p-6 md:p-8">
              <OrderForm />
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-lg font-bold text-text-heading">
            Nakes<span className="text-teal">Pro</span>.id
          </span>
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} NakesPro.id — Jasa pembuatan website
            tenaga kesehatan.
          </p>
        </div>
      </footer>
    </main>
  );
}
