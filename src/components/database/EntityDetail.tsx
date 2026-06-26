import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { VERIFICATION, type VerificationStatus } from "@/lib/types";

export interface DetailFact {
  label: string;
  value: string;
}

export function EntityDetail({
  backHref,
  backLabel,
  eyebrow,
  title,
  description,
  body,
  images,
  status,
  facts,
}: {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  body?: string;
  images: string[];
  status: VerificationStatus;
  facts: DetailFact[];
}) {
  return (
    <article className="section-pad mx-auto max-w-6xl py-10">
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <ImageGallery images={images} title={title} />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan">
            {eyebrow}
          </div>
          <h1 className="font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="mt-4">
            <VerificationBadge status={status} />
            <p className="mt-2 text-xs text-faint">
              {VERIFICATION[status].description}
            </p>
          </div>
          <p className="mt-5 text-muted">{description}</p>

          {facts.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {facts.map((f) => (
                <div key={f.label} className="glass p-4">
                  <dt className="text-[10px] uppercase tracking-wide text-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display font-bold text-foreground">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {body && (
        <div className="glass mt-12 p-6 sm:p-10">
          <div className="prose-vice max-w-none space-y-4 text-muted">
            {body.split("\n\n").map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
