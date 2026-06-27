"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Click-to-play YouTube facade: shows the official thumbnail, and only loads
// the YouTube player iframe when the user clicks — keeps the page fast and
// avoids loading YouTube's scripts/cookies until needed (privacy-enhanced mode).
export function TrailerEmbed({
  videoId,
  title,
  badge,
  date,
}: {
  videoId: string;
  title: string;
  badge: string;
  date: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumbFallback, setThumbFallback] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/${
    thumbFallback ? "hqdefault" : "maxresdefault"
  }.jpg`;

  return (
    <div className="glass overflow-hidden">
      <div className="relative aspect-video bg-night">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={title}
              loading="lazy"
              onError={() => setThumbFallback(true)}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-neon-pink/90 text-white shadow-lg transition group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-0.5 fill-current" />
              </span>
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neon-cyan backdrop-blur">
              {badge}
            </span>
          </button>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-bold">{title}</h3>
          <p className="text-sm text-faint">{date}</p>
        </div>
        <span className="shrink-0 text-[11px] uppercase tracking-wide text-faint">
          © Rockstar Games
        </span>
      </div>
    </div>
  );
}
