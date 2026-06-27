import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Map, Newspaper, Sparkles, MessagesSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiscordLogo } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the ViceCityHub community on Discord — verified updates, trailer theories, map cartography, and more.",
};

// ⬇️ Paste your Discord invite link here.
const DISCORD_INVITE_URL = "https://discord.gg/bjw6mF2qa3";
// Optional: enable the live widget in Discord → Server Settings → Widget,
// then paste the Server ID here to show a live member list.
const DISCORD_SERVER_ID = "";

const CHANNELS = [
  {
    icon: ShieldCheck,
    name: "Verified Updates",
    desc: "Confirmed GTA 6 news the moment it drops — no rumors mislabeled as fact.",
  },
  {
    icon: Sparkles,
    name: "Trailer Theories",
    desc: "Frame-by-frame breakdowns and the community's sharpest predictions.",
  },
  {
    icon: Map,
    name: "Map Cartography",
    desc: "Piece together Leonida coastline by coastline with fellow explorers.",
  },
  {
    icon: Newspaper,
    name: "Off-Topic Lounge",
    desc: "Everything else Vice City — music, screenshots, and hype.",
  },
];

export default function CommunityPage() {
  const widgetEnabled = DISCORD_SERVER_ID.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="The Crew"
        title="Join the Community"
        description="The most dedicated Vice City fans gather on our Discord — breaking down every frame, mapping every coastline, and separating signal from rumor."
      />

      <div className="section-pad mx-auto max-w-7xl space-y-16 py-12">
        {/* Discord hero */}
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 grid-noise opacity-10" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-purple/25 blur-[130px]" />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-cyan">
                  <MessagesSquare className="h-3.5 w-3.5" />
                  Live community
                </span>
                <h2 className="mt-5 headline-xl text-[clamp(2.5rem,6vw,4.5rem)]">
                  On the
                  <span className="block neon-text-strong">Discord</span>
                </h2>
                <p className="mt-4 max-w-md text-muted">
                  Real-time discussion, theory threads, exclusive drops, and
                  events. It&apos;s free, it&apos;s where the fans are, and it&apos;s the
                  fastest way into the conversation.
                </p>
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon mt-7"
                >
                  <DiscordLogo className="h-5 w-5" />
                  Join the Discord
                </a>
              </div>

              {/* live widget if configured, else a branded panel */}
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {widgetEnabled ? (
                  <iframe
                    title="ViceCityHub Discord"
                    src={`https://discord.com/widget?id=${DISCORD_SERVER_ID}&theme=dark`}
                    width="100%"
                    height="400"
                    allowTransparency
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  />
                ) : (
                  <div className="grid h-full min-h-[260px] place-items-center bg-night/50 p-10 text-center">
                    <div>
                      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-pink text-white">
                        <DiscordLogo className="h-8 w-8" />
                      </span>
                      <p className="mt-4 font-display text-lg font-bold">
                        Your server, your crew
                      </p>
                      <p className="mt-1 text-sm text-faint">
                        Enable the Discord widget to show a live member list here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* what's inside */}
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="Inside the server"
              title="What you'll find"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <div className="glass flex items-start gap-4 p-5 transition hover:neon-border-glow">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon-pink/15 text-neon-pink">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold">{c.name}</h3>
                    <p className="mt-1 text-sm text-muted">{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* secondary CTA */}
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 text-center">
            <h2 className="font-display text-2xl font-black tracking-tight sm:text-3xl">
              Got a lead worth <span className="neon-text">verifying?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Bring it to the Discord. The community digs in, and the strongest
              findings make it onto the hub — tagged Confirmed, Trailer Inferred,
              or Speculation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon"
              >
                <DiscordLogo className="h-5 w-5" />
                Join the Discord
              </a>
              <Link href="/news" className="btn-ghost">
                Read the latest
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
