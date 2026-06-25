import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#8F1717",
          wine: "#58223B",
          rose: "#D7A893",
          blush: "#FFF8F4",
          cream: "#F4E6DD",
          blue: "#BFD6DE",
          olive: "#7A7B45",
          ink: "#271718",
          muted: "#756667",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
