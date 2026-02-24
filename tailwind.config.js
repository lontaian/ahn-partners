/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./projects/*.html",
    "./demos/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#10B981',
        accent: '#3B82F6',
        dark: '#0c0414',
        'dark-card': '#1c1528',
        'dark-hover': '#2a1f3d'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo', 'Malgun Gothic', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
