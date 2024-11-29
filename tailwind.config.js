
/** @type {import('tailwindcss').Config} */
export default {
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
        gray: '#9CA1A4',
        offwhite: '#FFFFF7',
        // accentColor: '#FE5328',
        accentColor: '#E7B8E8',

        border: '#232323',



      },
      backgroundImage: {

        'gradientForBorder': 'linear-gradient(to bottom, #050505, #131415)',
        'gradientForBorderOpposite': 'linear-gradient(to top, #050505, #131415)',

        'gradientForBg': 'linear-gradient(to right, #FFFFF7, #FFFFFF)',


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

