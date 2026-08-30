/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        script: ['Alex Brush', 'cursive'],
        encrypt: ['Orbitron', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6%, 8%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 4%) scale(0.96)' },
        },
        driftMedium: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-8%, -6%) scale(1.1)' },
        },
        driftFast: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(5%, -10%)' },
        },
        heroPopIn: {
          '0%': { opacity: '0', transform: 'scale(0.6) rotate(-10deg)', filter: 'blur(8px)' },
          '60%': { opacity: '1', transform: 'scale(1.05) rotate(1deg)', filter: 'blur(0px)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)', filter: 'blur(0px)' },
        },
        heroWordIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out both',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'drift-slow': 'driftSlow 22s ease-in-out infinite',
        'drift-medium': 'driftMedium 16s ease-in-out infinite',
        'drift-fast': 'driftFast 11s ease-in-out infinite',
        heroPopIn: 'heroPopIn 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        heroWordIn: 'heroWordIn 0.7s ease-out both',
        marquee: 'marquee 18s linear infinite',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
      }
    },
  },
  plugins: [],
}
