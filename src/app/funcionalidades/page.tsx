'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Users, 
  Bell, 
  Calendar,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Shield,
  Bus,
  Eye,
  Home
} from 'lucide-react';

export default function FuncionalidadesPage() {
  const problems = [
    {
      number: 1,
      title: 'Trazabilidad y visibilidad',
      description: 'Los colegios y apoderados no tienen una visión clara del trayecto. Desconocen ubicación, tiempos y estado actual del transporte.',
      features: [
        'Seguimiento en tiempo real del bus y del alumno.',
        'ETA preciso y dinámico por parada.'
      ],
      icon: Eye,
      gradient: 'from-blue-500 to-cyan-500',
      benefits: 'Vista Chofer | Vista Colegio y Apoderado'
    },
    {
      number: 2,
      title: 'Entrada y salida de personas',
      description: 'La falta de información genera confusión diaria. No hay un canal centralizado para coordinar horarios y cambios.',
      features: [
        'Comunicación y avisos en vivo entre colegio, conductor y familia.',
        'Agenda actualizada automática por estudiante.'
      ],
      icon: MessageCircle,
      gradient: 'from-purple-500 to-pink-500',
      benefits: 'Desorganización y comunicación | Calendario y Chat'
    },
    {
      number: 3,
      title: 'Seguridad e Inconvenientes',
      description: 'Ante imprevistos, el colegio y los padres reaccionan tarde. No existe un protocolo unificado ni trazabilidad completa.',
      features: [
        'Botón de alerta y registro en vivo del incidente.',
        'Historial completo del recorrido y asistencia.'
      ],
      icon: Shield,
      gradient: 'from-green-500 to-emerald-500',
      benefits: 'Seguridad e Inconvenientes | Botón de Pánico'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-30"></div>
                <div className="relative bg-white rounded-2xl p-4 shadow-xl">
                  <Image
                    src="/logo.png"
                    alt="ChubAI Logo"
                    width={120}
                    height={30}
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Problemas que solucionamos
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Soluciones innovadoras para los desafíos diarios del transporte, logística y gestión escolar
            </p>
          </motion.div>

          {/* Problems Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${problem.gradient} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      {/* <span className="text-lg font-bold bg-white bg-opacity-20 rounded-full px-4 py-1">
                        Problema {problem.number}
                      </span> */}
                        <h3 className="text-2xl font-bold mb-2">{problem.title}</h3>
                      <problem.icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {problem.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {problem.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom badge */}
                    <div className="mt-auto">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                        <p className="text-xs text-slate-600 font-medium text-center">
                          {problem.benefits}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${problem.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-3xl`}></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Características Principales
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Seguimiento GPS</h3>
                  <p className="text-sm text-slate-600">Ubicación en tiempo real de todos los vehículos</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Estadísticas de conductores</h3>
                  <p className="text-sm text-slate-600">Tiempo estimado de llegada, velocidad, comportamiento y otros indicadores</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Bell className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Notificaciones</h3>
                  <p className="text-sm text-slate-600">Alertas automáticas para todos los involucrados</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-rose-100 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Botón de Pánico</h3>
                  <p className="text-sm text-slate-600">Respuesta inmediata ante emergencias</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Agenda Automática</h3>
                  <p className="text-sm text-slate-600">Programación inteligente por estudiante de horarios y personas autorizadas a retirarlo</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="bg-cyan-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Comunicación Unificada</h3>
                  <p className="text-sm text-slate-600">Chat centralizado entre todos los actores</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para transformar tu colegio?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Únete a las instituciones que ya están mejorando la seguridad y comunicación escolar
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Solicitar Demostración
                  </motion.button>
                </Link>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center"
                  >
                    <Home className="w-5 h-5" />
                    Volver al Inicio
                  </motion.button>
                </Link>
              </div>
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
              <Link href="/funcionalidades" className="hover:text-white transition-colors">
                Funcionalidades
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
