/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  swcMinify: true,
  // Tắt ESLint trong quá trình build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tắt TypeScript checking trong quá trình build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Không có cấu hình experimental
};

module.exports = nextConfig;
