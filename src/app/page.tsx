'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { IconoWhatsApp } from '@/components/landing/IconoWhatsApp';
import { FooterPublic } from '@/components/layout/footer/FooterPublic';
import { HeroBurbujas } from '@/components/landing/HeroBurbujas';
import { HeroScrollPanel } from '@/components/landing/HeroScrollPanel';
import { SeccionProblema } from '@/components/landing/SeccionProblema';
import { QuienUsaQue } from '@/components/landing/QuienUsaQue';
import { Implementacion } from '@/components/landing/Implementacion';
import { Contacto } from '@/components/landing/Contacto';
import { SectionBadge } from '@/components/landing/SectionBadge';
import { VideoTransporte } from '@/components/landing/solucion/VideoTransporte';
import { VideoAsistencia, VideoReportes } from '@/components/landing/solucion/VideosAsistencia';

// La página de inicio cuenta una sola historia: ChubAI vende dos servicios,
// tracking escolar y asistencia digital, que se contratan por separado o
// juntos. Cada función se menciona una sola vez, en la sección de servicios;
// las demás secciones hablan del problema, de quién usa qué, de cómo se
// implementa y de cómo contactarnos.
//
// Esta página vive en chubai.cl, un dominio distinto de app.chubai.cl (donde
// corre la plataforma real) — por eso los links a "Asistencia"/"Tracking" y
// el acceso a la plataforma van con la URL absoluta, no como ruta relativa:
// una ruta relativa se quedaría resolviendo contra este mismo dominio, que
// no tiene esas páginas ni la sesión real.

const servicios: Array<{ id: 'tracking' | 'asistencia'; nombre: string; description: string; href: string }> = [
  {
    id: 'tracking',
    nombre: 'Tracking escolar',
    description:
      'Ubicación del furgón en tiempo real para el colegio y las familias, check-in de alumnos al subir y al bajar, aviso si alguien falta en ruta y respaldo de cada viaje.',
    href: 'https://app.chubai.cl/tracking',
  },
  {
    id: 'asistencia',
    nombre: 'Asistencia digital',
    description:
      'Registro por curso desde la sala con asistencia oficial, alertas por WhatsApp a apoderados ante ausencias, justificaciones en línea y reportes por curso y nivel.',
    href: 'https://app.chubai.cl/asistencia',
  },
];

// Lo que comparten los dos servicios. Acá vive lo que antes era la "tercera solución".
const compartido = {
  title: 'Por separado o juntos.',
  description:
    'Ambos servicios comparten el panel, los reportes y la trazabilidad de cada evento: hora, responsable y respaldo. Si contratas los dos, transporte y asistencia se cruzan en un solo lugar.',
};

const heroItem = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
// Las palabras del título suben una a una; el subrayado se dibuja al final.
const heroPalabra: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};
const heroSubrayado: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.9 } },
};

function Palabras({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(' ').map((palabra, i) => (
        <motion.span key={`${palabra}-${i}`} variants={heroPalabra} className="inline-block">
          {palabra}&nbsp;
        </motion.span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-white pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-44">
        <div className="absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(to_right,rgba(6,20,71,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,20,71,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_30%,#000_30%,transparent_78%)]" />
        <HeroBurbujas />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="relative mx-auto max-w-6xl px-4 text-center sm:px-6"
        >
          <motion.div variants={heroItem}>
            <Link
              href="https://app.chubai.cl/asistencia"
              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-2 text-[13px] text-slate-700 shadow-[0_10px_24px_-14px_rgba(6,20,71,0.35)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_28px_-14px_rgba(6,20,71,0.4)]"
            >
              {/* El icono en el verde de WhatsApp, como una notificación real. */}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                <IconoWhatsApp className="h-4 w-4" />
              </span>
              <span>
                <span className="font-semibold text-slate-900">Alertas de inasistencia</span> por WhatsApp
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
                Nuevo
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition duration-200 group-hover:bg-[#061447] group-hover:text-white">
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </motion.div>
          <motion.h1
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="mt-7 text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-[#061447] md:text-[clamp(2.5rem,5.2vw,4.25rem)]"
          >
            <span className="md:block md:whitespace-nowrap">
              <Palabras texto="Sabes quién llegó, quién faltó" />
            </span>
            <span className="md:block md:whitespace-nowrap">
              <Palabras texto="y dónde va el" />
              <motion.span variants={heroPalabra} className="relative inline-block">
                furgón.
                <svg
                  viewBox="0 0 220 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-[0.22em] w-full"
                  aria-hidden
                >
                  <motion.path
                    variants={heroSubrayado}
                    d="M4 10 C 40 4, 80 13, 120 8 S 190 5, 216 9"
                    fill="none"
                    stroke="#0FB5F5"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
            </span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Dos servicios para el colegio, en una misma plataforma: tracking del transporte escolar y asistencia
            digital. Contrata uno o los dos.
          </motion.p>
          <motion.div variants={heroItem} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#061447] px-7 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(6,20,71,0.6)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0A1F66] active:translate-y-0 active:scale-[0.98]"
            >
              Agendar una demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#servicios"
              className="group inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-[15px] font-semibold text-slate-900 transition duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              Ver los dos servicios
              <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Sin animación de entrada propia: un transform en este contenedor
            impediría que el panel quede fijo al hacer scroll. */}
        <div className="relative mt-16 px-4 sm:px-6 lg:mt-20 lg:px-8">
          <HeroScrollPanel />
        </div>
      </section>

      <SeccionProblema />

      {/* Los dos servicios. Es la única sección que lista funciones. Grilla de
          borde a borde, dibujada solo con líneas finas: tracking arriba con su
          vista previa y el texto encima del mapa; abajo, asistencia y lo que
          comparten los dos. */}
      <section id="servicios" className="bg-slate-50 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge>Dos servicios</SectionBadge>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#061447] sm:text-5xl">
              Tracking y asistencia: dos servicios, una plataforma.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Cada uno se contrata por su cuenta. Si necesitas ambos, funcionan juntos y comparten el mismo panel.
            </p>
          </div>
        </div>

        <div className="mt-14 border-y border-slate-300">
          <div className="group pt-10 lg:pt-0">
            <VideoTransporte>
              <div className="max-w-sm">
                <h3 className="text-2xl font-bold text-slate-950">{servicios[0].nombre}</h3>
                <p className="mt-3 leading-7 text-slate-600">{servicios[0].description}</p>
                <Link
                  href={servicios[0].href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#061447]"
                >
                  Conocer más
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </VideoTransporte>
          </div>

          <div className="grid border-t border-slate-300 md:grid-cols-2 md:divide-x md:divide-slate-300">
            <div className="group pt-12 lg:pt-16">
              <div className="px-4 sm:px-8 lg:px-12">
                <h3 className="text-2xl font-bold text-slate-950">{servicios[1].nombre}</h3>
                <p className="mt-3 max-w-xl leading-7 text-slate-600">{servicios[1].description}</p>
                <Link
                  href={servicios[1].href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#061447]"
                >
                  Conocer más
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
              {/* Su pantalla del panel, animada, de borde a borde de la celda. */}
              <div className="mt-8">
                <VideoAsistencia />
              </div>
            </div>

            <div className="group border-t border-slate-300 pt-12 md:border-t-0 lg:pt-16">
              <div className="px-4 sm:px-8 lg:px-12">
                <h3 className="text-2xl font-bold text-slate-950">{compartido.title}</h3>
                <p className="mt-3 max-w-xl leading-7 text-slate-600">{compartido.description}</p>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#061447]">
                  Conversemos qué te conviene
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
              {/* Los reportes son lo que más se nota de lo compartido. */}
              <div className="mt-8">
                <VideoReportes />
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuienUsaQue />

      <Implementacion />

      <Contacto />

      <FooterPublic />
    </main>
  );
}
