/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'display': ['Poppins'],
    },
    colors: {
      "darkPurple": "#06020D",
      "halfDarkpurple": "#252C54",
      "textColor": "#ffffff",
      "primaryColor": "#6278EF",
      "secondaryColor": "#41B082",
      "thirdColor": "#FC5D41"
    },
  },
  plugins: [],
};
