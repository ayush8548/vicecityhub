import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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

const SITE = "https://vicecityhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ViceCityHub — The Premium GTA 6 Information Hub",
    template: "%s · ViceCityHub",
  },
  description:
    "Verified Vice City updates, deep databases for vehicles, characters, and locations, an interactive map, and community tools — the premium fan hub for Grand Theft Auto VI.",
  keywords: [
    "GTA 6",
    "Grand Theft Auto VI",
    "Vice City",
    "Leonida",
    "GTA 6 news",
    "GTA 6 map",
    "GTA 6 vehicles",
    "GTA 6 characters",
  ],
  openGraph: {
    title: "ViceCityHub — The Premium GTA 6 Information Hub",
    description:
      "Verified Vice City updates, databases, an interactive map, and community tools.",
    url: SITE,
    siteName: "ViceCityHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViceCityHub — The Premium GTA 6 Information Hub",
    description: "Verified Vice City updates and deep GTA 6 databases.",
  },
  robots: { index: true, follow: true },
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
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
