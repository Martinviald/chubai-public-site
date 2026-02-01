'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Bus, BookOpen, Target, Eye, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FooterPublic } from '@/components/FooterPublic';

export default function AboutUsPage() {
    const pillars = [
        {
            icon: Shield,
            title: 'Control de accesos y permisos',
            description: 'Registro digital de entradas, salidas, retiros y permisos con trazabilidad completa.',
        },
        {
            icon: Bus,
            title: 'Tracking en tiempo real',
            description: 'Seguimiento de estudiantes en rutas escolares y salidas organizadas por el colegio.',
        },
        {
            icon: BookOpen,
            title: 'Gestión académica y asistencia',
            description: 'Registro de asistencia, horarios por alumno y comunicaciones con familias.',
        },
    ];

    const values = [
        { icon: Shield, title: 'Seguridad', description: 'La seguridad de los estudiantes es nuestra prioridad.' },
        { icon: Target, title: 'Orden', description: 'Información clara, ordenada y siempre accesible.' },
        { icon: Eye, title: 'Trazabilidad', description: 'Todo movimiento queda registrado y respaldado.' },
        { icon: Heart, title: 'Prevención', description: 'Anticipamos problemas antes de que ocurran.' },
        { icon: Lightbulb, title: 'Transparencia', description: 'Datos claros para todos los involucrados.' },
        { icon: Target, title: 'Simpleza', description: 'Herramientas intuitivas que cualquiera puede usar.' },
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
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Sobre{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ChubAI
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            ChubAI es una plataforma de gestión escolar inteligente que conecta colegios, familias
                            y transporte escolar en un solo lugar, con información en tiempo real.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Three Pillars */}
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
                                Nuestros tres pilares
                            </h2>
                            <p className="text-lg text-slate-600">
                                Tres funcionalidades integradas en una sola plataforma
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {pillars.map((pillar, index) => {
                                const Icon = pillar.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -8 }}
                                    >
                                        <Card className="border-2 border-slate-200 hover:border-blue-600/50 transition-all duration-300 h-full">
                                            <CardContent className="p-6 text-center">
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                                                    <Icon className="w-8 h-8 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-slate-900">{pillar.title}</h3>
                                                <p className="text-slate-600">{pillar.description}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-12 lg:py-20 bg-white/50 backdrop-blur-sm">
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
                                Nuestros valores
                            </h2>
                            <p className="text-lg text-slate-600">
                                Los principios que guían cada decisión en ChubAI
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -4 }}
                                        className="bg-white rounded-xl p-6 border-2 border-slate-200 hover:shadow-lg transition-all"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-slate-900">{value.title}</h3>
                                        <p className="text-sm text-slate-600">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Quieres conocer más?</h2>
                        <p className="text-lg text-slate-600">
                            Descubre cómo ChubAI puede transformar la gestión de tu colegio.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                Solicitar demo
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
