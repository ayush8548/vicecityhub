"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Search, MapPin, Layers, ArrowRight, Loader2 } from "lucide-react";
import { VERIFICATION, type Location } from "@/lib/types";
import { cn } from "@/lib/utils";

const LeonidaMap = dynamic(() => import("./LeonidaMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-night-2/40">
      <Loader2 className="h-7 w-7 animate-spin text-neon-pink" />
    </div>
  ),
});

const TONE_DOT: Record<string, string> = {
  cyan: "bg-neon-cyan",
  purple: "bg-neon-purple",
  pink: "bg-neon-pink",
};

export function MapExplorer({ locations }: { locations: Location[] }) {
  const pinned = useMemo(
    () => locations.filter((l) => l.coordinates),
    [locations],
  );
  const types = useMemo(
    () => Array.from(new Set(pinned.map((l) => l.type))).sort(),
    [pinned],
  );

  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(pinned[0]?.id ?? null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pinned.filter(
      (l) =>
        (activeTypes.size === 0 || activeTypes.has(l.type)) &&
        (!q ||
          l.title.toLowerCase().includes(q) ||
          l.region.toLowerCase().includes(q)),
    );
  }, [pinned, query, activeTypes]);

  const toggleType = (t: string) =>
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* sidebar */}
      <div className="flex flex-col gap-4">
        {/* search */}
        <div className="glass flex items-center gap-2 px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search locations…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
          />
        </div>

        {/* layer filters */}
        <div className="glass p-4">
          <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan">
            <Layers className="h-3.5 w-3.5" /> Layers
          </h4>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => {
              const on = activeTypes.size === 0 || activeTypes.has(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    on
                      ? "border-neon-pink bg-neon-pink/15 text-neon-pink"
                      : "border-white/15 text-muted hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* location list */}
        <div className="glass flex-1 p-4">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-faint">
            {filtered.length} location{filtered.length === 1 ? "" : "s"}
          </h4>
          <div className="flex max-h-[320px] flex-col gap-1 overflow-y-auto">
            {filtered.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveId(l.id)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition",
                  activeId === l.id
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
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-faint">
                No locations match your filters.
              </p>
            )}
          </div>

          {activeId && (
            <Link
              href={`/locations/${pinned.find((l) => l.id === activeId)?.slug}`}
              className="btn-neon mt-4 w-full justify-center text-sm"
            >
              <MapPin className="h-4 w-4" />
              View location
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* map */}
      <div className="cine-frame relative h-[60vh] min-h-[460px] overflow-hidden lg:h-auto lg:min-h-[600px]">
        <LeonidaMap
          locations={filtered}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </div>
  );
}
