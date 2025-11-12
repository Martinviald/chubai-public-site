'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function NavbarPublic() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/funcionalidades', label: 'Funcionalidades' },
    { href: '/about', label: 'Acerca de' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo variant="compact-horizontal" size="lg" />
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">Chubai</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-base font-medium transition-colors',
                isActive(link.href) ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-[#633AF8] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
