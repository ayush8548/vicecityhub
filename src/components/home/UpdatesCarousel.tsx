"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { GradientArt } from "@/components/ui/GradientArt";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { formatDate } from "@/lib/utils";
import type { CarouselItem } from "@/lib/types";

const AUTOPLAY_MS = 5500;

export function UpdatesCarousel({ items }: { items: CarouselItem[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + items.length) % items.length);
    },
    [index, items.length],
  );

  useEffect(() => {
    if (paused || reduce || items.length <= 1) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      AUTOPLAY_MS,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduce, items.length]);

  if (!items.length) return null;
  const item = items[index];

  return (
    <section className="section-pad mx-auto max-w-7xl">
      <div className="mb-6 flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-neon-cyan" />
        <h2 className="font-display text-xl font-black tracking-tight sm:text-2xl">
          Verified Vice City Updates
        </h2>
        <span className="ml-1 hidden text-xs uppercase tracking-[0.2em] text-faint sm:inline">
          straight from the source
        </span>
      </div>

      <div
        className="group relative overflow-hidden rounded-3xl border border-white/10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/10] sm:aspect-[21/9]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={item.id}
              custom={dir}
              initial={reduce ? false : { opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.6, ease: [0.21, 0.5, 0.2, 1] }}
              className="absolute inset-0"
            >
              <GradientArt seed={item.image} label={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-end">
                <div className="max-w-2xl p-6 sm:p-10">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <VerificationBadge status={item.status} size="sm" />
                    <span className="rounded-full bg-neon-purple/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neon-purple">
                      {item.category}
                    </span>
                    <span className="text-xs text-faint">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-black leading-tight sm:text-4xl">
                    {item.title}
                  </h3>
                  <Link href={item.href} className="btn-neon mt-5 text-sm">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* arrows */}
          <button
            aria-label="Previous"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-night/50 text-foreground opacity-0 backdrop-blur transition hover:border-neon-cyan group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-night/50 text-foreground opacity-0 backdrop-blur transition hover:border-neon-cyan group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* dots */}
        <div className="absolute bottom-4 right-5 z-10 flex gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-7 bg-gradient-to-r from-neon-pink to-neon-cyan"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
