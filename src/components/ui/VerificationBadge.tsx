import { ShieldCheck, Film, Sparkles } from "lucide-react";
import { VERIFICATION, type VerificationStatus } from "@/lib/types";

const TONES: Record<string, string> = {
  cyan: "text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10",
  purple: "text-neon-purple border-neon-purple/40 bg-neon-purple/10",
  pink: "text-neon-pink border-neon-pink/40 bg-neon-pink/10",
};

const ICONS = {
  confirmed: ShieldCheck,
  trailer_inferred: Film,
  speculation: Sparkles,
} as const;

export function VerificationBadge({
  status,
  size = "md",
}: {
  status: VerificationStatus;
  size?: "sm" | "md";
}) {
  const meta = VERIFICATION[status];
  const Icon = ICONS[status];
  const pad = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      title={meta.description}
      className={`inline-flex items-center gap-1 rounded-full border font-semibold uppercase tracking-wide backdrop-blur ${pad} ${TONES[meta.tone]}`}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {size === "sm" ? meta.short : meta.label}
    </span>
  );
}
