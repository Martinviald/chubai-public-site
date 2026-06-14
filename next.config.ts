import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chubai-landing/index.html',
        permanent: false,
      },
    ];
  },
  env: {
    // Variables del sistema de email
    EMAIL_SERVICE_HOST: process.env.EMAIL_SERVICE_HOST,
    EMAIL_SERVICE_PORT: process.env.EMAIL_SERVICE_PORT,
    EMAIL_SERVICE_SECURE: process.env.EMAIL_SERVICE_SECURE,
    EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER,
    EMAIL_SERVICE_PASS: process.env.EMAIL_SERVICE_PASS,
    EMAIL_DESTINATION_USER: process.env.EMAIL_DESTINATION_USER,
    
    // Variables públicas (si las hay)
    // NEXT_PUBLIC_: process.env.NEXT_PUBLIC_,
  }
};

export default nextConfig;
