import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Enable type checking during build
    tsconfigPath: "./tsconfig.json"
  }
};

export default nextConfig;
