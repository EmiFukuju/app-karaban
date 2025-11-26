import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Added for static export
  images: {
    unoptimized: true, // Added for static export, as GitHub Pages doesn't have image optimization server
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  basePath: '/app-karaban', // Added for GitHub Pages deployment
};

export default nextConfig;
