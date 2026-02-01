'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    MapPin,
    BookOpen,
    Shield,
    Bus,
    Calendar,
    AlertTriangle,
    LogIn,
    UserCheck,
    QrCode,
    MessageSquare,
    ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { FooterPublic } from '@/components/FooterPublic';

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 lg:pt-20">
            {/* Hero Section */}
            <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden">
                {/* Background Effects */}
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
                        {/* Logo */}
                        {/* <div className="flex justify-center mb-8">
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
                        </div> */}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                            Tres pilares integrados en{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                una sola plataforma
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            ChubAI unifica control de accesos, tracking en tiempo real y gestión académica
                            para ordenar, asegurar y prevenir en el día a día del colegio.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex mt-8"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <span>Solicitar demo</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Access Control Module */}
            <section id="accesos" className="py-12 lg:py-20 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-slate-200 shadow-xl">
                                <div className="space-y-4">
                                    {/* Main counter */}
                                    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                                        <CardContent className="p-5 text-center">
                                            <Shield className="w-10 h-10 text-green-600 mx-auto mb-2" />
                                            <p className="text-4xl font-bold text-green-700">342</p>
                                            <p className="text-xs text-slate-600 mt-2">
                                                Personas dentro del establecimiento
                                            </p>
                                        </CardContent>
                                    </Card>

                                    {/* Stats breakdown */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <Card className="border-2 border-blue-200">
                                            <CardContent className="p-3 text-center">
                                                <p className="text-xl font-bold text-blue-600">298</p>
                                                <p className="text-xs text-slate-600 mt-1">Estudiantes</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-2 border-indigo-200">
                                            <CardContent className="p-3 text-center">
                                                <p className="text-xl font-bold text-indigo-600">36</p>
                                                <p className="text-xs text-slate-600 mt-1">Personal</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-2 border-purple-200">
                                            <CardContent className="p-3 text-center">
                                                <p className="text-xl font-bold text-purple-600">8</p>
                                                <p className="text-xs text-slate-600 mt-1">Visitas</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Access log */}
                                    <Card className="border-2 border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-semibold mb-3">Registro de accesos</p>
                                            <div className="space-y-2">
                                                {[
                                                    { person: 'Ana Torres', type: 'Entrada', time: '08:15', role: 'Estudiante' },
                                                    { person: 'Carlos Díaz', type: 'Salida', time: '08:10', role: 'Personal' },
                                                    { person: 'María López', type: 'Entrada', time: '08:05', role: 'Visita' },
                                                ].map((access, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between py-2 border-b last:border-0"
                                                    >
                                                        <div className="flex items-center gap-2 flex-1">
                                                            <LogIn
                                                                className={`w-3 h-3 ${access.type === 'Entrada' ? 'text-green-600' : 'text-red-600'
                                                                    }`}
                                                            />
                                                            <div className="flex-1">
                                                                <p className="text-xs font-medium">{access.person}</p>
                                                                <p className="text-xs text-slate-600">{access.role}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xs font-medium">{access.time}</p>
                                                            <span
                                                                className={`text-xs px-2 py-0.5 rounded-full ${access.type === 'Entrada'
                                                                    ? 'bg-green-500/20 text-green-700'
                                                                    : 'bg-red-500/20 text-red-700'
                                                                    }`}
                                                            >
                                                                {access.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Permits & Visits */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="border-2 border-amber-200 bg-amber-50">
                                            <CardContent className="p-3">
                                                <QrCode className="w-4 h-4 text-amber-600 mb-2" />
                                                <p className="text-xs font-medium text-amber-700">4 permisos</p>
                                                <p className="text-xs text-slate-600">Pendientes</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-2 border-blue-200">
                                            <CardContent className="p-3">
                                                <UserCheck className="w-4 h-4 text-blue-600 mb-2" />
                                                <p className="text-xs font-medium">8 retiros</p>
                                                <p className="text-xs text-slate-600">Autorizados hoy</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
                                    Control de accesos, salidas y permisos
                                </h2>
                                <p className="text-lg text-slate-600">
                                    Controla quién entra, quién sale y bajo qué autorización.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    'Registro de entradas y salidas de estudiantes, funcionarios, visitas y proveedores',
                                    'Gestión digital de personas autorizadas a retirar a cada alumno',
                                    'Retiros y salidas especiales con responsable asignado y respaldo en la plataforma',
                                    'Permisos internos (enfermería, inspectoría, biblioteca) con trazabilidad por alumno',
                                    'Historial de accesos y permisos filtrable por fecha, alumno y tipo de evento',
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Tracking Module */}
            <section id="tracking" className="py-12 lg:py-20 bg-white/50 backdrop-blur-sm scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
                                    Tracking en tiempo real
                                </h2>
                                <p className="text-lg text-slate-600">
                                    Sigue a tus estudiantes en rutas diarias y salidas organizadas por el colegio.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    'Seguimiento en vivo de rutas escolares y traslados internos del colegio',
                                    'Tracking de salidas deportivas, culturales, sociales, giras y otras actividades',
                                    'Estado de cada alumno durante el trayecto: sube al transporte, está en viaje, llega a destino',
                                    'Alertas ante desvíos, atrasos o incidentes en ruta',
                                    'Historial de trayectos por alumno y por curso para revisión posterior',
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-slate-200 shadow-xl">
                                <div className="space-y-4">
                                    {/* Live tracking map */}
                                    <Card className="border-2 border-slate-200">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm font-semibold">Seguimiento en vivo</p>
                                                <span className="flex items-center gap-1 text-xs text-green-600">
                                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                                                    En vivo
                                                </span>
                                            </div>
                                            <div className="bg-slate-100 rounded-lg h-32 relative overflow-hidden">
                                                <div className="absolute inset-0 opacity-10">
                                                    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                                                        {Array.from({ length: 64 }).map((_, i) => (
                                                            <div key={i} className="border border-blue-400" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <Bus className="w-8 h-8 text-blue-600 animate-pulse" />
                                                </div>
                                                <div className="absolute bottom-4 left-4">
                                                    <MapPin className="w-6 h-6 text-green-600" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Student trips */}
                                    <Card className="border-2 border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-semibold mb-3">Viajes en curso</p>
                                            <div className="space-y-2">
                                                {[
                                                    { name: 'Juan Pérez', bus: 'Bus 3', status: 'En ruta', color: 'blue' },
                                                    { name: 'María Silva', bus: 'Bus 1', status: 'Recogido', color: 'green' },
                                                ].map((student, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between py-2 border-b last:border-0"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="text-xs font-medium">{student.name}</p>
                                                            <p className="text-xs text-slate-600">{student.bus}</p>
                                                        </div>
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full ${student.color === 'blue'
                                                                ? 'bg-blue-500/20 text-blue-700'
                                                                : 'bg-green-500/20 text-green-700'
                                                                }`}
                                                        >
                                                            {student.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Schedule & emergency */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="border-2 border-blue-200">
                                            <CardContent className="p-3">
                                                <Calendar className="w-4 h-4 text-blue-600 mb-2" />
                                                <p className="text-xs font-medium mb-1">Horario</p>
                                                <p className="text-xs text-slate-600">Recogida: 7:30</p>
                                                <p className="text-xs text-slate-600">Llegada: 8:15</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-2 border-red-200 bg-red-50">
                                            <CardContent className="p-3">
                                                <AlertTriangle className="w-4 h-4 text-red-600 mb-2" />
                                                <p className="text-xs font-medium text-red-700">Emergencia</p>
                                                <p className="text-xs text-slate-600">+56 9 1234 5678</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Academic Management Module */}
            <section id="gestion" className="py-12 lg:py-20 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-slate-200 shadow-xl">
                                <div className="space-y-4">
                                    {/* Attendance overview */}
                                    <Card className="border-2 border-slate-200">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                                    <p className="font-semibold text-sm">Registro de asistencia</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                {[
                                                    { name: 'Juan Pérez', status: 'Presente', time: '08:05' },
                                                    { name: 'María Silva', status: 'Ausente', time: '-' },
                                                    { name: 'Carlos López', status: 'Presente', time: '08:12' },
                                                ].map((student, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between py-2 border-b last:border-0"
                                                    >
                                                        <p className="text-xs font-medium">{student.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`text-xs px-2 py-0.5 rounded-full ${student.status === 'Presente'
                                                                    ? 'bg-green-500/20 text-green-700'
                                                                    : 'bg-red-500/20 text-red-700'
                                                                    }`}
                                                            >
                                                                {student.status}
                                                            </span>
                                                            <span className="text-xs text-slate-600">{student.time}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Calendar & Communications */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card className="border-2 border-blue-200">
                                            <CardContent className="p-3">
                                                <Calendar className="w-4 h-4 text-blue-600 mb-2" />
                                                <p className="text-xs font-medium mb-1">Horario de Juan</p>
                                                <p className="text-xs text-slate-600">Mat: 8:00-9:30</p>
                                                <p className="text-xs text-slate-600">Len: 9:45-11:15</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="border-2 border-indigo-200 bg-indigo-50">
                                            <CardContent className="p-3">
                                                <MessageSquare className="w-4 h-4 text-indigo-600 mb-2" />
                                                <p className="text-xs font-medium text-indigo-700">3 mensajes</p>
                                                <p className="text-xs text-slate-600">A familias</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Absence history */}
                                    <Card className="border-2 border-slate-200">
                                        <CardContent className="p-4">
                                            <p className="text-sm font-semibold mb-3">Historial de asistencia</p>
                                            <div className="flex gap-1">
                                                {['P', 'P', 'A', 'P', 'P', 'P', 'A', 'P', 'P', 'P'].map((day, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${day === 'P'
                                                            ? 'bg-green-500/20 text-green-700'
                                                            : 'bg-red-500/20 text-red-700'
                                                            }`}
                                                    >
                                                        {day}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 space-y-6"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-slate-900">
                                    Gestión académica y registro de asistencia
                                </h2>
                                <p className="text-lg text-slate-600">
                                    Registro de asistencia, horarios por alumno y comunicaciones con familias.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    'Asistencia y ausencias registradas por alumno, con historial',
                                    'Horarios y calendario organizados por alumno',
                                    'Comunicaciones con familias',
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
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
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                            ¿Quieres ver ChubAI en acción?
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            Agenda una demostración personalizada y descubre cómo ChubAI puede ordenar, asegurar
                            y prevenir en la gestión diaria de tu colegio.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <span>Solicitar demo</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <FooterPublic />
        </main>
    );
}
