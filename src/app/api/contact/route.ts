import { NextRequest, NextResponse } from 'next/server';
import { EmailSender, ContactFormData } from '@/lib/email/emailSender';

export async function POST(request: NextRequest) {
  try {
    // Parsear datos del formulario
    const data: ContactFormData = await request.json();

    // Validar campos requeridos
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Enviar email
    const emailSender = new EmailSender();
    await emailSender.sendContactFormEmail(data);

    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado exitosamente' 
    });

  } catch (error) {
    console.error('Error al procesar formulario de contacto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al enviar el email. Por favor, intenta nuevamente.' 
      },
      { status: 500 }
    );
  }
}
