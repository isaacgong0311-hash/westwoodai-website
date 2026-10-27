import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Westwood AI Club machine learning playground";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Playground",
    title: "Train a model in your browser.",
    subtitle: "Fit a line, find clusters, and train a neural network — no code required.",
  });
}
