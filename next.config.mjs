/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        destination: `https://api.weatherapi.com/v1/:path*`,
      },
      {
        source: "/usig/:path*",
        destination: "https://servicios.usig.buenosaires.gob.ar/normalizar/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.weatherapi.com",
      },
    ],
  },
};

export default nextConfig;
