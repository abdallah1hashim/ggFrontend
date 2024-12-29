/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
    container: {
      center: "true",
      padding: "1rem",
      screens: {
        "2xl": "1400px",
        xl: "1200px",
        lg: "992px",
        md: "768px",
        sm: "576px",
      },
    },
    extend: {
      backgroundImage: {
        noise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      },
      colors: {
        primary: {
          50: "#f9f9f9",
          100: "#f0f0f0",
          200: "#d9d9d9",
          300: "#bfbfbf",
          400: "#8c8c8c",
          500: "#595959",
          600: "#272727",
          700: "#171717",
          750: "#111111",
          800: "#0f0f0f",
          DEFAULT: "#000000",
        },
        secondary: {
          100: "#f9f9f9",
          200: "#a6a6a6",
          300: "#404040",
          DEFAULT: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addUtilities }) {
      addUtilities({
        ".mask-linear-gradient": {
          mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
          webkitMask:
            "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
        },
      });
    },
  ],
};
