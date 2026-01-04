/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blues Rock Color Palettes
        'electric-blue': {
          primary: '#1E3A5F',
          accent: '#E67E22',
          text: '#ECF0F1',
        },
        'vintage-soul': {
          primary: '#2C1810',
          accent: '#D4AF37',
          text: '#F5E6D3',
        },
        'neon-night': {
          primary: '#0A0E27',
          accent: '#FF6B35',
          text: '#FFFFFF',
        },
        'smoky-blues': {
          primary: '#34495E',
          accent: '#95A5A6',
          text: '#ECF0F1',
        },
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'anton': ['Anton', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
