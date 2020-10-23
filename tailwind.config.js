const defaultTheme = require('tailwindcss/defaultTheme')

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
    },
  },
  variants: {},
  plugins: [require('tailwindcss-debug-screens')],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true, // color shades are similar brightness
    extendedSpacingScale: true, // 72, 80, 96
    extendedFontSizeScale: true, // 7xl, 8xl, 9xl
  },
}
