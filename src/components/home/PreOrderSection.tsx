import { Reveal } from "@/components/ui/Reveal";
import { CalendarCheck, ShoppingCart } from "lucide-react";

// Reported regional pricing — Standard / Ultimate editions. "—" = not yet listed.
const PRICES = [
  { region: "United States", standard: "$80", ultimate: "$100" },
  { region: "United Kingdom", standard: "£69.99", ultimate: "£89.99" },
  { region: "Europe", standard: "€80", ultimate: "€100" },
  { region: "India", standard: "₹5,999", ultimate: "₹7,499" },
  { region: "Australia", standard: "A$129.95", ultimate: "—" },
  { region: "Japan", standard: "¥9,800", ultimate: "—" },
  { region: "South Korea", standard: "₩89,800", ultimate: "—" },
  { region: "Israel", standard: "₪319", ultimate: "₪399" },
];

// ⬇️ Replace with your pre-order/store link when available.
const PREORDER_URL = "https://www.rockstargames.com/VI";

export function PreOrderSection() {
  return (
    <section className="section-pad mx-auto max-w-7xl">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 grid-noise opacity-10" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-neon-pink/20 blur-[120px]" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* left: pitch */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-neon-cyan">
                <CalendarCheck className="h-3.5 w-3.5" />
                Pre-orders live since June 25, 2026
              </span>
              <h2 className="mt-5 headline-xl text-[clamp(2.5rem,6vw,4.5rem)]">
                Pre-Order
                <span className="block neon-text-strong">Vice City</span>
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Secure your copy of Grand Theft Auto VI for PlayStation 5 and
                Xbox Series X|S ahead of the November 19, 2026 launch.
              </p>
              <a
                href={PREORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon mt-7"
              >
                <ShoppingCart className="h-4 w-4" />
                Pre-Order Now
              </a>
            </div>

            {/* right: price table */}
            <div className="rounded-2xl border border-white/10 bg-night/40 p-2">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neon-cyan">
                  Region
                </span>
                <span className="w-20 text-right text-[10px] font-semibold uppercase tracking-wide text-faint">
                  Standard
                </span>
                <span className="w-20 text-right text-[10px] font-semibold uppercase tracking-wide text-faint">
                  Ultimate
                </span>
              </div>
              <ul>
                {PRICES.map((p, i) => (
                  <li
                    key={p.region}
                    className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3 text-sm ${
                      i < PRICES.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <span className="text-muted">{p.region}</span>
                    <span className="w-20 text-right font-condensed text-lg tracking-wide text-foreground tabular-nums">
                      {p.standard}
                    </span>
                    <span className="w-20 text-right font-condensed text-lg tracking-wide text-neon-pink tabular-nums">
                      {p.ultimate}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="relative mt-6 text-xs text-faint">
            Reported regional pricing; may vary by retailer and platform. Not an
            official Rockstar Games store — confirm final pricing at checkout.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
