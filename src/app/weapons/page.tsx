import type { Metadata } from "next";
import { ResponsiveLeaderboard } from "@/components/ads/ResponsiveLeaderboard";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/components/PageFaq";
import { WeaponsGuide } from "@/components/weapons/WeaponsGuide";
import {
  WeaponsSeoContent,
  weaponFaqs,
} from "@/components/weapons/WeaponsSeoContent";
import { weaponsData } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const WEAPONS_URL = `${SITE_URL}/weapons`;

export const metadata: Metadata = {
  // Mild CTR polish only: keep the familiar brand phrase, surface "evolution"
  // (high-intent query) without a radical SERP rewrite.
  title: "Queen's Domain Weapon Evolution & Throwing Guide",
  description:
    "Queen's Domain weapon evolution paths and throwing weapon roles: Endu, Rusted Spear, Chakram, Occult Knife — where to find them, how Level 10 evolve works, and Find on map links.",
  alternates: {
    canonical: WEAPONS_URL,
  },
  openGraph: {
    title: "Queen's Domain Weapon Evolution & Throwing Guide",
    description:
      "Look up melee evolutions and compare throwing weapons by role — with Find on map links for key drops.",
    url: WEAPONS_URL,
    type: "website",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Domain Weapon Evolution & Throwing Guide",
    description:
      "Melee evolution paths and throwing weapon roles for Queen's Domain.",
  },
};

const JUMP_LINKS = [
  { href: "#melee-evolution", label: "Melee evolution" },
  { href: "#weapon-evolution", label: "How evolving works" },
  { href: "#evolution-paths", label: "Evolution paths" },
  { href: "#throwing-weapons", label: "Throwing weapons" },
  { href: "#throwing-guide", label: "How to pick a throwable" },
  { href: "#find-list", label: "Where to find" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function WeaponsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Queen's Domain Weapon Evolution & Throwing Guide",
          description:
            "Melee evolution and throwing weapon reference for Queen's Domain (Steam game).",
          isPartOf: {
            "@type": "WebSite",
            name: "Queen's Domain Map",
          },
          about: "Queen's Domain (Steam game)",
        }}
      />
      <JsonLd data={faqJsonLd(weaponFaqs)} />

      <header className="border-b border-stone-800 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Queen&apos;s Domain (Steam game) · Community tool
          </p>
          <h1 className="mt-2 font-display text-3xl text-amber-50 sm:text-4xl">
            Queen&apos;s Domain Weapon Evolution &amp; Throwing Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Look up Queen&apos;s Domain weapon evolution paths, see what your current
            melee weapon becomes at Level 10, find key arms in the world, and open
            Find on map for nearby landmarks like Endu Shrine or Deimpo Mausoleum.
          </p>
          <nav
            aria-label="On this page"
            className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm"
          >
            {JUMP_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <WeaponsGuide
        melee={weaponsData.meleeEvolution}
        throwing={weaponsData.throwing}
      />

      <div className="border-y border-stone-800 bg-[#0a0908]/90 px-4 py-2 sm:px-6">
        <ResponsiveLeaderboard />
      </div>

      <WeaponsSeoContent
        melee={weaponsData.meleeEvolution}
        throwing={weaponsData.throwing}
      />
    </>
  );
}
