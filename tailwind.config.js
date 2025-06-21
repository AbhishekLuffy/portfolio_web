/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'hero-dark': "url('/src/assets/dark-bg.jpg')",
      },
    },
  },
  plugins: [],
}