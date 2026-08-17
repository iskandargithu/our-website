/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: '#2C1D18',
          50: '#F7F3F1',
          100: '#E8DDD8',
          200: '#C9B5AC',
          300: '#A88E82',
          400: '#7A5F54',
          500: '#574239',
          600: '#3F2E27',
          700: '#2C1D18',
          800: '#1F1410',
          900: '#140A07',
        },
        cream: {
          DEFAULT: '#FBF7F2',
          50: '#FEFDFB',
          100: '#FBF7F2',
          200: '#F5EDE3',
          300: '#EDE0D2',
        },
        glow: {
          DEFAULT: '#00B4D8',
          50: '#E0F7FD',
          100: '#BAEFFB',
          200: '#7DE0F7',
          300: '#38CCF0',
          400: '#00B4D8',
          500: '#0096BC',
          600: '#00789A',
          700: '#005B75',
          800: '#003E52',
          900: '#00232F',
        },
        success: {
          DEFAULT: '#22C55E',
          50: '#F0FDF4',
          100: '#DCFCE7',
          300: '#86EFAC',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          300: '#FCA5A5',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 180, 216, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 180, 216, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
