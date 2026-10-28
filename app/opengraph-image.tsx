import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Westwood High School, Austin TX",
    title: "Westwood AI Club",
    subtitle: "A student-run club for learning how machine learning works. Meeting slides, guest talks, and a playground.",
  });
}
