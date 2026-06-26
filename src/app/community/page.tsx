import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  Users,
  TrendingUp,
  Trophy,
  ArrowRight,
  Flame,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerificationBadge } from "@/components/ui/VerificationBadge";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the ViceCityHub community — discussions, theory threads, and leaderboards.",
};

const STATS = [
  { icon: Users, label: "Members", value: "48,210" },
  { icon: MessageSquare, label: "Threads", value: "12,540" },
  { icon: TrendingUp, label: "Daily posts", value: "3,180" },
  { icon: Trophy, label: "Verified theories", value: "92" },
];

const THREADS = [
  {
    title: "Frame-by-frame: hidden license plates in the trailer",
    author: "neonhunter",
    replies: 412,
    status: "trailer_inferred" as const,
    tag: "Analysis",
  },
  {
    title: "Map size megathread — comparing coastlines",
    author: "cartographer_lu",
    replies: 988,
    status: "speculation" as const,
    tag: "Map",
  },
  {
    title: "Confirmed: dual protagonists — what we actually know",
    author: "mod_team",
    replies: 1503,
    status: "confirmed" as const,
    tag: "Story",
  },
  {
    title: "Radio wishlist: which genres define modern Vice City?",
    author: "soundsystem",
    replies: 276,
    status: "speculation" as const,
    tag: "Audio",
  },
];

const LEADERS = [
  { name: "neonhunter", points: 18420, badge: "Trailer Analyst" },
  { name: "cartographer_lu", points: 16110, badge: "Mapmaker" },
  { name: "vicehistorian", points: 14870, badge: "Lore Keeper" },
  { name: "framecounter", points: 12030, badge: "Detail Sleuth" },
  { name: "coastrunner", points: 9980, badge: "Explorer" },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Crew"
        title="Community"
        description="Where the most dedicated Vice City fans break down every frame, map every coastline, and separate signal from rumor."
      />

      <div className="section-pad mx-auto max-w-7xl space-y-16 py-12">
        {/* stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="glass flex flex-col items-center p-6 text-center">
                <s.icon className="h-6 w-6 text-neon-pink" />
                <div className="mt-3 font-display text-2xl font-black neon-text">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wide text-faint">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* threads */}
          <div>
            <SectionHeading
              eyebrow="Hot right now"
              title="Trending Discussions"
            />
            <div className="space-y-3">
              {THREADS.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.05}>
                  <div className="glass flex items-center justify-between gap-4 p-5 transition hover:neon-border-glow">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-neon-purple/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neon-purple">
                          {t.tag}
                        </span>
                        <VerificationBadge status={t.status} size="sm" />
                      </div>
                      <h3 className="font-display font-bold leading-snug">
                        {t.title}
                      </h3>
                      <p className="mt-1 text-xs text-faint">
                        started by @{t.author}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center text-neon-cyan">
                      <Flame className="h-4 w-4" />
                      <span className="font-display text-lg font-black">
                        {t.replies}
                      </span>
                      <span className="text-[10px] uppercase text-faint">
                        replies
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* leaderboard */}
          <div>
            <SectionHeading eyebrow="Top contributors" title="Leaderboard" />
            <div className="glass p-4">
              {LEADERS.map((l, i) => (
                <div
                  key={l.name}
                  className="flex items-center gap-3 border-b border-white/5 py-3 last:border-0"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-black ${
                      i === 0
                        ? "bg-gradient-to-br from-gold to-neon-pink text-night"
                        : "bg-white/5 text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold">@{l.name}</div>
                    <div className="text-[11px] text-faint">{l.badge}</div>
                  </div>
                  <div className="font-display text-sm font-bold text-neon-cyan">
                    {l.points.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* join CTA */}
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 grid-noise opacity-10" />
            <h2 className="relative font-display text-3xl font-black tracking-tight sm:text-4xl">
              Bring your <span className="neon-text">theories</span>
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-muted">
              Sign up to post, vote, and earn verification badges. The best
              analysts get featured on the homepage.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/admin" className="btn-neon">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
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
