import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-pad mx-auto grid min-h-[70vh] max-w-3xl place-items-center text-center">
      <div>
        <p className="font-display text-8xl font-black neon-text">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">
          Wrong turn in Vice City
        </h1>
        <p className="mt-2 text-muted">
          This page slipped off the map. Let&apos;s get you back to the strip.
        </p>
        <Link href="/" className="btn-neon mt-8">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
