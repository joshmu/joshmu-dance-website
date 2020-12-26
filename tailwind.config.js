const defaultTheme = require('tailwindcss/defaultTheme')

const plugins = []
const devOnlyPlugins = [require('tailwindcss-debug-screens')]

module.exports = {
  purge: ['./pages/**/*.js', './src/components/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
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
  variants: {},
  plugins:
    process.env.NODE_ENV === 'production'
      ? plugins
      : [...plugins, devOnlyPlugins],
}
