import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pblol2.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
