"use client";

import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/button";
import { plans, WHATSAPP_NUMBER } from "@/lib/content";

type Billing = "monthly" | "yearly";

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo NakesPro.id, saya ingin tanya soal website untuk nakes."
)}`;

// Comparison rows: [label, starter, advance, professional]
const comparisonRows: [string, boolean | string, boolean | string, boolean | string][] = [
  ["Gratis domain .nakespro.id",          true,            true,            true],
  ["Hosting & server included",            true,            true,            true],
  ["Responsive di semua perangkat",        true,            true,            true],
  ["Support via WhatsApp",                 true,            true,            true],
  ["Booking online pasien",                true,            true,            true],
  ["Dashboard analitik pengunjung",        true,            true,            true],
  ["Domain .com gratis (tahunan)",         false,           true,            true],
  ["Optimasi SEO Google",                  false,           true,            true],
  ["Google Maps & Bisnis",                 false,           true,            true],
  ["Invoice otomatis ke pasien",           false,           true,            true],
  ["Desain sesuai brand",                  false,           true,            true],
  ["Pendampingan onboarding",              false,           true,            true],
  ["Multi-website (banyak cabang)",        false,           false,           true],
  ["SEO lanjut & laporan bulanan",         false,           false,           true],
  ["WhatsApp Business terintegrasi",       false,           false,           true],
  ["Multi-admin akses tim",                false,           false,           true],
  ["Manajer akun khusus",                  false,           false,           true],
  ["Prioritas support & jaminan uptime",   false,           false,           true],
];

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      {/* Billing toggle */}
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="relative inline-flex items-center rounded-full border border-line bg-paper p-1">
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              billing === "yearly" ? "translate-x-[calc(100%+0px)]" : "translate-x-0"
            }`}
          />
          <button
            onClick={() => setBilling("monthly")}
            className={`relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
              billing === "monthly" ? "text-ink" : "text-text-muted hover:text-text-body"
            }`}
          >
            Bulanan
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`relative z-10 inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-colors duration-200 ${
              billing === "yearly" ? "text-ink" : "text-text-muted hover:text-text-body"
            }`}
          >
            Tahunan
          </button>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-strong">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          Bayar tahunan, hemat hingga 49%
        </span>
      </div>

      {/* Pricing cards */}
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const isHighlighted = plan.highlight;
          const priceInfo = plan[billing];
          const href = plan.ctaTarget === "wa" ? waLink : plan.ctaTarget;

          return (
            <div
              key={plan.name}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                isHighlighted
                  ? "border-teal/40 bg-white shadow-card lg:-translate-y-2 lg:scale-[1.02]"
                  : "border-line bg-white hover:border-line-strong hover:shadow-card"
              }`}
            >
              {plan.badge && (
                <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-teal px-3.5 py-1 text-xs font-semibold text-white shadow-sm">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
              <p className="mt-1 min-h-[40px] text-sm leading-snug text-text-body">
                {plan.tagline}
              </p>

              {/* Price block */}
              <div key={billing} className="fade-up mt-6">
                {billing === "yearly" && plan.monthly.price !== "Custom" && plan.monthly.price !== "-" && (
                  <div className="mb-1">
                    <span className="text-lg font-semibold tracking-tight text-text-muted line-through">
                      {plan.monthly.price}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold tracking-tight ${
                    billing === "yearly" && plan.monthly.price !== "Custom" && plan.monthly.price !== "-"
                      ? "text-teal-strong"
                      : "text-ink"
                  }`}>
                    {priceInfo.price}
                  </span>
                  {priceInfo.period && (
                    <span className="text-sm font-medium text-text-muted">
                      {priceInfo.period}
                    </span>
                  )}
                </div>
                {priceInfo.note && (
                  <p className="mt-1.5 text-xs text-text-muted">{priceInfo.note}</p>
                )}
              </div>

              <div className="my-7 h-px w-full bg-line" />

              <ul className="flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        isHighlighted ? "bg-teal/10" : "bg-paper"
                      }`}
                    >
                      <Check className="h-3 w-3 text-teal" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-snug text-text-body">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={href}
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

      {/* Comparison Table Toggle */}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-text-body shadow-sm transition-colors hover:bg-paper hover:text-ink"
        >
          {showTable ? "Sembunyikan" : "Bandingkan semua fitur"}
          <motion.span animate={{ rotate: showTable ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>

      {/* Comparison Table */}
      <AnimatePresence>
        {showTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line bg-paper">
                    <th className="px-6 py-4 text-left font-semibold text-ink">Fitur</th>
                    {plans.map((p) => (
                      <th
                        key={p.name}
                        className={`px-4 py-4 text-center font-semibold ${
                          p.highlight ? "text-teal-strong" : "text-ink"
                        }`}
                      >
                        {p.name.replace("Paket ", "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([label, s, a, pro], i) => (
                    <tr
                      key={label}
                      className={`border-b border-line last:border-0 ${
                        i % 2 === 0 ? "bg-white" : "bg-paper/50"
                      }`}
                    >
                      <td className="px-6 py-3.5 text-text-body">{label}</td>
                      {[s, a, pro].map((val, ci) => (
                        <td key={ci} className="px-4 py-3.5 text-center">
                          {typeof val === "string" ? (
                            <span className="text-xs font-medium text-text-body">{val}</span>
                          ) : val ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal/10 mx-auto">
                              <Check className="h-3.5 w-3.5 text-teal" strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-paper mx-auto">
                              <X className="h-3.5 w-3.5 text-text-muted" strokeWidth={2} />
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


