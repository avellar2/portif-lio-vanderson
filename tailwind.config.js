/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        secondary: '#8b5cf6',
        accent: '#ec4899',
        surface: {
          DEFAULT: '#06060e',
          50: '#0a0a14',
          100: '#0f0f1a',
          200: '#141420',
          300: '#1a1a2e',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'aurora': 'aurora-shift 20s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'aurora-shift': {
          '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translate(60px, -60px) rotate(3deg) scale(1.06)' },
          '50%': { transform: 'translate(-40px, 40px) rotate(-2deg) scale(0.97)' },
          '75%': { transform: 'translate(50px, -30px) rotate(1.5deg) scale(1.04)' },
          '100%': { transform: 'translate(-30px, -40px) rotate(-1deg) scale(1.02)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
