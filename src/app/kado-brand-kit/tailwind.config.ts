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
              "brand": {
                      "100": "#FFF1EC",
                      "200": "#FFE4D6",
                      "300": "#FFC0AD",
                      "400": "#FF9885",
                      "500": "#FF6B5C",
                      "600": "#E64A3B",
                      "700": "#C23528",
                      "800": "#9E261C",
                      "900": "#7A1A12"
              },
              "cream": "#FFFBF7",
              "coffee": "#3D2E28"
      },
      fontFamily: {
              "mono": [
                      "Space Mono",
                      "monospace"
              ],
              "sans": [
                      "Outfit",
                      "sans-serif"
              ],
              "serif": [
                      "Fraunces",
                      "serif"
              ]
      },
      borderRadius: {
              "xl": "1rem",
              "2xl": "1.5rem",
              "pill": "9999px"
      },
      boxShadow: {
              "soft": "0 4px 20px -2px rgba(61, 46, 40, 0.1)",
              "offset": "4px 4px 0px 0px #E6D6CE"
      },
    },
  },
  plugins: [],
};

export default config;
