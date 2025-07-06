import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "fal.media",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "cdn.fluxcontext.top",
      },
    ],
  },
};

export default nextConfig;
