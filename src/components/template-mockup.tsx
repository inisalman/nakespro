"use client";

import { useEffect, useState } from "react";

/**
 * Laptop device mockup showing a preview of the modernlight.nakespro.id template.
 * Uses an iframe with scale transform (same approach as portfolio section)
 * to display the live template inside a polished device frame.
 */
export function TemplateMockup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Glow behind device */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-b from-teal/[0.03] via-teal/[0.01] to-transparent blur-3xl" />

      {/* Laptop frame */}
      <div className="group relative overflow-hidden">
        {/* Lid / Screen section */}
        <div className="relative overflow-hidden rounded-t-xl border border-line shadow-hero">
          {/* Screen bezel */}
          <div className="bg-[#1a1a2e]">
            {/* Top bar with camera notch */}
            <div className="flex items-center justify-center bg-[#1a1a2e] px-6 py-2.5">
              {/* Camera dot */}
              <div className="relative flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                <div className="h-3 w-3 rounded-full bg-gray-800 ring-2 ring-gray-700/50">
                  <div className="mx-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-gray-900" />
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
              </div>
            </div>

            {/* Screen area with iframe */}
            <div className="relative aspect-[16/10] overflow-hidden bg-white">
              {mounted && (
                <iframe
                  src="https://modernlight.nakespro.id"
                  title="Pratinjau template Modern Light"
                  className="absolute inset-0 border-0"
                  style={{
                    transform: "scale(0.45)",
                    transformOrigin: "top left",
                    width: "222.22%",
                    height: "222.22%",
                  }}
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              )}
              {/* Overlay gradient at bottom to fade content */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* Laptop base / keyboard deck */}
        <div className="relative mx-auto rounded-b-lg border-x border-b border-line bg-gray-50 shadow-hero-float">
          {/* Hinge area */}
          <div className="flex items-center justify-center border-b border-gray-200 bg-gray-100 py-1.5">
            <div className="flex gap-0.5">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-gray-300" />
              ))}
            </div>
          </div>

          {/* Keyboard deck */}
          <div className="px-8 py-4">
            {/* Keyboard rows */}
            <div className="space-y-1">
              {[12, 12, 11, 10, 6].map((keys, row) => (
                <div key={row} className="flex justify-center gap-1">
                  {[...Array(keys)].map((_, k) => (
                    <div
                      key={k}
                      className={`rounded bg-gray-200 ${
                        row === 4 && k === 2
                          ? "w-16" // spacebar
                          : "w-5"
                      } h-2.5`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Trackpad */}
            <div className="mx-auto mt-3 h-8 w-28 rounded-sm bg-gray-200" />
          </div>

          {/* Bottom edge */}
          <div className="h-1 rounded-b-lg bg-gray-300" />
        </div>
      </div>

      {/* Label */}
      <p className="mt-6 text-center text-sm text-text-muted">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-teal" />
          Template{" "}
          <span className="font-semibold text-ink">Modern Light</span>
          {" — "}untuk perawat luka & klinik kecil
          <svg
            className="ml-1 h-4 w-4 text-teal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </span>
      </p>
    </div>
  );
}
