import type { Metadata } from "next";
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
  title: "Queen's Domain Weapons & Throwing Guide",
  description:
    "Queen's Domain melee evolution paths and throwing weapon roles: Endu, Rusted Spear, Chakram, Occult Knife, and more — where to find them and how to use them.",
  alternates: {
    canonical: WEAPONS_URL,
  },
  openGraph: {
    title: "Queen's Domain Weapons & Throwing Guide",
    description:
      "Look up melee evolutions and compare throwing weapons by role for Queen's Domain.",
    url: WEAPONS_URL,
    type: "website",
    images: [{ url: "/og-placeholder.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Domain Weapons & Throwing Guide",
    description:
      "Melee evolution paths and throwing weapon roles for Queen's Domain.",
  },
};

export default function WeaponsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Queen's Domain Weapons & Throwing Guide",
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
            Queen&apos;s Domain Weapons &amp; Throwing Guide
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Look up Queen&apos;s Domain weapon evolution paths, see what your current
            melee weapon becomes at Level 10, find key arms in the world, and compare
            throwables for trash clears versus boss checks.
          </p>
          <p className="mt-3 flex flex-wrap gap-3 text-sm">
            <a
              href="#melee-evolution"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              Melee evolution
            </a>
            <a
              href="#weapon-evolution"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              How evolving works
            </a>
            <a
              href="#throwing-weapons"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              Throwing weapons
            </a>
          </p>
        </div>
      </header>

      <WeaponsGuide
        melee={weaponsData.meleeEvolution}
        throwing={weaponsData.throwing}
      />

      <WeaponsSeoContent
        melee={weaponsData.meleeEvolution}
        throwing={weaponsData.throwing}
      />
    </>
  );
}
