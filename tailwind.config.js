
/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  theme: {
    extend: {
      colors: {
        
        //bg one is darker
        bgOne: '#050505',
        bgOneLight: '#0A0A0A',
        bgTwo: '#131415',
        bgThree: '#1b1c1e',


        //gray is used for sub texts
        // gray: '#9CA1A4',
        offwhite: '#FFFFF7',
        // accentColor: '#FE5328',
        accentColor: '#FF4533',

        lightBorder: '#E4E4E7',
        darkBorder: '#232323',



      },
      backgroundImage: {

      'gradientForBg': 'linear-gradient(to right, #7FEE64, #7FEE64)'

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

  ],
}

