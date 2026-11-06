import type { Metadata } from "next";
import { LandingGuide } from "@/components/landings/LandingGuide";
import { getLanding } from "@/lib/landings";
import { SITE_URL } from "@/lib/site";

const page = getLanding("fast-travel");
const url = `${SITE_URL}${page.path}`;

export const metadata: Metadata = {
  title: { absolute: page.absoluteTitle },
  description: page.description,
  alternates: { canonical: url },
  openGraph: {
    title: page.title,
    description: page.description,
    url,
    type: "article",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
  },
};

export default function FastTravelPage() {
  return <LandingGuide page={page} />;
}
