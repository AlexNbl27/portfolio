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
        body: ['"Manrope"', 'sans-serif'],
        blanka: ['"Blanka"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 24px rgba(246, 212, 13, 0.35)',
        'glow-hover': '0 24px 60px rgba(4, 9, 22, 0.35), 0 0 32px rgba(246, 212, 13, 0.1)',
        'glass-card': '0 8px 32px 0 rgba(4, 9, 22, 0.37)'
      },
      borderRadius: {
        card: '1.6rem',
        badge: '999px',
        btn: '999px'
      }
    }
  },
  plugins: []
};
