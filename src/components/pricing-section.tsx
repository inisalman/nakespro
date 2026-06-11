"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/button";
import { plans, WHATSAPP_NUMBER } from "@/lib/content";

type Billing = "monthly" | "yearly";

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo NakesPro.id, saya ingin tanya soal website untuk nakes."
)}`;

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <>
      {/* Billing toggle — segmented control with sliding indicator */}
      <div className="mb-12 flex flex-col items-center gap-3">
        <div className="relative inline-flex items-center rounded-full border border-line bg-paper p-1">
          {/* Sliding indicator */}
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
          Bayar tahunan, hemat hingga 36%
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

              {/* Price block — fades on billing switch */}
              <div key={billing} className="fade-up mt-6">
                {billing === "yearly" && plan.monthly.price !== "Custom" && (
                  <div className="mb-1">
                    <span className="text-lg font-semibold tracking-tight text-text-muted line-through">
                      {plan.monthly.price}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold tracking-tight ${
                    billing === "yearly" && plan.monthly.price !== "Custom"
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
    </>
  );
}
