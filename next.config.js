/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/profile/stani',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/profile/stani',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
