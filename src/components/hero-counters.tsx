"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Users, Clock, MessageCircle } from "lucide-react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

type StatItem = {
  icon: React.ElementType;
  target: number;
  suffix: string;
  label: string;
  color: string;
};

const stats: StatItem[] = [
  { icon: Users,          target: 200, suffix: "+", label: "nakes aktif",       color: "text-teal" },
  { icon: Star,           target: 48,  suffix: "",  label: "rating dari 5.0",   color: "text-amber-500" },
  { icon: Clock,          target: 3,   suffix: " hari", label: "website live",  color: "text-teal" },
  { icon: MessageCircle,  target: 24,  suffix: "/7", label: "support WA",       color: "text-teal" },
];

export function HeroCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      {stats.map((s, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const count = useCountUp(s.target, 1600 + i * 100, started);
        const display = s.label === "rating dari 5.0"
          ? `${(count / 10).toFixed(1)}${s.suffix}`
          : `${count}${s.suffix}`;

        return (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-sm text-text-muted">
            <s.icon className={`h-4 w-4 ${s.color}`} />
            <span className="font-bold text-ink">{display}</span>
            <span>{s.label}</span>
          </span>
        );
      })}
    </div>
  );
}
