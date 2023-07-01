const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const plugins = []
const devOnlyPlugins = []

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        themeText: 'var(--text)',
        themeTextSecondary: 'var(--textSecondary)',
        themeBg: 'var(--background)',
        themeAccent: 'var(--accent)',
        varDark: 'var(--dark)',
        varLight: 'var(--light)',
      },
      maxHeight: {
        'screen-1/2': '50vh',
      },
    },
  },
  plugins:
    process.env.NODE_ENV === 'production'
      ? plugins
      : [...plugins, devOnlyPlugins],
}
