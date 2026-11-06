import Link from "next/link";
import { buildMapDeepLink } from "@/lib/map-deep-link";
import type { WeaponMapLink } from "@/lib/types";
import type { PoiType } from "@/lib/types";

type FindOnMapLinkProps = {
  link?: WeaponMapLink | null;
  label?: string;
  className?: string;
};

function toDeepLink(link: WeaponMapLink) {
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

export function FindOnMapLink({
  link,
  label = "Find on map",
  className = "text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline",
}: FindOnMapLinkProps) {
  if (!link || (!link.poi && !link.region && !link.type && !link.q)) {
    return null;
  }

  return (
    <Link href={toDeepLink(link)} className={className}>
      {label}
    </Link>
  );
}
