# Sistema de Envío de Correos - Landing Page ChubAI

## 📧 Descripción

Sistema simple de envío de correos automáticos para el formulario de contacto de la landing page. Utiliza Nodemailer para enviar emails con los datos del formulario a través de SMTP de Gmail.

## 🏗️ Arquitectura

```
apps/landing/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # API Route de Next.js
│   │   └── contact/
│   │       └── page.tsx               # Página de contacto
│   └── lib/
│       └── email/
│           └── emailSender.ts         # Clase EmailSender
├── .env.local                         # Variables de entorno (NO subir a Git)
└── .env.example                       # Ejemplo de variables de entorno
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz de `apps/landing/` con las siguientes variables:

```bash
# Configuración de Email
EMAIL_SERVICE_HOST=smtp.gmail.com
EMAIL_SERVICE_PORT=587
EMAIL_SERVICE_SECURE=false
EMAIL_SERVICE_USER=juan@chubai.cl
EMAIL_SERVICE_PASS=tu-contraseña-de-aplicacion

# Email destino del formulario de contacto
CONTACT_FORM_EMAIL=juan@chubai.cl
```

### 2. Contraseña de Aplicación de Gmail

Para usar Gmail SMTP necesitas crear una "Contraseña de Aplicación":

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Seguridad → Verificación en dos pasos (debe estar activada)
3. Contraseñas de aplicaciones
4. Selecciona "Correo" y el dispositivo
5. Copia la contraseña generada (16 caracteres sin espacios)
6. Usa esa contraseña en `EMAIL_SERVICE_PASS`

## 🚀 Uso

### Clase EmailSender

```typescript
import { EmailSender, ContactFormData } from '@/lib/email/emailSender';

const emailSender = new EmailSender();

const data: ContactFormData = {
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  phone: '+56 9 1234 5678',
  institution: 'Colegio Ejemplo',
  subject: 'demo',
  message: 'Quisiera solicitar una demostración...'
};

await emailSender.sendContactFormEmail(data);
```

### API Route

El formulario de contacto envía una petición POST a `/api/contact`:

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});

const result = await response.json();
// { success: true, message: 'Email enviado exitosamente' }
```

## 📝 Formato de Email

El email enviado incluye:

- **Asunto**: Tipo de consulta + Nombre del contacto
- **Contenido HTML**: 
  - Información del contacto (nombre, email, teléfono, institución)
  - Asunto categorizado con badge
  - Mensaje completo
  - Fecha y hora del envío
  - Link directo para responder al email del contacto
- **Reply-To**: Se configura automáticamente al email del contacto

### Tipos de Asunto

- `demo` → 🎯 Solicitud de Demostración
- `pricing` → 💰 Consulta de Precios
- `support` → 🛠️ Soporte Técnico
- `partnership` → 🤝 Alianza Comercial
- `other` → 📧 Consulta General

## 🔒 Seguridad

- ✅ Variables de entorno en `.env.local` (no se suben a Git)
- ✅ Validación de campos requeridos en el API route
- ✅ Validación de formato de email
- ✅ Manejo de errores con try/catch
- ✅ Logs de consola para debugging

## 🧪 Testing

Para probar el envío de emails:

1. Asegúrate de tener las variables de entorno configuradas
2. Ejecuta el servidor de desarrollo: `npm run dev`
3. Ve a `/contact` y completa el formulario
4. Verifica el email en la bandeja de entrada de `CONTACT_FORM_EMAIL`

## 📦 Dependencias

```json
{
  "dependencies": {
    "nodemailer": "^6.9.x"
  },
  "devDependencies": {
    "@types/nodemailer": "^6.4.x"
  }
}
```

## ⚠️ Notas Importantes

1. **Next.js API Routes**: Este sistema usa API Routes de Next.js, lo que significa que la app **NO es 100% estática**. Necesita un servidor Node.js para funcionar.

2. **Despliegue**: 
   - ✅ Funciona en Vercel (soporta API Routes)
   - ✅ Funciona en cualquier hosting Node.js
   - ❌ NO funciona en hosting estático puro (GitHub Pages, Netlify sin functions)

3. **Rate Limiting**: Considera implementar rate limiting para evitar spam.

4. **Gmail Limits**: Gmail tiene límites de envío (500 emails/día para cuentas gratuitas).

## 🐛 Troubleshooting

### Error: "Invalid login"
- Verifica que hayas creado una contraseña de aplicación
- Verifica que la verificación en dos pasos esté activada
- Verifica que el email sea correcto

### Error: "Connection timeout"
- Verifica tu conexión a internet
- Verifica que el puerto 587 no esté bloqueado por firewall
- Intenta con `EMAIL_SERVICE_PORT=465` y `EMAIL_SERVICE_SECURE=true`

### Email no llega
- Revisa la carpeta de spam
- Verifica los logs de consola para ver si hay errores
- Verifica que `CONTACT_FORM_EMAIL` esté correcto

## 📚 Referencias

- [Nodemailer Documentation](https://nodemailer.com/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
