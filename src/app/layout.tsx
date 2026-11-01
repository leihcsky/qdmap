import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
  metadataBase: new URL("https://queensdomainmap.click"),
  title: {
    default: "Queen's Domain Interactive Map & Weapon Guide",
    template: "%s | QD Map",
  },
  description:
    "Community interactive map and weapon guide for Queen's Domain (Steam game). Crystal Monuments, Wing Altars, and throwing weapon reference — no in-game map required.",
  openGraph: {
    title: "Queen's Domain Interactive Map & Weapon Guide",
    description:
      "Fan tool site: interactive map + weapons for Queen's Domain (Steam game). Not affiliated with the publisher.",
    siteName: "Queen's Domain Map",
    type: "website",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Domain Interactive Map & Weapon Guide",
    description:
      "Interactive map and weapon guide for Queen's Domain (Steam game).",
    images: ["/og-placeholder.svg"],
  },
  robots: { index: true, follow: true },
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
