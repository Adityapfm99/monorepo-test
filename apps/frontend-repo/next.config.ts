import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React's strict mode
  swcMinify: true, // Use SWC minification for faster builds

  // Custom Webpack Configuration
  webpack(config, { isServer }) {
    if (!isServer) {
      // Resolve backend-only modules for frontend compatibility
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },

  // API Rewrites (Example for Firebase Emulator or Backend Integration)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5001/backend-ebuddy-dd012/us-central1/:path*",
      },
    ];
  },
};

export default nextConfig;
