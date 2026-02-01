'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench, Car, Package, BookOpen, Settings, ShoppingCart, ArrowRight, Fuel } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FooterPublic } from '@/components/FooterPublic';

const convenios = [
    {
        name: 'FullMec',
        icon: Wrench,
        logo: null,
        description:
            'Plataforma para mantenimiento y reparación de vehículos escolares a domicilio, con inspecciones pre-compra.',
        benefits: [
            'Mantenimiento preventivo a domicilio',
            'Inspecciones pre-compra',
            'Atención especializada para flotas escolares',
        ],
        url: 'https://fullmec.cl/',
    },
    {
        name: 'AutoWolf',
        icon: Car,
        logo: null,
        description: 'Compra y venta de vehículos usados, además de servicios de mantenimiento vehicular.',
        benefits: [
            'Vehículos revisados y certificados',
            'Financiamiento flexible',
            'Servicio post-venta garantizado',
        ],
        url: '#',
    },
    {
        name: 'Surtiventas',
        icon: Package,
        logo: 'https://www.surtiventas.cl/files_logo/Surtiventas_01.jpg',
        description: 'Empresa de distribución de suministros escolares y de oficina para toda la comunidad educativa.',
        benefits: [
            'Descuentos exclusivos para colegios ChubAI',
            'Entregas programadas',
            'Amplio catálogo de productos',
        ],
        url: 'https://www.surtiventas.cl/',
    },
    {
        name: 'Prisa',
        icon: BookOpen,
        logo: 'https://www.prisa.cl/media/cache/attachment/filter/wysiwyg_original/11c00c6d0bd6b875afe655d3c9d4f942/33077/62d4d5723450c273641279.png',
        description: 'Proveedor de material y útiles escolares con precios preferenciales para la comunidad ChubAI.',
        benefits: [
            'Precios especiales',
            'Útiles de calidad garantizada',
            'Distribución a nivel nacional',
        ],
        url: 'https://www.prisa.cl/',
    },
    {
        name: 'Tu Auto al Día',
        icon: Settings,
        logo: null,
        description: 'Servicio de mantenimiento, revisión técnica y pintura de vehículos a domicilio.',
        benefits: [
            'Revisión técnica a domicilio',
            'Servicio de pintura express',
            'Mantenimiento integral',
        ],
        url: '#',
    },
    {
        name: 'Auto360',
        icon: ShoppingCart,
        logo: 'https://www.auto360.cl/wp-content/uploads/2024/05/logotipo-auto-360-alta.png',
        description: 'Plataforma para compra y venta de autos usados con revisión mecánica y financiamiento.',
        benefits: ['Revisión mecánica incluida', 'Opciones de financiamiento', 'Garantía de compra'],
        url: 'https://www.auto360.cl/',
    },
    {
        name: 'Combustible',
        icon: Fuel,
        logo: null,
        description: 'Descuentos exclusivos en combustible para choferes asociados a ChubAI.',
        benefits: [
            'Descuento por litro en bencina',
            'Beneficio para todos los conductores ChubAI',
            'Red de estaciones a nivel nacional',
        ],
        url: 'https://www.copec.cl/',
    },
];

export default function ConveniosPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 lg:pt-20">
            {/* Hero Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Convenios{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ChubAI
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Beneficios exclusivos para toda la comunidad ChubAI: colegios, profesores, alumnos,
                            apoderados y choferes de transporte escolar.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Convenios Grid */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {convenios.map((convenio, index) => {
                                const Icon = convenio.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -8 }}
                                    >
                                        <Card className="border-2 border-slate-200 hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl h-full">
                                            <CardHeader>
                                                <div className="w-full h-16 flex items-center justify-start mb-4">
                                                    {convenio.logo ? (
                                                        <div className="h-12 w-40">
                                                            <img
                                                                src={convenio.logo}
                                                                alt={`Logo de ${convenio.name}`}
                                                                className="h-full w-full object-contain object-left"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                                            <Icon className="w-7 h-7 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <CardTitle className="text-xl text-slate-900">{convenio.name}</CardTitle>
                                                <CardDescription className="text-sm leading-relaxed text-slate-600">
                                                    {convenio.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2 mb-4">
                                                    {convenio.benefits.map((benefit, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-2 text-sm text-slate-600"
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mt-2 flex-shrink-0" />
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                                {convenio.url !== '#' && (
                                                    <a
                                                        href={convenio.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:text-indigo-600 hover:underline font-medium inline-flex items-center gap-1"
                                                    >
                                                        Visitar sitio web
                                                        <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center space-y-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            ¿Quieres acceder a estos beneficios?
                        </h2>
                        <p className="text-lg text-slate-600">
                            Si eres parte de un colegio con ChubAI o quieres que tu colegio se una, contáctanos
                            para conocer todos los beneficios disponibles.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                Solicitar información
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href="/features"
                                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300"
                            >
                                Ver funcionalidades
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FooterPublic />
        </main>
    );
}
