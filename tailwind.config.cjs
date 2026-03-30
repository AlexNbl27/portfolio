/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cosmic: {
          900: '#030713',
          800: '#090f24',
          700: '#0f1735',
          600: '#1a2347',
          500: '#2c2a5f',
          gold: '#f6d40d',
          pink: '#f2b4df',
          nebula: '#6a4fb2'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 24px rgba(246, 212, 13, 0.35)'
      }
    }
  },
  plugins: []
};
