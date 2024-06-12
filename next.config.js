/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    missingSuspenseWithCSRBailout: true,
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "http://127.0.0.1:8090/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
