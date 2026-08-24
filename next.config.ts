import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The industry grid shows reference work hosted on Dribbble's CDN. These
    // are other designers' shots, served from their host — every tile credits
    // the shot and links back to it.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
