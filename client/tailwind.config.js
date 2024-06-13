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
        'secondary-50': '#dae3ef',
        'secondary-500': '#16539B',
        'secondary-600': '#12427C',
        // 'primary-50': '#fcf9f4',
        // 'primary-100': '#f9f3e9',
        // 'primary-200': '#f2e6d3',
        // 'primary-500': '#BE8421',
        // 'primary-700': '#302108',
        // 'primary-800': '#1d1405',
        // 'primary-900': '#130d03',
      },
    },
  },
  plugins: [],
};
