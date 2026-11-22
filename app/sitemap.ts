import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";

// Only the routes linked from the nav/footer. The old placeholder pages
// (projects, prompt, competitions, news, leaderboard) stay live so no old
// link 404s, but they aren't worth asking search engines to index.
const routes = [
  "",
  "/join",
  "/meetings",
  "/meetings/archive",
  "/events",
  "/officers",
  "/attendance",
  "/resources",
  "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/meetings" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
