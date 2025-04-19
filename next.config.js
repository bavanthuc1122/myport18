/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  swcMinify: true,
  // Không có cấu hình experimental
};

module.exports = nextConfig;
