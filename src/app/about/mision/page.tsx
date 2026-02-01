'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, Bus, Users, TrendingDown, Shield, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FooterPublic } from '@/components/FooterPublic';

export default function AboutMissionPage() {
    const stats = [
        {
            icon: TrendingDown,
            value: '848.000',
            label: 'Estudiantes con inasistencia grave',
            context: 'En septiembre 2024, casi un tercio de la matrícula escolar chilena',
            color: 'text-red-600',
        },
        {
            icon: Users,
            value: '47.500+',
            label: 'Estudiantes abandonaron sus estudios',
            context: 'Entre 2023 y 2024 en Chile',
            color: 'text-orange-600',
        },
        {
            icon: AlertTriangle,
            value: '2.675',
            label: 'Accidentes en transporte escolar',
            context: 'Registrados entre 2006 y 2015 en Chile',
            color: 'text-amber-600',
        },
        {
            icon: Bus,
            value: '408.080',
            label: 'Niños usan transporte escolar',
            context: '2 de cada 10 niños en Chile',
            color: 'text-blue-600',
        },
    ];

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
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                            <Target className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Nuestra{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Misión
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            ChubAI busca reducir la deserción escolar y mejorar la seguridad en el transporte,
                            utilizando tecnología para prevenir ausentismo y proteger a los estudiantes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Problem Context */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                                El problema que queremos resolver
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                                La deserción escolar y los incidentes en transporte escolar son problemas reales que
                                afectan a miles de familias en Chile cada año.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="border-2 border-slate-200 hover:shadow-lg transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                                        <p className="font-medium text-slate-900 mt-1">{stat.label}</p>
                                                        <p className="text-sm text-slate-600 mt-1">{stat.context}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* How ChubAI Helps */}
            <section className="py-12 lg:py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                                Cómo ChubAI aborda estos problemas
                            </h2>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-2 border-blue-200 bg-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 text-slate-900">
                                                    Control de accesos y permisos
                                                </h3>
                                                <p className="text-slate-600">
                                                    Registro digital de entradas, salidas y retiros con trazabilidad completa.
                                                    Saber quién está en el colegio en todo momento previene situaciones de riesgo.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-2 border-blue-200 bg-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                                <Bus className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 text-slate-900">
                                                    Tracking de transporte escolar
                                                </h3>
                                                <p className="text-slate-600">
                                                    Seguimiento en tiempo real de rutas escolares con alertas ante desvíos o
                                                    incidentes. Las familias saben dónde están sus hijos en cada momento.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Card className="border-2 border-blue-200 bg-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                                <Users className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 text-slate-900">
                                                    Gestión de asistencia
                                                </h3>
                                                <p className="text-slate-600">
                                                    Registro de asistencia con alertas tempranas de ausentismo. Detectar patrones
                                                    de inasistencia permite intervenir antes de que se conviertan en deserción.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Únete a nuestra misión</h2>
                        <p className="text-lg text-slate-600">
                            Ayúdanos a crear un entorno escolar más seguro y ordenado para todos.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            Conocer más
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <FooterPublic />
        </main>
    );
}
