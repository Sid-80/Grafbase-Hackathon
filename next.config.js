/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.dribbble.com',
    },
  ],},
}

module.exports = nextConfig
