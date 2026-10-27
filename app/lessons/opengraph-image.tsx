import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club lessons";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Lessons",
    title: "Every meeting, since 2019",
    subtitle: "Slides, Colab notebooks, and datasets from Westwood AI Club meetings.",
  });
}
