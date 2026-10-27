import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club guest speakers and outreach";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Special events",
    title: "People who came to share.",
    subtitle: "Engineers, founders, and researchers on how they use AI.",
  });
}
