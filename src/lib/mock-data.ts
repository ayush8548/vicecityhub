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
    body: "Rockstar released the second official trailer for Grand Theft Auto VI on May 6, 2025. It expanded heavily on the world of Leonida — a fictional state inspired by Florida — and introduced a wider supporting cast alongside leads Jason and Lucia.\n\nThe trailer showcased Vice City's neon nightlife, the swamps and wetlands of the interior, the island chain of the Leonida Keys, and a range of characters tied to the criminal underworld. Rockstar also published character bios on its website the same day, naming figures such as Cal Hampton, Boobie Ike, Dre'Quan Priest, Raul Bautista and Brian Heder.",
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
    slug: "vice-city-convertible",
    title: "Vintage Convertible",
    description:
      "A classic drop-top cruising Vice City's beachfront — a recurring image in both trailers.",
    body: "Open-top convertibles feature prominently in GTA 6's marketing, cruising Ocean Drive against neon and palms. Rockstar has not named specific models, so exact stats are estimates based on the archetype.",
    class: "Convertible",
    topSpeed: 130,
    manufacturer: "Unconfirmed",
    images: ["vehicle-convertible"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "v2",
    slug: "muscle-car",
    title: "American Muscle Car",
    description:
      "Aggressive two-door muscle, a staple of the series, glimpsed throughout the trailers.",
    body: "Muscle cars are a Grand Theft Auto staple and appear in GTA 6 footage. No specific model has been confirmed; performance figures here are indicative of the class.",
    class: "Muscle",
    topSpeed: 140,
    manufacturer: "Unconfirmed",
    images: ["vehicle-muscle"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "v3",
    slug: "exotic-supercar",
    title: "Exotic Supercar",
    description:
      "Low-slung, mid-engine exotics for the high-roller side of Leonida — expected to return.",
    body: "Supercars have headlined every modern GTA. While none are officially named for GTA 6 yet, the class is all but certain to return. Stats shown are placeholders for the archetype.",
    class: "Super",
    topSpeed: 165,
    manufacturer: "Unconfirmed",
    images: ["vehicle-super"],
    status: "speculation",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "v4",
    slug: "street-motorcycle",
    title: "Street Motorcycle",
    description:
      "Nimble two-wheelers for weaving through Vice City traffic, seen in trailer footage.",
    body: "Motorcycles appear in GTA 6 footage and are a longtime series fixture. Specific bikes have not been named; figures here reflect the class.",
    class: "Motorcycle",
    topSpeed: 150,
    manufacturer: "Unconfirmed",
    images: ["vehicle-motorcycle"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "v5",
    slug: "airboat",
    title: "Swamp Airboat",
    description:
      "Fan-powered flat-bottom boats built for the shallow wetlands of Grassrivers.",
    body: "The trailers show airboats skimming across the wetlands of Leonida's interior — a vehicle type well suited to the Everglades-inspired Grassrivers region. Specifics are unconfirmed.",
    class: "Boat",
    topSpeed: 70,
    manufacturer: "Unconfirmed",
    images: ["vehicle-airboat"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "v6",
    slug: "pickup-truck",
    title: "Off-Road Pickup",
    description:
      "Rugged pickups for the rural backroads and swamps beyond the city limits.",
    body: "Pickups and off-roaders fit Leonida's rural interior and appear in trailer scenes outside the city. No models are officially confirmed; stats are indicative.",
    class: "Off-Road",
    topSpeed: 110,
    manufacturer: "Unconfirmed",
    images: ["vehicle-pickup"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
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
      "The series' first female protagonist — tough, loyal, and fighting for a way out.",
    body: "Lucia Caminos is one of the two playable protagonists of Grand Theft Auto VI and the first female lead in the mainline series. Introduced in the first trailer inside a Leonida correctional facility, Rockstar describes her as someone who has had to fight for everything she has. Her loyalty to Jason anchors the story.",
    role: "Protagonist",
    affiliation: "Jason & Lucia",
    images: ["char-lucia", "char-lucia-2"],
    status: "confirmed",
    createdAt: iso("2023-12-04"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c2",
    slug: "jason-duval",
    title: "Jason Duval",
    description:
      "Lucia's partner — grew up around grifters and just wants an easy life that never comes.",
    body: "Jason Duval is the second playable protagonist of Grand Theft Auto VI. Rockstar's bio says he grew up around grifters and crooks and learned early that money has to come from somewhere. Living in the Leonida Keys, he wants a simple life — but trouble keeps finding him and Lucia.",
    role: "Protagonist",
    affiliation: "Jason & Lucia",
    images: ["char-jason", "char-jason-2"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c3",
    slug: "cal-hampton",
    title: "Cal Hampton",
    description:
      "A paranoid friend of Jason who's happiest behind a police scanner and a stack of conspiracies.",
    body: "Cal Hampton is described in Rockstar's bios as an associate of Jason who is most comfortable at home, monitoring radio chatter and chasing conspiracy theories. He provides a connection to information from the fringes.",
    role: "Associate",
    affiliation: "Jason's circle",
    images: ["char-cal"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c4",
    slug: "boobie-ike",
    title: "Boobie Ike",
    description:
      "A self-made businessman turning street credibility into real estate and a music empire.",
    body: "Boobie Ike is a Leonida businessman who, per Rockstar's bio, came up the hard way and is parlaying his reputation into legitimate ventures — including real estate and a recording studio tied to the local music scene.",
    role: "Businessman",
    affiliation: "Leonida underworld",
    images: ["char-boobie"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c5",
    slug: "drequan-priest",
    title: "Dre'Quan Priest",
    description:
      "An ambitious rap entrepreneur chasing a breakout out of Leonida's music scene.",
    body: "Dre'Quan Priest is an up-and-coming music entrepreneur connected to Boobie Ike's world. Rockstar frames him as someone with a real shot at turning local talent — including the duo Real Dimez — into something much bigger.",
    role: "Music Mogul",
    affiliation: "Leonida music scene",
    images: ["char-drequan"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c6",
    slug: "real-dimez",
    title: "Real Dimez",
    description:
      "A social-media-famous rap duo riding their viral moment for all it's worth.",
    body: "Real Dimez is a female rap duo tied to Dre'Quan Priest's ambitions. Rockstar's bios present them as internet-famous performers leveraging viral attention in Leonida's music scene.",
    role: "Rap Duo",
    affiliation: "Leonida music scene",
    images: ["char-realdimez"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c7",
    slug: "raul-bautista",
    title: "Raul Bautista",
    description:
      "A career robber assembling a crew for scores far bigger than he can pull alone.",
    body: "Raul Bautista is described by Rockstar as an experienced robber putting together a crew for increasingly ambitious jobs — a thread that pulls Jason and Lucia toward serious risk.",
    role: "Robber",
    affiliation: "Bautista crew",
    images: ["char-raul"],
    status: "confirmed",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "c8",
    slug: "brian-heder",
    title: "Brian Heder",
    description:
      "A drug-running operator working the waterways beyond the reach of the law.",
    body: "Brian Heder is a trafficker operating out of Leonida's coast and waterways, per Rockstar's character bios — one of the figures whose business intersects with Jason's.",
    role: "Trafficker",
    affiliation: "Leonida underworld",
    images: ["char-brian"],
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
      "The neon heart of Leonida — a sprawling coastal metropolis reborn for a new era.",
    body: "Vice City returns as the centerpiece of Grand Theft Auto VI: a modern metropolis inspired by Miami, full of beaches, Art Deco facades, nightlife, and a glittering skyline. It anchors the state of Leonida.",
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
      "A laid-back island chain off the southern coast — Jason's home turf.",
    body: "The Leonida Keys are an island chain inspired by the Florida Keys. Sun-bleached, slow-paced, and surrounded by water, the Keys are where Jason lives at the start of the game.",
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
      "Sprawling wetlands and swamp inspired by the Everglades — airboat country.",
    body: "Grassrivers is the wetlands region of Leonida, drawing on Florida's Everglades. Trailer footage shows airboats, marshland, and wildlife across its waterlogged interior.",
    region: "Grassrivers",
    type: "Wetlands",
    coordinates: { x: 46, y: 76 },
    images: ["loc-grassrivers"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l4",
    slug: "port-gellhorn",
    title: "Port Gellhorn",
    description:
      "A faded working-class coastal town in the north of the state.",
    body: "Port Gellhorn is a coastal town inspired by the Florida Panhandle — a grittier, working-class counterpoint to Vice City's glamour, named in Rockstar's materials.",
    region: "Port Gellhorn",
    type: "Town",
    coordinates: { x: 22, y: 26 },
    images: ["loc-portgellhorn"],
    status: "trailer_inferred",
    createdAt: iso("2025-05-06"),
    updatedAt: iso("2025-05-06"),
  },
  {
    id: "l5",
    slug: "ambrosia",
    title: "Ambrosia",
    description:
      "An inland community across Leonida's central stretch.",
    body: "Ambrosia is among the areas referenced for Leonida's interior. Details remain limited, but it points to the breadth of the state beyond Vice City.",
    region: "Ambrosia",
    type: "Town",
    coordinates: { x: 40, y: 48 },
    images: ["loc-ambrosia"],
    status: "speculation",
    createdAt: iso("2025-05-20"),
    updatedAt: iso("2025-05-20"),
  },
  {
    id: "l6",
    slug: "mount-kalliga",
    title: "Mount Kalliga",
    description:
      "Elevated wilderness and lookout country in the north of Leonida.",
    body: "Mount Kalliga represents Leonida's higher, wilder terrain — a contrast to the flat coast and wetlands. Specifics are still emerging from trailer analysis and community mapping.",
    region: "Mount Kalliga",
    type: "Wilderness",
    coordinates: { x: 52, y: 30 },
    images: ["loc-kalliga"],
    status: "speculation",
    createdAt: iso("2025-05-22"),
    updatedAt: iso("2025-05-22"),
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
