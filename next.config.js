/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  // Cấu hình ISR
  experimental: {
    // Các cấu hình thử nghiệm hợp lệ
  },
};

module.exports = nextConfig;
