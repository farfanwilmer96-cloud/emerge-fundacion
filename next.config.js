const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
    ],
  },
  // Renamed from experimental.serverComponentsExternalPackages in Next 15
  serverExternalPackages: ['mongodb'],
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async rewrites() {
    return [
      { source: '/admin', destination: '/admin/index.html' },
    ]
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production'
    const corsOrigin = process.env.CORS_ORIGINS && process.env.CORS_ORIGINS !== '*'
      ? process.env.CORS_ORIGINS
      : (process.env.NEXT_PUBLIC_BASE_URL || 'https://fundacrecer.org')
    return [
      {
        // Headers de seguridad para TODO el sitio
        source: "/(.*)",
        headers: [
          // Anti-clickjacking: solo permitir iframe desde el mismo origen
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self';" },
          // Prevenir MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer mínimo
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HSTS (solo prod, con dominio propio HTTPS)
          ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
          // Permissions restrictivas por defecto
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        // CORS explícito SOLO para /api — restringido al dominio del sitio
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: corsOrigin },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          { key: "Vary", value: "Origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
