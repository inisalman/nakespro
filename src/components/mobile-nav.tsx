"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/button";
import { WHATSAPP_NUMBER } from "@/lib/content";

const navLinks = [
  { href: "#layanan", label: "Layanan" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#harga", label: "Harga" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#faq", label: "FAQ" },
];

const WA_TEXT = encodeURIComponent(
  "Halo NakesPro.id, saya ingin tanya soal website untuk nakes."
);
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger toggle — only show on mobile */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line transition-colors hover:bg-paper md:hidden"
        aria-label={open ? "Tutup menu" : "Buka menu"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? (
              <X className="h-5 w-5 text-ink" />
            ) : (
              <Menu className="h-5 w-5 text-ink" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[73px] z-40 bg-black/10 backdrop-blur-sm md:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full z-50 border-b border-line bg-white/95 px-6 py-4 shadow-lg backdrop-blur-lg md:hidden"
            >
              <nav className="mb-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex rounded-xl px-4 py-3 text-sm font-medium text-text-body transition-colors hover:bg-paper hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-2 border-t border-line pt-4">
                <a
                  href="https://app.nakespro.id/auth/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-text-body transition-colors hover:bg-paper hover:text-ink"
                >
                  Masuk
                </a>
                <Button href="#harga" variant="secondary" size="sm" className="w-full justify-center">
                  Mulai Sekarang
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
