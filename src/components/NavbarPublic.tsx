'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, UserCheck, Radio, GraduationCap, Building2, Target, Users } from 'lucide-react';
import React from 'react';

export function NavbarPublic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const navLinksStart = [
    { href: '/', label: 'Inicio' },
  ];

  const navLinksEnd = [
    { href: '/convenios', label: 'Convenios' },
    { href: '/contact', label: 'Contacto' },
  ];

  const featureLinks = [
    { href: '/funcionalidades#accesos', label: 'Control de accesos, salidas y permisos', icon: UserCheck },
    { href: '/funcionalidades#tracking', label: 'Tracking en tiempo real', icon: Radio },
    { href: '/funcionalidades#gestion', label: 'Gestión académica y registro de asistencia', icon: GraduationCap },
  ];

  const aboutLinks = [
    { href: '/about/about-us', label: 'Sobre ChubAI', icon: Building2 },
    { href: '/about/mision', label: 'Nuestra Misión', icon: Target },
    { href: '/about/team', label: 'Nuestro Equipo', icon: Users },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Menú hamburguesa en mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="compact-horizontal" size="md" />
          <span className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">Chubai</span>
        </Link>

        {/* Links - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Inicio */}
          {navLinksStart.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(link.href) ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Dropdown Funcionalidades */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className={cn(
              'text-sm font-medium transition-colors flex items-center gap-1',
              isActive('/features') ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
            )}>
              Funcionalidades
              <ChevronDown className={cn(
                'w-4 h-4 transition-transform',
                dropdownOpen && 'rotate-180'
              )} />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {featureLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#633AF8]/10 hover:text-[#633AF8] transition-colors"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dropdown Acerca de */}
          <div
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button className={cn(
              'text-sm font-medium transition-colors flex items-center gap-1',
              pathname.startsWith('/about') ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
            )}>
              Acerca de
              <ChevronDown className={cn(
                'w-4 h-4 transition-transform',
                aboutDropdownOpen && 'rotate-180'
              )} />
            </button>

            {/* Dropdown menu */}
            {aboutDropdownOpen && (
              <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {aboutLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setAboutDropdownOpen(false)}
                      className="flex items-start gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#633AF8]/10 hover:text-[#633AF8] transition-colors"
                    >
                      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Convenios y Contacto */}
          {navLinksEnd.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(link.href) ? 'text-[#633AF8]' : 'text-gray-700 hover:text-[#633AF8]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Menú móvil de navegación */}
      {mobileMenuOpen && (
        <>
          {/* Menu desplegable con altura automática */}
          <div className="fixed top-[57px] left-0 right-0 bg-white z-50 shadow-lg border-b border-gray-200 lg:hidden">
            <div className="p-4">
              {/* Navigation */}
              <nav className="space-y-1">
                {/* Inicio */}
                {navLinksStart.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-lg transition-colors text-base font-medium',
                      isActive(link.href)
                        ? 'bg-[#633AF8]/10 text-[#633AF8]'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Features submenu mobile */}
                <div>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-base font-medium',
                      isActive('/features')
                        ? 'bg-[#633AF8]/10 text-[#633AF8]'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    Funcionalidades
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      dropdownOpen && 'rotate-180'
                    )} />
                  </button>
                  {dropdownOpen && (
                    <div className="bg-gray-50 rounded-lg mt-1 ml-2 py-2">
                      {featureLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setDropdownOpen(false);
                            }}
                            className="flex items-start gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-[#633AF8]/10 hover:text-[#633AF8] transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* About submenu mobile */}
                <div>
                  <button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-base font-medium',
                      pathname.startsWith('/about')
                        ? 'bg-[#633AF8]/10 text-[#633AF8]'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    Acerca de
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      aboutDropdownOpen && 'rotate-180'
                    )} />
                  </button>
                  {aboutDropdownOpen && (
                    <div className="bg-gray-50 rounded-lg mt-1 ml-2 py-2">
                      {aboutLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setAboutDropdownOpen(false);
                            }}
                            className="flex items-start gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-[#633AF8]/10 hover:text-[#633AF8] transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Convenios y Contacto */}
                {navLinksEnd.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-lg transition-colors text-base font-medium',
                      isActive(link.href)
                        ? 'bg-[#633AF8]/10 text-[#633AF8]'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
