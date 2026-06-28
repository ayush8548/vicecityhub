"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="section-pad mx-auto max-w-7xl">
      <div className="glass relative overflow-hidden p-8 sm:p-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-neon-pink/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-neon-cyan/20 blur-[110px]" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">
              <Mail className="h-3.5 w-3.5" /> Newsletter
            </span>
            <h2 className="mt-4 headline-xl text-[clamp(2rem,4vw,3.25rem)]">
              Never miss a <span className="neon-text-strong">verified</span> drop
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted sm:text-base">
              Get confirmed GTA 6 news, database updates, and map discoveries
              delivered the moment they land. No spam, no leaks — just signal.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@vicecity.com"
              disabled={done}
              className="flex-1 rounded-xl border border-white/15 bg-night/60 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-faint focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/30"
            />
            <button type="submit" className="btn-neon justify-center" disabled={done}>
              {done ? (
                <>
                  <Check className="h-4 w-4" /> Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
