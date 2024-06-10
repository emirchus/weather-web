/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: () => {
    console.log(`https://api.weatherapi.com/v1/:path* &key=${process.env.NEXT_PUBLIC_API_KEY}`);
    return [
      {
        source: "/api/:path*",
        destination: `https://api.weatherapi.com/v1/:path* &key=${process.env.NEXT_PUBLIC_API_KEY}`,
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
