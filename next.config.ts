import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old hand-maintained meetings archive now lives on the calendar.
      { source: "/meetings", destination: "/calendar", permanent: true },
    ];
  },
};

export default nextConfig;
