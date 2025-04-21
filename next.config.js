/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tắt tính năng trace để tránh lỗi EPERM
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  // Tắt ESLint trong quá trình build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tắt TypeScript checking trong quá trình build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cấu hình cho Sanity Studio
  transpilePackages: ['next-sanity'],
  // Cấu hình webpack để xử lý các modules của Sanity
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Không bundle các modules của Sanity trong client-side
      config.externals = [...(config.externals || []), 'canvas', 'bufferutil', 'utf-8-validate'];
    }
    return config;
  }
};

module.exports = nextConfig;
