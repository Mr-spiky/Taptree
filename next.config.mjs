/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // reactCompiler: true, // Disabled — causes HMR rebuild loop with babel-plugin-react-compiler@1.0.0 + React 19

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header

  // Image optimization configuration
  images: {
    // Allow common image hosting domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS images (for user profile pics)
      },
    ],
    // Modern formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Minimize image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allow quality 85 for background images
    qualities: [75, 85],
    // Cache optimized images for 1 year - prevents reload on refresh
    minimumCacheTTL: 31536000,
  },

  // Security headers (additional headers in vercel.json)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      // Cache static images aggressively - won't reload on refresh
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
