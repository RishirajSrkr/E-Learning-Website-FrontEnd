/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColorOne: '#040608',
        bgColorTwo: '#090D15',
        cardBgColor: '#10151F',
        tagBgColor: '#0D1118',
        buttonBgColor: '#131313',

      },
      backgroundImage: {
        'buttonGradient' : 'linear-gradient(to right, #DE5198, #657FFC)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

