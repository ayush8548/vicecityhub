export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-[0.12]" />
      <div className="pointer-events-none absolute -right-20 -top-10 h-60 w-60 rounded-full bg-neon-purple/25 blur-[110px]" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-neon-pink/20 blur-[100px]" />
      <div className="section-pad mx-auto max-w-7xl py-14 sm:py-20">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan">
          <span className="h-px w-8 bg-neon-cyan/60" />
          {eyebrow}
        </div>
        <h1 className="font-display text-4xl font-black tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted sm:text-lg">{description}</p>
      </div>
    </header>
  );
}
