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
      "hoverOnLink": "#B5C0F8",
    },
  },
  plugins: [],
};
