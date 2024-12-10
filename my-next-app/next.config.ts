import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-path", // Changez "/old-path" à une route spécifique si nécessaire
        destination: "/new-path", // Assurez-vous que la destination n'est pas "/old-path"
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
