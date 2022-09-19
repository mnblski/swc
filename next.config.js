/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/people/",
        destination: "/people/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
