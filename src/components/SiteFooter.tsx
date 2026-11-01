export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-[#0a0908] px-4 py-4 text-center text-xs text-stone-500 sm:px-6">
      <p>Community-compiled · Verify in-game · Not affiliated with the publisher</p>
      <p className="mt-1 text-stone-600">
        Queen&apos;s Domain Map is a fan tool site. Marker text is rewritten in our own words; source
        links credit community guides.
      </p>
      <span className="sr-only" data-analytics="footer-slot" />
    </footer>
  );
}
