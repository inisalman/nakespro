import Image from "next/image";

/**
 * Device mockup — Premium iPhone frame for all screen sizes.
 * Redesigned with metallic borders, dynamic island overlap, 
 * glass reflections, and smooth floating animation.
 */
export function TemplateMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Dynamic Glow behind device */}
      <div className="animate-breathe-glow-mockup absolute left-1/2 top-1/2 -z-10 h-[80%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-gradient-to-b from-teal/30 via-teal/10 to-transparent blur-3xl" />

      {/* ═══ iPhone — all sizes ═══ */}
      <div className="animate-float-mockup mx-auto flex max-w-[280px] flex-col items-center md:max-w-[340px]">
        
        {/* Phone frame (Metallic outer ring) */}
        <div className="relative w-full rounded-[3rem] p-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_40px_-10px_rgba(0,0,0,0.15),0_40px_80px_-20px_rgba(13,148,136,0.25)] md:rounded-[3.5rem] bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400">
          
          {/* Hardware Buttons */}
          {/* Action button */}
          <div className="absolute -left-[3px] top-24 h-8 w-[4px] rounded-l-md bg-gradient-to-b from-gray-300 to-gray-500 shadow-sm" />
          {/* Vol Up */}
          <div className="absolute -left-[3px] top-36 h-14 w-[4px] rounded-l-md bg-gradient-to-b from-gray-300 to-gray-500 shadow-sm" />
          {/* Vol Down */}
          <div className="absolute -left-[3px] top-56 h-14 w-[4px] rounded-l-md bg-gradient-to-b from-gray-300 to-gray-500 shadow-sm" />
          {/* Power */}
          <div className="absolute -right-[3px] top-44 h-20 w-[4px] rounded-r-md bg-gradient-to-b from-gray-300 to-gray-500 shadow-sm" />

          {/* Inner black bezel */}
          <div className="relative w-full overflow-hidden rounded-[2.9rem] bg-black p-[8px] md:rounded-[3.4rem] md:p-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]">
            
            {/* Screen */}
            <div 
              className="relative w-full overflow-hidden rounded-[2.4rem] bg-white md:rounded-[2.8rem]"
              style={{ aspectRatio: "9/19.5" }}
            >
              
              {/* Image content */}
              <Image
                src="/hero-template.webp"
                alt="Pratinjau template Modern Light"
                fill
                priority
                sizes="(max-width: 768px) 260px, 340px"
                className="object-cover object-top"
              />

              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-2 z-20 flex h-[24px] w-[80px] -translate-x-1/2 items-center justify-between rounded-full bg-black px-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.2)] md:top-3 md:h-[30px] md:w-[96px]">
                {/* Left Sensor */}
                <div className="h-2.5 w-8 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] md:h-3 md:w-10" />
                {/* Right Camera */}
                <div className="h-2.5 w-2.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_3px_rgba(255,255,255,0.2)] md:h-3 md:w-3">
                  <div className="mx-auto mt-[3px] h-1 w-1 rounded-full bg-blue-900/40 md:mt-[4px]" />
                </div>
              </div>

              {/* Screen reflection/glare */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.25]" />
              {/* Screen top specular highlight */}
              <div className="pointer-events-none absolute -left-[20%] -top-[20%] z-10 h-[40%] w-[140%] -rotate-12 bg-gradient-to-b from-white/[0.15] to-transparent" />

              {/* Soft bottom fade to cover anything cut off abruptly */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white via-white/80 to-transparent md:h-32" />

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-gray-800 md:bottom-2.5 md:h-1.5 md:w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="mt-8 text-center text-sm text-text-muted">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 shadow-sm transition-shadow hover:shadow-md">
          <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_8px_rgba(13,148,136,0.6)]" />
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
