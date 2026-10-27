import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club events";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Events",
    title: "Guest speakers and outreach",
    subtitle: "People who work with AI, talking to Westwood students about their jobs.",
  });
}
