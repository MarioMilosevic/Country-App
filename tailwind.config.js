/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.html",
  +  "./main.js",
  ],
  theme: {
    colors: {
      primary: "#e6e6ff",
      white: "#ffffff",
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
