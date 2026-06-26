"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Newspaper, ArrowUpRight, CalendarClock } from "lucide-react";

// Official release date as last announced by Rockstar Games.
const RELEASE_ISO = "2026-11-19T00:00:00.000Z";
const RELEASE_LABEL = "Nov 19, 2026";

function daysUntilRelease(): number {
  const ms = new Date(RELEASE_ISO).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

const STATS = [
  { label: "Confirmed characters", value: "8" },
  { label: "Leonida regions", value: "6" },
  { label: "Official trailers", value: "2" },
];

const INDEX = [
  { n: "01", label: "Newsroom", desc: "Verified updates & analysis", href: "/news" },
  { n: "02", label: "Atlas", desc: "Interactive map of Leonida", href: "/map" },
  { n: "03", label: "Garage", desc: "Every confirmed vehicle", href: "/vehicles" },
  { n: "04", label: "The Cast", desc: "Characters of Vice City", href: "/characters" },
];

export function Hero() {
  const reduce = useReducedMotion();
  // Countdown computed on the client to avoid hydration mismatch.
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    setDays(daysUntilRelease());
    const id = setInterval(() => setDays(daysUntilRelease()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="section-pad relative overflow-hidden pb-10 pt-6 sm:pt-10">
      {/* atmospheric layers */}
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-[0.12]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-neon-pink/25 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-52 h-96 w-96 rounded-full bg-neon-purple/20 blur-[150px]" />

      <div className="cine-frame relative mx-auto max-w-7xl overflow-hidden bg-night-2/40 px-6 pb-6 pt-9 backdrop-blur-sm sm:px-10 sm:pt-12">
        {/* top meta row */}
        <motion.div
          {...rise(0)}
          className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-neon-cyan">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-neon-cyan" />
            Vice City · Leonida · Next Era
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-pink/40 bg-neon-pink/10 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground">
            <CalendarClock className="h-3.5 w-3.5 text-neon-pink" />
            Launches {RELEASE_LABEL}
            {days !== null && (
              <span className="text-neon-cyan">· {days} days</span>
            )}
          </span>
        </motion.div>

        {/* giant full-bleed headline */}
        <motion.h1
          {...rise(0.06)}
          className="headline-xl text-[clamp(3.75rem,13vw,11rem)]"
        >
          <span className="block text-foreground">Enter</span>
          <span className="block neon-text-strong">Vice City</span>
        </motion.h1>

        {/* sub-row: copy + numbered nav rail */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <motion.p
              {...rise(0.16)}
              className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              The premium fan-run hub for Grand Theft Auto VI. Verified updates,
              deep databases, an interactive map of Leonida, and a community that
              lives and breathes the neon coast.
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/news" className="btn-neon">
                <Newspaper className="h-4 w-4" />
                Latest News
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/map" className="btn-ghost">
                <MapPin className="h-4 w-4" />
                Explore the Map
              </Link>
            </motion.div>
          </div>

          {/* refined numbered navigation rail (replaces the illustration) */}
          <motion.nav
            {...rise(0.3)}
            aria-label="Explore the hub"
            className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-12"
          >
            <ul className="divide-y divide-white/10">
              {INDEX.map((it) => (
                <li key={it.n}>
                  <Link
                    href={it.href}
                    className="group flex items-center gap-5 py-4 transition"
                  >
                    <span className="font-condensed text-2xl leading-none text-faint transition group-hover:text-neon-pink sm:text-3xl">
                      {it.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold leading-tight transition group-hover:text-neon-pink">
                        {it.label}
                      </span>
                      <span className="block text-sm text-faint">{it.desc}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon-cyan" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>

        {/* bottom bento bar */}
        <motion.div
          {...rise(0.36)}
          className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-night/40 md:grid-cols-4"
        >
          <Link
            href="/news/gta-6-release-date-november-19-2026"
            className="group flex items-center justify-between gap-3 border-b border-r border-white/10 p-5 transition hover:bg-white/5 md:border-b-0"
          >
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                Days to launch
              </div>
              <div className="mt-1 font-condensed text-3xl leading-none neon-text-strong">
                {days !== null ? days : "—"}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-faint">
                {RELEASE_LABEL}
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-neon-pink" />
          </Link>

          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`border-b border-white/10 p-5 md:border-b-0 ${
                i < STATS.length - 1 ? "border-r" : ""
              } ${i === 0 ? "" : "border-r"}`}
            >
              <div className="font-condensed text-3xl leading-none neon-text-strong">
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-faint">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
