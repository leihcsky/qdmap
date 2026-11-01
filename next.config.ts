import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Homepage IS the map. Keep /map as a permanent alias to `/`.
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/map",
        destination: "/",
        permanent: true,
      },
      {
        source: "/map/",
        destination: "/",
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
