import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hwchamber.co.uk',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
