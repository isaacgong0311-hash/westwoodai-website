import type { MetadataRoute } from "next";
import { siteLinks } from "@/lib/content";
import { SITE_URL as BASE_URL } from "@/lib/site";

// Same list as the nav/footer: sections with nothing in them yet stay live
// (so no old link 404s) but aren't submitted for indexing.
const routes = siteLinks()
  .map((l) => l.href)
  .filter((href) => !href.includes("#"))
  .map((href) => (href === "/" ? "" : href));

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/leaderboard" ? "monthly" : "weekly",
    priority: route === "" ? 1 : 0.6,
  }));
}
