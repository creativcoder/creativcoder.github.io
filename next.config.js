/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  distDir: "build",
  images: {
    loader: "akamai",
    path: "/",
  },
};
