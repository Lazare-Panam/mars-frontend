import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Always put <title>/meta in the initial <head> instead of streaming it in
  // later. With streaming, crawlers that don't run JS (SE Ranking's audit
  // bot, and the Googlebot UA in our test) saw no title on server-rendered
  // pages like /products/series-10-10/variants ("Title tag missing").
  htmlLimitedBots: /.*/,
  // Part numbers were renamed from Mars "V…" to Kronox "KX-…" codes in SQL;
  // send old /series part-number links to the new pages (308).
  async redirects() {
    return [
      {
        source: "/series/:id/variants/V:rest([0-9A-Z][^/]*)",
        destination: "/series/:id/variants/KX-:rest",
        permanent: true,
      },
    ];
  },
  images: {
    // Default deviceSizes tops out at 3840px, so a full-width (sizes="100vw")
    // image on a high-DPR screen could pull a 3840px source. None of our layouts
    // need more than ~2048px (hero is the widest), so we drop 3840 to stop small
    // cards and heroes over-fetching. imageSizes covers the small fixed-width
    // thumbnails (cards declare sizes like "88px"/"300px").
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
