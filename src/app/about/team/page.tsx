'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Users } from 'lucide-react';
import { FooterPublic } from '@/components/FooterPublic';

export default function AboutTeamPage() {
    const team = [
        {
            image: '/team/Juan.jpeg',
            name: 'Juan Aspillaga',
            role: 'Director de Ventas y Alianzas Estratégicas',
            description:
                'Ingeniero Comercial con dos años de estudios en el extranjero y apasionado por las ventas.',
            linkedin: 'https://www.linkedin.com/in/juan-ignacio-aspillaga-vergara-20265420b/',
        },
        {
            image: '/team/Martín.png',
            name: 'Martín Vial',
            role: 'Jefe de tecnología y desarrollo',
            description:
                'Ingeniero de software y data science especializado en sistemas de información.',
            linkedin: 'https://www.linkedin.com/in/martin-vial-d%C3%ADaz-8197a2154/',
        },
        {
            image: '/team/Clemente.jpeg',
            name: 'Clemente Imbert',
            role: 'Director de Estrategia y Marketing',
            description:
                'Ingeniero Comercial de la Pontificia Universidad Católica de Chile, con minor en Innovación y Emprendimiento.',
            linkedin: 'https://www.linkedin.com/in/clemente-imbert-urz%C3%BAa-a19770212/',
        },
        {
            image: '/team/Topo.png',
            name: 'José Tomás Gomez',
            role: 'Gerente de Finanzas y Operaciones',
            description:
                'Ingeniero Comercial de la Pontificia Universidad Católica de Chile, con minor en Finanzas y Computación.',
            linkedin: 'https://www.linkedin.com/in/jose-tomas-gomez-vicuna',
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
                            <Users className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Nuestro{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Equipo
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                            Profesionales comprometidos con la innovación en gestión escolar
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:shadow-xl transition-all"
                            >
                                <div className="aspect-square overflow-hidden bg-slate-100">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-slate-900">{member.name}</h3>
                                    <p className="text-sm font-semibold text-indigo-600 mb-3">{member.role}</p>
                                    <p className="text-sm text-slate-600 mb-4">{member.description}</p>
                                    <div className="flex gap-3">
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-600 hover:text-indigo-600 transition-colors"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <button className="text-slate-600 hover:text-indigo-600 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterPublic />
        </main>
    );
}
