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
        // New design system
        cupped: {
          bg:           '#FAF7F2',
          surface:      '#FFFFFF',
          border:       '#E8E0D5',
          text:         '#1C1410',
          muted:        '#8C7B6B',
          accent:       '#C4622D',
          'accent-dark':'#9B4A1F',
          'accent-soft':'#F5E6D8',
          'roast-light':'#D4A96A',
          'roast-medium':'#A0622A',
          'roast-dark': '#4A2010',
        },
        // Legacy colors (kept for compatibility)
        cream: {
          50:  '#FDFAF6',
          100: '#FAF7F2',
          200: '#F3EDE3',
          300: '#E8DDD0',
          400: '#D9C9B5',
          500: '#C8B49E',
        },
        espresso: {
          50:  '#F5EEE8',
          100: '#E0C9B4',
          200: '#C8A07A',
          300: '#A67548',
          400: '#7C5C3E',
          500: '#6B3F1F',
          600: '#4E2E14',
          700: '#3A200D',
          800: '#2C1A0E',
          900: '#1C1410',
        },
        gold: {
          400: '#D4A96A',
          500: '#C4622D',
          600: '#9B4A1F',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
