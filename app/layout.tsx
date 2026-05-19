import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Westwood AI Club",
  description:
    "Westwood High School's AI Club. Students messing around with AI in Austin, TX.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Westwood AI Club",
    description: "Students messing around with AI in Austin, TX.",
    siteName: "Westwood AI Club",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        <Nav />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
