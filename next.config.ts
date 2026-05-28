import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'strapim2.beve.dev' },
      { protocol: 'http', hostname: 'localhost', port: '1337' },
    ],
  },
};

export default nextConfig;
