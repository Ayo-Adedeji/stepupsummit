/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#003366',
        accentYellow: '#FFC107',
        accentYellowDark: '#E0A800',
        accentLightBlue: '#00B5E2',
        accentDarkBlue: '#001F4D',
        darkGray: '#333333',
        lightGray: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
