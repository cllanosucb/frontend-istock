/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f5f5f7',
        card: '#ffffff',
        accent: '#0071e3',
        'accent-dark': '#0059b3',
        ok: '#1e8e3e',
        warn: '#e8830f',
        danger: '#d93025',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
        softer: '0 4px 20px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
