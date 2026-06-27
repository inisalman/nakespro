"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/content";

const WA_TEXT = encodeURIComponent(
  "Halo NakesPro.id, saya ingin tanya soal website untuk nakes."
);
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

export function WhatsappFab() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden flex-col items-end gap-3 md:flex">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-1 mr-1 flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 shadow-lg"
          >
            {/* Online indicator */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-ink">
              Chat kami — Online sekarang
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] md:h-16 md:w-16"
        aria-label="Chat via WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="h-7 w-7 text-white md:h-8 md:w-8" strokeWidth={2} />
      </motion.a>
    </div>
  );
}
