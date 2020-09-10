// next.config.js
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
      mozjpeg: {
        quality: 80,
      },
    },
  ],
  // your other plugins here
])
