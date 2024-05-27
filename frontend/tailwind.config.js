/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Lägg till shadow-custom
      boxShadow: {
        custom: "0 4px 6px -1px #c5c5c5, 0 2px 4px -2px #c5c5c5",
      },
    },
    fontFamily: {
      display: ["Poppins"],
    },
    colors: {
      darkPurple: "#06020D",
      halfDarkpurple: "#252C54",
      textColor: "#ffffff",
    },
  },
  plugins: [],
};
