module.exports = {
  darkMode:'class',
  content: [
   './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors:{
        me:{
          yello: '#efe9d9',

          brown:{
            100:'#efe9d9',
            200:'#b4a890'
          },
          secondary:{
            100:'#90CDD0',
            150:'#90CEE0',
            200:'#37A6A0',
          },
          black:{
            500:'#000',
            400:'#323232',
            350:'#444649',
            300:'#444444',
            200:'#747474',
            100:'#B1B1B1'
          },
          light:{
            100:'#B1B1B1'
          },
          red:{
            300:'#ca4c68'
          },
          fb:'#3b5998',
          in:'#0e76a8',
          tum:'#34526f',
          gh:'#747474'
        }
      },
      fontFamily:{
        body: ['Alegreya Sans'],
        title:['Inter', 'sans-serif'],
        decotitle:['Raleway','sans-serif'],
        
      },  
      letterSpacing: {
        x:'.2rem',
        xl:'.4rem',
        xxl: '1.3rem'
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'spin-slow': 'spin 4s linear infinite',
      }
    },
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
  ],
}
