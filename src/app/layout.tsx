import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Queen's Domain Interactive Map & Weapon Guide",
    template: "%s | QD Map",
  },
  description:
    "Community interactive map and weapon guide for Queen's Domain (Steam game). Crystal Monuments, Wing Altars, and throwing weapon reference — no in-game map required.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "Queen's Domain map",
    "Queen's Domain interactive map",
    "Queen's Domain Crystal Monument",
    "Queen's Domain Wing Altar",
    "Queen's Domain weapons",
    "Queen's Domain throwing weapons",
    "no in-game map",
  ],
  openGraph: {
    title: "Queen's Domain Interactive Map & Weapon Guide",
    description:
      "Fan tool site: interactive map + weapons for Queen's Domain (Steam game). Not affiliated with the publisher.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Domain Interactive Map & Weapon Guide",
    description:
      "Interactive map and weapon guide for Queen's Domain (Steam game).",
    images: ["/og-placeholder.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-stone-200">
        <GoogleAnalytics />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
