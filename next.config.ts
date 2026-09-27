import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.abcz.workers.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.abcz.workers.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
