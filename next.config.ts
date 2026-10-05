import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Always put <title>/meta in the initial <head> instead of streaming it in
  // later. With streaming, crawlers that don't run JS (SE Ranking's audit
  // bot, and the Googlebot UA in our test) saw no title on server-rendered
  // pages like /products/series-10-10/variants ("Title tag missing").
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pblol2.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
