'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Target, 
  Heart, 
  Users, 
  Shield, 
  TrendingUp, 
  Lightbulb,
  Award,
  Eye,
  Handshake,
  Zap,
  Globe,
  Mail,
  Linkedin
} from 'lucide-react';

export default function AboutPage() {
  const mission = {
    title: 'Nuestra Misión',
    description: 'En ChubAI creemos que la seguridad escolar empieza con la confianza. Por ende, desarrollamos una plataforma que permite a colegios, apoderados y choferes conectarse en tiempo real, visualizar la ubicación de tus hijos, recibir alertas automáticas y gestionar el transporte escolar de forma segura y simple.',
    icon: Target,
    gradient: 'from-blue-600 to-indigo-600'
  };

  const pillars = [
    {
      icon: Shield,
      title: 'Seguridad Primero',
      description: 'Protección de datos y trazabilidad completa en cada acción. La seguridad de los estudiantes es nuestra prioridad número uno.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Innovación Continua',
      description: 'Desarrollo constante de nuevas funcionalidades basadas en las necesidades reales de las instituciones educativas.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Enfoque Humano',
      description: 'Tecnología diseñada pensando en las personas: fácil de usar, intuitiva y accesible para todos.',
      gradient: 'from-rose-500 to-red-500'
    },
    {
      icon: Handshake,
      title: 'Colaboración',
      description: 'Facilitamos la comunicación y coordinación entre todos los actores del ecosistema educativo.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Eficiencia',
      description: 'Optimizamos procesos administrativos para que las instituciones puedan enfocarse en lo que realmente importa: la educación.',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: Eye,
      title: 'Transparencia',
      description: 'Información clara y accesible en tiempo real para todos los involucrados en el proceso educativo.',
      gradient: 'from-indigo-500 to-violet-500'
    }
  ];

  const team = [
    {
      name: 'Clemente Imbert',
      role: 'Director de Estrategia y Marketing',
      image: '/team/Clemente.jpeg',
      description: 'Ingeniero Comercial de la Pontificia Universidad Católica de Chile, con minor en Innovación y Emprendimiento.',
      linkedin: 'https://www.linkedin.com/in/clemente-imbert-urz%C3%BAa-a19770212/'
    },
    {
      name: 'Martín Vial',
      role: 'Jefe de tecnología y desarrollo',
      image: '/team/Martín.png',
      description: 'Ingeniero de software y data science de la Pontificia Universidad Católica de Chile especializado en sistemas de información.',
      linkedin: 'https://www.linkedin.com/in/martin-vial-d%C3%ADaz-8197a2154/'
    },
    {
      name: 'José Tomás Gomez',
      role: 'Gerente de Finanzas y Operaciones',
      image: '/team/Topo.png',
      description: 'Ingeniero Comercial de la Pontificia Universidad Católica de Chile, con minor en Finanzas y Computación.',
      linkedin: 'https://www.linkedin.com/in/jose-tomas-gomez-vicuna'
    },
    {
      name: 'Juan Aspillaga',
      role: 'Director de Ventas y Alianzas Estratégicas',
      image: '/team/Juan.jpeg',
      description: 'Ingeniero Comercial con dos años de estudios en el extranjero y apasionado por las ventas.',
      linkedin: 'https://www.linkedin.com/in/juan-ignacio-aspillaga-vergara-20265420b/'
    },
  ];

  const values = [
    { icon: Award, text: 'Excelencia en cada detalle' },
    { icon: Users, text: 'Trabajo en equipo colaborativo' },
    { icon: Lightbulb, text: 'Innovación constante' },
    { icon: Globe, text: 'Visión global, impacto local' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo y Título en la misma línea */}
            <div className="flex items-center justify-center gap-8 mb-8">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30"></div>
                  <div className="relative bg-white rounded-3xl p-6 shadow-2xl">
                    <Image
                      src="/logo.png"
                      alt="ChubAI Logo"
                      width={200}
                      height={50}
                      priority
                      className="relative"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900"
              >
                Sobre
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ChubAI
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Transformando la gestión educativa con tecnología de vanguardia
              <span className="block mt-2 text-lg text-slate-500">
                Un equipo comprometido con la innovación y la excelencia
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-3xl p-12 shadow-2xl border border-slate-100">
              <div className="flex flex-col items-center text-center">
                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${mission.gradient} mb-8`}>
                  <mission.icon className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  {mission.title}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
                  {mission.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nuestros Pilares
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Los valores fundamentales que guían cada decisión y desarrollo en ChubAI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 h-full">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${pillar.gradient} mb-6`}>
                    <pillar.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Principios que definen nuestra cultura y forma de trabajo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-slate-900">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Profesionales apasionados dedicados a revolucionar la educación
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                  {/* Image Container */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-24 w-24 text-blue-300" />
                    </div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              ¿Quieres conocer más?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Estamos aquí para responder todas tus preguntas y ayudarte a transformar tu institución
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex"
                >
                  <div className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    <span>Volver al inicio</span>
                  </div>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex"
                >
                  <div className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    <Mail className="h-5 w-5" />
                    <span>Contáctanos</span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="ChubAI Logo"
              width={120}
              height={30}
              className="mx-auto mb-4 opacity-80 invert"
            />
            <p className="text-sm">
              © 2025 ChubAI. Plataforma de gestión escolar inteligente.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                Sobre Nosotros
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
