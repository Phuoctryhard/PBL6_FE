/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#1fb6ff',
        purple: '#7e5bef',
        pink: '#ff49db',
        orange: '#ff7849',
        green: '#13ce66',
        yellow: '#ffc82c',
        'gray-dark': '#273444',
        red1: 'rgb(238, 77, 45)'
      },
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translate3d(0, 100px, 0)',
            opacity: 0
          },
          '100%': {
            transform: 'translateZ(0)',
            opacity: 1
          }
        },
        slideLeftToRight: {
          '0%': {
            transform: 'translate3d(-100px, 0, 0)',
            opacity: 0
          },
          '100%': {
            transform: 'translateZ(0)',
            opacity: 1
          }
        },
        slideRightToLeft: {
          '0%': {
            transform: 'translate3d(100px, 0, 0)',
            opacity: 0
          },
          '100%': {
            transform: 'translateZ(0)',
            opacity: 1
          }
        },
        slideDown: {
          '0%': {
            transform: 'translate3d(0, -100px, 0)',
            opacity: 0
          },
          '100%': {
            transform: 'translateZ(0)',
            opacity: 1
          }
        }
      },
      animation: {
        slideLeftToRight: 'slideLeftToRight 1s ease',
        slideRightToLeft: 'slideRightToLeft 1s ease',
        slideUp: 'slideUp 1s ease',
        slideDown: 'slideDown 1s ease'
      }
    }
  },
  plugins: []
}
