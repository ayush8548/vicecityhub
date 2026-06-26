"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { GradientArt } from "./GradientArt";

export function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  return (
    <div>
      <button
        onClick={() => setLightbox(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10"
        aria-label="Open image"
      >
        <div className="h-full transition duration-500 group-hover:scale-105">
          <GradientArt seed={images[active]} label={title} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent" />
      </button>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-video overflow-hidden rounded-lg border transition ${
                i === active
                  ? "border-neon-pink neon-border-glow"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <GradientArt seed={img} label={`${title} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[60] grid place-items-center bg-night/90 p-6 backdrop-blur"
          >
            <button
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15"
            >
              <GradientArt seed={images[active]} label={title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
