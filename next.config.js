/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // SECURITY: Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' chrome-extension: moz-extension: https: data: blob:;
              style-src 'self' 'unsafe-inline' chrome-extension: moz-extension: https: data:;
              img-src 'self' data: https: chrome-extension: moz-extension: blob:;
              font-src 'self' data: https: chrome-extension: moz-extension:;
              connect-src 'self' https: wss: chrome-extension: moz-extension: data: blob:;
              frame-src 'self' https: chrome-extension: moz-extension:;
              worker-src 'self' blob:;
              object-src 'none';
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      }
    ];
  },
  
  // SECURITY: Environment variable validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configuration optimized for production deployment
  
  // SECURITY: Build-time environment checks
  publicRuntimeConfig: {
    // Add your public config here
  },
  
  // SECURITY: Disable x-powered-by header
  poweredByHeader: false,
  
  // SECURITY: Enable compression
  compress: true,
  
  // SECURITY: Generate sourcemaps only in development
  productionBrowserSourceMaps: false,
  
  // SECURITY: Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Security: Remove console.log in production
    if (!dev && !isServer) {
      // Check if minimizer exists and has terserOptions
      if (config.optimization.minimizer && 
          config.optimization.minimizer[0] && 
          config.optimization.minimizer[0].options && 
          config.optimization.minimizer[0].options.terserOptions) {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      }
    }
    
    // Handle web workers (fixes HeartbeatWorker issue)
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: /node_modules.*Worker/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    // Fix for wallet/web3 modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  }
};

module.exports = nextConfig;
