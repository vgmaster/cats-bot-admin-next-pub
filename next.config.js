/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img*.joyreactor.cc',
      },
    ],
  },
}

module.exports = nextConfig
