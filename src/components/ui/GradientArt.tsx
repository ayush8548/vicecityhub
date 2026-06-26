// Deterministic neon gradient "art" placeholder. Renders an SVG keyed by a
// seed string so every entity gets a stable, distinctive cover without any
// bundled image assets. If the seed is an http(s) URL, it renders that image.

const PALETTES: [string, string, string][] = [
  ["#ff2d95", "#a855f7", "#22d3ee"],
  ["#7c3aed", "#ff3db5", "#ff6a3d"],
  ["#22d3ee", "#7c3aed", "#ff2d95"],
  ["#ff6a3d", "#ff2d95", "#a855f7"],
  ["#00f0ff", "#a855f7", "#ff3db5"],
  ["#ffd166", "#ff2d95", "#7c3aed"],
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export function GradientArt({
  seed,
  label,
  className = "",
  rounded = true,
}: {
  seed: string;
  label?: string;
  className?: string;
  rounded?: boolean;
}) {
  if (/^https?:\/\//.test(seed)) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={seed}
        alt={label ?? ""}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  const h = hash(seed);
  const palette = PALETTES[h % PALETTES.length];
  const angle = (h % 8) * 45;
  const id = `g-${h}`;
  const initials = (label ?? seed)
    .replace(/[-_]/g, " ")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full ${rounded ? "" : ""} ${className}`}
      role="img"
      aria-label={label ?? seed}
    >
      <defs>
        <linearGradient id={id} gradientTransform={`rotate(${angle} .5 .5)`}>
          <stop offset="0%" stopColor={palette[0]} />
          <stop offset="55%" stopColor={palette[1]} />
          <stop offset="100%" stopColor={palette[2]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,.55)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="#0c0a18" />
      <rect width="400" height="300" fill={`url(#${id})`} opacity="0.92" />
      <rect width="400" height="300" fill={`url(#${id}-glow)`} />
      {/* sun / horizon motif */}
      <circle cx="200" cy="150" r={70 + (h % 40)} fill="rgba(255,255,255,.10)" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          x="0"
          y={150 + i * 12}
          width="400"
          height="4"
          fill="rgba(7,6,14,.45)"
        />
      ))}
      <text
        x="200"
        y="165"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="64"
        fontWeight="900"
        fill="rgba(255,255,255,.92)"
        style={{ letterSpacing: "2px" }}
      >
        {initials}
      </text>
    </svg>
  );
}
