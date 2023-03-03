/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      colors: {
        darker: {
          100: '#d0e7e7',
          500: '#104e54',
          600: '#0d3d42',
          700: '#042e32',
          800: '#032427',
          900: '#101111'
        }
      }
    },
  },
  plugins: [],

}