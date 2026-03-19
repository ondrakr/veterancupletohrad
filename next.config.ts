import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", pathname: "/api/**" },
      { protocol: "https", hostname: "localhost", pathname: "/api/**" },
      {
        protocol: "https",
        hostname: "veterancupletohrad.cz",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
