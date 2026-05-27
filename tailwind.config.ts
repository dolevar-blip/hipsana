import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#FFFFFF",
        teal: {
          DEFAULT: "#0F766E",
          hover: "#0B5F58",
          subtle: "#F0FDFA",
        },
        muted: {
          DEFAULT: "#525252",
          light: "#737373",
          border: "#E5E5E5",
          bg: "#FAFAFA",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
        container: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;
