import type { FaqItem } from "@/components/PageFaq";
import type { WeaponMapLink } from "@/lib/types";

export type LandingMarker = {
  name: string;
  kind: string;
  summary: string;
  howToFind: string;
  mapLink: WeaponMapLink;
};

export type LandingPageDef = {
  slug: "obmuer-temple" | "deimpo-mausoleum" | "fast-travel";
  path: string;
  title: string;
  absoluteTitle: string;
  description: string;
  h1: string;
  lede: string;
  primaryCta: { label: string; mapLink: WeaponMapLink };
  markersHeading: string;
  markersIntro: string;
  sections: Array<{
    id: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  markers: LandingMarker[];
  faqs: FaqItem[];
  related: Array<{ href: string; label: string; blurb: string }>;
};

export const LANDINGS: LandingPageDef[] = [
  {
    slug: "obmuer-temple",
    path: "/obmuer-temple",
    title: "Obmuer Temple Map Guide",
    absoluteTitle: "Obmuer Temple Map Guide | Queen's Domain",
    // ~154 chars — lead with primary KW, fit desktop SERP
    description:
      "Obmuer Temple map guide for Queen's Domain: Cave Entrance, Sacred Cistern, Prison Corridor saves, Wing Altar fast travel, and interactive map pins.",
    h1: "Obmuer Temple map guide",
    lede:
      "Looking for an Obmuer Temple map in Queen's Domain? There is still no in-game dungeon map. This guide lists every Crystal Monument save point we track inside the temple, the Obmuer Wing Altar for fast travel, and nearby pickups — then deep-links into the interactive map so you can open the region with pins selected.",
    primaryCta: {
      label: "Open Obmuer Temple on the map",
      mapLink: { region: "obmuer-temple" },
    },
    markersHeading: "Obmuer Temple Crystal Monuments & Wing Altar",
    markersIntro:
      "These are the Obmuer Temple markers currently on the interactive map. Open Find on map to jump straight to that pin.",
    sections: [
      {
        id: "save-points",
        heading: "Obmuer Temple save points (Crystal Monuments)",
        paragraphs: [
          "Obmuer Temple is the early dungeon after Isle of Neasied. From Aganmi's Camp outside the cave, you clear the approach, open the temple door, and immediately get a Crystal Monument just inside. That Cave Entrance save is your reset point before Trident Key loops, slate puzzles, and cistern routes — resting between attempts is the difference between a clean clear and a cold run from the door.",
          "Deeper in, Sacred Cistern becomes the mid-temple hub after you raise the staircase and unlock the cistern door. Side levers later open return paths to the entrance and cistern, so you are not forced to rewalk every hallway. When Wind Dash upgrades come online, the cistern gap is much easier to cross.",
          "Prison Corridor Obmuer Temple sits in the daylight-lit east wing past Sacred Cistern routes. Save there before later temple pressure and boss doors. If you only remember three names for Obmuer Temple navigation, make them Cave Entrance, Sacred Cistern, and Prison Corridor.",
        ],
        bullets: [
          "Cave Entrance — first save inside the temple door.",
          "Sacred Cistern — mid-temple hub after key doors and the raised staircase.",
          "Prison Corridor — east daylight wing; stage for later fights.",
          "Unlock the Obmuer Wing Altar early so slate and key loops do not start from camp every time.",
        ],
      },
      {
        id: "fast-travel",
        heading: "Obmuer Temple fast travel (Wing Altar)",
        paragraphs: [
          "Crystal Monuments save and rest; they do not replace the warp network. Fast travel in Queen's Domain comes from Wing Altars. Unlock the Obmuer Temple Wing Altar around Aganmi's Camp and the temple approach as routes open, then hop between discovered altars instead of walking the full approach after each death.",
          "The Obmuer altar also counts toward Well Travelled together with Crystal Monuments. Pair it with Cave Entrance or Sacred Cistern so you land close to a rest point. For the full Wing Altar system (including Wing Stone Fragments), see the fast travel guide.",
        ],
      },
      {
        id: "loot-nearby",
        heading: "Useful loot near Obmuer Temple",
        paragraphs: [
          "Several early upgrades sit on the Obmuer Temple approach or just inside named rooms. Use this page for location context, then open the weapons guide when you need evolution paths or throwable roles.",
        ],
        bullets: [
          "Trident — mounted on a wall just outside the temple entrance.",
          "Chakram — chest outside Obmuer Temple; returns after a set distance for clipping packs.",
          "Piercing Needle — chest right after Sacred Cistern; pierces multiple targets.",
          "Engraved Halberd / Splash Hammer — deeper Obmuer chests once Trident Key doors are open.",
        ],
      },
      {
        id: "no-ingame-map",
        heading: "Why you need an Obmuer Temple map",
        paragraphs: [
          "Queen's Domain has no full in-game map or quest pins. Players search for Obmuer Temple map, Obmuer Temple save points, and Sacred Cistern location because landmarks and How to find notes are the only reliable navigation. This page is the written guide; the interactive map is the pin board — use Open Obmuer Temple on the map when you want the region filter applied automatically.",
        ],
      },
    ],
    markers: [
      {
        name: "Cave Entrance Obmuer Temple",
        kind: "Crystal Monument",
        summary: "Save and rest point just inside the cave door.",
        howToFind:
          "From Aganmi's Camp, clear the approach, open the cave door, and the monument is immediately inside the entrance.",
        mapLink: { region: "obmuer-temple", poi: "cm-cave-entrance-obmuer" },
      },
      {
        name: "Sacred Cistern",
        kind: "Crystal Monument",
        summary: "Mid-temple hub after key doors and the raised staircase.",
        howToFind:
          "Progress Trident Key doors, raise the staircase, unlock the cistern door, then save at Sacred Cistern.",
        mapLink: { region: "obmuer-temple", poi: "cm-sacred-cistern" },
      },
      {
        name: "Prison Corridor Obmuer Temple",
        kind: "Crystal Monument",
        summary: "Daylight-lit prison wing save before later fights.",
        howToFind:
          "From Sacred Cistern routes, push into the east hallway lit by daylight — the monument is there.",
        mapLink: { region: "obmuer-temple", poi: "cm-prison-corridor-obmuer" },
      },
      {
        name: "Wing Altar (Obmuer Temple)",
        kind: "Wing Altar",
        summary: "Fast travel between discovered altars; counts for Well Travelled.",
        howToFind:
          "Search around Aganmi's Camp and the temple approach as Obmuer routes open. Unlock it before long slate or key loops.",
        mapLink: { region: "obmuer-temple", poi: "wa-obmuer" },
      },
    ],
    faqs: [
      {
        question: "Where is the first Obmuer Temple save point?",
        answer:
          "Cave Entrance Obmuer Temple sits just inside the cave door from Aganmi's Camp. Rest and save there before diving into slate and Trident Key puzzles.",
      },
      {
        question: "How do I reach Sacred Cistern in Obmuer Temple?",
        answer:
          "Open the temple's Trident Key doors, raise the staircase, unlock the cistern door, then save at Sacred Cistern. Later Wind Dash upgrades make the cistern gap easier.",
      },
      {
        question: "Does Obmuer Temple have fast travel?",
        answer:
          "Yes — unlock the Obmuer Temple Wing Altar. Once discovered, it connects to other Wing Altars you have found. It also counts toward Well Travelled with Crystal Monuments.",
      },
      {
        question: "Is there an in-game Obmuer Temple map?",
        answer:
          "No. Queen's Domain has no full in-game map. Use Crystal Monument landmarks, How to find notes, and the interactive map region filter for Obmuer Temple.",
      },
      {
        question: "Where do Chakram and Piercing Needle drop near Obmuer?",
        answer:
          "Chakram is in a chest outside Obmuer Temple. Piercing Needle is in a chest right after Sacred Cistern. Open the matching Crystal Monument pins if you need orientation inside the temple.",
      },
    ],
    related: [
      {
        href: "/deimpo-mausoleum",
        label: "Deimpo Mausoleum guide",
        blurb: "Isle of Neasied cemetery landmark and Throwing Axe route.",
      },
      {
        href: "/fast-travel",
        label: "Fast travel (Wing Altars)",
        blurb: "How Wing Altars and Wing Stone Fragments work.",
      },
      {
        href: "/weapons",
        label: "Weapons & throwing guide",
        blurb: "Chakram, Piercing Needle, and Obmuer melee pickups.",
      },
    ],
  },
  {
    slug: "deimpo-mausoleum",
    path: "/deimpo-mausoleum",
    title: "Deimpo Mausoleum Location Guide",
    absoluteTitle: "Deimpo Mausoleum Location | Queen's Domain",
    // ~152 chars
    description:
      "Find Deimpo Mausoleum in Queen's Domain: Isle of Neasied route from Cemetery Precipice, landmark tips, Throwing Axe chest, and map pin deep link.",
    h1: "Deimpo Mausoleum location guide",
    lede:
      "Need the Deimpo Mausoleum location in Queen's Domain? It is the locked cemetery landmark east of Cemetery Precipice on Isle of Neasied — a common stop for the story book route and the Throwing Axe chest. Follow the steps below, then open the interactive map pin when you want the landmark highlighted.",
    primaryCta: {
      label: "Open Deimpo Mausoleum on the map",
      mapLink: { region: "isle-of-neasied", poi: "lm-deimpo-mausoleum" },
    },
    markersHeading: "Deimpo Mausoleum map markers",
    markersIntro:
      "Stage at Cemetery Precipice, then open the Deimpo Mausoleum landmark pin. Knight's Encampment is the early hub before the cemetery climb.",
    sections: [
      {
        id: "route",
        heading: "How to find Deimpo Mausoleum",
        paragraphs: [
          "Start on Isle of Neasied. After the beach landing and Knight's Encampment Crystal Monument, climb northeast toward the cemetery paths. Cemetery Precipice is the cliffside save with a blue glow — that is your launch point for Deimpo Mausoleum.",
          "From Cemetery Precipice, head east past tombstones and Star Lizard ground. The locked mausoleum front sits on that raised cemetery road. Clear lizards carefully before you linger at the door; notes nearby mention a book delivered here by mainland knights.",
          "If you lose the path after a fight or a Wind Crystal side trip, return to Cemetery Precipice and repeat the east cemetery road. The mausoleum front stays a clear landmark even when fog or combat pulls you off the trail.",
        ],
        bullets: [
          "Nearest save: Cemetery Precipice Crystal Monument.",
          "Direction from the precipice: east along the raised cemetery road.",
          "Expect Star Lizards on the approach — clear them before door camping.",
          "Open the map pin if you only need the landmark highlighted on Isle of Neasied.",
        ],
      },
      {
        id: "throwing-axe",
        heading: "Deimpo Mausoleum and the Throwing Axe",
        paragraphs: [
          "Players look up Deimpo Mausoleum for more than navigation. A Throwing Axe chest on the mausoleum route is a heavier slash/impact throwable when starter dagger spam is not enough. It is a strong pack option for boss checks and chunkier single targets.",
          "Use this page for the location path; open the weapons guide when you want Best for filters and how the Axe compares to Chakram or Occult Knife. The Deimpo Find on map link on the weapons table points to the same landmark pin.",
        ],
      },
      {
        id: "nearby-hubs",
        heading: "Nearby Isle of Neasied hubs",
        paragraphs: [
          "Deimpo Mausoleum sits in the cemetery cluster of Isle of Neasied. Knight's Encampment is the early island hub after the barricade. Cemetery Precipice is the staging Crystal Monument. Endu Shrine is a separate landmark closer to the starting coast — do not confuse the shrine route with the east cemetery road to Deimpo.",
          "Because Queen's Domain has no in-game map, naming these hubs in order (Encampment → Precipice → Deimpo) is the practical way to give directions to other players or to yourself after a long session.",
        ],
      },
    ],
    markers: [
      {
        name: "Cemetery Precipice",
        kind: "Crystal Monument",
        summary: "Cliffside save overlooking cemetery paths — best staging point.",
        howToFind:
          "From the knight camp area, climb northeast up the hill. Look for the blue glow along the precipice.",
        mapLink: { region: "isle-of-neasied", poi: "cm-cemetery-precipice" },
      },
      {
        name: "Deimpo Mausoleum (front)",
        kind: "Landmark",
        summary: "Locked mausoleum landmark east of Cemetery Precipice.",
        howToFind:
          "From Cemetery Precipice, head east past tombstones and Star Lizard ground onto the raised cemetery road.",
        mapLink: { region: "isle-of-neasied", poi: "lm-deimpo-mausoleum" },
      },
      {
        name: "Knight's Encampment",
        kind: "Crystal Monument",
        summary: "Early island hub before the cemetery climb.",
        howToFind:
          "From the beach landing, face west, smash the wooden barricade, and rest at the knight camp fork.",
        mapLink: { region: "isle-of-neasied", poi: "cm-knights-encampment" },
      },
    ],
    faqs: [
      {
        question: "Where is Deimpo Mausoleum in Queen's Domain?",
        answer:
          "On Isle of Neasied, east of Cemetery Precipice along the raised cemetery road past tombstones and Star Lizards.",
      },
      {
        question: "What Crystal Monument is closest to Deimpo Mausoleum?",
        answer:
          "Cemetery Precipice. Save there before lizard fights and Wind Crystal side paths near the mausoleum routes.",
      },
      {
        question: "What loot is tied to Deimpo Mausoleum?",
        answer:
          "A Throwing Axe chest is found on the Deimpo Mausoleum route — a heavier throwable for chunkier single hits than the starter daggers.",
      },
      {
        question: "How do I open Deimpo Mausoleum on the interactive map?",
        answer:
          "Use Open Deimpo Mausoleum on the map — it deep-links to Isle of Neasied with the landmark selected.",
      },
      {
        question: "Is Deimpo Mausoleum the same as Endu Shrine?",
        answer:
          "No. Endu Shrine is a gated compound near the starting coast for the Holy Sword Endu fight. Deimpo Mausoleum is the locked cemetery landmark east of Cemetery Precipice.",
      },
    ],
    related: [
      {
        href: "/obmuer-temple",
        label: "Obmuer Temple guide",
        blurb: "Next major dungeon save points after Neasied.",
      },
      {
        href: "/fast-travel",
        label: "Fast travel (Wing Altars)",
        blurb: "Unlock altars so cemetery runs are less punishing.",
      },
      {
        href: "/weapons",
        label: "Weapons & throwing guide",
        blurb: "Throwing Axe role and Find on map for Deimpo.",
      },
    ],
  },
  {
    slug: "fast-travel",
    path: "/fast-travel",
    title: "Queen's Domain Fast Travel Guide",
    absoluteTitle: "Queen's Domain Fast Travel (Wing Altars) | QD Map",
    // ~155 chars
    description:
      "Queen's Domain fast travel guide: unlock Wing Altars, use Wing Stone Fragments carefully, track Well Travelled, and show every altar pin on the map.",
    h1: "Queen's Domain fast travel guide",
    lede:
      "Queen's Domain fast travel is not a free open-world warp from the pause menu. You unlock Wing Altars zone by zone, then travel between altars you have already found. This guide explains how the system works, how Wing Stone Fragments fit in, and how to show every Wing Altar pin on the interactive map.",
    primaryCta: {
      label: "Show all Wing Altars on the map",
      mapLink: { type: "wing_altar" },
    },
    markersHeading: "Wing Altar locations on this map",
    markersIntro:
      "Live Wing Altar pins for Isle of Neasied and Obmuer Temple. More regions appear when those map layers go live.",
    sections: [
      {
        id: "how-it-works",
        heading: "How Queen's Domain fast travel works",
        paragraphs: [
          "Each zone typically hides one Wing Altar. Once you find and activate it, you can travel between altars you have already discovered. That network is the game's primary long-range hop system. Crystal Monuments stay your local save and rest hubs — they heal and checkpoint, but they are not the warp list.",
          "Because there is no full in-game map, missing a Wing Altar often means long walks after deaths. Unlock the altar in a new region as soon as the approach opens, especially before Obmuer Temple slate loops or cemetery side routes on Isle of Neasied.",
          "On this site, filter the interactive map to type Wing Altar (or use Show all Wing Altars on the map) when you only want those pins. Use region filters when you are hunting one zone's altar specifically.",
        ],
        bullets: [
          "Discover the altar in the zone before you need the warp.",
          "Pair each altar with a nearby Crystal Monument so you land close to a save.",
          "Wing Altars count toward Well Travelled together with Crystal Monuments.",
          "Do not confuse save monuments with fast travel — different systems, both worth tracking.",
        ],
      },
      {
        id: "wing-stone",
        heading: "Wing Stone Fragment tips",
        paragraphs: [
          "A Wing Stone Fragment can warp you to a discovered Wing Altar from elsewhere, but it is consumable. Keep it for deaths, softlocks, or bad positioning — not for every short walk between camp and a nearby monument.",
          "If you still have the fragment and you have not unlocked the local altar yet, prioritize finding the altar first so future warps do not depend on burning the item. Fragments are emergency tools; altars are the permanent network.",
        ],
      },
      {
        id: "well-travelled",
        heading: "Fast travel and Well Travelled",
        paragraphs: [
          "Wing Altars and Crystal Monuments both count toward the Well Travelled checklist. Activating altars therefore does double duty: you gain fast travel and you progress the exploration tally. The interactive map's local checklist tracks both types so you can see what is still missing without inventing a second tracker.",
        ],
      },
      {
        id: "live-altars",
        heading: "Wing Altars currently listed",
        paragraphs: [
          "The interactive map currently tracks Wing Altars on Isle of Neasied and Obmuer Temple. Tower of Knowledge and Mainland layers are marked coming soon — until those pins ship, treat in-game discovery as the source of truth for unlisted zones, then return here when the map expands.",
        ],
      },
    ],
    markers: [
      {
        name: "Wing Altar (Isle of Neasied)",
        kind: "Wing Altar",
        summary: "Island fast travel node once unlocked.",
        howToFind:
          "Search the island after major paths open; look for the altar structure once you are past the early barricade and shrine routes.",
        mapLink: { region: "isle-of-neasied", poi: "wa-neasied" },
      },
      {
        name: "Wing Altar (Obmuer Temple)",
        kind: "Wing Altar",
        summary: "Temple approach altar for slate and key loops.",
        howToFind:
          "Search around Aganmi's Camp and the temple approach as Obmuer routes open. Unlock it before long runs.",
        mapLink: { region: "obmuer-temple", poi: "wa-obmuer" },
      },
    ],
    faqs: [
      {
        question: "How does fast travel work in Queen's Domain?",
        answer:
          "Find and unlock Wing Altars in each zone. You can then travel between altars you have discovered. Crystal Monuments are save/rest points, not the warp network.",
      },
      {
        question: "What is a Wing Stone Fragment?",
        answer:
          "A consumable that warps you to a discovered Wing Altar from elsewhere. Save it for emergencies rather than routine travel.",
      },
      {
        question: "Do Wing Altars count for Well Travelled?",
        answer:
          "Yes. Wing Altars and Crystal Monuments both count toward the Well Travelled checklist tracked on this site.",
      },
      {
        question: "Where can I see every Wing Altar pin?",
        answer:
          "Open the interactive map with the Wing Altar filter — or use Show all Wing Altars on the map from this page.",
      },
      {
        question: "Are Crystal Monuments the same as fast travel?",
        answer:
          "No. Crystal Monuments save and rest (and can respawn enemies when you rest). Wing Altars are the discoverable fast travel network between zones.",
      },
    ],
    related: [
      {
        href: "/obmuer-temple",
        label: "Obmuer Temple guide",
        blurb: "Temple monuments plus the Obmuer Wing Altar.",
      },
      {
        href: "/deimpo-mausoleum",
        label: "Deimpo Mausoleum guide",
        blurb: "Cemetery landmark on Isle of Neasied.",
      },
      {
        href: "/weapons",
        label: "Weapons & throwing guide",
        blurb: "Pack the right throwable before a long warp loop.",
      },
    ],
  },
];

export function getLanding(slug: LandingPageDef["slug"]) {
  const page = LANDINGS.find((l) => l.slug === slug);
  if (!page) throw new Error(`Unknown landing: ${slug}`);
  return page;
}
