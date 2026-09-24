'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function FooterPublic() {
    const navLinks = [
        { href: '/', label: 'Soluciones' },
        { href: 'https://app.chubai.cl/asistencia', label: 'Asistencia' },
        { href: 'https://app.chubai.cl/tracking', label: 'Tracking' },
        { href: '/about', label: 'Nosotros' },
        { href: '/contact', label: 'Contacto' },
    ];

    return (
        <footer className="bg-slate-100 text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top section with logo and links */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Logo variant="compact-horizontal" size="lg" />
                        <span className="text-2xl font-semibold tracking-tight">ChubAI</span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} ChubAI. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
