"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/map", label: "Map" },
  { href: "/weapons", label: "Weapons" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-stone-700/80 bg-[#0c0a09]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/map" className="group min-w-0">
          <span className="font-display text-lg tracking-wide text-amber-100/95 sm:text-xl">
            Queen&apos;s Domain Map
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-stone-500 group-hover:text-stone-400">
            Community tools for Queen&apos;s Domain (Steam game)
          </span>
        </Link>
        <nav className="flex shrink-0 gap-1" aria-label="Primary" data-analytics="nav">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-stone-800 text-amber-100"
                    : "text-stone-400 hover:bg-stone-800/60 hover:text-stone-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
