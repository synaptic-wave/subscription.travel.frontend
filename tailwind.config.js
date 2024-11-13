/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '16px',
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1232px'
        }
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      primary: {
        600: '#5A7BF0',
        DEFAULT: '#5A7BF0'
      },
      gray: {
        100: '#EAEAF4',
        500: '#A3A5B8',
        600: '#8D8FA2'
      },
      grey: {
        DEFAULT: '#909090',
        100: '#B7C5C8'
      }
    }
  },
  plugins: []
}
