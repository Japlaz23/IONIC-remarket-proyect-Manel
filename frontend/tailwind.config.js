/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'remarket-green': '#1a7f34',
        'remarket-dark': '#0f5223',
        'remarket-light': '#e8f5e9',
      }
    },
  },
  plugins: [],
}
