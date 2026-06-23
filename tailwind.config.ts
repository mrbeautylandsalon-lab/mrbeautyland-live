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
        cream: {
          50: "#FDFCFA",
          100: "#F8F6F2",
          200: "#EFE7DD",
          300: "#D6C2AE",
          400: "#B89B7A",
          500: "#8A6E52",
          600: "#6B5340",
          700: "#4E3D2F",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Jost", "Inter", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "luxury-gradient": "linear-gradient(135deg, #F8F6F2 0%, #EFE7DD 50%, #D6C2AE 100%)",
        "warm-gradient": "linear-gradient(180deg, #F8F6F2 0%, #EFE7DD 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(184,155,122,0.3) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
