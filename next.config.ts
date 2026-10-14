import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // Or '10mb', '500kb', etc. depending on your needs
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'globaltech.fldesigners.co.zw',
        port: '',
        pathname: '/**', // Allows all paths under this domain
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
