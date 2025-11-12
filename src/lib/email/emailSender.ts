import nodemailer, { Transporter } from 'nodemailer';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  institution?: string;
  subject: string;
  message: string;
}

/**
 * Clase para enviar emails usando nodemailer
 */
export class EmailSender {
  private transporter: Transporter;

  constructor() {
    this.transporter = this.initializeTransporter();
  }

  /**
   * Inicializa el transportador de Nodemailer con configuración SMTP
   */
  private initializeTransporter(): Transporter {
    const emailConfig = {
      host: process.env.EMAIL_SERVICE_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_SERVICE_PORT || '587', 10),
      secure: process.env.EMAIL_SERVICE_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
      },
    };

    return nodemailer.createTransport(emailConfig);
  }

  /**
   * Envía un email con los datos del formulario de contacto
   * @param data - Datos del formulario de contacto
   * @returns Promise<boolean> - true si el email se envió exitosamente
   */
  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    try {
      const { name, email, phone, institution, subject, message } = data;

      // Mapear el asunto a un formato más legible
      const subjectMap: Record<string, string> = {
        demo: '🎯 Solicitud de Demostración',
        pricing: '💰 Consulta de Precios',
        support: '🛠️ Soporte Técnico',
        partnership: '🤝 Alianza Comercial',
        other: '📧 Consulta General',
      };

      const emailSubject = `${subjectMap[subject] || '📧 Contacto Web'} - ${name}`;

      // Contenido del email
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .icon { font-size: 48px; margin-bottom: 10px; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .info-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .info-row { margin: 15px 0; padding: 10px; background: #f9fafb; border-radius: 6px; }
            .label { font-weight: bold; color: #1e40af; display: block; margin-bottom: 5px; font-size: 12px; text-transform: uppercase; }
            .value { color: #1f2937; font-size: 16px; }
            .message-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
            .badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="icon">📬</div>
              <h1>Nuevo Mensaje de Contacto</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Formulario Web ChubAI</p>
            </div>
            
            <div class="content">
              <div class="info-box">
                <p style="margin: 0; font-size: 18px; color: #1e40af;">
                  <strong>✉️ Has recibido un nuevo mensaje desde el formulario de contacto</strong>
                </p>
              </div>

              <div class="info-row">
                <span class="label">👤 Nombre Completo</span>
                <span class="value">${name}</span>
              </div>

              <div class="info-row">
                <span class="label">📧 Email</span>
                <span class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></span>
              </div>

              ${
                phone
                  ? `
              <div class="info-row">
                <span class="label">📱 Teléfono</span>
                <span class="value"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></span>
              </div>
              `
                  : ''
              }

              ${
                institution
                  ? `
              <div class="info-row">
                <span class="label">🏫 Institución</span>
                <span class="value">${institution}</span>
              </div>
              `
                  : ''
              }

              <div class="info-row">
                <span class="label">🏷️ Asunto</span>
                <span class="value">${subjectMap[subject] || subject}</span>
                <div class="badge">${subject.toUpperCase()}</div>
              </div>

              <div class="info-row">
                <span class="label">🕐 Fecha y Hora</span>
                <span class="value">${new Date().toLocaleString('es-CL', {
                  timeZone: 'America/Santiago',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}</span>
              </div>

              <div class="info-row">
                <span class="label">💬 Mensaje</span>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>

              <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="margin: 0; color: #065f46;">
                  <strong>💡 Próximo Paso:</strong> Responde directamente al email del contacto: <a href="mailto:${email}" style="color: #059669;">${email}</a>
                </p>
              </div>
            </div>

            <div class="footer">
              <p>Este es un mensaje automático del Formulario de Contacto de ChubAI.</p>
              <p style="margin: 5px 0;">© ${new Date().getFullYear()} ChubAI - Plataforma de Gestión Escolar</p>
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
NUEVO MENSAJE DE CONTACTO - ChubAI

Nombre: ${name}
Email: ${email}
${phone ? `Teléfono: ${phone}` : ''}
${institution ? `Institución: ${institution}` : ''}
Asunto: ${subjectMap[subject] || subject}

Mensaje:
${message}

---
Responder a: ${email}
Fecha: ${new Date().toLocaleString('es-CL')}
      `;

      const mailOptions = {
        from: `"ChubAI Contacto Web" <${process.env.EMAIL_SERVICE_USER}>`,
        to: process.env.CONTACT_FORM_EMAIL || 'chubaichile@gmail.com',
        replyTo: email,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      };

      await this.transporter.sendMail(mailOptions);
      
      console.log(`✅ Email de contacto enviado exitosamente a ${process.env.CONTACT_FORM_EMAIL || 'chubaichile@gmail.com'}`);
      console.log(`📧 De: ${name} (${email})`);
      console.log(`🏷️ Asunto: ${subject}`);

      return true;
    } catch (error) {
      console.error('❌ Error al enviar email de contacto:', error);
      throw error;
    }
  }
}
