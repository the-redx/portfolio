import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'crema': {
          100: 'var(--color-crema-100)', // card background
          200: 'var(--color-crema-200)', // parent card background
          300: 'var(--color-crema-300)', // back background
          400: 'var(--color-crema-400)', // progress bar, labels background
          500: 'var(--color-crema-500)', // meta
          600: 'var(--color-crema-600)', // title
          700: 'var(--color-crema-700)', // bold text
        },
      },
    },
  },
  plugins: [],
};

export default config;
