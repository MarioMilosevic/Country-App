/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

export default {
  content: ["./**/*.html", "./main.js"],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#e6e6ff",
      white: "#ffffff",
      ...colors,
    },
    fontFamily: {
      body: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './components/**/*.{html,js}',
//     './pages/**/*.{html,js}',
//     './index.html',
//   ],
//   // ...
// }
