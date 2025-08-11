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
  keyframes: {
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(30px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    fadeOutDown: {
      '0%': { opacity: '1', transform: 'translateY(0)' },
      '100%': { opacity: '0', transform: 'translateY(30px)' },
    },
    slideInLeft: {
      '0%': { opacity: '0', transform: 'translateX(-50px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    slideOutLeft: {
      '0%': { opacity: '1', transform: 'translateX(0)' },
      '100%': { opacity: '0', transform: 'translateX(-50px)' },
    },
    slideInRight: {
      '0%': { opacity: '0', transform: 'translateX(50px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    slideOutRight: {
      '0%': { opacity: '1', transform: 'translateX(0)' },
      '100%': { opacity: '0', transform: 'translateX(50px)' },
    },
  },
  animation: {
    fadeInUp: 'fadeInUp 0.6s ease-out forwards',
    fadeOutDown: 'fadeOutDown 0.6s ease-out forwards',
    slideInLeft: 'slideInLeft 0.6s ease-out forwards',
    slideOutLeft: 'slideOutLeft 0.6s ease-out forwards',
    slideInRight: 'slideInRight 0.6s ease-out forwards',
    slideOutRight: 'slideOutRight 0.6s ease-out forwards',
  },
},

  },
  plugins: [],
}
