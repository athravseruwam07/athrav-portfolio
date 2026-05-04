import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0f",
        surface: "#111114",
        line: "#1f1f24",
        accent: "#22d3ee",
        text: {
          base: "#e6e6e6",
          muted: "#8a8a92",
          mono: "#5a5a63",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(34,211,238,0.18)",
      },
      backgroundImage: {
        dots: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
      },
      backgroundSize: {
        dots: "24px 24px",
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-start infinite",
        shimmer: "shimmer 3s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
    },
  },
  plugins: [],
};

export default config;
