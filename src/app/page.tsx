import type { Metadata } from "next";
import { MapPageView } from "@/components/map/MapPageView";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Queen's Domain Interactive Map (No In-Game Map) | QD Map",
  },
  description:
    "Interactive community map for Queen's Domain (Steam game): filter Crystal Monuments, Wing Altars, and landmarks on Isle of Neasied and Obmuer Temple, with How to find directions and a local Well Travelled checklist.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Queen's Domain Interactive Map (No In-Game Map)",
    description:
      "Find Crystal Monuments, Wing Altars, and landmarks. Local checklist for Well Travelled progress.",
    url: SITE_URL,
    type: "website",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Domain Interactive Map (No In-Game Map)",
    description:
      "Find Crystal Monuments, Wing Altars, and landmarks on Isle of Neasied and Obmuer Temple.",
  },
};

export default function HomePage() {
  return <MapPageView />;
}
