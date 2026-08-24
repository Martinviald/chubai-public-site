import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La raiz sirve la landing estatica SIN cambiar la URL. Antes esto era un redirect 307,
  // que dejaba "chubai.cl/chubai-landing/index.html" a la vista en la barra de direcciones.
  // Un rewrite entrega el mismo archivo manteniendo "chubai.cl/".
  // Va en `beforeFiles` para que gane sobre el enrutado de la app.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/chubai-landing/index.html',
        },
      ],
      afterFiles: [],
      fallback: [],
    };
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
