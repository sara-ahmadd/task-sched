/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#ebf8ff",
          100: "#bee3f8",
          200: "#90cdf4",
          300: "#63b3ed",
          400: "#4299e1",
          500: "#3182ce",
          600: "#2b6cb0",
          700: "#2c5282",
          800: "#2a4365",
          900: "#1a365d",
          950: "#0c2540",
        },
        dark_red: "red",
        maroon: "#800000",
        burgundy: "#7B1E3D",
        dark_crimson: "#6E0D25",
        blood_red: "#5A0000",
        text: {
          DEFAULT: "#3182ce",
        },
      },
      keyframes: {
        moveRight: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
      },
      animation: {
        moveRight: "moveRight 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
