import Image from "next/image";

/**
 * Device mockup — iPhone frame for all screen sizes.
 * Using static Image for drastically better LCP and performance.
 */
export function TemplateMockup() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Glow behind device */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-b from-teal/[0.03] via-teal/[0.01] to-transparent blur-3xl" />

      {/* ═══ iPhone — all sizes ═══ */}
      <div className="mx-auto flex max-w-[260px] flex-col items-center md:max-w-[340px]">
        {/* Phone body */}
        <div className="glow-border-phone relative w-full overflow-hidden rounded-[2.5rem] border-[3px] border-gray-800 bg-gray-900 shadow-hero md:rounded-[3rem] md:border-[4px]">
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-16 h-8 w-[3px] rounded-r bg-gray-600" />
          <div className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-r bg-gray-600" />
          <div className="absolute -right-[3px] top-20 h-10 w-[3px] rounded-l bg-gray-600" />

          {/* Dynamic Island */}
          <div className="flex items-center justify-center pt-3 md:pt-4">
            <div className="h-[18px] w-[80px] rounded-full bg-black md:h-[22px] md:w-[100px]">
              <div className="mx-auto flex h-full w-[60px] items-center justify-center gap-1 md:w-[80px]">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-800" />
                <div className="h-2 w-2 rounded-full bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Screen */}
          <div className="relative aspect-[9/19] overflow-hidden bg-white md:aspect-[9/19.5]">
            <Image
              src="/hero-template.webp"
              alt="Pratinjau template Modern Light"
              fill
              priority
              sizes="(max-width: 768px) 260px, 340px"
              className="object-cover"
            />
            {/* Soft bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent md:h-16" />
          </div>

          {/* Home indicator */}
          <div className="flex items-center justify-center pb-2 pt-1 md:pb-3 md:pt-1.5">
            <div className="h-1 w-28 rounded-full bg-gray-500" />
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
