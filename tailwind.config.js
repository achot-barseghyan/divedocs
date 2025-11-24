/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './app/**/*.{js,vue,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Ocean Blues
        darkblue: {
          50: '#e6f2f5',
          100: '#cce5eb',
          200: '#99cbd7',
          300: '#66b1c3',
          400: '#3397af',
          500: '#007d9b', // Deep ocean blue
          600: '#00647c',
          700: '#004b5d',
          800: '#00323e',
          900: '#00191f',
          950: '#000c0f',
        },
        // Turquoise/Cyan Accents
        turquoise: {
          50: '#e6fffe',
          100: '#ccfffd',
          200: '#99fffb',
          300: '#66fff9',
          400: '#33fff7',
          500: '#00fff5', // Bright turquoise
          600: '#00ccc4',
          700: '#009993',
          800: '#006662',
          900: '#003331',
          950: '#001a19',
        },
        // Teal (Main brand color - Book Now button)
        teal: {
          50: '#e6f9f8',
          100: '#ccf3f1',
          200: '#99e7e3',
          300: '#66dbd5',
          400: '#33cfc7',
          500: '#00c3b9', // Primary teal - Book Now button color
          600: '#009c94',
          700: '#00756f',
          800: '#004e4a',
          900: '#002725',
          950: '#001312',
        },
        // Dark Backgrounds
        navy: {
          50: '#e8edef',
          100: '#d1dbdf',
          200: '#a3b7bf',
          300: '#75939f',
          400: '#476f7f',
          500: '#194b5f', // Dark navy background
          600: '#143c4c',
          700: '#0f2d39',
          800: '#0a1e26',
          900: '#050f13',
          950: '#020709',
        },
        // Accent Yellow (from diving gear)
        yellow: {
          50: '#fffbeb',
          100: '#fef7d7',
          200: '#fdeeaf',
          300: '#fce687',
          400: '#fbdd5f',
          500: '#fad537', // Bright yellow accent
          600: '#c8aa2c',
          700: '#968021',
          800: '#645516',
          900: '#322b0b',
          950: '#191505',
        },
      },
      backgroundColor: {
        'app-light': '#e8edef', // Light navy
        'app-dark': '#0a1e26', // Deep navy
      },
      textColor: {
        'app-light': '#00191f', // Dark blue text
        'app-dark': '#e6fffe', // Light turquoise text
      },
    },
  },
  plugins: [],
}
