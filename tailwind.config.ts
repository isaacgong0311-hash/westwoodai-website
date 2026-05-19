import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        "surface-2": "#16161f",
        border: "#1e1e2e",
        "border-bright": "#2e2e45",
        purple: {
          DEFAULT: "#b69bff",
          dim: "#7c5ccc",
          glow: "rgba(182,155,255,0.15)",
        },
        cyan: {
          DEFAULT: "#6ee7ff",
          dim: "#3a9ab5",
          glow: "rgba(110,231,255,0.15)",
        },
        green: {
          DEFAULT: "#00ff88",
          dim: "#00994d",
          glow: "rgba(0,255,136,0.15)",
        },
        text: {
          primary: "#e8e8f0",
          secondary: "#8888aa",
          muted: "#55556a",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radial-purple":
          "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(182,155,255,0.08) 0%, transparent 70%)",
        "radial-cyan":
          "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(110,231,255,0.06) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "glow-purple": "0 0 20px rgba(182,155,255,0.2)",
        "glow-cyan": "0 0 20px rgba(110,231,255,0.2)",
        "glow-green": "0 0 20px rgba(0,255,136,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
