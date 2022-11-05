/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register:true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
})

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    loader: "akamai",
    path: "/",
  }
});
