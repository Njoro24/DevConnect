/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'custom-dark': '#242424',
        'custom-light': '#ffffff',
        'custom-text': 'rgba(255, 255, 255, 0.87)',
      },
    },
  },
  plugins: [],
}