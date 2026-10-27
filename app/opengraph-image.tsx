import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club — learn AI, build ideas, find your people";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Student-run · No experience needed",
    title: "Learn AI. Build ideas. Find your people.",
    subtitle: "Weekly meetings, guest speakers, and hands-on projects at Westwood High School.",
  });
}
