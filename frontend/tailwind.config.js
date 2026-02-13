export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'remarket-green': '#1a7f34',
      },
      screens: {
        'xs': '320px',
        'sm': '425px',
        'md': '769px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [],
}
