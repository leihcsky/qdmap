import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: false,
    follow: true,
  },
};

/** Legacy path: keep links working, consolidate indexing on `/`. */
export default function MapAliasPage() {
  permanentRedirect("/");
}
