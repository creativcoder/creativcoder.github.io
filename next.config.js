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
  images: {
    loader: "akamai",
    path: "/",
  },
};
