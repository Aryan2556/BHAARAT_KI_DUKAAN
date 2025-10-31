/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        sliderReveal:{
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        smoothScale:{
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' }
        }
      },
      animation:{
        sliderReveal: 'sliderReveal 1s ease forwards',
        smoothScale:'smoothScale 7s linear forwards',
      },
    },
  },
  plugins: [],
}