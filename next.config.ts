import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
      },
    ],
  },
};


export default nextConfig;
