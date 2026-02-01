// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavbarPublic } from '@/components/NavbarPublic';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chubai',
  description: 'Una aplicación para rastrear y gestionar información escolar',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        <NavbarPublic />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
