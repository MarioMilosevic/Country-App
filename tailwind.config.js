/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./**/*.html", +"./main.js"],
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
