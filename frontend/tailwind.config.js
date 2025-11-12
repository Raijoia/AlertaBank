/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-confianca': '#0B4C8C',
        'azul-claro': '#2E86DE',
        'cinza-escuro': '#333333',
        'amarelo-alerta': '#F5B800',
        'branco-limpo': '#FFFFFF',
      },
      fontFamily: {
        'montserrat': ['"Montserrat"', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}