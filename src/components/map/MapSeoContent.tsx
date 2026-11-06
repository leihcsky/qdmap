import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { AdsterraNative } from "@/components/ads/AdsterraNative";
import { PageFaq, type FaqItem } from "@/components/PageFaq";
import { POI_TYPE_META } from "@/lib/poi-meta";
import type { Poi, PoiType, Region } from "@/lib/types";

const MAP_FAQS: FaqItem[] = [
  {
    question: "Does Queen's Domain have an in-game map?",
    answer:
      "No. There is no full world map or quest marker trail. You navigate with landmarks, compass direction, and memory. This Queen's Domain map lists Crystal Monuments, Wing Altars, and named places so you can keep your bearings while you explore.",
  },
  {
    question: "How does fast travel work?",
    answer:
      "Discover Wing Altars in each zone to unlock travel between them. For emergencies, items such as a Travel Crystal Fragment can return you toward a recent Crystal Monument, and a Wing Stone Fragment can send you to a discovered altar. Treat those consumables as limited tools, not everyday shortcuts.",
  },
  {
    question: "Where is Obmuer Temple on this map?",
    answer:
      "Switch the region tab to Obmuer Temple. Start from Aganmi's Camp after leaving Isle of Neasied, then use Cave Entrance, Sacred Cistern, and Prison Corridor Crystal Monuments as save hubs while you collect Triangular Slates and Trident Keys.",
  },
  {
    question: "How do I find Deimpo Mausoleum?",
    answer:
      "On Isle of Neasied, save at Cemetery Precipice, then head east along the cemetery road past Star Lizard ground. The locked Deimpo Mausoleum front sits on that raised path. Open the landmark pin above for the full How to find note.",
  },
  {
    question: "What should I look for first as a new player?",
    answer:
      "Crystal Monuments first — they are your save and rest points. Add Wing Altars when you want fast travel between zones. Use landmarks such as Endu Shrine or Deimpo Mausoleum when a route calls out a named place.",
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
];

export const mapFaqs = MAP_FAQS;

type MapSeoContentProps = {
  regions: Region[];
  pois: Poi[];
};

export function MapSeoContent({ regions, pois }: MapSeoContentProps) {
  const liveRegions = regions.filter((r) => r.status === "live");
  const typesPresent = (Object.keys(POI_TYPE_META) as PoiType[]).filter(
    (type) => pois.some((p) => p.type === type),
  );

  const byId = (id: string) => pois.find((p) => p.id === id);

  return (
    <div className="border-t border-stone-800 bg-[#0a0908]/80">
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6">
        <section aria-labelledby="how-to-use-map" className="scroll-mt-8">
          <h2 id="how-to-use-map" className="font-display text-2xl text-amber-50">
            How to use this Queen&apos;s Domain map
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

        <AdRectangle />

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
          </div>
        </section>

        <section aria-labelledby="fast-travel" className="scroll-mt-8">
          <h2 id="fast-travel" className="font-display text-2xl text-amber-50">
            Queen&apos;s Domain fast travel
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
            <p>
              Fast travel in Queen&apos;s Domain is discovery-based, not a menu of
              every location from the start. The core loop:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-medium text-stone-200">Wing Altars</strong> —
                find one per zone (Isle of Neasied and Obmuer Temple are listed on
                this map). Once discovered, you can travel between altars you already
                know.
              </li>
              <li>
                <strong className="font-medium text-stone-200">
                  Travel Crystal Fragment
                </strong>{" "}
                — emergency return toward the last Crystal Monument you used. Save it
                for long death runs, not casual backtracking.
              </li>
              <li>
                <strong className="font-medium text-stone-200">Wing Stone Fragment</strong>{" "}
                — consumable warp to a discovered Wing Altar from farther away. Same
                rule: spend it when the walk would cost more than the item.
              </li>
            </ul>
            <p>
              On this map, filter for{" "}
              <span className="text-stone-200">Wing Altar</span> to see the Neasied
              and Obmuer altar pins, then mark them as found after you activate each
              one.
            </p>
          </div>
        </section>

        <section aria-labelledby="obmuer-guide" className="scroll-mt-8">
          <h2 id="obmuer-guide" className="font-display text-2xl text-amber-50">
            Obmuer Temple — what to mark first
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
            <p>
              Obmuer Temple is the sunken follow-up to Isle of Neasied. After you
              cross from the starter island, talk with Aganmi at camp, then treat the
              temple as a save-point chain rather than one long uninterruptible run.
            </p>
            <ol className="list-decimal space-y-3 pl-5 text-stone-300">
              <li>
                <strong className="font-medium text-stone-100">
                  {byId("cm-cave-entrance-obmuer")?.name ?? "Cave Entrance Obmuer Temple"}
                </strong>{" "}
                — first Crystal Monument inside the cave door. Rest and save before
                slate and key puzzles.
              </li>
              <li>
                <strong className="font-medium text-stone-100">
                  {byId("cm-sacred-cistern")?.name ?? "Sacred Cistern"}
                </strong>{" "}
                — mid-temple hub after Trident Key doors. Later Wind Dash upgrades
                help cross the cistern gap.
              </li>
              <li>
                <strong className="font-medium text-stone-100">
                  {byId("cm-prison-corridor-obmuer")?.name ??
                    "Prison Corridor Obmuer Temple"}
                </strong>{" "}
                — daylight hallway save before deeper boss and slate loops.
              </li>
              <li>
                <strong className="font-medium text-stone-100">
                  {byId("wa-obmuer")?.name ?? "Wing Altar (Obmuer Temple)"}
                </strong>{" "}
                — unlock zone fast travel so you are not forced to walk the full
                approach every time.
              </li>
            </ol>
            <p>
              Switch the region tab to Obmuer Temple above, then open each pin for
              How to find directions tied to keys, levers, and daylight corridors.
            </p>
          </div>
        </section>

        <section aria-labelledby="deimpo-guide" className="scroll-mt-8">
          <h2 id="deimpo-guide" className="font-display text-2xl text-amber-50">
            Deimpo Mausoleum on Isle of Neasied
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
            <p>
              Deimpo Mausoleum is a key Isle of Neasied landmark east of the cemetery
              cliffs. Players often reach it after unlocking{" "}
              <span className="text-stone-200">Cemetery Precipice</span> as a Crystal
              Monument hub.
            </p>
            <p>
              From Cemetery Precipice, move east along the raised cemetery road. Clear
              Star Lizards carefully, then look for the locked mausoleum front — that
              is the Deimpo Mausoleum pin on this map. The route also ties into later
              loot such as heavier weapons and throwables found inside or nearby once
              you can enter.
            </p>
            <p>
              Practical order on Neasied: Knight&apos;s Encampment → Endu Shrine path →
              Cemetery Precipice → Deimpo Mausoleum front → push toward Obmuer when
              the bridge / crossing opens.
            </p>
          </div>
        </section>

        <AdsterraNative />

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
            Location guides &amp; weapons
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-stone-400">
            <li>
              <Link
                href="/obmuer-temple"
                className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                Obmuer Temple map guide
              </Link>{" "}
              — Cave Entrance, Sacred Cistern, Prison Corridor, Wing Altar.
            </li>
            <li>
              <Link
                href="/deimpo-mausoleum"
                className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                Deimpo Mausoleum location guide
              </Link>{" "}
              — cemetery route from Cemetery Precipice.
            </li>
            <li>
              <Link
                href="/fast-travel"
                className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                Fast travel (Wing Altars) guide
              </Link>{" "}
              — how warps and Wing Stone Fragments work.
            </li>
            <li>
              <Link
                href="/weapons"
                className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                Weapon evolution &amp; throwing guide
              </Link>{" "}
              — Level 10 evolve paths and throwable roles.
            </li>
          </ul>
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
      return "Starter island: smash the western barricade for Knight's Encampment, climb toward Cemetery Precipice and Deimpo Mausoleum, clear Endu Shrine for Holy Sword Endu, then push on toward Obmuer Temple.";
    case "obmuer-temple":
      return "Sunken temple after Neasied. Cave Entrance, Sacred Cistern, and Prison Corridor monuments break up slate and key puzzles — save before long corridor runs.";
    default:
      return "Explore the listed markers and use How to find notes as you go.";
  }
}
