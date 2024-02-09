/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for nextjs 13
    // "./src/**/*.{js,ts,jsx,tsx}", // before nextjs 13
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#7ed6df',
        'dark-main-color': '#036997',
        'darker-main-color': '#0c4a6e'
      }
    },
    fontFamily: {
      'stylish': ['Bachelorette']
    }
  },
  plugins: [],
}

