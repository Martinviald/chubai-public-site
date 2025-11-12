'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import React from 'react';

export function NavbarPublic() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo variant="compact-horizontal" size="lg" />
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">Chubai</span>
        </Link>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              'text-base font-medium transition-colors',
              isActive('/') ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
            )}
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className={cn(
              'text-base font-medium transition-colors',
              isActive('/about') ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
            )}
          >
            Acerca de
          </Link>
          <Link
            href="/contact"
            className={cn(
              'text-base font-medium transition-colors',
              isActive('/contact') ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
            )}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
