"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/section";

export function TestimonialSection() {
  return (
    <div>
      <SectionHeading
        eyebrow="Testimoni"
        title="Apa kata mereka yang sudah pakai"
        titleAccent="sudah pakai"
        subtitle="Lebih dari 200 tenaga kesehatan di seluruh Indonesia sudah memiliki website profesional bersama NakesPro."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-hero"
          >
            {/* Quote icon */}
            <Quote className="mb-4 h-7 w-7 text-teal/20" />

            {/* Stars */}
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, si) => (
                <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="flex-1 text-sm leading-relaxed text-text-body">
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-5 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.color}`}
              >
                {t.initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
                <p className="truncate text-xs text-text-muted">
                  {t.role} · {t.city}
                </p>
              </div>
            </div>

            {/* Hover accent line */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-b-2xl bg-gradient-to-r from-teal to-teal-strong transition-transform duration-300 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </div>

      {/* Bottom summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-line bg-paper py-5 px-8 text-center"
      >
        {[
          { value: "200+", label: "Nakes aktif" },
          { value: "4.8 ★", label: "Rating rata-rata" },
          { value: "1-3 hari", label: "Website live" },
          { value: "24/7", label: "Support WhatsApp" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-2xl font-bold text-ink">{stat.value}</span>
            <span className="mt-0.5 text-xs text-text-muted">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
