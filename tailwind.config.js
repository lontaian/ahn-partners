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
        primary: '#3A5169',
        secondary: '#6B7280',
        accent: '#3A5169',
        dark: '#111827',
        'dark-card': '#1f2937',
        'dark-hover': '#374151'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo', 'Malgun Gothic', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
