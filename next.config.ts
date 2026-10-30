import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The brand system is a stand-alone page with its own styles, served from /public.
  async rewrites() {
    return [{ source: "/brand", destination: "/brand.html" }];
  },
  async headers() {
    return [
      { source: "/brand.html", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      { source: "/brand", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
