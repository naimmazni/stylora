import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cf.shopee.co.id',
      },
      {
        protocol: 'https',
        hostname: 'down-id.img.susercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopee.com',
      },
      {
        protocol: 'https',
        hostname: '**.shopee.co.id',
      },
    ],
  },
};

export default nextConfig;
