"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { VERIFICATION, type Location } from "@/lib/types";
import { cn } from "@/lib/utils";

const TONE_DOT: Record<string, string> = {
  cyan: "bg-neon-cyan",
  purple: "bg-neon-purple",
  pink: "bg-neon-pink",
};

export function InteractiveMap({ locations }: { locations: Location[] }) {
  const pinned = locations.filter((l) => l.coordinates);
  const [active, setActive] = useState<Location | null>(pinned[0] ?? null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* Map canvas */}
      <div className="glass relative aspect-square overflow-hidden sm:aspect-[4/3]">
        <div className="absolute inset-0 grid-noise opacity-20" />
        {/* stylized land mass */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a1340" />
              <stop offset="100%" stopColor="#0c0a18" />
            </linearGradient>
            <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a1c2e" />
              <stop offset="100%" stopColor="#07060e" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#water)" />
          <path
            d="M20,18 Q42,10 58,20 Q74,28 72,46 Q70,64 64,76 Q58,90 46,86 Q34,82 30,68 Q22,58 22,44 Q18,30 20,18 Z"
            fill="url(#land)"
            stroke="rgba(168,85,247,.45)"
            strokeWidth="0.5"
          />
          <path
            d="M66,80 q4,4 6,9"
            fill="none"
            stroke="rgba(34,211,238,.4)"
            strokeWidth="0.6"
            strokeDasharray="1 1.5"
          />
        </svg>

        {pinned.map((l) => {
          const tone = VERIFICATION[l.status].tone;
          const isActive = active?.id === l.id;
          return (
            <button
              key={l.id}
              onClick={() => setActive(l)}
              style={{ left: `${l.coordinates!.x}%`, top: `${l.coordinates!.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              aria-label={l.title}
            >
              <span className="relative grid place-items-center">
                {isActive && (
                  <motion.span
                    layoutId="map-halo"
                    className={cn(
                      "absolute h-8 w-8 rounded-full opacity-40 blur-md",
                      TONE_DOT[tone],
                    )}
                  />
                )}
                <span
                  className={cn(
                    "relative h-3 w-3 rounded-full ring-2 ring-night transition",
                    TONE_DOT[tone],
                    isActive ? "scale-125" : "hover:scale-110",
                  )}
                />
                <span
                  className={cn(
                    "absolute -top-1 h-3 w-3 animate-ping rounded-full opacity-60",
                    TONE_DOT[tone],
                  )}
                />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-foreground/90">
                {l.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail rail */}
      <div className="flex flex-col gap-4">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-neon-cyan">
                <MapPin className="h-3.5 w-3.5" /> {active.type}
              </span>
              <VerificationBadge status={active.status} size="sm" />
            </div>
            <h3 className="mt-2 font-display text-2xl font-black">
              {active.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{active.description}</p>
            <Link
              href={`/locations/${active.slug}`}
              className="btn-neon mt-5 text-sm"
            >
              View location <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        <div className="glass p-4">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-faint">
            All pins
          </h4>
          <div className="flex flex-col gap-1">
            {pinned.map((l) => (
              <button
                key={l.id}
                onClick={() => setActive(l)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition",
                  active?.id === l.id
                    ? "bg-white/5 text-foreground"
                    : "text-muted hover:bg-white/5",
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      TONE_DOT[VERIFICATION[l.status].tone],
                    )}
                  />
                  {l.title}
                </span>
                <span className="text-xs text-faint">{l.type}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
