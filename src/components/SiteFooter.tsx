import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-[#0a0908] px-4 py-5 text-xs text-stone-500 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3">
        <nav
          aria-label="Guides"
          className="flex flex-wrap justify-center gap-x-3 gap-y-1"
        >
          <Link href="/" className="hover:text-stone-300">
            Map
          </Link>
          <Link href="/weapons" className="hover:text-stone-300">
            Weapons
          </Link>
          <Link href="/obmuer-temple" className="hover:text-stone-300">
            Obmuer Temple
          </Link>
          <Link href="/deimpo-mausoleum" className="hover:text-stone-300">
            Deimpo
          </Link>
          <Link href="/fast-travel" className="hover:text-stone-300">
            Fast travel
          </Link>
        </nav>
        <p className="text-center">
          Community-compiled · Verify in-game · Not affiliated with the publisher
        </p>
        <p className="max-w-2xl text-center text-stone-600">
          Queen&apos;s Domain Map is a fan tool site. Marker text is rewritten in our
          own words; source links credit community guides.
        </p>
      </div>
      <span className="sr-only" data-analytics="footer-slot" />
    </footer>
  );
}
