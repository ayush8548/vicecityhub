"use client";

// Renders a real image when `seed` is an http(s) URL or a local public path
// (e.g. "/images/characters/lucia-caminos.jpg"). If that image is missing or
// fails to load, it gracefully falls back to a deterministic neon gradient
// keyed by the entity — so cards are never broken, and auto-upgrade the moment
// a real file is dropped in. Anything that isn't a path/URL renders the gradient.

import { useState } from "react";

const PALETTES: [string, string, string][] = [
  ["#ff2d95", "#a855f7", "#22d3ee"],
  ["#7c3aed", "#ff3db5", "#ff6a3d"],
  ["#22d3ee", "#7c3aed", "#ff2d95"],
  ["#ff6a3d", "#ff2d95", "#a855f7"],
  ["#00f0ff", "#a855f7", "#ff3db5"],
  ["#ffd166", "#ff2d95", "#7c3aed"],
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export function GradientArt({
  seed,
  label,
  className = "",
}: {
  seed: string;
  label?: string;
  className?: string;
  rounded?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const isImage = /^(https?:\/\/|\/)/.test(seed);
  const showImg = isImage && !errored;

  // Gradient is keyed off the entity name so it stays stable.
  const key = label ?? seed;
  const h = hash(key);
  const palette = PALETTES[h % PALETTES.length];
  const angle = (h % 8) * 45;
  const id = `g-${h}`;
  const initials = key
    .replace(/[-_/]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* gradient base — always present, so a missing image never shows broken */}
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label={label ?? seed}
      >
        <defs>
          <linearGradient id={id} gradientTransform={`rotate(${angle} .5 .5)`}>
            <stop offset="0%" stopColor={palette[0]} />
            <stop offset="55%" stopColor={palette[1]} />
            <stop offset="100%" stopColor={palette[2]} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="30%" cy="20%" r="80%">
            <stop offset="0%" stopColor="rgba(255,255,255,.55)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill="#0c0a18" />
        <rect width="400" height="300" fill={`url(#${id})`} opacity="0.92" />
        <rect width="400" height="300" fill={`url(#${id}-glow)`} />
        {/* sun / horizon motif */}
        <circle cx="200" cy="150" r={70 + (h % 40)} fill="rgba(255,255,255,.10)" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="0"
            y={150 + i * 12}
            width="400"
            height="4"
            fill="rgba(7,6,14,.45)"
          />
        ))}
        <text
          x="200"
          y="165"
          textAnchor="middle"
          fontFamily="Arial Black, sans-serif"
          fontSize="64"
          fontWeight="900"
          fill="rgba(255,255,255,.92)"
          style={{ letterSpacing: "2px" }}
        >
          {initials}
        </text>
      </svg>

      {/* real image — fades in only once it has actually loaded; on error it
          stays hidden and the gradient shows through (no broken-image flash) */}
      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={seed}
          alt={label ?? ""}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
