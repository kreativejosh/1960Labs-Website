import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/diagnostic`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
