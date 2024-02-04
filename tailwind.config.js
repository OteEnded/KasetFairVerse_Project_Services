// TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{js,css}",
    "./views/**/*.{html,ejs}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")],
  theme: {
    extend: {
      colors: {
        'primary': '#30845C',
        'secondary': '#98D7D6',
        'background': '#ECF4F6',
        'limegreen': '#B1DFB7',
        'red' : '#FF0000',
        'blue' : '#024073'

      },
      fontFamily: {
        customFont: ['"Custom Font"', "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
};