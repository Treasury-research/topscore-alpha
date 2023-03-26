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
      },
      {
        source: '/nft',
        destination: '/nft/0x09c85610154a276a71eb8a887e73c16072029b20?profileId=101548',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
