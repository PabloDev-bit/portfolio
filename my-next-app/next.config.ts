import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Active le mode strict de React
  // Note : "swcMinify" a été supprimé car non reconnu dans Next.js 15.

  // Redirections pour les pages inexistantes
  async redirects() {
    return [
      {
        source: "/:path*", // Redirige toutes les pages non existantes
        destination: "/", // Redirection vers la page d'accueil
        permanent: false, // Indique que ce n'est pas une redirection permanente
      },
    ];
  },
};

export default nextConfig;
