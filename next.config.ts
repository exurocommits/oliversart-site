import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.oliversart.com' },
      { protocol: 'https', hostname: '**.print-tings.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
