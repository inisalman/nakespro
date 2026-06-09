"use client";

import { motion } from "motion/react";
import { Star, Phone, Clock, MapPin, Calendar, MessageCircle, Zap, Users, TrendingUp } from "lucide-react";

export function HeroMockup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* ── Background gradient accent ── */}
      <div className="absolute -inset-12 -z-10 rounded-3xl bg-gradient-to-br from-teal/5 to-transparent blur-2xl" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* ── HOMECARE CARD ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-hero"
        >
          {/* Animated gradient overlay on hover */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal/0 to-teal/0 transition-all group-hover:from-teal/3 group-hover:to-teal/1" />

          {/* Header with floating animation */}
          <motion.div
            className="relative bg-gradient-to-br from-teal/95 to-teal-strong px-6 py-6 text-white"
            variants={floatVariants}
            animate="animate"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-lg font-bold backdrop-blur-sm">
                  🏥
                </div>
                <h3 className="text-lg font-bold leading-tight">HomeCare Harapan Bunda</h3>
                <p className="mt-1 text-sm text-white/90">Perawat Visita Profesional</p>
              </div>
              <motion.div
                className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(34, 197, 94, 0)",
                    "0 0 12px rgba(34, 197, 94, 0.3)",
                    "0 0 0 rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-green-300" />
                  Buka Sekarang
                </div>
              </motion.div>
            </div>

            {/* Stats grid */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { value: "450+", label: "Pasien", icon: Users },
                { value: "12+", label: "Layanan", icon: Zap },
                { value: "4.8⭐", label: "Rating", icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <motion.div
                  key={label}
                  className="rounded-lg bg-white/15 p-2.5 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="mx-auto mb-1 h-3.5 w-3.5 text-white/80" />
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-xs text-white/80">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <div className="p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Layanan Unggulan</p>

            {/* Services with stagger */}
            <motion.div
              className="grid grid-cols-2 gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { emoji: "💉", name: "Injeksi" },
                { emoji: "🩹", name: "Luka Diabetes" },
                { emoji: "🧬", name: "Infus Terapi" },
                { emoji: "🩺", name: "Cek Vital" },
              ].map((svc) => (
                <motion.div
                  key={svc.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 rounded-lg border border-line bg-paper p-2.5 transition-colors hover:bg-teal-tint"
                >
                  <span className="text-xl">{svc.emoji}</span>
                  <span className="text-xs font-medium text-text-body">{svc.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              className="mt-4 rounded-lg border border-teal/20 bg-teal-tint p-3"
              variants={itemVariants}
            >
              <div className="flex gap-2">
                <span className="text-xl">👤</span>
                <div>
                  <div className="mb-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs leading-snug text-text-body">
                    "Pelayanan cepat, profesional, dan ramah. Sangat merekomendasikan!"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div className="mt-4 flex gap-2" variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal py-2.5 text-xs font-semibold text-white transition-shadow hover:shadow-md"
              >
                <Phone className="h-4 w-4" />
                Hubungi
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-teal/30 bg-teal-tint py-2.5 text-xs font-medium text-teal-strong transition-colors hover:bg-teal/10"
              >
                <Calendar className="h-4 w-4" />
                Booking
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── NAKES CARD ── */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-hero"
        >
          {/* Animated gradient overlay on hover */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal/0 to-teal/0 transition-all group-hover:from-teal/3 group-hover:to-teal/1" />

          {/* Header */}
          <motion.div
            className="border-b border-line px-6 py-5"
            variants={floatVariants}
            animate="animate"
          >
            <div className="flex items-start gap-3">
              <motion.div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-teal-tint text-3xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                👩‍⚕️
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-ink">dr. Atiqah Rachmawati, S.Kep</h3>
                <p className="text-xs text-text-muted">Perawat Mandiri · STR: 12345</p>
                <motion.div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div key={i} whileHover={{ scale: 1.2 }}>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                  <span className="text-xs font-medium text-amber-600">5.0</span>
                  <span className="text-xs text-text-muted">(256)</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Info chips */}
          <div className="border-b border-line px-6 py-4">
            <motion.div
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: Clock, text: "Senin - Sabtu, 09:00 - 20:00" },
                { icon: MapPin, text: "Jl. Gatot Subroto No. 17, Jakarta" },
                { icon: Phone, text: "0812-3456-7890" },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-xs text-text-body transition-colors hover:text-teal-strong"
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0 text-teal" />
                  {text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Services list */}
          <div className="px-6 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Layanan & Tarif</p>
            <motion.div
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { name: "Konsultasi", price: "Rp 50.000", time: "30 min" },
                { name: "Injeksi IV/IM", price: "Rp 100.000", time: "15 min" },
                { name: "Perawatan Luka", price: "Rp 150.000", time: "45 min" },
              ].map((svc, idx) => (
                <motion.div
                  key={svc.name}
                  variants={itemVariants}
                  whileHover={{ x: 4, backgroundColor: "rgba(22, 182, 138, 0.05)" }}
                  className="flex items-center justify-between rounded-lg border border-line p-2.5 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-ink">{svc.name}</p>
                    <p className="text-[11px] text-text-muted">{svc.time}</p>
                  </div>
                  <motion.p
                    className="text-xs font-semibold text-teal-strong"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                  >
                    {svc.price}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA buttons */}
          <motion.div className="border-t border-line px-6 py-4 flex gap-2" variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal py-2.5 text-xs font-semibold text-white transition-shadow hover:shadow-md"
            >
              <Calendar className="h-4 w-4" />
              Booking
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-teal/30 bg-teal-tint py-2.5 text-xs font-medium text-teal-strong transition-colors hover:bg-teal/10"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
