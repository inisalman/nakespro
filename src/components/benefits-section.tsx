"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Camera,
  FileText,
  ShieldCheck,
  Search,
  Check,
  MapPin,
  Star,
  Lock,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ColorKey = "teal" | "blue" | "violet" | "emerald";

type BenefitItem = {
  id: number;
  icon: React.ElementType;
  title: string;
  desc: string;
  key: ColorKey;
  number: string;
};

const COLORS: Record<ColorKey, { hex: string; rgb: string; label: string }> = {
  teal: { hex: "#3F72AF", rgb: "63, 114, 175", label: "text-[#3F72AF]" },
  blue: { hex: "#2563EB", rgb: "37, 99, 235", label: "text-[#2563EB]" },
  violet: { hex: "#7C3AED", rgb: "124, 58, 237", label: "text-[#7C3AED]" },
  emerald: { hex: "#059669", rgb: "5, 150, 105", label: "text-[#059669]" },
};

const benefitsData: BenefitItem[] = [
  {
    id: 0,
    icon: Globe,
    title: "Promosi 24/7 & Jangkauan Luas",
    desc: "Website Anda bekerja terus-menerus mengenalkan layanan homecare Anda di Google. Pasien lebih mudah menemukan Anda saat mencari jasa nakes terdekat.",
    key: "teal",
    number: "01",
  },
  {
    id: 1,
    icon: Camera,
    title: "Laporan Selesai Tindakan",
    desc: "Setiap kunjungan terdokumentasi rapi dengan foto sebelum & sesudah, plus deskripsi penjelasan tindakan yang bisa dibagikan ke pasien dan keluarga.",
    key: "blue",
    number: "02",
  },
  {
    id: 2,
    icon: FileText,
    title: "Manajemen Pasien & Invoice",
    desc: "Catat riwayat kunjungan pasien dan kirim tagihan digital otomatis secara rapi. Memudahkan pemantauan riwayat tindakan tanpa catatan kertas berantakan.",
    key: "violet",
    number: "03",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Kredibilitas Profesional Meningkat",
    desc: "Miliki profil terpercaya dengan domain khusus. Pasien dan keluarga merasa lebih aman dan yakin memilih layanan nakes yang memiliki website resmi.",
    key: "emerald",
    number: "04",
  },
];

/* ── Auto-Progress Bar ── */
function ProgressBar({ duration, isPaused, onComplete }: { duration: number; isPaused: boolean; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    startTime.current = Date.now();
    setProgress(0);
  }, [duration]);

  useEffect(() => {
    if (isPaused) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    let prevProgress = 0;

    function tick() {
      const elapsed = Date.now() - startTime.current;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      if (pct >= 1) {
        onComplete();
        return;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPaused, duration, onComplete]);

  return (
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-20 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: COLORS[benefitsData[0].key].hex }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.05, ease: "linear" }}
      />
    </div>
  );
}

/* ── Floating Particles ── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-black/5"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`square-${i}`}
          className="absolute w-2 h-2 rounded-sm opacity-[0.03]"
          style={{
            left: `${40 + i * 20}%`,
            top: `${60 + (i % 2) * 20}%`,
            backgroundColor: "#3F72AF",
            rotate: 45,
          }}
          animate={{
            y: [0, -8, 0],
            rotate: [45, 55, 45],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated Number Badge ── */
function AnimatedNumber({ number, color }: { number: string; color: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="text-[11px] font-mono font-semibold tracking-widest"
      style={{ color }}
    >
      {number}
    </motion.span>
  );
}

/* ── Benefit Card ── */
function BenefitCard({
  benefit,
  isActive,
  color,
  onClick,
  onHover,
  onLeave,
  index,
}: {
  benefit: BenefitItem;
  isActive: boolean;
  color: { hex: string; rgb: string };
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
  index: number;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative w-full text-left rounded-2xl transition-all duration-500 overflow-hidden",
        "border",
        isActive
          ? "bg-white shadow-lg ring-1"
          : "bg-white/40 border-transparent hover:bg-white hover:shadow-md"
      )}
      style={{
        borderColor: isActive ? `${color.hex}25` : undefined,
        boxShadow: isActive
          ? `0 8px 30px -4px rgba(${color.rgb}, 0.12), 0 1px 2px rgba(${color.rgb}, 0.06)`
          : undefined,
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Top accent bar — spring animation */}
      <motion.span
        layoutId={`accent-bar-${benefit.id}`}
        className="block h-[3px] w-full origin-left"
        style={{ backgroundColor: color.hex }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      />

      <div className="p-4">
        {/* Row: Number + Icon */}
        <div className="flex items-start justify-between mb-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={isActive ? `active-${benefit.id}` : `inactive-${benefit.id}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] font-mono font-semibold tracking-widest"
              style={{
                color: isActive ? color.hex : "rgba(0,0,0,0.15)",
              }}
            >
              {benefit.number}
            </motion.span>
          </AnimatePresence>

          <motion.div
            layout
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 shrink-0",
              isActive ? "shadow-md" : ""
            )}
            animate={{
              backgroundColor: isActive ? color.hex : `${color.hex}10`,
              color: isActive ? "#fff" : color.hex,
              boxShadow: isActive
                ? `0 4px 12px rgba(${color.rgb}, 0.30)`
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <benefit.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          layout
          className="font-semibold text-sm leading-snug mb-1"
          animate={{ color: isActive ? color.hex : undefined }}
          transition={{ duration: 0.3 }}
        >
          {benefit.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          layout
          className="text-xs leading-relaxed text-text-body"
          animate={{ opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {benefit.desc}
        </motion.p>

        {/* Active indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-1 mt-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: color.hex }}
            >
              <motion.span
                className="w-4 h-[1.5px] rounded-full bg-current"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              Demo
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

/* ════════════════════════════════════════════
   Main Section Component
   ════════════════════════════════════════════ */
export function BenefitsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cycleRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Biarkan auto-rotate berjalan via ProgressBar callback
  // Tapi fallback via interval untuk jaga-jaga
  useEffect(() => {
    if (isPaused) return;
    cycleRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefitsData.length);
    }, 6300); // sedikit lebih lama dari progress bar (6s)
    return () => clearInterval(cycleRef.current);
  }, [isPaused]);

  const active = benefitsData[activeIndex];
  const ac = COLORS[active.key];

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % benefitsData.length);
  }

  function handleCardClick(id: number) {
    setActiveIndex(id);
    setIsPaused(true);
  }

  function handleCardHover(id: number) {
    setActiveIndex(id);
    setIsPaused(true);
  }

  function handleCardLeave() {
    setIsPaused(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      {/* ── Left Column: Cards ── */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefitsData.map((b) => {
            const isActive = activeIndex === b.id;
            const c = COLORS[b.key];

            return (
              <BenefitCard
                key={b.id}
                benefit={b}
                isActive={isActive}
                color={c}
                onClick={() => handleCardClick(b.id)}
                onHover={() => handleCardHover(b.id)}
                onLeave={handleCardLeave}
                index={b.id}
              />
            );
          })}
        </div>
      </div>

      {/* ── Right Column: Animated Panel ── */}
      <div className="flex justify-center items-start">
        <motion.div
          className="relative w-full rounded-3xl overflow-hidden min-h-[420px] md:min-h-[460px] flex items-center justify-center"
          animate={{
            backgroundColor: `rgba(${ac.rgb}, 0.04)`,
            borderColor: `rgba(${ac.rgb}, 0.12)`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          {/* Progress Bar */}
          <ProgressBar
            key={activeIndex}
            duration={6000}
            isPaused={isPaused}
            onComplete={goNext}
          />

          {/* Ambient color blobs */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`blob1-${active.key}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none z-0"
              style={{ backgroundColor: `${ac.hex}18` }}
            />
            <motion.div
              key={`blob2-${active.key}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="absolute -bottom-20 -left-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none z-0"
              style={{ backgroundColor: `${ac.hex}10` }}
            />
          </AnimatePresence>

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
            style={{
              backgroundImage:
                "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Floating particles */}
          <FloatingParticles />

          {/* Animation content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                {activeIndex === 0 && <GoogleSearchAnimation />}
                {activeIndex === 1 && <TreatmentReportAnimation />}
                {activeIndex === 2 && <InvoiceAnimation />}
                {activeIndex === 3 && <CredibilityAnimation />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   1. Search Engine Result Animation
   ════════════════════════════════════════════ */
function GoogleSearchAnimation() {
  const [typed, setTyped] = useState("");
  const fullText = "nakes homecare terdekat";

  useEffect(() => {
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(t);
    }, 50);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-line shadow-lg overflow-hidden flex flex-col h-full">
      {/* Browser chrome */}
      <div className="bg-[#F1F3F4] border-b border-line px-4 py-2.5 flex items-center gap-2.5">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FE5F57] motion-safe:animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2AC840]" />
        </div>
        <div className="flex-1 bg-white border border-[#DADCE0] rounded-full py-1.5 px-4 flex items-center gap-2 text-xs shadow-sm">
          <Lock className="h-3 w-3 text-[#5F6368]" />
          <span className="text-[#202124] font-medium text-[11px] truncate">
            www.google.com
          </span>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-3 border border-[#DADCE0] rounded-full py-2.5 px-4 shadow-sm bg-white">
          <Search className="h-4 w-4 text-[#5F6368] shrink-0" />
          <span className="text-sm text-[#202124] font-medium tracking-wide">
            {typed}
          </span>
          <motion.span
            className="w-[2px] h-4 bg-[#3F72AF]"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Results area */}
      <div className="px-5 pb-5 space-y-3">
        {/* Featured snippet */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-[#3F72AF]/20 rounded-xl p-4 shadow-sm relative"
        >
          {/* Rank badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-[#3F72AF]/10 to-transparent text-[#3F72AF] text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl tracking-wide">
            #1
          </div>

          {/* Domain */}
          <div className="flex items-center gap-1.5">
            <motion.span
              className="w-1 h-1 rounded-full bg-[#059669]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] text-[#059669] font-medium">
              siti-homecare.nakespro.id
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-bold text-[#1A0DAB] mt-0.5 leading-snug">
            Siti Rahmawati, S.Kep — Homecare & Wound Care
          </h4>

          {/* Stars */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex text-[#FBBC04]">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, type: "spring", stiffness: 300 }}
                >
                  <Star className="h-3 w-3 fill-current" />
                </motion.div>
              ))}
            </div>
            <span className="text-[10px] text-[#5F6368]">48 ulasan</span>
          </div>

          {/* Description */}
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#3C4043]">
            Melayani perawatan luka diabetes, laktasi, dan home visit 24 jam
            di Jakarta Selatan. STR Aktif, pelayanan profesional dan ramah.
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 mt-2 text-[10px] text-[#5F6368]">
            <MapPin className="h-3 w-3" />
            <span>Jakarta Selatan • Buka 24 jam</span>
          </div>
        </motion.div>

        {/* Ghost result */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
          className="opacity-40"
        >
          <div className="h-2 w-28 rounded-full bg-[#DADCE0]" />
          <div className="h-3 w-44 rounded-full bg-[#1A0DAB]/30 mt-1.5" />
          <div className="h-2 w-full rounded-full bg-[#DADCE0]/60 mt-1.5" />
        </motion.div>

        {/* Map card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 border border-line rounded-xl p-3 bg-[#FAFAFA]"
        >
          <motion.div
            className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#34A853] to-[#1E8E3E] flex items-center justify-center text-white shrink-0"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ delay: 2.2, duration: 0.6, ease: "easeInOut" }}
          >
            <MapPin className="h-4 w-4" />
          </motion.div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-ink">
              Nakes Terdekat Ditemukan
            </p>
            <p className="text-[10px] text-text-muted truncate mt-0.5">
              3 praktik homecare dalam radius 5 km
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   2. Treatment Report Animation
   ════════════════════════════════════════════ */
function TreatmentReportAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3200);
    const t3 = setTimeout(() => setStep(3), 5100);
    const t4 = setTimeout(() => setStep(0), 7000);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-line shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-line px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <motion.div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#2563EB" }}
            animate={{ boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 8px rgba(37,99,235,0.4)", "0 0 0px rgba(37,99,235,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h4 className="text-xs font-bold text-ink">Laporan Tindakan</h4>
        </div>
        <span className="text-[10px] font-mono font-semibold text-text-muted bg-paper px-2 py-0.5 rounded-lg">
          #TR-2741
        </span>
      </div>

      {/* Patient info strip */}
      <div className="px-5 py-3 bg-paper/60 border-b border-line">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Pasien</p>
            <p className="text-xs font-bold text-ink mt-0.5">Budi Santoso</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Tindakan</p>
            <p className="text-xs font-bold text-ink mt-0.5 leading-snug">Perawatan Luka Diabetes</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Before / After Photos */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Camera className="h-3.5 w-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Dokumentasi Foto</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {/* Before photo */}
            <div className="relative">
              <div
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border transition-all duration-500",
                  step >= 1 ? "border-[#2563EB]/30 shadow-sm" : "border-line"
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at 35% 40%, #C7636330 0%, #E8A0A030 40%, #F4D5D540 70%, #F8E8E8 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: step >= 1 ? 1 : 0, opacity: step >= 1 ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="h-7 w-7 rounded-full bg-[#DC2626]/40 border-2 border-[#DC2626]/60 shadow-inner"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-ink/70 text-white text-[8px] font-bold px-2 py-0.5 rounded-br-lg tracking-wide">SEBELUM</div>
                <div className="absolute bottom-1 right-1 bg-black/40 text-white/80 p-1 rounded-md backdrop-blur-sm">
                  <ImageIcon className="h-3 w-3" />
                </div>
              </div>
            </div>

            {/* After photo */}
            <div className="relative">
              <div
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border transition-all duration-500",
                  step >= 2 ? "border-[#059669]/30 shadow-sm" : "border-line"
                )}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at 35% 40%, #F4C8C840 0%, #FCE0E060 40%, #F8EFEF 100%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="h-4 w-4 rounded-full bg-[#10B981]/30 border-2 border-[#059669]/60"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-[#059669]/90 text-white text-[8px] font-bold px-2 py-0.5 rounded-br-lg tracking-wide">SESUDAH</div>
                <div className="absolute bottom-1 right-1 bg-black/40 text-white/80 p-1 rounded-md backdrop-blur-sm">
                  <ImageIcon className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Deskripsi Tindakan</span>
          </div>
          <div className="bg-paper/50 border border-line rounded-xl p-3.5 min-h-[78px]">
            <AnimatePresence mode="wait">
              {step < 2 ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1.5"
                >
                  <div className="h-2 w-full rounded-full bg-line" />
                  <div className="h-2 w-5/6 rounded-full bg-line" />
                  <div className="h-2 w-2/3 rounded-full bg-line/70" />
                </motion.div>
              ) : (
                <motion.p
                  key="description"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-[11px] leading-relaxed text-text-body"
                >
                  Luka dibersihkan dengan NaCl 0.9%, dilakukan debridement
                  jaringan nekrotik tipis, lalu diaplikasikan hydrocolloid
                  dressing. Pasien toleran, edukasi gula darah terkendali.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Status + Send */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: step < 2 ? "#F59E0B" : step === 2 ? "#2563EB" : "#10B981",
                scale: step === 2 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              {step < 2 && "Menyusun Laporan"}
              {step === 2 && "Siap Kirim"}
              {step >= 3 && "Terkirim"}
            </span>
          </div>

          <motion.div
            layout
            className={cn(
              "py-2 px-5 rounded-full text-[10px] font-bold text-white transition-all duration-500 flex items-center gap-1.5 shadow-sm",
              step < 2 && "bg-[#2563EB]/40 cursor-not-allowed",
              step === 2 && "bg-[#2563EB]",
              step >= 3 && "bg-emerald-500"
            )}
            animate={{ scale: step === 2 ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 1.5, repeat: step === 2 ? Infinity : 0 }}
          >
            {step < 2 && (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Menyusun
              </>
            )}
            {step === 2 && (
              <>
                <Send className="h-3 w-3" strokeWidth={3} />
                Kirim ke Pasien
              </>
            )}
            {step >= 3 && (
              <>
                <Check className="h-3 w-3" strokeWidth={3} />
                Terkirim (WA)
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   3. Invoice Management Animation
   ════════════════════════════════════════════ */
function InvoiceAnimation() {
  const [status, setStatus] = useState<"draft" | "loading" | "sent">("draft");

  useEffect(() => {
    const t1 = setTimeout(() => setStatus("loading"), 1800);
    const t2 = setTimeout(() => setStatus("sent"), 3200);
    const t3 = setTimeout(() => setStatus("draft"), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (status !== "draft") return;
    const t1 = setTimeout(() => setStatus("loading"), 1800);
    const t2 = setTimeout(() => setStatus("sent"), 3200);
    const t3 = setTimeout(() => setStatus("draft"), 6500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [status]);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-line shadow-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-line px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <motion.div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "#7C3AED" }}
            animate={{ boxShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 8px rgba(124,58,237,0.4)", "0 0 0px rgba(124,58,237,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h4 className="text-xs font-bold text-ink">Detail Layanan</h4>
        </div>
        <span className="text-[10px] font-mono font-semibold text-text-muted bg-paper px-2 py-0.5 rounded-lg">INV-9928</span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Patient info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-paper rounded-xl p-3">
            <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">Pasien</span>
            <p className="text-xs font-bold text-ink mt-0.5">Budi Santoso</p>
          </div>
          <div className="bg-paper rounded-xl p-3">
            <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">Tindakan</span>
            <p className="text-xs font-bold text-ink mt-0.5 leading-snug">Perawatan Luka Diabetes</p>
          </div>
        </div>

        {/* Invoice table */}
        <div className="border border-line rounded-xl overflow-hidden">
          <div className="bg-paper px-4 py-2.5 grid grid-cols-12 border-b border-line">
            <span className="col-span-8 text-[9px] font-bold text-text-muted uppercase tracking-wide">Deskripsi</span>
            <span className="col-span-4 text-[9px] font-bold text-text-muted uppercase tracking-wide text-right">Biaya</span>
          </div>
          <div className="divide-y divide-line/60">
            <div className="px-4 py-2.5 grid grid-cols-12 bg-white">
              <span className="col-span-8 text-[11px] text-text-body">Jasa Homecare Luka</span>
              <span className="col-span-4 text-[11px] font-medium text-ink text-right">Rp200.000</span>
            </div>
            <div className="px-4 py-2.5 grid grid-cols-12 bg-white">
              <span className="col-span-8 text-[11px] text-text-body">Bahan Medis Habis Pakai</span>
              <span className="col-span-4 text-[11px] font-medium text-ink text-right">Rp50.000</span>
            </div>
          </div>
          <motion.div
            className="px-4 py-3 grid grid-cols-12 border-t border-line"
            animate={{
              background: status === "sent"
                ? "linear-gradient(to right, rgba(5, 150, 105, 0.08), transparent)"
                : "linear-gradient(to right, rgba(124, 58, 237, 0.05), transparent)",
            }}
          >
            <span className="col-span-8 text-[11px] font-bold" style={{ color: status === "sent" ? "#059669" : "#7C3AED" }}>
              Total Tagihan
            </span>
            <span className="col-span-4 text-[11px] font-bold text-right" style={{ color: status === "sent" ? "#059669" : "#7C3AED" }}>
              Rp250.000
            </span>
          </motion.div>
        </div>

        {/* Status + action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: status === "draft" ? "#F59E0B" : status === "loading" ? "#7C3AED" : "#10B981",
                scale: status === "loading" ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              {status === "draft" && "Draft"}
              {status === "loading" && "Mengirim..."}
              {status === "sent" && "Terkirim"}
            </span>
          </div>

          <motion.div
            className={cn(
              "py-2 px-5 rounded-full text-[10px] font-bold text-white transition-all duration-500 flex items-center gap-1.5 shadow-sm",
              status === "draft" && "bg-[#7C3AED] cursor-pointer",
              status === "loading" && "bg-[#7C3AED]/60",
              status === "sent" && "bg-emerald-500"
            )}
            animate={{ scale: status === "draft" ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 2, repeat: status === "draft" ? Infinity : 0 }}
          >
            {status === "draft" && "Kirim Invoice"}
            {status === "loading" && (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Mengirim
              </>
            )}
            {status === "sent" && (
              <>
                <Check className="h-3 w-3" strokeWidth={3} />
                Terkirim
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   4. Credibility & Trust Animation
   ════════════════════════════════════════════ */
function CredibilityAnimation() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-line shadow-lg overflow-hidden flex flex-col h-full">
      {/* Browser URL bar */}
      <div className="bg-[#F1F3F4] border-b border-line px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FE5F57] motion-safe:animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2AC840]" />
        </div>
        <div className="flex-1 bg-white border border-[#DADCE0] rounded-lg py-1.5 px-3 flex items-center gap-2 text-xs shadow-sm">
          <Lock className="h-3 w-3 text-[#059669]" />
          <span className="text-[11px] font-medium text-[#059669]">siti-homecare.nakespro.id</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col items-center text-center">
        {/* Animated shield */}
        <div className="relative mb-4">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="h-14 w-14 rounded-full bg-gradient-to-br from-[#059669]/10 to-[#059669]/5 flex items-center justify-center"
          >
            <ShieldCheck className="h-8 w-8 text-[#059669]" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="absolute -bottom-0.5 -right-0.5 bg-[#059669] text-white p-1 rounded-full shadow-md border-[2px] border-white"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </motion.div>
        </div>

        <h4 className="text-sm font-bold text-ink">Profil Terpercaya & Terverifikasi</h4>
        <p className="text-xs text-text-body mt-2 leading-relaxed max-w-[260px]">
          Website dengan domain kustom resmi meningkatkan kepercayaan pasien baru dan menunjukkan profesionalitas praktik Anda.
        </p>

        {/* Trust seals */}
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          {[
            { label: "SIP Terdaftar", color: "bg-[#059669]/10 text-[#059669]", delay: 0.3 },
            { label: "STR Aktif", color: "bg-[#2563EB]/10 text-[#2563EB]", delay: 0.5 },
            { label: "Domain Resmi", color: "bg-[#7C3AED]/10 text-[#7C3AED]", delay: 0.7 },
            { label: "SSL Aman", color: "bg-[#3F72AF]/10 text-[#3F72AF]", delay: 0.9 },
          ].map((t) => (
            <motion.span
              key={t.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: t.delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-transparent shadow-sm",
                t.color
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
              {t.label}
            </motion.span>
          ))}
        </div>

        {/* Verified ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 w-full bg-gradient-to-r from-[#059669]/5 via-[#059669]/10 to-[#059669]/5 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 border border-[#059669]/10"
        >
          <BadgeCheck className="h-4 w-4 text-[#059669]" />
          <span className="text-[10px] font-semibold text-[#059669]">
            Terverifikasi — Identitas & Izin Praktik Aktif
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Small helper: BadgeCheck icon ── */
function BadgeCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
