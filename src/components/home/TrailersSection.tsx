import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrailerEmbed } from "./TrailerEmbed";

const TRAILERS = [
  {
    badge: "Trailer 1",
    title: "Grand Theft Auto VI — Trailer 1",
    date: "Dec 4, 2023",
    videoId: "QdBZY2fkU-0",
  },
  {
    badge: "Trailer 2",
    title: "Grand Theft Auto VI — Trailer 2",
    date: "May 6, 2025",
    videoId: "VQRLujxTm3c",
  },
];

export function TrailersSection() {
  return (
    <section className="section-pad mx-auto max-w-7xl">
      <Reveal>
        <SectionHeading
          eyebrow="Watch"
          title="Official Trailers"
          description="The two official reveals — play them right here, streamed from Rockstar's YouTube."
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {TRAILERS.map((tr, i) => (
          <Reveal key={tr.videoId} delay={i * 0.08}>
            <TrailerEmbed
              videoId={tr.videoId}
              title={tr.title}
              badge={tr.badge}
              date={tr.date}
            />
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-xs text-faint">
        Trailers are the property of Rockstar Games, embedded from their official
        YouTube channel. ViceCityHub is an unofficial fan project and is not
        affiliated with or endorsed by Rockstar Games or Take-Two Interactive.
      </p>
    </section>
  );
}
