/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile/0x09c85610154a276a71eb8a887e73c16072029b20',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
