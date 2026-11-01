import Link from "next/link";
import { PageFaq, type FaqItem } from "@/components/PageFaq";
import { POI_TYPE_META } from "@/lib/poi-meta";
import type { Poi, PoiType, Region } from "@/lib/types";

const MAP_FAQS: FaqItem[] = [
  {
    question: "Does Queen's Domain have an in-game map?",
    answer:
      "No. There is no full world map or quest marker trail. You navigate with landmarks, compass direction, and memory. This page lists the Crystal Monuments, Wing Altars, and named places that keep you oriented while you explore.",
  },
  {
    question: "What should I look for first as a new player?",
    answer:
      "Crystal Monuments first — they are your save and rest points. Add Wing Altars when you want fast travel between zones. Use Landmarks when you need a named place such as Endu Shrine or Deimpo Mausoleum.",
  },
  {
    question: "What does Mark as found do?",
    answer:
      "It is a personal checklist kept in your browser on this device. Use it to remember which monuments and altars you have already activated. It does not connect to Steam or the game client.",
  },
  {
    question: "What is the Well Travelled checklist?",
    answer:
      "It tracks how many Crystal Monuments and Wing Altars from this guide you have marked as found. Handy while you hunt the exploration achievement — always double-check the final count against your own Steam progress.",
  },
  {
    question: "Which regions are covered?",
    answer:
      "Isle of Neasied and Obmuer Temple are fully listed here. Those are the early areas most players need first: starter island save points, Endu Shrine, then the sunken temple monuments.",
  },
  {
    question: "Should I trust the pin positions or the written directions?",
    answer:
      "Use both, but lean on How to find when you are in doubt. Written cues (barricades, cliffs, daylight halls) stay useful even if a pin sits a little off on the overview art.",
  },
];

export const mapFaqs = MAP_FAQS;

type MapSeoContentProps = {
  regions: Region[];
  pois: Poi[];
};

export function MapSeoContent({ regions, pois }: MapSeoContentProps) {
  const liveRegions = regions.filter((r) => r.status === "live");
  const typesPresent = (
    Object.keys(POI_TYPE_META) as PoiType[]
  ).filter((type) => pois.some((p) => p.type === type));

  return (
    <div className="border-t border-stone-800 bg-[#0a0908]/80">
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6">
        <section aria-labelledby="how-to-use-map" className="scroll-mt-8">
          <h2 id="how-to-use-map" className="font-display text-2xl text-amber-50">
            How to use this map
          </h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-stone-300">
            <li>
              Switch between <span className="text-stone-100">Isle of Neasied</span>{" "}
              and <span className="text-stone-100">Obmuer Temple</span>.
            </li>
            <li>
              Filter by marker type or search by name, then open a pin from the list
              or the map.
            </li>
            <li>
              Read <span className="text-stone-100">How to find</span> for compass
              and landmark cues before you leave your current save point.
            </li>
            <li>
              Tick <span className="text-stone-100">Mark as found</span> after you
              activate a monument or altar so the Well Travelled checklist stays
              accurate on this device.
            </li>
          </ol>
        </section>

        <section aria-labelledby="no-map-mechanics" className="scroll-mt-8">
          <h2 id="no-map-mechanics" className="font-display text-2xl text-amber-50">
            Playing without an in-game map
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
            <p>
              Queen&apos;s Domain expects you to learn the land yourself: no quest
              breadcrumbs, no full world map. Getting briefly lost is normal;
              losing a long stretch of unsaved progress is not. Crystal Monuments
              are the answer — stop, save, and optionally rest before you push into
              unknown ground.
            </p>
            <p>
              <strong className="font-medium text-stone-200">Rest vs save:</strong>{" "}
              Resting restores health and clears debuffs, but usually brings nearby
              enemies back. Saving locks in your progress without that full reset.
              Save after big objectives; rest when you can afford to fight the path
              again.
            </p>
            <p>
              <strong className="font-medium text-stone-200">Fast travel:</strong>{" "}
              Wing Altars are zone waypoints you unlock by finding them. Items like
              a Travel Crystal Fragment or Wing Stone Fragment can pull you back in
              an emergency — spend those carefully rather than as routine shortcuts.
            </p>
          </div>
        </section>

        <section aria-labelledby="marker-legend" className="scroll-mt-8">
          <h2 id="marker-legend" className="font-display text-2xl text-amber-50">
            Marker types on this map
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Use the filters above to show only what you need right now.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {typesPresent.map((type) => {
              const meta = POI_TYPE_META[type];
              const count = pois.filter((p) => p.type === type).length;
              return (
                <li
                  key={type}
                  className="flex gap-3 rounded-lg border border-stone-800 bg-stone-950/50 px-3 py-3"
                >
                  <span
                    className="mt-1 size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: meta.color }}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-stone-100">
                      {meta.label}
                      <span className="ml-2 text-xs text-stone-500">
                        {count} on this guide
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      {legendBlurb(type)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="region-guides" className="scroll-mt-8">
          <h2 id="region-guides" className="font-display text-2xl text-amber-50">
            Region guides
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {liveRegions.map((region) => {
              const regionPois = pois.filter((p) => p.regionId === region.id);
              return (
                <article
                  key={region.id}
                  className="rounded-lg border border-stone-800 bg-stone-950/50 p-4"
                >
                  <h3 className="font-display text-lg text-amber-100">
                    {region.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    {regionBlurb(region.id)}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-wider text-stone-500">
                    Markers here ({regionPois.length})
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {regionPois.map((poi) => (
                      <li key={poi.id} className="text-sm text-stone-300">
                        <span
                          className="mr-2 inline-block size-2 rounded-full align-middle"
                          style={{ backgroundColor: POI_TYPE_META[poi.type].color }}
                          aria-hidden
                        />
                        {poi.name}
                        <span className="text-stone-600">
                          {" "}
                          — {POI_TYPE_META[poi.type].label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="directory" className="scroll-mt-8">
          <h2 id="directory" className="font-display text-2xl text-amber-50">
            All markers at a glance
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Quick index of every point on this page. Open the tool above for full
            How to find directions.
          </p>
          <ol className="mt-4 columns-1 gap-x-8 space-y-2 sm:columns-2">
            {pois.map((poi) => {
              const regionName =
                regions.find((r) => r.id === poi.regionId)?.name ?? poi.regionId;
              return (
                <li
                  key={poi.id}
                  className="break-inside-avoid text-sm text-stone-300"
                >
                  <span className="font-medium text-stone-100">{poi.name}</span>
                  <span className="text-stone-500">
                    {" "}
                    ({POI_TYPE_META[poi.type].label}, {regionName})
                  </span>
                  <span className="mt-0.5 block text-stone-500">{poi.summary}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <PageFaq items={MAP_FAQS} />

        <section
          aria-labelledby="map-related"
          className="rounded-lg border border-stone-800 bg-stone-950/40 px-4 py-5"
        >
          <h2 id="map-related" className="font-display text-xl text-amber-50">
            Need loadout help?
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            After Endu Shrine or when you start packing throwables, open the{" "}
            <Link
              href="/weapons"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              weapons and throwing guide
            </Link>{" "}
            for evolution paths and which throwable fits the next fight.
          </p>
        </section>
      </div>
    </div>
  );
}

function legendBlurb(type: PoiType): string {
  switch (type) {
    case "crystal_monument":
      return "Save and rest hubs. Hit these before risky climbs or boss doors.";
    case "wing_altar":
      return "Zone fast-travel points once you discover them.";
    case "landmark":
      return "Named places that make How to find directions easier to follow.";
    case "shortcut":
      return "Optional path links between areas.";
    case "boss_door":
      return "Major encounter thresholds — expect a fight beyond.";
    case "shop_npc":
      return "Vendors or helpful NPCs tied to a fixed spot.";
    case "key_item":
      return "Important pickups that gate progress.";
  }
}

function regionBlurb(regionId: string): string {
  switch (regionId) {
    case "isle-of-neasied":
      return "Starter island: smash the western barricade for Knight's Encampment, climb toward Cemetery Precipice, clear Endu Shrine for Holy Sword Endu, then push on toward Obmuer.";
    case "obmuer-temple":
      return "Sunken temple after Neasied. Cave Entrance, Sacred Cistern, and Prison Corridor monuments break up slate and key puzzles — save before long corridor runs.";
    default:
      return "Explore the listed markers and use How to find notes as you go.";
  }
}
