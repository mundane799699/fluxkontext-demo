import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fal.media",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
