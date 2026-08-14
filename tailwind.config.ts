import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        border: "var(--border)",
        primary: {
          DEFAULT: "#8B5CF6", // Violet
          hover: "#7C3AED",
        },
        secondary: {
          DEFAULT: "#10B981", // Emerald/Green for Drips
          hover: "#059669",
        },
        accent: {
          DEFAULT: "#F43F5E", // Rose
          blue: "#3B82F6", // Wagmi blue
        },
        dark: {
          900: "#09090B", // Zinc-950
          800: "#18181B", // Zinc-900
          700: "#27272A", // Zinc-800
          600: "#3F3F46", // Zinc-700
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 8px 32px 0 rgba(139, 92, 246, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
