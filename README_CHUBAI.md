# ChubAI Landing - Proyecto Independiente

Landing page independiente de ChubAI con las páginas: **Inicio**, **About** y **Contact**.

## ✅ Estado Actual

- ✅ Proyecto Next.js 16 creado
- ✅ Dependencias instaladas (framer-motion, lucide-react)
- ✅ Assets copiados (logo.png, team/)
- ✅ Estilos globales configurados (globals.css)
- ✅ Página principal (Home) lista

## 🚀 Ejecutar el Proyecto

\`\`\`bash
cd apps/landing
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura

\`\`\`
apps/landing/
├── src/
│   └── app/
│       ├── page.tsx          ✅ (Home - LISTO)
│       ├── globals.css       ✅ (Estilos - LISTO)
│       ├── about/            ⏳ (Crear manualmente)
│       └── contact/          ⏳ (Crear manualmente)
├── public/
│   ├── logo.png             ✅
│   └── team/                ✅
\`\`\`

## ⚠️ Páginas Pendientes

Necesitas crear manualmente:
1. **src/app/about/page.tsx** - Copia de admin-app sin backend
2. **src/app/contact/page.tsx** - Copia de admin-app, formulario con console.log

Ver archivos originales en:
- \`apps/admin-app/app/about/page.tsx\`
- \`apps/admin-app/app/contact/page.tsx\`

Remover de Contact:
- \`import { api } from '@/lib/apiClient';\`
- Lógica de conexión al backend
- Dejar solo \`console.log('📧 Enviado:', formData);\`

## 🎨 Características

- ✅ Responsive design
- ✅ Animaciones (Framer Motion)
- ✅ Iconos (Lucide React)
- ✅ Tailwind CSS
- ✅ TypeScript
- ✅ Next.js 16

## ✅ Independiente

Esta app NO depende de:
- ❌ Backend
- ❌ Admin-app
- ❌ Driver-app
- ❌ Auth0

Puede moverse a cualquier carpeta/repositorio.
