/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColorOne: '#100604',
        bgColorTwo: '#170C0A',
        bgColorThree: '#1C1210',
        cardBgColor: '#10151F',
        accentColorOne: '#E85533',
        borderColor: '#3E2E2C',
        offWhite: '#F6F5F5',

        maintextColor: '#E5E6E6',
        subtextColor: '#B5B3B2',
      },
      backgroundImage: {
        'buttonGradient' : 'linear-gradient(to right, #170C0A, #E85533, #170C0A)',
        'buttonGradientY' : 'linear-gradient(to bottom, #170C0A, #E85533, #170C0A)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      transitionDuration:{
        "400": "400ms"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

