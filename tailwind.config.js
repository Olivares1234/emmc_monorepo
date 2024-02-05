/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3fbf9",
          100: "#e7f8f3",
          200: "#c4ede1",
          300: "#a0e3cf",
          400: "#59cdaa",
          500: "#12b886",
          600: "#10a679",
          700: "#0e8a65",
          800: "#0b6e50",
          900: "#095a42",
        },
      },
    },
  },
  plugins: [],
};
