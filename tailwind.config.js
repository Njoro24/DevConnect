/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
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
        'dark-blue': '#1A0033',
        'dark-purple': '#2A004D',
        'neon-blue': '#00FFFF',
        'neon-purple': '#BF00FF',
        'gray-800': '#2d3748',
        'gray-900': '#1a202c',
      },
      dropShadow: {
        'neon-glow': '0 0 10px rgba(0, 255, 255, 0.7)',
        'purple-glow': '0 0 10px rgba(191, 0, 255, 0.7)',
      },
      backgroundImage: {
        'animated-gradient': 'linear-gradient(45deg, #1A0033, #2A004D, #1A0033)',
      },
    },
  },
  plugins: [],
};
