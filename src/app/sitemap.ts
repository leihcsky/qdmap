import type { MetadataRoute } from "next";
import { LANDINGS } from "@/lib/landings";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/weapons`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...LANDINGS.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
