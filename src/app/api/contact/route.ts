import { NextRequest, NextResponse } from 'next/server';
import { EmailSender, ContactFormData } from '@/lib/email/emailSender';

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validar campos requeridos
        if (!body.name || !body.email || !body.subject || !body.message) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Por favor completa todos los campos requeridos (nombre, email, asunto y mensaje).'
                },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Por favor ingresa un email válido.'
                },
                { status: 400 }
            );
        }

        // Crear instancia del EmailSender y enviar el email
        const emailSender = new EmailSender();
        const emailSent = await emailSender.sendContactFormEmail(body);

        if (emailSent) {
            return NextResponse.json(
                {
                    success: true,
                    message: '¡Gracias por contactarnos! Te responderemos pronto.'
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: false,
                    error: 'No se pudo enviar el mensaje. Por favor intenta nuevamente.'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error en /api/contact:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Error interno del servidor. Por favor intenta más tarde.',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
