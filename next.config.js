/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  trailingSlash: true,
};

module.exports = nextConfig;
