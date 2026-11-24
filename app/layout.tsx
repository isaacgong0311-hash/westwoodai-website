import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";
import { siteLinks } from "@/lib/content";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Westwood AI Club", template: "%s | Westwood AI Club" },
  description:
    "Westwood High School's student-run AI club in Austin, TX. Meeting slides since 2019, guest talks, and an in-browser machine learning playground.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Westwood AI Club",
    description: "Westwood High School's student-run AI club in Austin, TX.",
    siteName: "Westwood AI Club",
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
      className={`${geist.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-ink focus-visible:text-paper focus-visible:rounded"
        >
          Skip to content
        </a>
        <Nav links={siteLinks().filter((l) => l.primary)} />
        <main id="main" className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
