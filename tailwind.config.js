/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  safelist: ['bg-blue-400', 'bg-green-400', 'bg-red-400'],
  theme: {
    extend: {
      colors: {
        'darker-blue': '#141E46',
        'darker-green': '#41B06E',
        'lighter-green': '#8DECB4',
        'beige': '#FFF5E0'
      }
    },
  },
  plugins: [],
}

