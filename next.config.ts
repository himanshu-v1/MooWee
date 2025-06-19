import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['en.wikipedia.org', 'upload.wikimedia.org'],
  }
};

export default nextConfig;
