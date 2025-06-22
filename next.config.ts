import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
