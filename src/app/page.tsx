import Link from "next/link";
import { ArrowRight, Flame, Gauge } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { UpdatesCarousel } from "@/components/home/UpdatesCarousel";
import { TrailersSection } from "@/components/home/TrailersSection";
import { PreOrderSection } from "@/components/home/PreOrderSection";
import { Newsletter } from "@/components/home/Newsletter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EntityCard } from "@/components/ui/EntityCard";
import { GradientArt } from "@/components/ui/GradientArt";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { formatDate } from "@/lib/utils";
import {
  getCarousel,
  getTrendingNews,
  getFeaturedGuides,
  getVehicles,
  getCharacters,
} from "@/lib/data";

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export default async function HomePage() {
  const [carousel, trending, guides, vehicles, characters] = await Promise.all([
    getCarousel(),
    getTrendingNews(5),
    getFeaturedGuides(3),
    getVehicles(),
    getCharacters(),
  ]);

  const [lead, ...rest] = trending;

  return (
    <>
      <Hero />

      <div className="space-y-24 pb-8">
        <UpdatesCarousel items={carousel} />

        <TrailersSection />

        <PreOrderSection />

        {/* Trending News */}
        <section className="section-pad mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="What's hot"
              title="Trending News"
              description="The stories the community can't stop talking about."
              href="/news"
            />
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {lead && (
              <Reveal>
                <Link
                  href={`/news/${lead.slug}`}
                  className="group glass relative flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:neon-border-glow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="h-full transition duration-500 group-hover:scale-105">
                      <GradientArt seed={lead.images[0]} label={lead.title} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-neon-pink/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-neon-pink">
                        <Flame className="h-3 w-3" /> Trending
                      </span>
                      <VerificationBadge status={lead.status} size="sm" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs uppercase tracking-wide text-neon-cyan">
                      {lead.category} · {formatDate(lead.createdAt)}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-black leading-tight transition group-hover:text-neon-pink">
                      {lead.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{lead.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {rest.slice(0, 4).map((n, i) => (
                <Reveal key={n.id} delay={i * 0.06}>
                  <EntityCard
                    href={`/news/${n.slug}`}
                    title={n.title}
                    description={n.excerpt}
                    image={n.images[0]}
                    status={n.status}
                    tag={n.category}
                    meta={formatDate(n.createdAt)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="section-pad mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Level up"
              title="Featured Guides"
              description="Hand-picked guides to master Leonida from day one."
              href="/guides"
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.06}>
                <EntityCard
                  href={`/guides/${g.slug}`}
                  title={g.title}
                  description={g.description}
                  image={g.images[0]}
                  status={g.status}
                  tag={g.difficulty}
                  meta={g.category}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Vehicles Showcase */}
        <section className="section-pad mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Garage"
              title="Vehicles Showcase"
              description="Spotted, inferred, and rumored rides of the new era."
              href="/vehicles"
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.slice(0, 4).map((v, i) => (
              <Reveal key={v.id} delay={i * 0.06}>
                <Link
                  href={`/vehicles/${v.slug}`}
                  className="group glass relative flex flex-col overflow-hidden transition hover:-translate-y-1 hover:neon-border-glow"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <div className="h-full transition duration-500 group-hover:scale-105">
                      <GradientArt seed={v.images[0]} label={v.title} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-night/90 to-transparent" />
                    <span className="absolute left-3 top-3">
                      <VerificationBadge status={v.status} size="sm" />
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-neon-cyan">
                      {v.class} · {v.manufacturer}
                    </span>
                    <h3 className="mt-1 font-display text-base font-bold transition group-hover:text-neon-pink">
                      {v.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                      <Gauge className="h-3.5 w-3.5 text-neon-pink" />
                      {v.topSpeed} mph top speed
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Characters Showcase */}
        <section className="section-pad mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Cast"
              title="Characters Showcase"
              description="Meet the faces of Leonida — confirmed and theorized."
              href="/characters"
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {characters.slice(0, 4).map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <Link
                  href={`/characters/${c.slug}`}
                  className="group glass relative aspect-[3/4] overflow-hidden transition hover:-translate-y-1 hover:neon-border-glow"
                >
                  <div className="h-full transition duration-500 group-hover:scale-105">
                    <GradientArt seed={c.images[0]} label={c.title} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <span className="absolute left-3 top-3">
                    <VerificationBadge status={c.status} size="sm" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-neon-cyan">
                      {c.role}
                    </span>
                    <h3 className="font-display text-xl font-black transition group-hover:text-neon-pink">
                      {c.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-muted">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Newsletter />

        {/* CTA strip */}
        <section className="section-pad mx-auto max-w-7xl">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
              <div className="pointer-events-none absolute inset-0 grid-noise opacity-10" />
              <h2 className="relative font-display text-3xl font-black tracking-tight sm:text-5xl">
                Explore every inch of <span className="neon-text">Leonida</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-muted">
                Dive into the interactive map, browse the databases, and join a
                community tracking every verified update.
              </p>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/map" className="btn-neon">
                  Open Interactive Map <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/community" className="btn-ghost">
                  Join the Community
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
