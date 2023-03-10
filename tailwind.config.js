/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      width: {
        "half": '50%',
        "66": '16.5rem'
      },
      colors: {
        transparent: {
          0: 'transparent'
        },
        darker: {
          0: '#dbeeee',
          100: '#d0e7e7',
          200: '#9bc3c7',
          250: '#87c2c7',
          300: '#377d84',
          350: '#0a707a',
          400: '#2b7279',
          450: '#1a6066',
          500: '#104e54',
          600: '#0d3d42',
          650: '#16393b',
          700: '#042e32',
          800: '#032427',
          850: '#031e21',
          900: '#101111'
        },
        red: {
          950: '#3a0b0b',
          960: '#1d0101',
        },
        blue: {
          450: '#426272',
          550: '#143c50',
          950: '#07293a',
          960: '#0e2029',
        }
      }
    },
  },
  plugins: [
      require('flowbite/plugin')
  ],

}