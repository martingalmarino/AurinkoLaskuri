/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['opendata.fmi.fi'],
  },
  async rewrites() {
    return [
      {
        source: '/fi/aurinkopaneelit-laskuri/:kunta',
        destination: '/fi/aurinkopaneelit-laskuri/[kunta]',
      },
    ];
  },
}

module.exports = nextConfig
