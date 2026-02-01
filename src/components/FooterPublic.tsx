'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function FooterPublic() {
    const navLinks = [
        { href: '/', label: 'Inicio' },
        { href: '/features', label: 'Funcionalidades' },
        { href: '/about/about-us', label: 'Acerca de' },
        { href: '/convenios', label: 'Convenios' },
        { href: '/contact', label: 'Contacto' },
    ];

    return (
        <footer className="bg-slate-100 text-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top section with logo and links */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Logo variant="compact-horizontal" size="lg" />
                        <span className="text-2xl font-semibold tracking-tight">Chubai</span>
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

                {/* Divider */}
                <div className="border-t border-slate-300 mb-6"></div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-sm text-slate-500">
                        © 2025 ChubAI. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
