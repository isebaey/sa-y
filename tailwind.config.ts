import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.vue',
    './features/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#09090b',
          light: '#ffffff',
        },
        card: {
          DEFAULT: '#18181b',
          light: '#f4f4f5',
        },
        accent: '#a78bfa',
        success: '#4ade80',
        warning: '#f87171',
      },
      fontFamily: {
        sans: ['Tajawal', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
