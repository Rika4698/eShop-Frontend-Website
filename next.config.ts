import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        {
          protocol: "https",
          hostname: "https://firebasestorage.googleapis.com",
        },
        {
          protocol: "http",
          hostname: "example.com",
        },
        {
          protocol: "https",
          hostname: "https://i.pravatar.cc",
        }
       
      ],
    },
};

export default nextConfig;
