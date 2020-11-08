// next.config.js
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
      mozjpeg: {
        quality: 40,
      },
      optimizeImagesInDev: true,
    },
  ],
  {
    images: {
      domains: ['instagram.fbne5-1.fna.fbcdn.net'],
    },
  },
  // your other plugins here
])
