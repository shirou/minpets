/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@patternfly/react-core',
  '@patternfly/react-styles',
])

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  webpack: (config) => {
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    }
    return config
  },};

module.exports = withTM(nextConfig);
