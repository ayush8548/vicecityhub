import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan">
            <span className="h-px w-8 bg-neon-cyan/60" />
            {eyebrow}
          </div>
        )}
        <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-muted sm:text-base">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-semibold text-neon-pink transition hover:text-neon-cyan"
        >
          {hrefLabel}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
