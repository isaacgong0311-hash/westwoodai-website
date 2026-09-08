import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";

// Only the routes actually linked from the nav/footer — the empty pages
// (projects, prompt, competitions, meetings, news) stay live so no old
// link 404s, but there's no reason to ask search engines to index pages
// that currently say "nothing here yet."
const routes = ["", "/leaderboard"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
