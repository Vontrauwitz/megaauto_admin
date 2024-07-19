/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946', // Rojo Principal
        secondary: '#F1FAEE', // Rojo Secundario
        accent: '#000000', // Negro
        background: '#FFFFFF', // Blanco
      },
      fontFamily: {
        sans: ['Aeonik Regular', 'sans-serif'],
        bold: ['Aeonik Bold', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
};
