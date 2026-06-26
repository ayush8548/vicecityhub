"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/news", label: "News" },
  { href: "/guides", label: "Guides" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/characters", label: "Characters" },
  { href: "/locations", label: "Locations" },
  { href: "/map", label: "Map" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-strong border-b border-white/10 py-2"
          : "border-b border-transparent py-4",
      )}
    >
      <nav className="section-pad mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-purple shadow-lg">
            <Gamepad2 className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-black tracking-tight">
            Vice<span className="neon-text">City</span>Hub
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/admin" className="btn-ghost text-sm">
            Admin
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong section-pad mx-4 mt-2 rounded-2xl py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  pathname.startsWith(l.href)
                    ? "bg-white/5 text-neon-pink"
                    : "text-muted hover:bg-white/5 hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/admin" className="btn-ghost mt-2 justify-center text-sm">
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
