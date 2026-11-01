import Link from "next/link";
import { PageFaq, type FaqItem } from "@/components/PageFaq";
import type { MeleeWeapon, ThrowingWeapon } from "@/lib/types";

const WEAPON_FAQS: FaqItem[] = [
  {
    question: "How do weapon evolutions work?",
    answer:
      "Most weapons level as you land hits. Each level adds a small damage bonus, up to a cap. When a weapon that can evolve hits Level 10, it can change into a new form with a stronger kit. If a weapon shows MAX, it will not evolve further.",
  },
  {
    question: "How many weapons can I equip?",
    answer:
      "You can equip up to three melee weapons and up to three throwing weapons. Passive charge meters on equipped weapons keep filling even when that weapon is not the one you are swinging.",
  },
  {
    question: "What do the Best for filters mean?",
    answer:
      "They are planning tags for the fight ahead: Clear trash for packs, Boss for hard single targets, Control for pierce/return tools that shape space, and General for flexible everyday throwables like the starter daggers.",
  },
  {
    question: "Where do throwing weapon charges come from?",
    answer:
      "Finding a throwable usually grants an initial charge. Extra charges come from world pickups or the shop. After you discover a new throwing weapon, the shop typically starts stocking more charges for it. Equipped throwables also recharge over time.",
  },
  {
    question: "Where do I find Holy Sword Endu?",
    answer:
      "Clear the Endu Shrine route on Isle of Neasied and defeat the shrine guardian. Endu can later evolve into Soul Bound Endu once leveled. Use the interactive map if you need landmark directions to the shrine.",
  },
];

export const weaponFaqs = WEAPON_FAQS;

type WeaponsSeoContentProps = {
  melee: MeleeWeapon[];
  throwing: ThrowingWeapon[];
};

export function WeaponsSeoContent({ melee, throwing }: WeaponsSeoContentProps) {
  const evolving = melee.filter((w) => w.evolvesTo);

  return (
    <div className="border-t border-stone-800 bg-[#0a0908]/80">
      <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 sm:px-6">
        <section aria-labelledby="how-weapons-work" className="scroll-mt-8">
          <h2 id="how-weapons-work" className="font-display text-2xl text-amber-50">
            How weapons work in Queen&apos;s Domain
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
            <p>
              Every melee weapon has a primary attack and a secondary attack. Some
              also build a special meter — fireballs, life steal, poison strikes —
              that only fires when charged. Monsters resist different damage types,
              so swapping the right weapon matters as much as raw power.
            </p>
            <p>
              Weapons grow through use. Successful hits raise the weapon level and
              add bonus damage, up to a maximum bonus. Many lines can evolve at
              Level 10 into a new weapon with a sharper moveset. That is what the
              evolution panel above is for: pick what you are holding, see what it
              becomes, and decide whether to keep leveling it.
            </p>
            <p>
              Loot chests and world pickups cover most finds; Umbawa the Merchant
              sells additional arms as you progress and clear bosses.
            </p>
          </div>
        </section>

        <section aria-labelledby="evolution-paths" className="scroll-mt-8">
          <h2 id="evolution-paths" className="font-display text-2xl text-amber-50">
            Confirmed evolution paths
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Level the base weapon to 10 in combat, then evolve. Not every weapon
            evolves — some are already at their peak.
          </p>
          <ul className="mt-5 space-y-3">
            {evolving.map((w) => {
              const next = melee.find((x) => x.id === w.evolvesTo);
              return (
                <li
                  key={w.id}
                  className="rounded-lg border border-stone-800 bg-stone-950/50 px-4 py-3 text-sm text-stone-300"
                >
                  <span className="font-medium text-amber-100">{w.name}</span>
                  <span className="mx-2 text-stone-600">→</span>
                  <span className="font-medium text-stone-100">
                    {next?.name ?? "Unknown"}
                  </span>
                  <p className="mt-1 text-stone-500">{w.notes}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="throwing-guide" className="scroll-mt-8">
          <h2 id="throwing-guide" className="font-display text-2xl text-amber-50">
            How to pick a throwing weapon
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
            <p>
              Throwables unlock early on Isle of Neasied. You can equip three at
              once, and charges refill while they stay equipped — even if another
              throwable is currently selected. Use the Best for filter above when
              you are packing for a boss door versus a hallway full of trash mobs.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="font-medium text-stone-200">Throwing Dagger</strong> —
                everyday option; later Acid upgrade helps clean Tower of Knowledge
                flesh.
              </li>
              <li>
                <strong className="font-medium text-stone-200">Chakram / Piercing Needle</strong> —
                better when you need return paths or multi-target pierce.
              </li>
              <li>
                <strong className="font-medium text-stone-200">Throwing Axe / Occult Knife</strong> —
                heavier or homing tools when a single target needs to die now.
              </li>
            </ul>
            <p>
              Exact max charge counts can vary with shop upgrades and pickups — check
              the top-left charge UI in-game after you unlock each weapon.
            </p>
          </div>
        </section>

        <section aria-labelledby="find-list" className="scroll-mt-8">
          <h2 id="find-list" className="font-display text-2xl text-amber-50">
            Where to find the weapons on this page
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-stone-500">
                Melee
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-stone-300">
                {melee.map((w) => (
                  <li key={w.id}>
                    <span className="font-medium text-stone-100">{w.name}</span>
                    <span className="mt-0.5 block text-stone-500">{w.notes}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-stone-500">
                Throwing
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-stone-300">
                {throwing.map((t) => (
                  <li key={t.id}>
                    <span className="font-medium text-stone-100">{t.name}</span>
                    <span className="mt-0.5 block text-stone-500">{t.notes}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <PageFaq title="Weapons FAQ" items={WEAPON_FAQS} />

        <section
          aria-labelledby="weapons-related"
          className="rounded-lg border border-stone-800 bg-stone-950/40 px-4 py-5"
        >
          <h2 id="weapons-related" className="font-display text-xl text-amber-50">
            Need locations?
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            Pair this guide with the{" "}
            <Link
              href="/"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              interactive map
            </Link>{" "}
            for Endu Shrine, Deimpo Mausoleum, Sacred Cistern, and other landmarks
            called out above.
          </p>
        </section>

        <p className="text-xs text-stone-600">
          Community-compiled reference. Values and locations should be confirmed in
          your own game build after patches.
        </p>
      </div>
    </div>
  );
}
