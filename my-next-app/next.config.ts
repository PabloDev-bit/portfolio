import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Active le mode strict de React
  swcMinify: true, // Active la minification SWC pour de meilleures performances
  experimental: {
    appDir: true, // Si vous utilisez le dossier app
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: false, // Redirige les pages inexistantes vers la page d'accueil
      },
    ];
  },
};

export default nextConfig;
