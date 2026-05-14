import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
  serverExternalPackages: ["bcryptjs", "@prisma/adapter-pg"],
  onDemandEntries: {
    maxInactiveAge: 25_000,
    pagesBufferLength: 2,
  },
  experimental: {
    serverComponentsHmrCache: false,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
