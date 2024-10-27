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




        //bg one is darker
        bgOne: '#050505',
        bgTwo: '#131415',

        //bgthree is accent color, like in buttons
        bgThree: '#2060DF',

        //gray is used for sub texts
        gray: '#9CA1A4',

        green: '#9CF57F',

        border: '#232323',

      },
      backgroundImage: {
        'gradientOne': 'linear-gradient(to bottom, #100604, #170C0A)',
        'gradientTwo': 'linear-gradient(to bottom, #3E2E2C, #100604)',
        'gradientBorder': 'linear-gradient(to bottom, #3E2E2C, #100604)',
        'text-gradient': 'linear-gradient(to right, #fff2ed, #fff8f5)',


        'gradientForBorder': 'linear-gradient(to bottom, #050505, #131415)',
        'gradientForBg': 'linear-gradient(to right, #D5FD7E, #7BF080)',


      },
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      transitionDuration: {
        "400": "400ms"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

