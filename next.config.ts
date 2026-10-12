import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'globaltech.fldesigners.co.zw',
        port: '',
        pathname: '/**', // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
