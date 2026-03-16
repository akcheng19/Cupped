import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF6',
          100: '#FAF7F2',
          200: '#F3EDE3',
          300: '#E8DDD0',
          400: '#D9C9B5',
        },
        espresso: {
          50: '#F5EEE8',
          100: '#E0C9B4',
          200: '#C8A07A',
          300: '#A67548',
          400: '#7C5C3E',
          500: '#6B3F1F',
          600: '#4E2E14',
          700: '#3A200D',
          800: '#2C1A0E',
          900: '#1A1008',
        },
        gold: {
          400: '#D4A017',
          500: '#C8860A',
          600: '#A36F08',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
