import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientArt } from "@/components/ui/GradientArt";

// Official YouTube links for each trailer.
const TRAILER_1_URL = "https://youtu.be/QdBZY2fkU-0";
const TRAILER_2_URL = "https://youtu.be/VQRLujxTm3c";

const TRAILERS = [
  {
    n: "Trailer 1",
    title: "Grand Theft Auto VI — Trailer 1",
    date: "Dec 4, 2023",
    seed: "news-jason-lucia",
    url: TRAILER_1_URL,
  },
  {
    n: "Trailer 2",
    title: "Grand Theft Auto VI — Trailer 2",
    date: "May 6, 2025",
    seed: "news-trailer2",
    url: TRAILER_2_URL,
  },
];

export function TrailersSection() {
  return (
    <section className="section-pad mx-auto max-w-7xl">
      <Reveal>
        <SectionHeading
          eyebrow="Watch"
          title="Official Trailers"
          description="The two official reveals — straight to Rockstar's YouTube."
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {TRAILERS.map((tr, i) => (
          <Reveal key={tr.n} delay={i * 0.08}>
            <a
              href={tr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass relative block overflow-hidden transition hover:-translate-y-1 hover:neon-border-glow"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="h-full transition duration-500 group-hover:scale-105">
                  <GradientArt seed={tr.seed} label={tr.title} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                {/* play button */}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-neon-pink/90 text-white shadow-lg transition group-hover:scale-110">
                    <Play className="h-7 w-7 translate-x-0.5 fill-current" />
                  </span>
                </span>
                <span className="absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neon-cyan backdrop-blur">
                  {tr.n}
                </span>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-display text-lg font-bold transition group-hover:text-neon-pink">
                    {tr.title}
                  </h3>
                  <p className="text-sm text-faint">{tr.date}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-neon-cyan">
                  Watch on YouTube →
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
