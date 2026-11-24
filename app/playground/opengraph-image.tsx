import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club playground";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Playground",
    title: "Machine learning you can poke at",
    subtitle: "Fit a line, cluster points, and train a neural network in your browser.",
  });
}
