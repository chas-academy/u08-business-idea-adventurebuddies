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
      sans: ["Poppins", "sans-serif"],
    },
    colors: {
      hoverOnLink: "#B5C0F8",
      darkPurple: "#06020D",
      halfDarkpurple: "#252C54",
      textColor: "#ffffff",
      //primary = purple
      primaryColor: "#6278EF",
      //secondary = green
      secondaryColor: "#41B082",
      //third = red
      thirdColor: "#FC5D41",
      //darker shade of primary
      hoverOnButton: "#4e60bf",
      textGray: "#979797",
      borderShade: "#d9d9d9"
    },
  },
  plugins: [],
};
