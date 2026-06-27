# Images

Drop your **high-resolution, legally-clean** image files here (original, AI-generated
that you own, or properly licensed stock). Do **not** add copyrighted promotional art
to the live/commercial site.

## Hero image

1. Save a wide image here, e.g. `public/images/hero.jpg` (recommended **1600px+ wide**,
   landscape, JPG/PNG/WebP/AVIF).
2. Open [`src/components/home/Hero.tsx`](../../src/components/home/Hero.tsx) and set:
   ```ts
   const HERO_IMAGE: string | null = "/images/hero.jpg";
   ```
3. The hero switches to a cinematic image layout, and the section links move to a
   compact strip below. If the file is missing, it safely falls back to the nav rail.

## Entity images (news, guides, vehicles, characters, locations)

Any entity's `images` value can be:
- a **gradient seed** (default — e.g. `"char-lucia"`), or
- a **real image**: a local path like `"/images/lucia.jpg"` **or** a full URL
  (`https://...`).

Set these per item in the **/admin** dashboard (Images field), or in
[`src/lib/mock-data.ts`](../../src/lib/mock-data.ts). The `GradientArt` component
auto-detects paths/URLs and renders the real image; anything else stays a gradient.

## Card images — exact filenames

The vehicle and character cards are pre-wired to these paths. Drop a file with
the matching name and that card upgrades from gradient to your photo automatically
(no code change). Missing files stay as the neon gradient — nothing breaks.

Recommended size: ~1200×900px (4:3-ish), JPG/WebP.

### Characters → `public/images/characters/`
- `lucia-caminos.jpg`
- `jason-duval.jpg`
- `cal-hampton.jpg`
- `boobie-ike.jpg`
- `drequan-priest.jpg`
- `real-dimez.jpg`
- `raul-bautista.jpg`
- `brian-heder.jpg`

### Vehicles → `public/images/vehicles/`
- `vice-city-convertible.jpg`
- `muscle-car.jpg`
- `exotic-supercar.jpg`
- `street-motorcycle.jpg`
- `airboat.jpg`
- `pickup-truck.jpg`

## Scaling up (recommended later)

For a growing site, upload images to **Supabase Storage** and paste the public URLs
into the Images field in /admin. That keeps images out of the repo and lets you manage
them without redeploying.
