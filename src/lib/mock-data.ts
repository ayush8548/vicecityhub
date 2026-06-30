// ===========================================================================
// ViceCityHub — seeded content (used when Supabase is not configured)
//
// Content reflects publicly known information about Grand Theft Auto VI as of
// early 2026. Verification status is applied honestly:
//   confirmed         — officially stated by Rockstar Games
//   trailer_inferred  — visible in the official trailers / Rockstar's site
//   speculation       — community theory, not officially confirmed
//
// Image strings are "art seeds" rendered as neon gradient placeholders by the
// <GradientArt> component — no copyrighted assets are bundled.
// ===========================================================================

import type {
  NewsArticle,
  Guide,
  Vehicle,
  Character,
  Location,
  CarouselItem,
} from "./types";

const iso = (d: string) => new Date(d).toISOString();

/** Official release date as last announced by Rockstar Games. */
export const RELEASE_DATE = "2026-11-19T00:00:00.000Z";
export const RELEASE_DATE_LABEL = "November 19, 2026";
export const LAUNCH_PLATFORMS = "PlayStation 5 · Xbox Series X|S";

// ===========================================================================
// NEWS
// ===========================================================================
export const NEWS: NewsArticle[] = [
  {
    id: "n1",
    slug: "gta-6-release-date-november-19-2026",
    title: "GTA 6 Confirmed for November 19, 2026",
    description:
      "Rockstar Games confirms Grand Theft Auto VI will launch on November 19, 2026, after moving from its earlier spring target.",
    excerpt:
      "Rockstar pushed the date from May 26 to November 19, 2026, asking fans for extra patience to deliver the level of polish the game demands.",
    body: "Rockstar Games has confirmed that Grand Theft Auto VI will release on November 19, 2026 for PlayStation 5 and Xbox Series X|S. The date follows an earlier window of May 26, 2026 that was announced alongside the second trailer.\n\nIn its statement, Rockstar thanked players for their patience and said the additional time is needed to finish the game with the level of polish it requires. Parent company Take-Two has repeatedly described GTA VI as the most ambitious project in the studio's history.\n\nA PC version was not announced for launch — consistent with previous Rockstar releases, where PC has historically followed the console debut.",
    category: "Release",
    author: "Editorial Desk",
    images: ["news-release-date", "news-release-2"],
    status: "confirmed",
    readMinutes: 4,
    trending: true,
    createdAt: iso("2025-11-06"),
    updatedAt: iso("2025-11-06"),
  },
  {
    id: "n2",
    slug: "trailer-2-everything-revealed",
    title: "Trailer 2 Breakdown: Everything Rockstar Revealed",
    description:
      "The second official trailer for GTA 6 arrived on May 6, 2025, expanding the cast and showing far more of the state of Leonida.",
    excerpt:
      "From Jason and Lucia's relationship to a sun-soaked tour of Leonida, the second trailer gave the deepest look yet at GTA 6.",
    body: "Rockstar released the second official trailer for Grand Theft Auto VI on May 6, 2025, alongside dozens of new screenshots — its deepest look at Leonida yet.\n\nLocations: the trailer toured Vice City's neon nightlife, the Everglades-style swamps of Grassrivers, the faded coast of Port Gellhorn, the industrial town of Ambrosia, and the island chain of the Leonida Keys.\n\nStory: a bank robbery appears to kick off the plot, Lucia is shown out on parole with an ankle monitor, and corrupt police recur throughout. Rockstar published bios for Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista and Brian Heder.\n\nGraphics: the trailer showed a major technical leap — vastly improved hair physics, high-quality water with real-time deformation, enormous draw distances, and detailed lighting and shadows.",
    category: "Trailer",
    author: "Coverage Team",
    images: ["news-trailer2", "news-trailer2-b", "news-trailer2-c"],
    status: "confirmed",
    readMinutes: 7,
    trending: true,
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-07"),
  },
  {
    id: "n3",
    slug: "jason-and-lucia-dual-protagonists",
    title: "Meet Jason and Lucia: GTA 6's Dual Protagonists",
    description:
      "For the first time in the series, Grand Theft Auto VI stars a playable female lead — Lucia — alongside her partner Jason.",
    excerpt:
      "Rockstar frames Jason and Lucia as a modern Bonnie-and-Clyde duo whose partnership anchors the story.",
    body: "Grand Theft Auto VI centers on two protagonists: Jason Duval and Lucia Caminos. Lucia is the first female protagonist in the mainline series, introduced in the first trailer inside a Leonida correctional facility.\n\nRockstar has described the pair as partners bound together by circumstance and loyalty — a relationship the studio has likened to a modern Bonnie and Clyde. The dual-protagonist structure builds on the character-switching foundations of Grand Theft Auto V, though Rockstar has not detailed exactly how switching will work this time.",
    category: "Characters",
    author: "Story Desk",
    images: ["news-jason-lucia", "news-duo-2"],
    status: "confirmed",
    readMinutes: 5,
    trending: true,
    createdAt: iso("2023-12-05"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "n4",
    slug: "leonida-state-confirmed-locations",
    title: "The State of Leonida: Every Confirmed Region",
    description:
      "Vice City is just the start — Rockstar has named several regions across the fictional state of Leonida.",
    excerpt:
      "Vice City, the Leonida Keys, Grassrivers, Port Gellhorn and more make up the largest world Rockstar has built.",
    body: "Grand Theft Auto VI is set in the fictional U.S. state of Leonida, inspired by Florida. Its centerpiece is a modern Vice City, but Rockstar's trailers and website point to a far wider map.\n\nNamed regions include the island chain of the Leonida Keys, the wetlands of Grassrivers, the faded coastal town of Port Gellhorn, and other areas across the state. Rockstar has called it the largest and most detailed world it has ever created.",
    category: "World",
    author: "Map Team",
    images: ["news-leonida", "news-leonida-2"],
    status: "trailer_inferred",
    readMinutes: 6,
    trending: false,
    createdAt: iso("2025-05-09"),
    updatedAt: iso("2025-05-10"),
  },
  {
    id: "n5",
    slug: "gta-6-pc-version-what-we-know",
    title: "GTA 6 on PC: What We Know (and Don't)",
    description:
      "A PC version has not been confirmed for launch. Here's why most expect it to follow — and when.",
    excerpt:
      "History suggests a PC port arrives after the console launch, but Rockstar has made no PC announcement.",
    body: "As of now, Grand Theft Auto VI is confirmed only for PlayStation 5 and Xbox Series X|S. Rockstar has not announced a PC version.\n\nThat mirrors the studio's pattern: Grand Theft Auto V launched on consoles in 2013 and only reached PC in 2015. Most observers expect a PC release to follow GTA VI's console debut, but any timing remains pure speculation until Rockstar says otherwise.",
    category: "Platforms",
    author: "Tech Desk",
    images: ["news-pc"],
    status: "speculation",
    readMinutes: 4,
    trending: false,
    createdAt: iso("2025-11-08"),
    updatedAt: iso("2025-11-08"),
  },
  {
    id: "n6",
    slug: "gta-online-future-after-gta-6",
    title: "What Happens to GTA Online After GTA 6?",
    description:
      "Rockstar has been quiet on online plans for GTA 6 — but the community has plenty of theories.",
    excerpt:
      "An evolving online mode seems likely given GTA Online's success, though nothing has been confirmed.",
    body: "Grand Theft Auto Online became one of the most successful live-service games of its era, so attention naturally turns to what an online component for GTA VI might look like.\n\nRockstar has not detailed any online plans for Grand Theft Auto VI. Everything from a fresh online world to continued support for the existing GTA Online remains speculation at this stage.",
    category: "Online",
    author: "Community Desk",
    images: ["news-online"],
    status: "speculation",
    readMinutes: 3,
    trending: false,
    createdAt: iso("2025-12-01"),
    updatedAt: iso("2025-12-01"),
  },
  {
    id: "n7",
    slug: "gta-6-graphics-new-rage-engine",
    title: "GTA 6 Graphics: Inside the New RAGE Engine",
    description:
      "Trailer 2 revealed a generational leap — ray tracing, lifelike water, hair physics, and procedural detail.",
    excerpt:
      "From ray-traced global illumination to deformable water and improved hair physics, GTA 6 pushes Rockstar's RAGE engine to a new level.",
    body: "Trailer 2 and Rockstar's screenshots showcased a major technical leap on a new version of the RAGE engine (informally dubbed 'RAGE 9' by the community).\n\nWater is rendered with high-quality meshes that deform realistically as boats cut through them, with translucency that varies by water type. Shadows are detailed enough to capture individual hair strands and netted windows without shimmering, and large panning shots reveal huge draw distances with smooth world streaming.\n\nRockstar developers have teased cutting-edge tech including ray tracing, ray-traced global illumination, and procedural generation for objects and environments. Hair physics in particular saw a dramatic improvement over Trailer 1.",
    category: "Tech",
    author: "Tech Desk",
    images: ["news-graphics"],
    status: "trailer_inferred",
    readMinutes: 6,
    trending: true,
    createdAt: iso("2025-05-15"),
    updatedAt: iso("2025-05-15"),
  },
  {
    id: "n8",
    slug: "gta-6-pre-orders-editions-detailed",
    title: "GTA 6 Pre-Orders & Editions Detailed",
    description:
      "Pre-orders opened June 25, 2026 with two editions and a Vintage Vice City bonus pack.",
    excerpt:
      "Standard ($79.99) and Ultimate ($99.99) editions, plus a Vintage Vice City Pack for all pre-orders — no Collector's Edition this time.",
    body: "Rockstar opened Grand Theft Auto VI pre-orders on June 25, 2026 across the PlayStation Store, Microsoft Store, Rockstar Games Store, and global retailers.\n\nTwo editions are available: the Standard Edition at $79.99 and the Ultimate Edition at $99.99, which adds premium vehicles, weapons, apparel, and story content woven across the game. There is no Special or Collector's Edition.\n\nEvery pre-order includes the Vintage Vice City Pack — a '55 Vapid Stanier, an Ocean Beach garage, and vintage outfits for Jason and Lucia. The game launches November 19, 2026 on PS5, PS5 Pro, and Xbox Series X|S; physical copies (a code in a box) hit retail from November 12 to support pre-loading.",
    category: "Release",
    author: "Editorial Desk",
    images: ["news-preorder"],
    status: "confirmed",
    readMinutes: 4,
    trending: true,
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "n9",
    slug: "gta-6-plays-best-on-ps5-sony",
    title: "Sony Says GTA 6 'Plays Best on PS5'",
    description:
      "Sony is touting PS5-specific perks for GTA 6 — DualSense haptics, 3D audio, and ultra-fast load times.",
    excerpt:
      "DualSense haptic feedback, Tempest 3D AudioTech, and near-instant SSD load times headline Sony's GTA 6 pitch — though how much differs from Xbox is unclear.",
    body: "Posts circulating from the community point to Sony promoting PlayStation 5 as the best way to play Grand Theft Auto VI, reportedly via a PlayStation Blog post.\n\nThe highlighted perks include the DualSense controller's haptic feedback and integrated speaker, Tempest 3D AudioTech to 'surround yourself in the distinct soundscapes of Leonida,' and near-instant load times thanks to the PS5's ultra-high-speed SSD.\n\nIt's worth noting these are platform-marketing points, and it isn't yet clear how much the experience will actually differ from the Xbox Series X|S version. Rockstar has not detailed platform-specific features itself.",
    category: "Platforms",
    author: "Platforms Desk",
    images: ["news-ps5"],
    status: "speculation",
    readMinutes: 4,
    trending: true,
    createdAt: iso("2026-06-28"),
    updatedAt: iso("2026-06-28"),
  },
  {
    id: "n10",
    slug: "gta-6-map-size-comparison",
    title: "How Big Is GTA 6's Map? ~4x Larger Than GTA V",
    description:
      "Community estimates put Leonida at roughly 125 km²+ — about four times the size of GTA V's map.",
    excerpt:
      "Based on leaks and community analysis, GTA 6's Leonida is estimated at ~125 km²+, dwarfing GTA V (~81 km²) and every previous entry.",
    body: "Map-size comparisons making the rounds estimate Grand Theft Auto VI's state of Leonida at roughly 125 km² or more — about four times the size of GTA V's ~81 km² map, and far larger than San Andreas (~36 km²) or the original Vice City (~16 km²).\n\nThese figures are estimates based on in-game data, developer leaks, and community analysis, not official numbers. Rockstar has only said Leonida is the largest and most detailed world it has built. Treat exact sizes as unconfirmed until launch.",
    category: "World",
    author: "Map Team",
    images: ["news-mapsize"],
    status: "speculation",
    readMinutes: 3,
    trending: true,
    createdAt: iso("2026-06-28"),
    updatedAt: iso("2026-06-28"),
  },
  {
    id: "n11",
    slug: "vice-city-stanier-returns",
    title: "Vice City's Iconic Stanier Returns in GTA 6",
    description:
      "The classic Vapid Stanier sedan makes its comeback — and you can get a vintage '55 model free with pre-orders.",
    excerpt:
      "A staple since the original Vice City, the Stanier returns in GTA 6, with a vintage '55 Vapid Stanier bundled into the pre-order Vintage Vice City Pack.",
    body: "The Vapid Stanier — a Grand Theft Auto staple since the original Vice City era — is making its return in GTA 6.\n\nA vintage '55 Vapid Stanier is confirmed as part of the Vintage Vice City Pack included with every pre-order, alongside an Ocean Beach garage. It's the first GTA 6 vehicle Rockstar has named, and a nod to longtime fans of the series' Miami-inspired roots.",
    category: "Vehicles",
    author: "Garage",
    images: ["news-stanier"],
    status: "confirmed",
    readMinutes: 3,
    trending: false,
    createdAt: iso("2026-06-28"),
    updatedAt: iso("2026-06-28"),
  },
  {
    id: "n12",
    slug: "gta-6-preorders-smash-records",
    title: "GTA 6 Pre-Orders Smash Records",
    description:
      "Reports point to 39 million+ copies and over $3 billion in GTA 6 pre-orders — with PS5 reportedly leading Xbox.",
    excerpt:
      "Insiders report 39M+ copies and $3B+ in pre-order revenue months before launch; Amazon sold out of PS5 copies and Xbox disputes the PS5-dominance claims.",
    body: "Early reports suggest Grand Theft Auto VI is breaking pre-order records. Industry insiders cited by multiple outlets claim more than 39 million copies have been pre-ordered worldwide, generating over $3 billion in revenue — months before the game even launches.\n\nPlayStation 5 appears to be leading: affiliate-tracking data suggested PS5 outselling Xbox by as much as 6-to-1 (some reports said 8-to-1), and Amazon temporarily sold out of PS5 copies. Microsoft pushed back — an Xbox spokesperson said those figures reflect affiliate-link clicks rather than actual purchases, and that Xbox had 'record orders' of its own.\n\nNeither Sony, Microsoft, nor Take-Two has released official pre-order numbers, so exact platform splits remain unconfirmed until after the November 19, 2026 launch. Take-Two stock also dipped amid investor questions over the game's higher price point.",
    category: "Sales",
    author: "Editorial Desk",
    images: ["news-preorder-records"],
    status: "speculation",
    readMinutes: 4,
    trending: true,
    createdAt: iso("2026-06-29"),
    updatedAt: iso("2026-06-29"),
  },
  {
    id: "n13",
    slug: "gta-6-soundtrack-v-rock-leaks",
    title: "GTA 6 Soundtrack: V-Rock Returns as New Tracks Leak",
    description:
      "Trailers confirmed a retro song lineup and the return of V-Rock — and now artists are leaking their own GTA 6 contributions.",
    excerpt:
      "Six trailer-confirmed songs and V-Rock's return are joined by leaked claims from Panama and Neon Indian about tracks they've made for GTA 6.",
    body: "Music is heating up as GTA 6's launch nears. So far, six songs have appeared in official trailers — tracks from Tom Petty, The Pointer Sisters, Wang Chung, Tammy Wynette, Zenglen, and Jay Ferguson — and the classic V-Rock radio station looks set to return, after Jason was spotted wearing a V-Rock shirt in promotional footage.\n\nBeyond the official drops, artists have started hinting at their own involvement. Panama reportedly said (in a since-deleted post) that a song called 'Back to Life,' written with Poolside, will feature in GTA 6, and Neon Indian — who appeared in GTA 5 — teased further work with Rockstar.\n\nThese artist claims are unconfirmed leaks, not official announcements. Rockstar is expected to reveal more songs and radio stations gradually ahead of the November 19, 2026 launch.",
    category: "Music",
    author: "Audio Desk",
    images: ["news-soundtrack"],
    status: "trailer_inferred",
    readMinutes: 4,
    trending: true,
    createdAt: iso("2026-06-29"),
    updatedAt: iso("2026-06-29"),
  },
];

// ===========================================================================
// GUIDES
// ===========================================================================
export const GUIDES: Guide[] = [
  {
    id: "g1",
    slug: "gta-6-release-date-everything-confirmed",
    title: "GTA 6 Release Date: Everything Confirmed",
    description:
      "The full timeline — from the 2023 reveal to the confirmed November 19, 2026 launch.",
    body: "Grand Theft Auto VI was first revealed on December 4, 2023 with its debut trailer. A second trailer on May 6, 2025 announced a release window of May 26, 2026, which Rockstar later moved to its confirmed date of November 19, 2026.\n\nThe game launches on PlayStation 5 and Xbox Series X|S. No PC version has been announced for launch.",
    category: "Release",
    difficulty: "Beginner",
    featured: true,
    images: ["guide-release", "guide-release-2"],
    status: "confirmed",
    createdAt: iso("2025-11-07"),
    updatedAt: iso("2025-11-07"),
  },
  {
    id: "g2",
    slug: "who-are-jason-and-lucia",
    title: "Who Are Jason and Lucia? Protagonists Explained",
    description:
      "Everything Rockstar has revealed about GTA 6's dual leads and their relationship.",
    body: "Jason Duval and Lucia Caminos are the two playable protagonists of Grand Theft Auto VI. Lucia is the series' first female lead.\n\nRockstar's bios describe Jason as someone who grew up around grifters and wants an easy life, and Lucia as someone who has fought for everything she has. Their partnership drives the story.",
    category: "Characters",
    difficulty: "Beginner",
    featured: true,
    images: ["guide-protagonists"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "g3",
    slug: "leonida-regions-and-real-world-inspirations",
    title: "Leonida Regions & Their Real-World Inspirations",
    description:
      "A tour of every named region in Leonida and the Florida locations that inspired them.",
    body: "Leonida is modeled on Florida. Vice City draws on Miami; the Leonida Keys mirror the Florida Keys; Grassrivers evokes the Everglades; and Port Gellhorn channels the Florida Panhandle.\n\nThis guide breaks down each named area, what we've seen of it, and how it maps to the real world.",
    category: "World",
    difficulty: "Intermediate",
    featured: true,
    images: ["guide-leonida", "guide-leonida-2"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-12"),
    updatedAt: iso("2025-05-12"),
  },
  {
    id: "g4",
    slug: "gta-6-platforms-and-system-requirements",
    title: "GTA 6 Platforms & System Requirements",
    description:
      "Which consoles run GTA 6 at launch, and what we can guess about an eventual PC release.",
    body: "Grand Theft Auto VI launches on PlayStation 5 and Xbox Series X|S. There is no last-gen (PS4 / Xbox One) version.\n\nA PC release has not been announced. Any PC system requirements are pure speculation until Rockstar confirms a port.",
    category: "Platforms",
    difficulty: "Beginner",
    featured: false,
    images: ["guide-platforms"],
    status: "confirmed",
    createdAt: iso("2025-11-09"),
    updatedAt: iso("2025-11-09"),
  },
  {
    id: "g5",
    slug: "trailer-1-vs-trailer-2-what-changed",
    title: "Trailer 1 vs Trailer 2: What Changed",
    description:
      "Side-by-side analysis of the two official trailers and the new details the second one revealed.",
    body: "The first trailer (December 2023) introduced Vice City, Lucia, and the tone of the game. The second trailer (May 2025) widened the lens — showing more of Leonida, a larger supporting cast, and a major visual leap.\n\nThis guide compares the two shot by shot.",
    category: "Analysis",
    difficulty: "Advanced",
    featured: false,
    images: ["guide-trailers"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-14"),
    updatedAt: iso("2025-05-14"),
  },
  {
    id: "g6",
    slug: "gta-6-pre-order-and-editions",
    title: "GTA 6 Pre-Orders & Editions: What to Expect",
    description:
      "Pre-orders aren't live yet — here's what Rockstar's past launches suggest may be coming.",
    body: "Rockstar has not opened pre-orders or detailed special editions for Grand Theft Auto VI. Based on prior launches, expect standard and premium editions with in-game bonuses to be announced closer to release.\n\nTreat any edition details circulating now as unconfirmed.",
    category: "Buying",
    difficulty: "Beginner",
    featured: false,
    images: ["guide-preorder"],
    status: "speculation",
    createdAt: iso("2025-12-02"),
    updatedAt: iso("2025-12-02"),
  },
];

// ===========================================================================
// VEHICLES
// Specific vehicles have not been officially named by Rockstar. Entries below
// describe vehicle archetypes seen in the trailers; statuses reflect that.
// ===========================================================================
export const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    slug: "grotti-cheetah-95",
    title: "Grotti Cheetah '95",
    description:
      "A mid-'90s mid-engine exotic — the Cheetah returns, channeling the Ferrari Testarossa and 512 BB.",
    body: "Confirmed in the Ultimate Edition lineup, the Grotti Cheetah '95 is a classic mid-engine supercar inspired by the Ferrari Testarossa and 512 BB. Performance figures are estimates pending official stats.",
    class: "Sports Classics",
    topSpeed: 195,
    manufacturer: "Grotti",
    images: ["/images/vehicles/grotti-cheetah-95.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v2",
    slug: "schyster-deviant",
    title: "Schyster Deviant",
    description:
      "Early-'70s American muscle inspired by the 1972 AMC Javelin.",
    body: "An Ultimate Edition muscle car drawing on the 1972 AMC Javelin — long hood, aggressive stance, classic V8 energy.",
    class: "Muscle",
    topSpeed: 130,
    manufacturer: "Schyster",
    images: ["/images/vehicles/schyster-deviant.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v3",
    slug: "vapid-dominator-buggy-67",
    title: "Vapid Dominator Buggy '67",
    description:
      "An off-road build of a first-generation Ford Mustang — rugged and trail-ready.",
    body: "Part of the Ultimate Edition pack, the Dominator Buggy '67 reimagines a first-generation Ford Mustang as a raw off-road machine.",
    class: "Off-Road",
    topSpeed: 120,
    manufacturer: "Vapid",
    images: ["/images/vehicles/vapid-dominator-buggy-67.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v4",
    slug: "dinka-enduro",
    title: "Dinka Enduro",
    description:
      "A dual-sport motorcycle inspired by classic Honda XL350, XR500 and CB models.",
    body: "An Ultimate Edition dual-sport bike channeling vintage Honda XL350, XR500 and CB motorcycles — equally at home on road and trail.",
    class: "Motorcycle",
    topSpeed: 95,
    manufacturer: "Dinka",
    images: ["/images/vehicles/dinka-enduro.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v5",
    slug: "crest-kayak",
    title: "Crest Kayak",
    description:
      "A paddle kayak for exploring Leonida's waterways — based on the Crescent Kayak.",
    body: "An Ultimate Edition watercraft based on the Crescent Kayak, ideal for quietly navigating the wetlands and coast of Leonida.",
    class: "Boat",
    topSpeed: 8,
    manufacturer: "Crest",
    images: ["/images/vehicles/crest-kayak.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v6",
    slug: "declasse-mamba-gt",
    title: "Declasse Mamba GT",
    description:
      "A '60s racing coupe inspired by the Shelby Daytona Coupe.",
    body: "An Ultimate Edition sports classic modeled on the Shelby Daytona Coupe — a sleek, race-bred grand tourer.",
    class: "Sports Classics",
    topSpeed: 160,
    manufacturer: "Declasse",
    images: ["/images/vehicles/declasse-mamba-gt.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v7",
    slug: "vapid-riata-classic",
    title: "Vapid Riata Classic",
    description:
      "A classic off-road SUV channeling the first-generation Ford Bronco.",
    body: "An Ultimate Edition SUV inspired by the first-generation Ford Bronco — boxy, capable, and built for the backcountry.",
    class: "SUV",
    topSpeed: 105,
    manufacturer: "Vapid",
    images: ["/images/vehicles/vapid-riata-classic.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v8",
    slug: "sirius",
    title: "Sirius",
    description:
      "A 1970s muscle car inspired by the 1970 Mercury Cougar.",
    body: "An Ultimate Edition muscle car drawing on the 1970 Mercury Cougar — long, low, and unmistakably American.",
    class: "Muscle",
    topSpeed: 135,
    manufacturer: "Unconfirmed",
    images: ["/images/vehicles/sirius.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v9",
    slug: "shitzu-squalo",
    title: "Shitzu Squalo",
    description:
      "A sleek speedboat for tearing across the Leonida coast.",
    body: "An Ultimate Edition speedboat built for the open water around Vice City and the Leonida Keys.",
    class: "Boat",
    topSpeed: 90,
    manufacturer: "Shitzu",
    images: ["/images/vehicles/shitzu-squalo.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
  {
    id: "v10",
    slug: "vapid-stanier-55",
    title: "Vapid Stanier '55",
    description:
      "A vintage 1955 sedan — free with every pre-order via the Vintage Vice City Pack.",
    body: "The '55 Vapid Stanier is a classic 1950s sedan included with every pre-order as part of the Vintage Vice City Pack, alongside an Ocean Beach garage. It's the first GTA 6 vehicle Rockstar named.",
    class: "Sedan",
    topSpeed: 90,
    manufacturer: "Vapid",
    images: ["/images/vehicles/vapid-stanier-55.jpg"],
    status: "confirmed",
    createdAt: iso("2026-06-25"),
    updatedAt: iso("2026-06-25"),
  },
];

// ===========================================================================
// CHARACTERS
// Names and descriptions reflect Rockstar's official character bios.
// ===========================================================================
export const CHARACTERS: Character[] = [
  {
    id: "c1",
    slug: "lucia-caminos",
    title: "Lucia Caminos",
    description:
      "The series' first female protagonist — out on parole with everything to prove.",
    body: "Lucia Caminos is one of two playable protagonists in Grand Theft Auto VI and the first female lead in the mainline series. Introduced in the first trailer leaving a Leonida correctional facility, she's out on parole — an ankle monitor appears in several Trailer 2 scenes, a reminder she's still being watched. Her relationship with Jason is the emotional core of the story, a partnership Rockstar frames as a modern Bonnie and Clyde.",
    role: "Protagonist",
    affiliation: "Jason & Lucia",
    images: ["/images/characters/lucia-caminos.jpg"],
    status: "confirmed",
    createdAt: iso("2023-12-04"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c2",
    slug: "jason-duval",
    title: "Jason Duval",
    description:
      "Lucia's partner — ex-Army, now running jobs for a Keys drug smuggler and wanting out.",
    body: "Jason Duval is the second playable protagonist. He grew up around criminals, joined the US Army to try to straighten his life out, and ended up in the Leonida Keys doing jobs for drug smuggler Brian Heder — living rent-free in exchange for dirty work. He wants an easy life, but trouble keeps finding him and Lucia.",
    role: "Protagonist",
    affiliation: "Jason & Lucia",
    images: ["/images/characters/jason-duval.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c3",
    slug: "cal-hampton",
    title: "Cal Hampton",
    description:
      "Jason's loyal buddy — happiest at home with a beer and the Coast Guard radio.",
    body: "Cal Hampton is Jason's friend who feels safest at home, drinking beers and listening to Coast Guard comms. Loyal but not the ambitious type, he's Jason's connection to chatter and information from the fringes.",
    role: "Associate",
    affiliation: "Jason's circle",
    images: ["/images/characters/cal-hampton.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c4",
    slug: "boobie-ike",
    title: "Boobie Ike",
    description:
      "A Vice City legend who turned street life into real estate, a strip club, and a record label.",
    body: "Boobie Ike is a Vice City legend who turned the street life into real business — real estate, a strip club called the Jack of Hearts, and a recording studio. He's partnered with music hustler Dre'Quan Priest.",
    role: "Businessman",
    affiliation: "Vice City",
    images: ["/images/characters/boobie-ike.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c5",
    slug: "drequan-priest",
    title: "Dre'Quan Priest",
    description:
      "A music hustler running Only Raw Records, betting on the rap duo Real Dimez.",
    body: "Dre'Quan Priest is a music hustler who runs Only Raw Records and signed the viral rap duo Real Dimez. Partnered with Boobie Ike, he's chasing a breakout out of Leonida's music scene.",
    role: "Music Mogul",
    affiliation: "Only Raw Records",
    images: ["/images/characters/drequan-priest.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c6",
    slug: "real-dimez",
    title: "Real Dimez",
    description:
      "The viral rap duo signed to Only Raw Records.",
    body: "Real Dimez is a rap duo signed to Dre'Quan Priest's Only Raw Records — internet-famous performers riding their viral moment in Leonida's music scene.",
    role: "Rap Duo",
    affiliation: "Only Raw Records",
    images: ["/images/characters/real-dimez.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c7",
    slug: "raul-bautista",
    title: "Raul Bautista",
    description:
      "A bank robber assembling the crew for the score that kicks off the story.",
    body: "Raul Bautista is an experienced robber putting together a crew for ambitious jobs. The bank robbery he sets up looks to be the heist that kicks off the whole story — pulling Jason and Lucia toward serious risk.",
    role: "Robber",
    affiliation: "Bautista crew",
    images: ["/images/characters/raul-bautista.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c8",
    slug: "brian-heder",
    title: "Brian Heder",
    description:
      "The older drug smuggler Jason works for in the Keys.",
    body: "Brian Heder is an older drug smuggler operating out of the Leonida Keys. He lets Jason live rent-free in exchange for doing his dirty work — one of the figures whose business pulls Jason deeper in.",
    role: "Smuggler",
    affiliation: "Leonida Keys",
    images: ["/images/characters/brian-heder.jpg"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
];

// ===========================================================================
// LOCATIONS — coordinates are 0-100 percentages on the interactive map.
// ===========================================================================
export const LOCATIONS: Location[] = [
  {
    id: "l1",
    slug: "vice-city",
    title: "Vice City",
    description:
      "Rockstar's modern reimagining of Miami — the neon-soaked heart of Leonida.",
    body: "Vice City returns as the centerpiece of Grand Theft Auto VI — a modern reimagining of Miami and the primary urban center of Leonida. Beaches, Art Deco facades, nightlife, and a dense, vertical skyline define the city at the heart of the map.",
    region: "Vice City",
    type: "City",
    coordinates: { x: 64, y: 68 },
    images: ["loc-vicecity", "loc-vicecity-2"],
    status: "confirmed",
    createdAt: iso("2023-12-04"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l2",
    slug: "leonida-keys",
    title: "Leonida Keys",
    description:
      "An island chain based on the Florida Keys — Jason's home turf.",
    body: "The Leonida Keys are an island chain based on the real Florida Keys, with scenic coastal highways linking sun-bleached islands. It's where Jason lives at the start of the game, running jobs for smuggler Brian Heder.",
    region: "Leonida Keys",
    type: "Islands",
    coordinates: { x: 58, y: 90 },
    images: ["loc-keys"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l3",
    slug: "grassrivers",
    title: "Grassrivers",
    description:
      "Rockstar's take on the Everglades — swamps, marshland, and isolated rural communities.",
    body: "Grassrivers is Leonida's wetlands region, inspired by the Florida Everglades: swamps, marshland, slow-moving rivers, cypress forests, and isolated rural communities. Trailer footage shows airboats skimming across the water.",
    region: "Grassrivers",
    type: "Wetlands",
    coordinates: { x: 46, y: 76 },
    images: ["loc-grassrivers"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l4",
    slug: "port-gellhorn",
    title: "Port Gellhorn",
    description:
      "Leonida's 'forgotten coast' — cheap motels, shut-down attractions, and empty strip malls.",
    body: "Port Gellhorn is Leonida's forgotten coast — a grittier counterpoint to Vice City's glamour, with cheap motels, shuttered roadside attractions, and empty strip malls along a faded panhandle shoreline.",
    region: "Port Gellhorn",
    type: "Town",
    coordinates: { x: 22, y: 26 },
    images: ["loc-portgellhorn"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l5",
    slug: "ambrosia",
    title: "Ambrosia",
    description:
      "Old-school industrial heartland — home to the Allied Crystal sugar refinery.",
    body: "Ambrosia is where American industry and old-school values reign — inland country anchored by the Allied Crystal sugar refinery. It's described as 'what's keeping Leonida sweet,' a working-town contrast to the glitz of the coast.",
    region: "Ambrosia",
    type: "Town",
    coordinates: { x: 40, y: 48 },
    images: ["loc-ambrosia"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l6",
    slug: "mount-kalliga",
    title: "Mount Kalaga",
    description:
      "Leonida's elevated highlands — forests, lakes, and dangerous wildlife.",
    body: "Mount Kalaga is Leonida's highland region — forested terrain with lakes, rivers, and mountains, often compared to Red Dead Redemption 2's Ambarino. Expect dangerous wildlife including bears and panthers far from the city lights.",
    region: "Mount Kalaga",
    type: "Wilderness",
    coordinates: { x: 52, y: 30 },
    images: ["loc-kalliga"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
];

// ===========================================================================
// HOMEPAGE CAROUSEL — latest verified updates
// ===========================================================================
export const CAROUSEL: CarouselItem[] = [
  {
    id: "ci1",
    title: "GTA 6 Launches November 19, 2026",
    category: "Release",
    image: "news-release-date",
    date: iso("2025-11-06"),
    href: "/news/gta-6-release-date-november-19-2026",
    status: "confirmed",
    order: 1,
    active: true,
  },
  {
    id: "ci2",
    title: "Trailer 2: Everything Rockstar Revealed",
    category: "Trailer",
    image: "news-trailer2",
    date: iso("2025-05-06"),
    href: "/news/trailer-2-everything-revealed",
    status: "confirmed",
    order: 2,
    active: true,
  },
  {
    id: "ci3",
    title: "Meet Jason & Lucia, the Dual Protagonists",
    category: "Characters",
    image: "news-jason-lucia",
    date: iso("2023-12-05"),
    href: "/news/jason-and-lucia-dual-protagonists",
    status: "confirmed",
    order: 3,
    active: true,
  },
  {
    id: "ci4",
    title: "The State of Leonida: Confirmed Regions",
    category: "World",
    image: "news-leonida",
    date: iso("2025-05-09"),
    href: "/news/leonida-state-confirmed-locations",
    status: "trailer_inferred",
    order: 4,
    active: true,
  },
];
