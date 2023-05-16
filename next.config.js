/** @type {import('next').NextConfig} */
const path = require('path')
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/profile/stani',
        permanent: true,
      }
    ]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.icon\.svg$/;
    config.module.rules.push({
      test: /\.icon\.svg$/,
      loader: require.resolve("@svgr/webpack"),
    });
    return config;
  }
}

module.exports = nextConfig
