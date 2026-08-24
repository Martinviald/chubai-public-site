import { redirect } from 'next/navigation';

/**
 * En condiciones normales esta pagina NO se ejecuta: el rewrite `beforeFiles` de
 * next.config.ts atiende "/" y sirve la landing estatica manteniendo la URL limpia.
 *
 * Se conserva como red de seguridad: si el rewrite no se aplicara en el entorno de
 * despliegue, la raiz sigue resolviendo a la landing (con la URL larga a la vista)
 * en lugar de responder 404.
 */
export default function Home() {
  redirect('/chubai-landing/index.html');
}
