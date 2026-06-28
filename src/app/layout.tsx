import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});
const condensed = Anton({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["400"],
});
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

import { SITE_URL, SITE_NAME } from "@/lib/site";

const TITLE = "ViceCityHub — The Premium GTA 6 Information Hub";
const DESCRIPTION =
  "Verified Grand Theft Auto VI news, deep databases for vehicles, characters, and locations, an interactive map of Leonida, trailers, and a community — the premium fan hub for GTA 6.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · ViceCityHub" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "GTA 6",
    "GTA VI",
    "Grand Theft Auto VI",
    "Vice City",
    "Leonida",
    "GTA 6 news",
    "GTA 6 release date",
    "GTA 6 map",
    "GTA 6 vehicles",
    "GTA 6 characters",
    "GTA 6 trailer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Verified GTA 6 news, deep databases, an interactive map, and a community.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
    },
    {
      "@type": "VideoGame",
      name: "Grand Theft Auto VI",
      alternateName: "GTA 6",
      gamePlatform: ["PlayStation 5", "Xbox Series X|S"],
      publisher: { "@type": "Organization", name: "Rockstar Games" },
      datePublished: "2026-11-19",
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${condensed.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
