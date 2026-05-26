import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  eslint: {
    dirs: ["src/app", "src/components", "src/data", "src/hooks", "src/lib"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
