"use client";

import { useMemo, useState } from "react";
import type { BestFor, MeleeWeapon, ThrowingWeapon } from "@/lib/types";

const BEST_FOR_LABELS: Record<BestFor, string> = {
  clear_trash: "Clear trash",
  boss: "Boss",
  control: "Control",
  general: "General",
};

const BEST_FOR_OPTIONS: Array<BestFor | "all"> = [
  "all",
  "clear_trash",
  "boss",
  "control",
  "general",
];

type WeaponsGuideProps = {
  melee: MeleeWeapon[];
  throwing: ThrowingWeapon[];
};

export function WeaponsGuide({ melee, throwing }: WeaponsGuideProps) {
  const [weaponId, setWeaponId] = useState(melee[0]?.id ?? "");
  const [bestFor, setBestFor] = useState<BestFor | "all">("all");

  const selected = melee.find((w) => w.id === weaponId) ?? melee[0] ?? null;
  const next = selected?.evolvesTo
    ? melee.find((w) => w.id === selected.evolvesTo) ?? null
    : null;

  const filteredThrowing = useMemo(() => {
    if (bestFor === "all") return throwing;
    return throwing.filter((t) => t.bestFor.includes(bestFor));
  }, [throwing, bestFor]);

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-8 sm:px-6">
      <section aria-labelledby="melee-heading" id="melee-evolution">
        <div className="mb-4">
          <h2 id="melee-heading" className="font-display text-2xl text-amber-50">
            Melee evolution
          </h2>
          <p className="mt-1 text-sm text-stone-400">
            Choose the weapon you are holding to see its next form and how to evolve
            it.
          </p>
        </div>

        {melee.length === 0 ? (
          <p className="rounded-lg border border-dashed border-stone-700 px-4 py-8 text-center text-sm text-stone-500">
            No weapons listed yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <label className="block text-sm">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-stone-500">
                Current weapon
              </span>
              <select
                value={selected?.id ?? ""}
                onChange={(e) => setWeaponId(e.target.value)}
                className="w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-stone-200 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
              >
                {melee.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-lg border border-stone-800 bg-stone-950/60 p-4">
              {selected ? (
                <>
                  <p className="text-xs text-stone-500">
                    {selected.tier === 1 ? "Base form" : `Evolved · Tier ${selected.tier}`}
                  </p>
                  <h3 className="font-display text-2xl text-amber-50">
                    {selected.name}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{selected.notes}</p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-stone-500">
                        Evolves to
                      </h4>
                      <p className="mt-1 text-sm text-stone-200">
                        {next ? next.name : "Does not evolve further"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-stone-500">
                        How to evolve
                      </h4>
                      {selected.materials.length === 0 ? (
                        <p className="mt-1 text-sm text-stone-400">
                          {next
                            ? "Level this weapon through combat, then evolve at Level 10."
                            : "Already at the end of its line."}
                        </p>
                      ) : (
                        <ul className="mt-1 list-inside list-disc text-sm text-stone-300">
                          {selected.materials.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-stone-500">Select a weapon.</p>
              )}
            </div>

            <div className="md:col-span-2">
              <h3 className="mb-2 text-xs uppercase tracking-wider text-stone-500">
                All listed melee weapons
              </h3>
              <ol className="space-y-2">
                {melee.map((w) => (
                  <li
                    key={w.id}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      w.id === selected?.id
                        ? "border-amber-800/60 bg-amber-950/20"
                        : "border-stone-800 bg-stone-950/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setWeaponId(w.id)}
                      className="w-full text-left"
                    >
                      <span className="font-medium text-stone-100">{w.name}</span>
                      <span className="mt-0.5 block text-xs text-stone-500">
                        {w.evolvesTo
                          ? `Evolves into ${
                              melee.find((x) => x.id === w.evolvesTo)?.name ??
                              w.evolvesTo
                            }`
                          : "No further evolution"}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="throwing-heading" id="throwing-weapons">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="throwing-heading" className="font-display text-2xl text-amber-50">
              Throwing weapons
            </h2>
            <p className="mt-1 text-sm text-stone-400">
              Filter by the fight you are packing for, then compare roles and where
              each throwable drops.
            </p>
          </div>
          <label className="text-sm">
            <span className="mb-1 block text-xs uppercase tracking-wider text-stone-500">
              Best for
            </span>
            <select
              value={bestFor}
              onChange={(e) => setBestFor(e.target.value as BestFor | "all")}
              className="rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-stone-200 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
            >
              {BEST_FOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "all" ? "All" : BEST_FOR_LABELS[opt]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredThrowing.length === 0 ? (
          <p className="rounded-lg border border-dashed border-stone-700 px-4 py-8 text-center text-sm text-stone-500">
            No throwing weapons match this filter.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-stone-800">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-stone-950 text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Name</th>
                  <th className="px-3 py-2.5 font-medium">Charges / recharge</th>
                  <th className="px-3 py-2.5 font-medium">Best for</th>
                  <th className="px-3 py-2.5 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {filteredThrowing.map((t) => (
                  <tr key={t.id} className="bg-stone-950/40 align-top">
                    <td className="px-3 py-3 font-medium text-stone-100">
                      {t.name}
                    </td>
                    <td className="px-3 py-3 text-stone-300">
                      {t.charges !== null ? (
                        <span className="block">{t.charges} charges</span>
                      ) : null}
                      <span className="block text-xs text-stone-500">
                        {t.rechargeNote ||
                          "Check charge count in the top-left HUD after unlock"}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-stone-400">
                      {t.bestFor.map((b) => BEST_FOR_LABELS[b]).join(", ")}
                    </td>
                    <td className="max-w-xs px-3 py-3 text-stone-400">{t.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
