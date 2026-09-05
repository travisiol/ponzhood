import type { MetadataRoute } from "next";
import { sampleLaunches } from "@/data/launches";
import { nav, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url.replace(/\/$/, "");

  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    ...nav.map((item) => ({
      url: `${base}${item.href}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...sampleLaunches.map((launch) => ({
      url: `${base}/token/${launch.ticker.toLowerCase()}`,
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
