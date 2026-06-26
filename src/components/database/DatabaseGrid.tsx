"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EntityCard } from "@/components/ui/EntityCard";
import { VERIFICATION, type VerificationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface GridItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  status: VerificationStatus;
  tag?: string;
  meta?: string;
  /** extra free-text bucket for the secondary facet filter */
  facet?: string;
}

const STATUS_ORDER: VerificationStatus[] = [
  "confirmed",
  "trailer_inferred",
  "speculation",
];

export function DatabaseGrid({
  items,
  basePath,
  facetLabel,
}: {
  items: GridItem[];
  basePath: string;
  facetLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VerificationStatus | "all">("all");
  const [facet, setFacet] = useState<string>("all");

  const facets = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.facet && set.add(i.facet));
    return Array.from(set).sort();
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q);
      const matchS = status === "all" || i.status === status;
      const matchF = facet === "all" || i.facet === facet;
      return matchQ && matchS && matchF;
    });
  }, [items, query, status, facet]);

  return (
    <div>
      <div className="glass mb-8 flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-xl border border-white/15 bg-night/60 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-faint focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            active={status === "all"}
            onClick={() => setStatus("all")}
            label="All status"
          />
          {STATUS_ORDER.map((s) => (
            <FilterChip
              key={s}
              active={status === s}
              onClick={() => setStatus(s)}
              label={VERIFICATION[s].label}
            />
          ))}
        </div>
      </div>

      {facets.length > 1 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {facetLabel && (
            <span className="mr-1 text-xs uppercase tracking-wide text-faint">
              {facetLabel}:
            </span>
          )}
          <FilterChip
            active={facet === "all"}
            onClick={() => setFacet("all")}
            label="All"
          />
          {facets.map((f) => (
            <FilterChip
              key={f}
              active={facet === f}
              onClick={() => setFacet(f)}
              label={f}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="glass grid place-items-center p-16 text-center text-muted">
          <p>No entries match your filters yet.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((i) => (
            <EntityCard
              key={i.id}
              href={`${basePath}/${i.slug}`}
              title={i.title}
              description={i.description}
              image={i.images[0]}
              status={i.status}
              tag={i.tag}
              meta={i.meta}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-neon-pink bg-neon-pink/15 text-neon-pink"
          : "border-white/15 text-muted hover:border-white/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
