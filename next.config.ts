import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/f/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lru0noefhu.ufs.sh",
        port: "",
        pathname: "/f/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/a/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
