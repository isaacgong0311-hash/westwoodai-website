// Typed access to the JSON content files in /data. Edit the JSON, not this.
import slidesData from "@/data/slides.json";
import eventsData from "@/data/events.json";
import officersData from "@/data/officers.json";
import photosData from "@/data/photos.json";
import faqData from "@/data/faq.json";
import type { ClubEvent, FaqItem, OfficersData, PhotosData, SlidesData } from "@/lib/types";

export const slides = slidesData as SlidesData;
export const events = eventsData as ClubEvent[];
export const officers = officersData as OfficersData;
export const photos = photosData as PhotosData;
export const faq = faqData as FaqItem[];

export const speakerEvents = events.filter((e) => e.kind === "speaker");

/** Turns a Google Slides/Drive sharing link into the URL its embedded viewer uses. */
export function embedUrl(url: string): string {
  return url
    .replace(/\/presentation\/d\/([^/]+)\/.*$/, "/presentation/d/$1/embed")
    .replace(/\/file\/d\/([^/]+)\/.*$/, "/file/d/$1/preview");
}
