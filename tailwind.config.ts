import type { Config } from "tailwindcss";

// Farben des Relaunchs (November 2026): warmes Papierweiß und Graphit statt Stein-Grau,
// Petrol als einziger Akzent statt Bernstein. `stone` bleibt als Name, damit die Klassen
// in allen Seiten weiter passen; `accent` trägt Links, Auswahl und Fokus.
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
        stone: {
          50: "#f8f7f3",
          100: "#f0eee8",
          200: "#e4e1d8",
          300: "#cfcbbf",
          400: "#a19d92",
          500: "#76736a",
          600: "#5b5952",
          700: "#3f3e39",
          800: "#2a2926",
          900: "#191917",
          950: "#11110f",
        },
        accent: {
          50: "#edf5f4",
          100: "#d3e8e6",
          200: "#a8d0cd",
          300: "#73b0ad",
          400: "#3f8f8c",
          500: "#1f7370",
          600: "#155f5d",
          700: "#104e4d",
          800: "#0e3f3f",
          900: "#0c3333",
        },
        paper: "#fbfaf7",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        lesen: "42rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
