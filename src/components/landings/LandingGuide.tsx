import Link from "next/link";
import { AdRectangle } from "@/components/ads/AdRectangle";
import { ResponsiveLeaderboard } from "@/components/ads/ResponsiveLeaderboard";
import { FindOnMapLink } from "@/components/map/FindOnMapLink";
import { JsonLd } from "@/components/JsonLd";
import { PageFaq, faqJsonLd } from "@/components/PageFaq";
import { buildMapDeepLink } from "@/lib/map-deep-link";
import type { LandingPageDef } from "@/lib/landings";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { PoiType } from "@/lib/types";

type LandingGuideProps = {
  page: LandingPageDef;
};

function mapHref(link: LandingPageDef["primaryCta"]["mapLink"]) {
  const types = link.type
    ? (link.type.split(",").map((t) => t.trim()) as PoiType[])
    : undefined;
  return buildMapDeepLink({
    region: link.region,
    poi: link.poi,
    types,
    q: link.q,
  });
}

export function LandingGuide({ page }: LandingGuideProps) {
  const url = `${SITE_URL}${page.path}`;
  const ctaHref = mapHref(page.primaryCta.mapLink);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          description: page.description,
          url,
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
          about: "Queen's Domain (Steam game)",
        }}
      />
      <JsonLd data={faqJsonLd(page.faqs)} />

      <header className="border-b border-stone-800 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Queen&apos;s Domain (Steam game) · Location guide
          </p>
          <h1 className="mt-2 font-display text-3xl text-amber-50 sm:text-4xl">
            {page.h1}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-400 sm:text-base">
            {page.lede}
          </p>
          <p className="mt-5">
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-md bg-amber-800/80 px-4 py-2.5 text-sm font-medium text-amber-50 ring-1 ring-amber-700/60 transition hover:bg-amber-700/80"
            >
              {page.primaryCta.label}
            </Link>
          </p>
          <nav
            aria-label="On this page"
            className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm"
          >
            {page.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                {section.heading}
              </a>
            ))}
            <a
              href="#markers"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              Map markers
            </a>
            <a
              href="#faq"
              className="text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <div className="border-b border-stone-800 bg-[#0a0908]/90 px-4 py-2 sm:px-6">
        <ResponsiveLeaderboard />
      </div>

      <article className="mx-auto max-w-3xl space-y-12 px-4 py-10 sm:px-6">
        {page.sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-8"
          >
            <h2
              id={`${section.id}-heading`}
              className="font-display text-2xl text-amber-50"
            >
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-400">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-2 pl-5 text-stone-300">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
            {index === 0 ? <AdRectangle className="mt-8" /> : null}
          </section>
        ))}

        <section
          id="markers"
          aria-labelledby="markers-heading"
          className="scroll-mt-8"
        >
          <h2 id="markers-heading" className="font-display text-2xl text-amber-50">
            {page.markersHeading}
          </h2>
          <p className="mt-2 text-sm text-stone-400">{page.markersIntro}</p>
          <ul className="mt-5 space-y-3">
            {page.markers.map((marker) => (
              <li
                key={marker.name}
                className="rounded-lg border border-stone-800 bg-stone-950/50 px-4 py-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium text-amber-50">{marker.name}</h3>
                  <FindOnMapLink
                    link={marker.mapLink}
                    className="text-xs text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
                  />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-stone-500">
                  {marker.kind}
                </p>
                <p className="mt-2 text-sm text-stone-400">{marker.summary}</p>
                <p className="mt-2 text-sm text-stone-300">
                  <span className="text-stone-500">How to find: </span>
                  {marker.howToFind}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            <Link
              href={ctaHref}
              className="text-sm text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              {page.primaryCta.label} →
            </Link>
          </p>
        </section>

        <PageFaq title={`${page.title} FAQ`} items={page.faqs} />

        <section
          aria-labelledby="landing-related"
          className="rounded-lg border border-stone-800 bg-stone-950/40 px-4 py-5"
        >
          <h2 id="landing-related" className="font-display text-xl text-amber-50">
            Related guides
          </h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <Link
                href="/"
                className="font-medium text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
              >
                Queen&apos;s Domain interactive map
              </Link>
              <span className="mt-0.5 block text-stone-500">
                Full marker list, filters, and Well Travelled checklist.
              </span>
            </li>
            {page.related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
                >
                  {item.label}
                </Link>
                <span className="mt-0.5 block text-stone-500">{item.blurb}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-stone-600">
          Community location guide for Queen&apos;s Domain (Steam). Confirm routes
          in your own build after patches.
        </p>
      </article>
    </>
  );
}
