"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/content";

const WA_TEXT = encodeURIComponent(
  "Halo NakesPro.id, saya ingin tanya soal website untuk nakes."
);
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 320);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md md:hidden"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">Mulai dari Rp25.000</p>
            <p className="text-xs text-text-muted">Domain & hosting sudah included</p>
          </div>
          <div className="flex flex-shrink-0 gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white"
              aria-label="Chat WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#harga"
              className="flex items-center gap-1.5 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-white"
            >
              Daftar
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
