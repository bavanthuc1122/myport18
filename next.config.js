/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  // Cấu hình ISR
  experimental: {
    // Cho phép sử dụng res.revalidate() trong API routes
    runtime: 'nodejs',
  },
};

module.exports = nextConfig;
