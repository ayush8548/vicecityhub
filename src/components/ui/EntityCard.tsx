import Link from "next/link";
import { GradientArt } from "./GradientArt";
import { VerificationBadge } from "./VerificationBadge";
import type { VerificationStatus } from "@/lib/types";

export function EntityCard({
  href,
  title,
  description,
  image,
  status,
  meta,
  tag,
}: {
  href: string;
  title: string;
  description: string;
  image: string;
  status: VerificationStatus;
  meta?: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="group glass relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:neon-border-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="h-full w-full transition duration-500 group-hover:scale-105">
          <GradientArt seed={image} label={title} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
        <div className="absolute left-3 top-3">
          <VerificationBadge status={status} size="sm" />
        </div>
        {tag && (
          <span className="absolute right-3 top-3 rounded-full bg-night/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neon-cyan backdrop-blur">
            {tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight transition group-hover:text-neon-pink">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{description}</p>
        {meta && (
          <span className="mt-auto pt-4 text-xs font-medium uppercase tracking-wide text-faint">
            {meta}
          </span>
        )}
      </div>
    </Link>
  );
}
