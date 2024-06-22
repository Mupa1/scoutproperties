/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-50': '#f4f7ea',
        'primary-100': '#dfe8c3',
        'primary-200': '#cad99d',
        'primary-300': '#b5cb77',
        'primary-400': '#a1bc50',
        'primary-500': '#8CAD2A',
        'primary-600': '#738e22',
        'primary-700': '#5a6f1b',
        'primary-800': '#405013',
        'primary-900': '#27300c',
        'primary-950': '#0e1104',
        'secondary-500': '#16539B',
      },
      height: {
        '60vh': '60vh',
        '80vh': '80vh',
      },
    },
  },
  plugins: [],
};
