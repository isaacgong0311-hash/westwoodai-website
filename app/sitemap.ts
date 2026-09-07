import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site";

const routes = [
  "",
  "/leaderboard",
  "/projects",
  "/prompt",
  "/competitions",
  "/meetings",
  "/news",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));
}
