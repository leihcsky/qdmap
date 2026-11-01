import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/components/PageFaq";
import { MapExplorer } from "@/components/map/MapExplorer";
import { MapSeoContent, mapFaqs } from "@/components/map/MapSeoContent";
import { poisData } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export function MapPageView() {
  return (
    <>
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

      <header className="border-b border-stone-800 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Queen&apos;s Domain (Steam game) · Community tool
          </p>
          <h1 className="mt-2 font-display text-3xl text-amber-50 sm:text-4xl">
            Queen&apos;s Domain Interactive Map
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Queen&apos;s Domain has no in-game map. Find Crystal Monuments, Wing
            Altars, and key landmarks on Isle of Neasied and Obmuer Temple, follow
            How to find directions, and track what you have already activated for
            Well Travelled.
          </p>
          <p className="mt-3 text-xs text-stone-500 lg:hidden">
            On phone: open a marker from the list first, then read How to find.
          </p>
        </div>
      </header>

      <div className="flex flex-col border-b border-stone-800 lg:min-h-[70vh]">
        <MapExplorer regions={poisData.regions} pois={poisData.pois} />
      </div>

      <MapSeoContent regions={poisData.regions} pois={poisData.pois} />
    </>
  );
}
