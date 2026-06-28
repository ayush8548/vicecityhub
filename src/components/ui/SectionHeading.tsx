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
    <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-neon-cyan">
            <span className="h-px w-10 bg-gradient-to-r from-neon-cyan to-transparent" />
            {eyebrow}
          </div>
        )}
        <h2 className="headline-xl text-[clamp(2.25rem,4.5vw,3.5rem)]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-neon-pink hover:text-neon-pink"
        >
          {hrefLabel}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}
