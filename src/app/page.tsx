'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Bus, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Bell, 
  TrendingUp,
  ArrowRight,
  Smartphone,
  Eye,
  Lock,
  MessageCircle,
  Calendar,
  Car
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Clock,
      title: 'Control de Horarios',
      description: 'Registro preciso de entradas, salidas y cambios en horarios de retiro con trazabilidad completa en tiempo real.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bus,
      title: 'Gestión de Transporte',
      description: 'Monitoreo del sistema de transporte escolar con ubicación y estado de cada vehículo.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Control de retiros',
      description: 'Gestiona cambios en personas autorizadas a retirar un estudiante con autorizaciones digitales seguras.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Eye,
      title: 'Trazabilidad Total',
      description: 'Visibilidad completa para profesores y funcionarios sobre el movimiento estudiantil.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    { icon: MapPin, text: 'Monitoreo en tiempo real de rutas escolares' },
    { icon: Calendar, text: 'Gestión eficiente de horarios escolares' },
    { icon: Lock, text: 'Botón de pánico para emergencias en viaje' },
    { icon: Car, text: 'Gestión de quién retira al estudiante' },
    { icon: Bell, text: 'Notificaciones en tiempo real' },
    { icon: CheckCircle2, text: 'Reduce errores administrativos' },
    { icon: TrendingUp, text: 'Reportes y análisis detallados' },
    { icon: Users, text: 'Gestión centralizada' },
    { icon: MessageCircle, text: 'Comunicación unificada efectiva' }
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
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
            >
              Gestión Escolar
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Inteligente y Segura
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Plataforma integral para la gestión de horarios, transporte escolar y trazabilidad estudiantil
              <span className="block mt-2 text-lg text-slate-500">
                Mayor seguridad, menos errores, más tranquilidad y eficiencia
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-6 py-3 rounded-full shadow-lg">
                <Smartphone className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Accede desde cualquier dispositivo</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Funcionalidades Principales
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Todo lo que necesitas para gestionar tu institución educativa de forma eficiente y segura
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
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
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Beneficios de la Plataforma
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Optimiza la gestión de tu colegio con herramientas diseñadas para la era digital
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {benefit.text}
                  </p>
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
              ¿Listo para transformar tu institución?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Únete a las instituciones educativas que ya confían en ChubAI para la gestión de sus estudiantes
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex"
            >
              <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 cursor-pointer">
                <span>Comienza ahora</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
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
