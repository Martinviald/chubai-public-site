'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  Heart,
  Shield,
  Eye,
  Lightbulb,
  Mail,
  Linkedin
} from 'lucide-react';
import { FooterPublic } from '@/components/FooterPublic';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Seguridad y resguardo de estudiantes',
      description: 'La seguridad de los estudiantes es nuestra prioridad número uno.',
    },
    {
      icon: Target,
      title: 'Orden y trazabilidad',
      description: 'Información clara, ordenada y completamente trazable.',
    },
    {
      icon: Lightbulb,
      title: 'Simpleza para el usuario',
      description: 'Herramientas intuitivas que cualquiera puede usar.',
    },
    {
      icon: Eye,
      title: 'Transparencia en los datos',
      description: 'Información accesible y clara para todos los involucrados.',
    },
    {
      icon: Heart,
      title: 'Prevención y mejora continua',
      description: 'Anticipamos problemas y mejoramos constantemente.',
    },
    {
      icon: Target,
      title: 'Eficiencia operacional',
      description: 'Optimizamos procesos para ahorrar tiempo y recursos.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Entendemos tus procesos',
      description:
        'Analizamos tu gestión académica actual, control de accesos y sistema de transporte para entender tus necesidades específicas.',
    },
    {
      number: '02',
      title: 'Configuramos ChubAI',
      description:
        'Adaptamos la plataforma según la realidad de tu establecimiento, respetando tus procesos y flujos de trabajo.',
    },
    {
      number: '03',
      title: 'Acompañamos la implementación',
      description:
        'Trabajamos junto a tu equipo en la puesta en marcha y realizamos los ajustes necesarios para garantizar el éxito.',
    },
  ];

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
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Por qué existe ChubAI
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
              ChubAI nace para ordenar y conectar toda la gestión diaria de los colegios: lo que
              pasa en las aulas, en portería, en el transporte y en la relación con las familias,
              en una sola plataforma y en tiempo real.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900">Misión</h2>
              <p className="text-slate-600 leading-relaxed">
                Facilitar la gestión académica, operativa y de seguridad de los colegios con una
                plataforma simple, centralizada y en tiempo real, reduciendo errores y mejorando
                la experiencia de estudiantes, equipos internos y familias.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900">Visión</h2>
              <p className="text-slate-600 leading-relaxed">
                Que cada colegio en Latinoamérica pueda saber, en todo momento, qué ocurre con sus
                estudiantes, sus clases y sus recursos, con datos claros y trazables.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">
              Nuestros valores
            </h2>
            <p className="text-lg text-slate-600">Los principios que guían cada decisión en ChubAI.</p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>

      {/* How We Work */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">
              Cómo trabajamos con los colegios
            </h2>
            <p className="text-lg text-slate-600">
              Un proceso simple y efectivo para implementar ChubAI en tu establecimiento.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-slate-900">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">Nuestro equipo</h2>
            <p className="text-lg text-slate-600">
              Profesionales comprometidos con la innovación en gestión escolar
            </p>
          </motion.div>

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
                      className="text-indigo-600 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <button className="text-indigo-600 hover:text-blue-600 transition-colors">
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
