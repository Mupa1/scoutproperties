/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-500': '#8CAD2A',
        'primary-600': '#708a22',
        'secondary-500': '#16539B',
        'secondary-600': '#12427C',
      },
    },
  },
  plugins: [],
};
