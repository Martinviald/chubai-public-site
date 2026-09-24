'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  BarChart3,
  Bell,
  BookMarked,
  Bus,
  Check,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Cursor } from '@/components/landing/problema/Cursor';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// El mazo se dibuja a este tamaño y se achica para entrar donde quepa.
const MESA_ANCHO = 1560;
const MESA_ALTO = 860;
// Las cinco carpetas miden lo mismo; la del centro solo se distingue por
// quedar adelante.
const CENTRO_ANCHO = 540;
const RINCON_ANCHO = 540;

// Las carpetas, con el mismo texto que tenía la sección.
// Cursor que recorre las carpetas: apagado a pedido de Luis (22-09-2026).
// En true vuelve a aparecer con su paseo.
const MOSTRAR_CURSOR = false;

const COLORES_CURSOR = ['#0FB5F5', '#16A34A', '#2563EB', '#7C3AED', '#EC4899'];

const carpetas: Array<{
  pestana: string;
  icono: LucideIcon;
  antes: string;
  despues: string;
}> = [
  {
    pestana: 'Registros',
    icono: BookMarked,
    antes: 'Planillas separadas por cada registro.',
    despues: 'Un solo registro del día, sin planillas duplicadas.',
  },
  {
    pestana: 'Asistencia del día',
    icono: Check,
    antes: 'Llamados manuales para confirmar asistencia.',
    despues: 'La confirmación llega sola, sin llamar a nadie.',
  },
  {
    pestana: 'Avisos',
    icono: Bell,
    antes: 'WhatsApp disperso entre apoderados y transporte.',
    despues: 'Cada familia recibe su aviso en el momento, sin cadenas.',
  },
  {
    pestana: 'Respaldo',
    icono: ShieldCheck,
    antes: 'Registros en papel sin trazabilidad.',
    despues: 'Todo queda con hora, responsable y respaldo.',
  },
  {
    pestana: 'Dirección',
    icono: BarChart3,
    antes: 'Baja visibilidad para dirección y sostenedor.',
    despues: 'Dirección ve el colegio completo en un solo lugar.',
  },
];

// Dónde queda cada carpeta sobre la mesa, en coordenadas de la mesa. Están
// repartidas de modo que ninguna se monte sobre otra: las de los rincones
// quedan más arriba y más abajo que la del centro, y a sus costados.
const LUGARES = [
  { x: (MESA_ANCHO - CENTRO_ANCHO) / 2, y: 376, giro: 0 },
  { x: 24, y: 96, giro: -7 },
  { x: MESA_ANCHO - RINCON_ANCHO - 24, y: 92, giro: 6 },
  { x: 0, y: 528, giro: 4 },
  { x: MESA_ANCHO - RINCON_ANCHO - 8, y: 520, giro: -5 },
];

// Cada carpeta trae su estado: una burbuja de color, como una notificación
// del panel, que aparece con un rebote cuando la carpeta sale a la mesa con
// el scroll. Van repartidas por los espacios libres de la mesa (posición
// relativa al lugar de su carpeta).
const ESTADOS: Array<{ dx: number; dy: number; giro: number; tono: string; texto: string; hora: string }> = [
  { dx: 120, dy: -72, giro: -3, tono: 'bg-pink-500', texto: 'Registro del día listo · 18 cursos', hora: '8:12' },
  { dx: 40, dy: 312, giro: -4, tono: 'bg-[#061447]', texto: 'Asistencia tomada · 28 de 30', hora: '8:15' },
  { dx: 170, dy: 340, giro: 3, tono: 'bg-[#25D366]', texto: 'Aviso enviado a 31 familias', hora: '8:20' },
  { dx: 560, dy: 160, giro: 4, tono: 'bg-amber-500', texto: 'Justificación de Carla P. registrada', hora: '8:31' },
  { dx: -312, dy: -400, giro: -4, tono: 'bg-violet-500', texto: 'Panel de dirección · 94 % hoy', hora: '8:35' },
];

function Estados() {
  return (
    <>
      {ESTADOS.map((estado, i) => {
        const lugar = LUGARES[i];
        return (
          <div
            key={i}
            data-estado
            className="pointer-events-none hidden md:absolute md:block"
            style={{ left: lugar.x + estado.dx, top: lugar.y + estado.dy, zIndex: 7, opacity: 0 }}
            aria-hidden
          >
            <div
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(6,20,71,0.45)] ${estado.tono}`}
              style={{ transform: `rotate(${estado.giro}deg)` }}
            >
              {estado.texto}
              <span className="text-xs font-medium tabular-nums text-white/75">{estado.hora}</span>
            </div>
          </div>
        );
      })}
    </>
  );
}

// La carpeta, plana y en tres capas, como el icono clásico: atrás el
// cartón con su pestaña, en medio una hoja blanca que asoma y adelante la
// tapa. En la hoja va lo de antes (en gris); en la tapa, lo que cambia con
// ChubAI. Al pasar el mouse la tapa se abre un poco hacia adelante y la
// hoja sube, como si se abriera la carpeta.
// Colores tipo carpeta de macOS: celeste vivo con degradado suave, un
// brillo arriba y sombra difusa teñida de azul.
const CARPETA = {
  // La pestaña va plana, del mismo tono con que arranca el cartón, para
  // que no se note la unión con la caída diagonal.
  pestana: '#1E9FE6',
  atras: 'linear-gradient(180deg, #1E9FE6 0%, #1487CC 100%)',
  tapa: 'linear-gradient(180deg, #5BCBF7 0%, #2FB4EE 60%, #22A6E3 100%)',
  brillo: 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,60,120,0.12)',
  sombra: '0 24px 40px -22px rgba(20,120,200,0.55)',
};

function Carpeta({ carpeta }: { carpeta: (typeof carpetas)[number] }) {
  const Icono = carpeta.icono;
  return (
    <div className="group relative h-[300px] w-full" style={{ perspective: 900 }}>
      {/* Atrás: el cartón, con la pestaña arriba a la izquierda. La pestaña
          mide lo que mide su nombre y termina en una caída diagonal que se
          funde con el cuerpo. */}
      <div className="absolute left-0 top-0 flex h-10 items-stretch">
        <div
          className="flex items-center gap-2 whitespace-nowrap rounded-tl-[16px] pl-4 pr-3 text-sm font-semibold text-white"
          style={{ background: CARPETA.pestana }}
        >
          <Icono className="h-[18px] w-[18px]" />
          {carpeta.pestana}
        </div>
        <svg viewBox="0 0 28 40" width="28" height="40" className="-ml-px block" aria-hidden>
          <path d="M-1 0 H10 C 18 0, 20 4, 24 22 C 26 32, 28 40, 28 40 H-1 Z" fill={CARPETA.pestana} />
        </svg>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 top-9 rounded-[22px] rounded-tl-none"
        style={{ background: CARPETA.atras, boxShadow: CARPETA.sombra }}
      />

      {/* La hoja que asoma: lo de antes, en gris. Sube al abrir. */}
      <div className="absolute inset-x-5 bottom-0 top-12 rounded-t-2xl bg-white px-5 pt-3 shadow-[0_-6px_16px_-10px_rgba(20,120,200,0.45)] transition-transform duration-500 ease-out group-hover:-translate-y-3">
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1.5 text-[15px] leading-tight text-slate-500">
            <X className="h-3.5 w-3.5 shrink-0 text-slate-400" strokeWidth={2.5} />
            {carpeta.antes}
          </p>
        </div>
      </div>

      {/* Adelante: la tapa, con lo que cambia. Se abre hacia adelante. */}
      <div
        className="absolute inset-x-0 bottom-0 top-[6.75rem] origin-bottom rounded-[22px] p-7 transition-transform duration-500 ease-out group-hover:[transform:rotateX(-9deg)]"
        style={{
          background: CARPETA.tapa,
          boxShadow: CARPETA.brillo,
        }}
      >
        <div className="flex items-start gap-5">
          <div className="min-w-0 space-y-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0A1F66]">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              Con ChubAI
            </span>
            <p className="text-[22px] font-semibold leading-snug tracking-[-0.01em] text-white">{carpeta.despues}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeccionProblema() {
  const raiz = useRef<HTMLDivElement>(null);
  const mesa = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);

  // El mazo se dibuja a 1120 px y se achica para entrar por ancho y por alto.
  useEffect(() => {
    const caja = mesa.current?.parentElement;
    if (!caja) return;
    const medir = () =>
      setEscala(Math.min(1, caja.clientWidth / MESA_ANCHO, Math.max(0.5, window.innerHeight - 130) / MESA_ALTO));
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(caja);
    window.addEventListener('resize', medir);
    return () => {
      observador.disconnect();
      window.removeEventListener('resize', medir);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cartas = gsap.utils.toArray<HTMLElement>('[data-carta]');

        // La primera manda y se queda al centro. Las demás arrancan apiladas
        // detrás de ella y, a medida que se baja, salen a su lugar.
        const acomodar = (salidas: number, animado: boolean) =>
          cartas.map((carta, i) => {
            const afuera = i === 0 || i <= salidas;
            const valores = {
              // `data-dx` y `data-dy` es lo que hay que moverla para dejarla
              // apilada en el centro; en su lugar propio, el corrimiento es 0.
              x: afuera ? 0 : Number(carta.dataset.dx),
              y: afuera ? 0 : Number(carta.dataset.dy),
              rotate: afuera ? Number(carta.dataset.giro) : 0,
              scale: afuera ? 1 : 0.9,
              zIndex: afuera ? cartas.length - i : 0,
              autoAlpha: afuera ? 1 : 0,
            };
            if (!animado) return gsap.set(carta, { ...valores, filter: 'none' });
            // La sombra existe solo mientras la carpeta está en el aire: le da
            // peso al movimiento sin dejarle un halo permanente.
            return gsap.fromTo(
              carta,
              { filter: 'drop-shadow(0 22px 30px rgba(10,31,102,0.26))' },
              {
                ...valores,
                filter: 'drop-shadow(0 0px 0px rgba(10,31,102,0))',
                duration: 1.1,
                ease: 'expo.out',
              },
            );
          });

        acomodar(0, false);

        const titulo = raiz.current?.querySelector<HTMLElement>('[data-titulo]');

        let paseo: gsap.core.Timeline | null = null;
        // Tramo final del recorrido, ya con las cinco puestas: ahí pasea el cursor.
        const ESPERA = 2.4;
        let umbral = 0.99;

        const linea = gsap.timeline({
          scrollTrigger: {
            trigger: '[data-escena-problema]',
            start: 'top 88px',
            end: () => `+=${cartas.length * 380 + 760}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            // Solo cuando el reparto terminó: antes, el cursor distrae.
            onUpdate: (self) => {
              if (!paseo) return;
              if (self.progress > umbral) {
                gsap.to('[data-cursor]', { autoAlpha: 1, duration: 0.3, overwrite: 'auto' });
                paseo.play();
              } else {
                paseo.pause();
                gsap.to('[data-cursor]', { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
              }
            },
          },
        });

        // Apenas empieza el recorrido, el título se va y el mazo sube a ocupar
        // su lugar: así no queda un hueco grande entre el texto y las carpetas.
        // El texto flota sobre la parte de arriba de la mesa, que al empezar
        // está vacía: se desvanece cuando las carpetas salen a ocuparla, sin
        // dejar espacio de más arriba ni abajo.
        if (titulo) {
          linea.to(titulo, { autoAlpha: 0, y: -20, duration: 0.5, ease: 'power2.in' });
        }

        // Un paso por carta: cada vez que se baja, sale una más y, cuando
        // aterriza, aparece su estado con un rebote. El de la carpeta del
        // centro aparece apenas se va el título.
        const estados = gsap.utils.toArray<HTMLElement>('[data-estado]', raiz.current ?? undefined);
        gsap.set(estados, { autoAlpha: 0, scale: 0.6, y: 12 });
        const aparecer = (i: number) =>
          gsap.to(estados[i], { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' });
        if (estados[0]) linea.add(aparecer(0), '>-0.1');
        cartas.forEach((_, i) => {
          if (i === 0) return;
          linea.to({}, { duration: 0.3 });
          linea.add(acomodar(i, true), '>');
          if (estados[i]) linea.add(aparecer(i), '>-0.5');
        });
        linea.to({}, { duration: ESPERA });
        umbral = (linea.duration() - ESPERA) / linea.duration();

        // El cursor entra recién cuando las cinco carpetas ya están puestas:
        // primero se entiende el orden, después se muestra que alguien lo usa.
        const cursor = raiz.current?.querySelector<HTMLElement>('[data-cursor]');
        if (cursor) {
          paseo = gsap.timeline({ repeat: -1, paused: true });
          cartas.forEach((carta, i) => {
            const lugar = LUGARES[i];
            const ancho = i === 0 ? CENTRO_ANCHO : RINCON_ANCHO;
            const alto = i === 0 ? 366 : 306;
            paseo!
              .set(cursor, { '--color-cursor': COLORES_CURSOR[i] } as gsap.TweenVars)
              .to(cursor, {
                x: lugar.x + ancho * 0.42,
                y: lugar.y + alto * 0.5,
                duration: 1.1,
                ease: 'power2.inOut',
              })
              // Se posa sobre la carpeta: la carpeta se levanta un poco.
              .to(carta, { y: -8, duration: 0.3, ease: 'power2.out' }, '<0.7')
              // El clic: la flecha se hunde y la carpeta responde.
              .to(cursor, { scale: 0.82, duration: 0.1 })
              .to(carta, { y: -3, duration: 0.1 }, '<')
              .to(cursor, { scale: 1, duration: 0.18 })
              .to({}, { duration: 0.7 })
              .to(carta, { y: 0, duration: 0.35, ease: 'power2.inOut' });
          });
        }
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section id="problema" ref={raiz} className="bg-white py-16 lg:py-20">
      <div data-escena-problema className="relative">
        <div
          data-titulo
          className="mx-auto max-w-3xl px-4 text-center sm:px-6 md:pointer-events-none md:absolute md:inset-x-0 md:top-0 md:z-10 md:mx-auto"
        >
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#061447] sm:text-5xl">
            Cuando la información no llega a tiempo, las decisiones se atrasan.
          </h2>
          <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-slate-600">
            Muchos colegios todavía gestionan asistencia, transporte y seguimiento diario con planillas, papeles,
            WhatsApp o registros separados. Los equipos pierden tiempo y algunos eventos relevantes pasan
            desapercibidos.
          </p>
        </div>

        {/* El mazo usa todo el ancho de la pantalla, para que las carpetas se
          vean grandes. En celular van una debajo de la otra. */}
        <div
          data-mazo
          className="mt-10 w-full px-4 md:mt-0 md:h-[var(--alto)] md:overflow-hidden md:px-0"
          style={{ ['--alto' as string]: `${Math.round(MESA_ALTO * escala)}px` }}
        >
          <div
            ref={mesa}
            className="grid gap-10 md:relative md:mx-auto md:block md:h-[860px] md:w-[1560px] md:origin-top md:[transform:scale(var(--escala))]"
            style={{ ['--escala' as string]: escala }}
          >
            {carpetas.map((carpeta, i) => {
              const lugar = LUGARES[i];
              const centro = LUGARES[0];
              return (
                <div
                  key={carpeta.antes}
                  data-carta
                  data-giro={lugar.giro}
                  data-dx={centro.x - lugar.x}
                  data-dy={centro.y - lugar.y}
                  className="md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[var(--ancho)]"
                  style={{
                    zIndex: carpetas.length - i,
                    ['--x' as string]: `${lugar.x}px`,
                    ['--y' as string]: `${lugar.y}px`,
                    ['--ancho' as string]: `${i === 0 ? CENTRO_ANCHO : RINCON_ANCHO}px`,
                  }}
                >
                  <Carpeta carpeta={carpeta} />
                </div>
              );
            })}

            {/* Los estados de cada carpeta. */}
            <Estados />

            {/* Alguien del colegio recorriendo las carpetas. */}
            {MOSTRAR_CURSOR ? <Cursor /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
