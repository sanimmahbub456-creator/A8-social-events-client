import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      colors: {
        brand: {
          50: "#eefdf3",
          100: "#d6f9e1",
          200: "#aff1c6",
          300: "#76e3a3",
          400: "#3fcc7e",
          500: "#1ab161",
          600: "#0f8f4d",
          700: "#0f7140",
          800: "#115a36",
          900: "#0f4a2e",
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        communityLight: {
          primary: "#0f8f4d",
          secondary: "#f0a63a",
          accent: "#2563eb",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f6f8f7",
          "base-300": "#e7ece9",
          // Darkened from the original picks so info/success/warning/error all clear
          // WCAG AA (4.5:1) as small text and as badge fills — the originals ranged
          // from 2.0:1 to 3.9:1, which read fine to the eye but fail real contrast checks.
          info: "#0284c7",
          success: "#15803d",
          warning: "#b45309",
          error: "#dc2626",
        },
      },
      {
        communityDark: {
          primary: "#3fcc7e",
          secondary: "#f0a63a",
          accent: "#60a5fa",
          // Was "#e5e7eb" — a near-white gray. "neutral" drives the footer and several
          // badge chips, so in dark mode the footer was silently flipping back to a
          // light surface instead of staying dark. Fixed to a true dark surface, one
          // shade deeper than base-100 for a bit of layering.
          neutral: "#0e1412",
          "neutral-content": "#f3f4f6",
          "base-100": "#111714",
          "base-200": "#161d19",
          "base-300": "#1d2622",
          info: "#38bdf8",
          success: "#3fcc7e",
          warning: "#f0a63a",
          error: "#f87171",
        },
      },
    ],
    darkTheme: "communityDark",
  },
  plugins: [daisyui],
};

export default config;