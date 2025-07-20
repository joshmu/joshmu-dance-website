/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Disable image optimization for now since there's no config yet
  images: {
    unoptimized: true,
  },
  
  // If you need to use experimental features, add them here
  experimental: {
    // Example: serverActions: true,
  },
}

module.exports = nextConfig