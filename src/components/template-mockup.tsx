"use client";

/**
 * Device mockup showing hero section of modernlight.nakespro.id.
 * Desktop: laptop frame. Mobile: phone frame.
 * Non-interactive — purely visual preview.
 */
export function TemplateMockup() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Glow behind device */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-b from-teal/[0.03] via-teal/[0.01] to-transparent blur-3xl" />

      {/* ═══ Desktop: Laptop ═══ */}
      <div className="hidden md:block">
        <div className="group relative">
          {/* Lid / Screen section */}
          <div className="glow-border relative overflow-hidden rounded-t-xl border border-line shadow-hero">
            <div className="bg-[#1a1a2e]">
              {/* Top bar with camera notch */}
              <div className="flex items-center justify-center bg-[#1a1a2e] px-6 py-2.5">
                <div className="relative flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                  <div className="h-3 w-3 rounded-full bg-gray-800 ring-2 ring-gray-700/50">
                    <div className="mx-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-gray-900" />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                </div>
              </div>

              {/* Screen — hero preview */}
              <div className="relative aspect-[16/9] overflow-hidden bg-white">
                <iframe
                  src="https://modernlight.nakespro.id"
                  title="Pratinjau template Modern Light"
                  className="pointer-events-none absolute border-0"
                  style={{
                    transform: "scale(0.65)",
                    transformOrigin: "top left",
                    width: "153.85%",
                    height: "153.85%",
                    left: "0",
                    top: "0",
                  }}
                  sandbox="allow-scripts allow-same-origin"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {/* Gradient overlay at bottom to soften cutoff */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
              </div>
            </div>
          </div>

          {/* Laptop base / keyboard deck */}
          <div className="relative mx-auto rounded-b-lg border-x border-b border-line bg-gray-50 shadow-hero-float">
            <div className="flex items-center justify-center border-b border-gray-200 bg-gray-100 py-1.5">
              <div className="flex gap-0.5">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-1 w-1 rounded-full bg-gray-300" />
                ))}
              </div>
            </div>
            <div className="px-8 py-4">
              <div className="space-y-1">
                {[12, 12, 11, 10, 6].map((keys, row) => (
                  <div key={row} className="flex justify-center gap-1">
                    {[...Array(keys)].map((_, k) => (
                      <div
                        key={k}
                        className={`rounded bg-gray-200 ${
                          row === 4 && k === 2 ? "w-16" : "w-5"
                        } h-2.5`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-3 h-8 w-28 rounded-sm bg-gray-200" />
            </div>
            <div className="h-1 rounded-b-lg bg-gray-300" />
          </div>
        </div>
      </div>

      {/* ═══ Mobile: Phone ═══ */}
      <div className="md:hidden">
        <div className="mx-auto flex max-w-[260px] flex-col items-center">
          {/* Phone body */}
          <div className="glow-border-phone relative w-full overflow-hidden rounded-[2.5rem] border-[3px] border-gray-800 bg-gray-900 shadow-hero">
            {/* Side buttons */}
            <div className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-r bg-gray-600" />
            <div className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-r bg-gray-600" />
            <div className="absolute -right-[3px] top-20 h-10 w-[3px] rounded-l bg-gray-600" />

            {/* Dynamic Island */}
            <div className="flex items-center justify-center pt-3">
              <div className="h-[18px] w-[80px] rounded-full bg-black">
                <div className="mx-auto flex h-full w-[60px] items-center justify-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                  <div className="h-2 w-2 rounded-full bg-gray-800" />
                </div>
              </div>
            </div>

            {/* Screen */}
            <div className="relative aspect-[3/5] overflow-hidden bg-white">
              <iframe
                src="https://modernlight.nakespro.id"
                title="Pratinjau template Modern Light"
                className="pointer-events-none absolute border-0"
                style={{
                  transform: "scale(0.6)",
                  transformOrigin: "top left",
                  width: "166.67%",
                  height: "166.67%",
                  left: "0",
                  top: "0",
                }}
                sandbox="allow-scripts allow-same-origin"
                tabIndex={-1}
                aria-hidden="true"
              />
              {/* Soft bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            {/* Home indicator */}
            <div className="flex items-center justify-center pb-2 pt-1">
              <div className="h-1 w-28 rounded-full bg-gray-500" />
            </div>
          </div>
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
