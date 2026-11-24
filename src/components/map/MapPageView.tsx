import { ResponsiveLeaderboard } from "@/components/ads/ResponsiveLeaderboard";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/components/PageFaq";
import { MapExplorerClient } from "@/components/map/MapExplorerClient";
import { MapSeoContent, mapFaqs } from "@/components/map/MapSeoContent";
import { poisData } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export function MapPageView() {
  return (
    <>
      <link rel="preload" href="/maps/neasied.svg" as="image" />
      <link rel="preload" href="/maps/obmuer.svg" as="image" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Queen's Domain Interactive Map",
          applicationCategory: "GameApplication",
          operatingSystem: "Web",
          description:
            "Community interactive map for Queen's Domain (Steam game) with Crystal Monuments, Wing Altars, filters, and a local Well Travelled checklist.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          about: "Queen's Domain (Steam game)",
          url: SITE_URL,
        }}
      />
      <JsonLd data={faqJsonLd(mapFaqs)} />

      {/* Keep h1 text unchanged for SEO; tighten spacing so the map reaches the first viewport faster. */}
      <header className="border-b border-stone-800 px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 sm:text-xs">
            Queen&apos;s Domain (Steam game) · Community tool
          </p>
          <h1 className="mt-1 font-display text-2xl leading-tight text-amber-50 sm:text-3xl lg:text-4xl">
            Queen&apos;s Domain Interactive Map
          </h1>
          <p className="mt-2 hidden max-w-3xl text-sm leading-relaxed text-stone-400 sm:block sm:text-base">
            Queen&apos;s Domain has no in-game map. Find Crystal Monuments, Wing
            Altars for fast travel, and landmarks such as Endu Shrine, Deimpo
            Mausoleum, and Obmuer Temple save points. Follow How to find directions,
            then track what you have already activated for Well Travelled.
          </p>
        </div>
      </header>

      <div className="flex flex-col border-b border-stone-800 lg:min-h-[60vh]">
        <MapExplorerClient regions={poisData.regions} pois={poisData.pois} />
      </div>

      {/* Ads live in MapSeoContent mid/late body — never inside the map tool. */}
      <MapSeoContent regions={poisData.regions} pois={poisData.pois} />

      <div className="border-t border-stone-800 bg-[#0a0908]/90 px-4 py-3 sm:px-6">
        <ResponsiveLeaderboard />
      </div>
    </>
  );
}
