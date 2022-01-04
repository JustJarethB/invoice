module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  variants: {
    extend: {
      ringColor: ['responsive', 'dark', 'focus-within', 'focus', 'hover', 'group-hover']
    },
  },
  plugins: [],
}
