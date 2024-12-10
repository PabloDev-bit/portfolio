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
        permanent: false, // Si vous voulez rediriger toutes les erreurs vers l'accueil
      },
    ];
  },
};

export default nextConfig;
