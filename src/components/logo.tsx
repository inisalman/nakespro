import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  /** Tinggi logo dalam px. Lebar mengikuti rasio asli (≈1.83:1). */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Logo NakesPro (icon + wordmark) — gambar sudah include teks "NakesPro".
 * Background putih, jadi cocok dipakai di nav & footer yang juga putih.
 */
export function Logo({
  href = "/",
  height = 32,
  className,
  priority = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="NakesPro.id — Beranda"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/nakespro-logo.webp"
        alt="NakesPro.id"
        width={height * 1.83}
        height={height}
        priority={priority}
        className="h-auto w-auto select-none"
      />
    </Link>
  );
}
