/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // The site is dark only: <html> always has the "dark" class (see layout.js),
  // so the dark: styles on pages that aren't redesigned yet keep applying.
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Legacy colors, still used by pages that aren't redesigned yet
        dark: "#1b1b1b",
        light: "#EEF0E5",
        accent: "#304D30",
        accentDark: "#B6C4B6",
        gray: "#747474",
        // Comet design tokens (defined in src/styles/colors.css)
        space: {
          1000: "var(--space-1000)",
          950: "var(--space-950)",
          900: "var(--space-900)",
          850: "var(--space-850)",
          800: "var(--space-800)",
          700: "var(--space-700)",
          600: "var(--space-600)",
        },
        comet: {
          cyan: "#18CCFC",
          indigo: "#6344F5",
          violet: "#AE48FF",
          pink: "#FF5FC8",
        },
        fg: {
          1: "var(--fg-1)",
          2: "var(--fg-2)",
          3: "var(--fg-3)",
        },
      },
      boxShadow: {
        lift: "0 25px 50px -12px rgba(99,68,245,.25)",
      },
      fontFamily: {
        mr: ["var(--font-mr)"],
        in: ["var(--font-in)"],
      },
      animation: {
        roll: "roll 24s linear infinite",
      },
      keyframes: {
        roll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      screens: {
        sxl: "1180px",
        // @media (min-width: 1180px){...}
        xs: "480px",
        // @media (min-width: 480px){...}
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
