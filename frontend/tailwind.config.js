/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'poppins': ["Poppins", "sans-serif"],
    },
    colors: {
      "darkPurple": "#06020D",
      "halfDarkpurple": "#252C54",
      "textColor": "#ffffff",
      //primary = purple
      "primaryColor": "#6278EF",
      //secondary = green
      "secondaryColor": "#41B082",
      //third = red
      "thirdColor": "#FC5D41"
    },
  },
  plugins: [],
};
