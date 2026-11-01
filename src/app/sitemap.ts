import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://queensdomainmap.click";
  return [
    { url: `${base}/map`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/weapons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
