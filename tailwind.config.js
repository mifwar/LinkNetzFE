/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Lato: ["Lato", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Mono: ["Roboto Mono", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
