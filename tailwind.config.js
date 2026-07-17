/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
   colors: {
     primaryBlue: '#111249',
     accentYellow: '#FFC107',
     accentYellowDark: '#E0A800',
     accentLightBlue: '#00B5E2',
     accentDarkBlue: '#0D0E36',
     darkGray: '#333333',
     lightGray: '#F5F5F5',
     brand: {
       blue: '#0B1F5C',
       'blue-mid': '#1E3A9F',
       'blue-light': '#2B4EC8',
       gold: '#FFC107',
       'gold-dark': '#F5B700',
       'gold-light': '#FFD54F',
       white: '#FFFFFF',
       'off-white': '#F8F9FF',
       dark: '#060D1F',
       muted: '#8892B0',
     },
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
     countUp: {
       '0%, 100%': { transform: 'translateY(0)' },
     },
     float: {
       '0%,100%': { transform: 'translateY(0)' },
       '50%': { transform: 'translateY(-10px)' },
     },
   },
   animation: {
     fadeInUp: 'fadeInUp 0.6s ease-out forwards',
     fadeOutDown: 'fadeOutDown 0.6s ease-out forwards',
     slideInLeft: 'slideInLeft 0.6s ease-out forwards',
     slideOutLeft: 'slideOutLeft 0.6s ease-out forwards',
     slideInRight: 'slideInRight 0.6s ease-out forwards',
     slideOutRight: 'slideOutRight 0.6s ease-out forwards',
     'count-up': 'countUp 2s ease-out forwards',
     'float': 'float 6s ease-in-out infinite',
   },
 },

   },
   plugins: [],
}
