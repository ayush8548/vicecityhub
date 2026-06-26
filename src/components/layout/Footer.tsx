import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { XLogo, YoutubeLogo, TwitchLogo, GithubLogo } from "@/components/ui/SocialIcons";

const SOCIALS = [
  { Icon: XLogo, label: "X (Twitter)", href: "#" },
  { Icon: YoutubeLogo, label: "YouTube", href: "#" },
  { Icon: TwitchLogo, label: "Twitch", href: "#" },
  { Icon: GithubLogo, label: "GitHub", href: "#" },
];

const COLS = [
  {
    title: "Database",
    links: [
      { href: "/news", label: "News" },
      { href: "/guides", label: "Guides" },
      { href: "/vehicles", label: "Vehicles" },
      { href: "/characters", label: "Characters" },
      { href: "/locations", label: "Locations" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/map", label: "Interactive Map" },
      { href: "/community", label: "Community" },
      { href: "/admin", label: "Admin" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="section-pad mx-auto max-w-7xl py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple">
                <Gamepad2 className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-black">
                Vice<span className="neon-text">City</span>Hub
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              The premium fan-run information hub for the next chapter of Vice
              City. Verified updates, deep databases, and community tools.
            </p>
            <div className="mt-4 flex gap-3 text-muted">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg border border-white/10 transition hover:border-neon-pink hover:text-neon-pink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan">
              About
            </h4>
            <p className="text-sm text-muted">
              ViceCityHub is an unofficial fan project. Not affiliated with or
              endorsed by Rockstar Games or Take-Two Interactive. All trademarks
              belong to their respective owners.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-faint sm:flex-row">
          <p>© {new Date().getFullYear()} ViceCityHub. Fan-made, not official.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse-glow rounded-full bg-neon-cyan" />
            Tracking verified Vice City updates
          </p>
        </div>
      </div>
    </footer>
  );
}
