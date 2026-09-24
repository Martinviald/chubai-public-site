'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCheck, SendHorizontal } from 'lucide-react';
import { SectionBadge } from './SectionBadge';
import { Figura } from './QuienUsaQue';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// "Implementación": cómo acompañamos al colegio. No se fija con el scroll:
// todo se mueve solo mientras la sección está a la vista.
//
// A la derecha, un teléfono con una conversación de WhatsApp entre un
// colegio y el equipo de ChubAI que se escribe sola, en bucle: cada mensaje
// entra volando desde el lado de quien habla, antes de cada respuesta
// nuestra se ve "escribiendo…" y la conversación sube sola. La directora y
// una persona del equipo están de pie a los lados. A la izquierda, los
// cuatro pasos de la implementación pasan de uno en uno, como los reels de
// un celular: cada pocos segundos el widget de turno se desliza hacia
// arriba y entra el siguiente desde abajo, en bucle. Cada paso es su propio
// widget (una mini pantalla de lo que pasa en ese paso). Todo se pausa
// fuera de la vista. En celular o con "reducir
// movimiento" se ve todo quieto y completo.

type Tema = 0 | 1 | 2 | 3;

// La conversación. `dia` es un separador; los demás son mensajes.
type Linea = { dia: string; tema: Tema } | { de: 'colegio' | 'chubai'; texto: string; hora: string; tema: Tema };

const conversacion: Linea[] = [
  { dia: 'Lunes', tema: 0 },
  {
    de: 'colegio',
    texto: 'Hola, somos del Colegio San José. Queremos partir con asistencia y transporte.',
    hora: '9:12',
    tema: 0,
  },
  {
    de: 'chubai',
    texto: 'Con la planilla que nos mandaron ya cargamos 18 cursos, 512 alumnos y 6 rutas.',
    hora: '11:40',
    tema: 0,
  },
  { de: 'chubai', texto: 'El colegio ya está en ChubAI. Mañana los profesores pueden entrar.', hora: '11:41', tema: 0 },
  { de: 'colegio', texto: '¿Y la capacitación de los profes?', hora: '11:52', tema: 1 },
  {
    de: 'chubai',
    texto: 'Mañana a las 9:00 vamos al colegio. Son 40 minutos por equipo: profesores, inspectoría y conductores.',
    hora: '11:55',
    tema: 1,
  },
  { de: 'colegio', texto: 'Perfecto, los conductores a las 11.', hora: '11:56', tema: 1 },
  { dia: 'Miércoles', tema: 2 },
  { de: 'colegio', texto: 'El furgón 3 no aparece en el mapa.', hora: '7:48', tema: 2 },
  {
    de: 'chubai',
    texto: 'Lo vemos. El celular del conductor tenía el GPS apagado; ya lo activó y aparece.',
    hora: '7:53',
    tema: 2,
  },
  { de: 'colegio', texto: 'Ahí está, gracias.', hora: '7:54', tema: 2 },
  { dia: 'Jueves', tema: 3 },
  { de: 'colegio', texto: '¿Podemos sumar la sala de 2° B a la ruta de la tarde?', hora: '13:10', tema: 3 },
  {
    de: 'chubai',
    texto: 'Listo, ya está. Y agregamos el aviso de "llegó al colegio" que pidieron los apoderados.',
    hora: '13:22',
    tema: 3,
  },
  { de: 'colegio', texto: 'Excelente.', hora: '13:23', tema: 3 },
];

function Mensaje({ linea }: { linea: Linea }) {
  if ('dia' in linea) {
    return (
      <div data-linea className="flex justify-center py-1">
        <span className="rounded-lg bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
          {linea.dia}
        </span>
      </div>
    );
  }
  const nuestro = linea.de === 'chubai';
  return (
    <div data-linea data-de={linea.de} className={`flex ${nuestro ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[82%] rounded-2xl px-3.5 py-2 text-[15px] leading-snug shadow-sm ${
          nuestro ? 'rounded-br-md bg-[#d9fdd3] text-slate-900' : 'rounded-bl-md bg-white text-slate-900'
        }`}
      >
        {linea.texto}
        <span className="ml-2 inline-flex translate-y-0.5 items-center gap-1 text-[11px] text-slate-500">
          {linea.hora}
          {nuestro && <CheckCheck className="h-3.5 w-3.5 text-sky-500" />}
        </span>
      </div>
    </div>
  );
}

function Cabecera() {
  return (
    <div className="flex items-center gap-3 bg-[#075e54] px-4 pb-3 pt-9 text-white">
      <div className="flex -space-x-3">
        <Image
          src="/landing/roles/direccion.svg"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full ring-2 ring-[#075e54]"
        />
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-2 ring-[#075e54]">
          <Image src="/landing/chubai-logo.png" alt="" width={22} height={22} className="h-[22px] w-[22px]" />
        </span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-[15px] font-bold leading-tight">Colegio San José</p>
        <p className="flex items-center gap-1.5 text-xs text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Equipo ChubAI · en línea
        </p>
      </div>
    </div>
  );
}

function Escribiendo({ antesDe }: { antesDe: number }) {
  return (
    <div
      data-antes-de={antesDe}
      data-escribiendo
      className="absolute right-0 top-0 flex justify-end"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-br-md bg-[#d9fdd3] px-4 py-3 shadow-sm">
        {[0, 1, 2].map((j) => (
          <span
            key={j}
            className="h-2 w-2 rounded-full bg-slate-500/70"
            style={{ animation: `chat-punto 1.1s ${j * 0.18}s ease-in-out infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

// Los cuatro pasos, cada uno con su widget: una mini pantalla de lo que
// pasa en ese paso. Cada uno ocupa una ranura de `RANURA` px y en la ventana
// se asoman `ASOMO` px del anterior y del siguiente.
const RANURA = 236;
const ASOMO = 30;
type Persona = 'direccion' | 'profesor' | 'apoderado' | 'conductor' | 'equipo' | 'alumnos';

// Un paso: cuándo pasa, qué logra el colegio, en una frase, y quiénes
// participan.
function Paso({
  numero,
  cuando,
  titulo,
  texto,
  quienes,
}: {
  numero: number;
  cuando: string;
  titulo: string;
  texto: string;
  quienes: Array<{ persona: Persona; nombre: string }>;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(6,20,71,0.35)]">
      <header className="flex items-center gap-3">
        <span className="rounded-full bg-[#061447] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white">
          {cuando}
        </span>
        <span className="text-xs font-bold text-slate-400">Paso {numero} de 4</span>
      </header>
      <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-[#061447]">{titulo}</h3>
      <p className="mt-1.5 text-sm leading-6 text-slate-600">{texto}</p>
      <footer className="mt-auto flex items-center gap-3 pt-3">
        <span className="flex -space-x-2">
          {quienes.map(({ persona }) => (
            <Image
              key={persona}
              src={
                persona === 'equipo'
                  ? '/landing/chubai-logo.png'
                  : persona === 'alumnos'
                    ? '/landing/alumnos/nino-3.svg'
                    : `/landing/roles/${persona}.svg`
              }
              alt=""
              width={28}
              height={28}
              className={`h-7 w-7 rounded-full ring-2 ring-white ${persona === 'equipo' ? 'bg-white p-1' : ''}`}
            />
          ))}
        </span>
        <span className="text-xs font-semibold text-slate-500">{quienes.map((q) => q.nombre).join(' · ')}</span>
      </footer>
    </article>
  );
}

const pasos: React.ReactNode[] = [
  <Paso
    key="1"
    numero={1}
    cuando="Día 1"
    titulo="Tu colegio entero en ChubAI, en un día."
    texto="Nos mandas la planilla de cursos. Nosotros cargamos cursos, alumnos, conductores y rutas, y te avisamos cuando está listo."
    quienes={[
      { persona: 'direccion', nombre: 'Dirección' },
      { persona: 'alumnos', nombre: '512 alumnos' },
      { persona: 'equipo', nombre: 'Equipo ChubAI' },
    ]}
  />,
  <Paso
    key="2"
    numero={2}
    cuando="Día 2"
    titulo="Vamos al colegio, no a un webinar."
    texto="40 minutos con cada equipo, en su sala y con sus cursos reales: profesores, inspectoría y conductores."
    quienes={[
      { persona: 'profesor', nombre: 'Profesores' },
      { persona: 'conductor', nombre: 'Conductores' },
      { persona: 'equipo', nombre: 'Equipo ChubAI' },
    ]}
  />,
  <Paso
    key="3"
    numero={3}
    cuando="Semana 1"
    titulo="Cuando algo falla, contestamos en minutos."
    texto="Un furgón que no aparece, una lista que no cierra. Lo vemos con ustedes en el momento, no en un ticket para mañana."
    quienes={[
      { persona: 'conductor', nombre: 'Transportistas' },
      { persona: 'alumnos', nombre: 'Alumnos en ruta' },
      { persona: 'equipo', nombre: 'Equipo ChubAI' },
    ]}
  />,
  <Paso
    key="4"
    numero={4}
    cuando="Siempre"
    titulo="Lo que pide el colegio, se construye."
    texto="Una sala nueva en la ruta, un aviso que faltaba. Lo que el equipo reporta en terreno es lo que hoy está en uso."
    quienes={[
      { persona: 'apoderado', nombre: 'Apoderados' },
      { persona: 'direccion', nombre: 'Dirección' },
      { persona: 'equipo', nombre: 'Equipo ChubAI' },
    ]}
  />,
];

function Titulo() {
  return (
    <>
      <SectionBadge>Implementación</SectionBadge>
      <h2 className="mt-3 text-[2.1rem] font-extrabold leading-[1.15] tracking-tight text-[#061447]">
        Implementamos{' '}
        <span className="relative inline-block whitespace-nowrap">
          contigo
          <svg
            viewBox="0 0 120 14"
            preserveAspectRatio="none"
            className="absolute -bottom-1.5 left-0 h-3.5 w-full"
            aria-hidden
          >
            <path
              data-subrayado
              d="M3 9 C 25 4, 50 12, 70 7 S 105 5, 117 8"
              fill="none"
              stroke="#0FB5F5"
              strokeWidth="4.5"
              strokeLinecap="round"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>
        </span>
        , no solo entregamos una plataforma.
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600">
        Tracking validado con clientes y pilotos de asistencia en colegios reales. Así se ve una semana con nosotros.
      </p>
    </>
  );
}

export function Implementacion() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const seccion = raiz.current;
        const ventana = seccion?.querySelector<HTMLElement>('[data-ventana]');
        const lista = seccion?.querySelector<HTMLElement>('[data-lista]');
        const telefono = seccion?.querySelector<HTMLElement>('[data-telefono]');
        const cinta = seccion?.querySelector<HTMLElement>('[data-cinta]');
        if (!seccion || !ventana || !lista || !telefono || !cinta) return;
        const lineas = gsap.utils.toArray<HTMLElement>('[data-lista] [data-linea]', seccion);
        const escribiendos = new Map(
          gsap.utils
            .toArray<HTMLElement>('[data-lista] [data-escribiendo]', seccion)
            .map((e) => [Number(e.dataset.antesDe), e]),
        );
        const personas = gsap.utils.toArray<HTMLElement>('[data-persona]', seccion);
        const subrayado = seccion.querySelector<SVGPathElement>('[data-subrayado]');

        // Al llegar (una vez): el teléfono sube y queda en su pose inclinada,
        // con giro a la izquierda y perspectiva; las personas entran y se
        // dibuja el subrayado.
        gsap.set(telefono, { y: 60, autoAlpha: 0, rotateY: -26, rotateX: 10, transformPerspective: 1400 });
        gsap.set(personas, { y: 70, autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: seccion,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            const entrada = gsap.timeline();
            entrada
              .to(telefono, { y: 0, autoAlpha: 1, rotateY: -16, rotateX: 6, duration: 1.2, ease: 'power3.out' }, 0)
              .to(personas, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 }, 0.2);
            if (subrayado) entrada.to(subrayado, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }, 0.5);
          },
        });

        // Cuánto hay que subir la lista para que la línea `k` quede al pie de
        // la ventana. Cada línea va en un envoltorio (por el "escribiendo…").
        let subidas: number[] = [];
        const medir = () => {
          const alto = ventana.clientHeight - 16;
          subidas = lineas.map((l) => {
            const caja = l.parentElement ?? l;
            return Math.max(0, caja.offsetTop + caja.offsetHeight - alto);
          });
        };
        medir();

        // El chat se escribe solo, en bucle. Los mensajes entran volando
        // desde el lado de quien habla.
        const chat = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3 });
        chat.set(lista, { y: 0 }, 0);
        lineas.forEach((linea) => {
          const lado = linea.dataset.de === 'chubai' ? 48 : linea.dataset.de === 'colegio' ? -48 : 0;
          chat.set(linea, { autoAlpha: 0, x: lado, y: 14, scale: 0.92 }, 0);
        });
        escribiendos.forEach((esc) => chat.set(esc, { autoAlpha: 0 }, 0));
        let t = 0.6;
        lineas.forEach((linea, i) => {
          const esDia = !('de' in conversacion[i]);
          const nuestro = linea.dataset.de === 'chubai';
          const esc = escribiendos.get(i);
          if (esc) {
            chat.set(esc, { autoAlpha: 1 }, t).set(esc, { autoAlpha: 0 }, t + 1.1);
            t += 1.1;
          }
          chat
            .to(linea, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, t)
            .to(lista, { y: () => -subidas[i], duration: 0.4, ease: 'power2.out' }, t);
          t += esDia ? 0.7 : nuestro ? 1.5 : 1.2;
        });
        chat.to({}, { duration: 0.1 }, t);

        // Los pasos, de uno en uno como reels: cada tanto la cinta sube una
        // ranura con el frenado de un deslizamiento de celular. Arriba y
        // abajo se asoma un pedacito del anterior y del siguiente (por eso la
        // lista lleva el último repetido al principio y el primero al final),
        // y esos bordes van desenfocados. El actual es la ranura `k`.
        const cantidad = pasos.length;
        const posicion = (k: number) => ASOMO - k * RANURA;
        const cintaTl = gsap.timeline({ paused: true, repeat: -1 });
        cintaTl.set(cinta, { y: posicion(1) }, 0);
        for (let k = 2; k <= cantidad + 1; k++) {
          cintaTl.to(cinta, { y: posicion(k), duration: 0.75, ease: 'power3.inOut' }, (k - 1) * 3.6 - 0.75);
        }
        cintaTl.set(cinta, { y: posicion(1) }, cantidad * 3.6 + 0.05);
        cinta.addEventListener('mouseenter', () => cintaTl.pause());
        cinta.addEventListener('mouseleave', () => cintaTl.play());

        // Todo corre solo mientras la sección está a la vista.
        ScrollTrigger.create({
          trigger: seccion,
          start: 'top 85%',
          end: 'bottom 15%',
          onToggle: (self) => {
            seccion.dataset.enPantalla = String(self.isActive);
            if (self.isActive) {
              chat.play();
              cintaTl.play();
            } else {
              chat.pause();
              cintaTl.pause();
            }
          },
        });
        const refrescar = () => {
          medir();
          chat.invalidate();
        };
        ScrollTrigger.addEventListener('refresh', refrescar);
        return () => ScrollTrigger.removeEventListener('refresh', refrescar);
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section
      id="implementacion"
      ref={raiz}
      data-en-pantalla="false"
      className="relative overflow-hidden bg-white text-slate-900"
    >
      {/* Fondo: trama de puntos tenue que se desvanece hacia los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(6,20,71,0.08)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:radial-gradient(ellipse_70%_60%_at_65%_55%,#000,transparent_80%)]"
      />

      {/* Pantallas grandes: pasos en carrusel + teléfono que se escribe solo. */}
      <div className="relative mx-auto hidden min-h-screen max-w-7xl grid-cols-[5fr_7fr] items-center gap-10 px-4 py-24 sm:px-6 lg:px-8 motion-safe:lg:grid">
        <div className="max-w-xl">
          <Titulo />
          {/* Los pasos, de uno en uno: el actual nítido al centro y un
              pedacito desenfocado del anterior arriba y del siguiente abajo. */}
          <div className="relative mt-6 overflow-hidden" style={{ height: RANURA + ASOMO * 2 }}>
            <div data-cinta className="flex flex-col" style={{ transform: `translateY(${ASOMO - RANURA}px)` }}>
              {[pasos[pasos.length - 1], ...pasos, pasos[0]].map((paso, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 pb-3"
                  style={{ height: RANURA }}
                  aria-hidden={i === 0 || i === pasos.length + 1 ? true : undefined}
                >
                  {paso}
                </div>
              ))}
            </div>
            {/* Bandas de desenfoque en los bordes, con degradado hacia el centro. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,#000,transparent)]"
              style={{ height: ASOMO + 10 }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 backdrop-blur-[3px] [mask-image:linear-gradient(to_top,#000,transparent)]"
              style={{ height: ASOMO + 10 }}
            />
          </div>
          <Link href="/nosotros" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#061447]">
            Conocer al equipo que está detrás
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* El teléfono, con la directora y una persona del equipo a los lados. */}
        <div className="relative flex h-[min(82vh,780px)] items-end justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div data-persona className="pointer-events-none absolute bottom-0 left-[2%] h-[62%]">
            <Figura avatar="direccion" />
          </div>
          <div data-persona className="pointer-events-none absolute bottom-0 right-[2%] h-[62%]">
            <Figura avatar="equipo" />
          </div>
          <div
            data-telefono
            className="relative h-full w-[350px] rounded-[3rem] bg-[#0b1220] p-[10px] shadow-[0_40px_80px_-30px_rgba(6,20,71,0.55)] ring-1 ring-white/10"
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-[14px] z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black"
            />
            <div className="flex h-full flex-col overflow-hidden rounded-[2.4rem] bg-[#efeae2]">
              <Cabecera />
              <div data-ventana className="relative flex-1 overflow-hidden">
                <div data-lista className="absolute inset-x-0 top-0 space-y-2.5 px-3 py-4">
                  {conversacion.map((linea, i) => (
                    <div key={i} className="relative">
                      <Mensaje linea={linea} />
                      {'de' in linea && linea.de === 'chubai' && <Escribiendo antesDe={i} />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-3">
                <div className="flex-1 rounded-full bg-white px-4 py-2 text-sm text-slate-400">Escribe un mensaje</div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25d366] text-white">
                  <SendHorizontal className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versión simple (celular, o "reducir movimiento"): todo quieto y a la vista. */}
      <div className="relative py-20 motion-safe:lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <Titulo />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">{pasos}</div>
          <Link href="/nosotros" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#061447]">
            Conocer al equipo que está detrás
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <div className="mt-12 overflow-hidden rounded-[28px] border border-slate-200 bg-[#efeae2] shadow-xl shadow-slate-900/10">
            <Cabecera />
            <div className="space-y-2.5 px-4 py-4">
              {conversacion.map((linea, i) => (
                <Mensaje key={i} linea={linea} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
