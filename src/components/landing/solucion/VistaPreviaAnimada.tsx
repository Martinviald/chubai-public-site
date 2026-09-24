'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Vista previa "tipo video" de una pantalla del panel. No es una ventana ni
// una tarjeta: la pantalla se funde con el fondo por los bordes. Un cursor
// recorre los pasos y la cámara se acerca a cada cosa que toca; al final se
// aleja y todo vuelve a empezar. Con "reducir movimiento" queda quieta.
//
// Solo corre mientras está a la vista: un ScrollTrigger prende y apaga la
// línea de tiempo de GSAP y, con el mismo interruptor, `data-en-pantalla` y
// una regla en globals.css pausan todas las animaciones de CSS que haya
// dentro de la pantalla (los puntos de "en vivo", el spinner, etc.). Fuera de
// la vista no se gasta ni un cuadro.
//
// No se estira: la pantalla se dibuja a un tamaño parecido al real y, si hay
// más ancho, la pantalla es más ancha (no más grande).

// El celeste de la marca.
const COLOR_CURSOR = '#0FB5F5';

export type PasoAnimacion<E> = {
  /** `data-objetivo` del elemento al que va el cursor. */
  objetivo: string;
  /** Cuánto se acerca la cámara (1 = sin acercar). */
  zoom: number;
  /** Estado al llegar, antes del clic (por ejemplo, la fila con el color de "pasar el mouse"). */
  alLlegar?: E;
  /** Si hace clic, el estado de la pantalla después del clic. */
  clic?: E;
  /** Segundos que se queda mirando después de llegar (y del clic). */
  espera?: number;
};

export type InfoPantalla = { ancho: number; escala: number; grande: boolean };

type Punto = { x: number; y: number };

export function VistaPreviaAnimada<E>({
  inicial,
  pantalla,
  pasos,
  alto,
  anchoMin,
  escalaMax = 0.8,
  etiqueta,
  textoAlLado = false,
  mascara,
  children,
}: {
  inicial: E;
  pantalla: (estado: E, info: InfoPantalla) => ReactNode;
  pasos: PasoAnimacion<E>[];
  /** Alto de la pantalla, en píxeles del panel. */
  alto: number;
  /** En cajas angostas se dibuja al menos así de ancha y se achica entera. */
  anchoMin: number;
  escalaMax?: number;
  etiqueta: string;
  /** El texto va encima de la parte izquierda (pantallas grandes) en vez de arriba. */
  textoAlLado?: boolean;
  /** Clases del degradado de los bordes (`mask-image`). */
  mascara: string;
  children?: ReactNode;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const [anchoCaja, setAnchoCaja] = useState<number | null>(null);
  const [estado, setEstado] = useState<E>(inicial);
  const [grande, setGrande] = useState(false);
  // Si la vista previa está a la vista (lo decide el ScrollTrigger de abajo).
  const [activo, setActivo] = useState(false);

  const medidas = (anchoDeCaja: number) => {
    const escala = Math.min(escalaMax, anchoDeCaja / anchoMin);
    return { escala, ancho: anchoDeCaja / escala };
  };

  useEffect(() => {
    const elemento = caja.current;
    if (!elemento) return;
    const medir = () => setAnchoCaja(elemento.clientWidth);
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const consulta = window.matchMedia('(min-width: 1024px)');
    const cambiar = () => setGrande(consulta.matches);
    cambiar();
    consulta.addEventListener('change', cambiar);
    return () => consulta.removeEventListener('change', cambiar);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lienzo = caja.current?.querySelector<HTMLElement>('[data-lienzo]');
        if (!lienzo || !caja.current) return;
        const anchoPantalla = () => medidas(caja.current?.clientWidth ?? anchoMin).ancho;

        // Centro de un elemento, en píxeles de la pantalla (sin la escala de
        // la página ni el zoom de la cámara).
        const punto = (nombre: string): Punto => {
          const ancho = anchoPantalla();
          const el = lienzo.querySelector<HTMLElement>(`[data-objetivo="${nombre}"]`);
          if (!el) return { x: ancho / 2, y: alto / 2 };
          const r = el.getBoundingClientRect();
          const l = lienzo.getBoundingClientRect();
          const k = l.width / ancho;
          return { x: (r.left - l.left + r.width / 2) / k, y: (r.top - l.top + r.height / 2) / k };
        };

        // La cámara lleva el punto al centro sin dejar ver fuera de la pantalla.
        const limitar = (valor: number, largo: number, zoom: number) =>
          Math.min(0, Math.max(largo - largo * zoom, valor));
        const acercar = (nombre: string, zoom: number) => ({
          x: () => {
            const ancho = anchoPantalla();
            return limitar(ancho / 2 - punto(nombre).x * zoom, ancho, zoom);
          },
          y: () => limitar(alto / 2 - punto(nombre).y * zoom, alto, zoom),
          scale: zoom,
          duration: 1.1,
          ease: 'power2.inOut',
        });
        // La punta de la flecha está en (5, 3) del dibujo.
        const irA = (nombre: string) => ({
          x: () => punto(nombre).x - 5,
          y: () => punto(nombre).y - 3,
          duration: 1.1,
          ease: 'power2.inOut',
        });

        gsap.set('[data-camara]', { x: 0, y: 0, scale: 1, transformOrigin: '0 0' });
        gsap.set('[data-cursor-video]', { autoAlpha: 0 });
        gsap.set('[data-onda]', { autoAlpha: 0, scale: 0 });

        const tl = gsap.timeline({ repeat: -1, paused: true, repeatDelay: 0.4 });
        tl.call(() => setEstado(inicial))
          .set('[data-cursor-video]', { x: () => anchoPantalla() * 0.6, y: alto * 0.6 })
          .to({}, { duration: 0.8 })
          .to('[data-cursor-video]', { autoAlpha: 1, duration: 0.3 });

        // Paso a paso: el cursor y la cámara van juntos, sin alejarse entremedio.
        pasos.forEach((paso) => {
          tl.to('[data-cursor-video]', irA(paso.objetivo)).to(
            '[data-camara]',
            acercar(paso.objetivo, paso.zoom),
            '<',
          );
          if (paso.alLlegar !== undefined) {
            const encima = paso.alLlegar;
            tl.call(() => setEstado(encima), undefined, '-=0.25');
          }
          tl.to({}, { duration: 0.45 });
          if (paso.clic !== undefined) {
            const despues = paso.clic;
            // El clic: la flecha se hunde y desde la punta sale una onda
            // celeste; recién después cambia la pantalla, para que se vea.
            tl.set('[data-onda]', {
              x: () => punto(paso.objetivo).x - 28,
              y: () => punto(paso.objetivo).y - 28,
              scale: 0.25,
              autoAlpha: 1,
            })
              .to('[data-cursor-video]', { scale: 0.78, duration: 0.12, ease: 'power2.in' })
              .to('[data-onda]', { scale: 1.5, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '<')
              .to('[data-cursor-video]', { scale: 1, duration: 0.25, ease: 'back.out(3)' }, '<0.12')
              .to({}, { duration: 0.3 })
              .call(() => setEstado(despues))
              .to({}, { duration: 0.5 });
          }
          tl.to({}, { duration: paso.espera ?? 0.6 });
        });

        tl.to({}, { duration: 1 })
          .to('[data-camara]', { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'power2.inOut' })
          .to('[data-cursor-video]', { autoAlpha: 0, duration: 0.3 }, '<')
          .to({}, { duration: 1 });

        // Al entrar sigue desde donde quedó; al salir se congela en ese cuadro.
        ScrollTrigger.create({
          trigger: caja.current,
          start: 'top 85%',
          end: 'bottom 15%',
          onToggle: (self) => {
            setActivo(self.isActive);
            if (self.isActive) tl.play();
            else tl.pause();
          },
        });

        return () => {
          setActivo(false);
          setEstado(inicial);
        };
      });

      return () => mm.revert();
    },
    { scope: caja },
  );

  const { escala, ancho } = medidas(anchoCaja ?? anchoMin);

  return (
    <div className="relative">
      {children ? (
        <div
          className={cn(
            'relative z-10',
            textoAlLado &&
              'px-4 pb-8 sm:px-8 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[28rem] lg:items-center lg:pb-0 lg:pl-12 [&_a]:pointer-events-auto',
          )}
        >
          {children}
        </div>
      ) : null}

      <div
        ref={caja}
        data-en-pantalla={activo}
        className={cn('relative w-full overflow-hidden', mascara)}
        style={{ height: alto * escala }}
        aria-label={etiqueta}
        role="img"
      >
        <div
          className="absolute left-0 top-0 origin-top-left transition-opacity duration-300"
          style={{
            width: ancho,
            height: alto,
            transform: `scale(${escala})`,
            opacity: anchoCaja === null ? 0 : 1,
          }}
        >
          {/* `will-change` solo mientras está a la vista (regla en globals.css). */}
          <div data-camara className="h-full w-full">
            <div data-lienzo className="relative h-full w-full bg-neutral-50 text-left font-sans">
              {pantalla(estado, { ancho, escala, grande })}
              <span
                data-onda
                className="pointer-events-none absolute left-0 top-0 z-30 h-14 w-14 rounded-full border-[3px] border-[#0FB5F5] bg-[#0FB5F5]/25"
                style={{ opacity: 0 }}
                aria-hidden
              />
              <div
                data-cursor-video
                className="pointer-events-none absolute left-0 top-0 z-30"
                style={{ opacity: 0 }}
                aria-hidden
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="drop-shadow-[0_3px_6px_rgba(6,20,71,0.35)]"
                  aria-hidden
                >
                  <path
                    d="M5 3l14 8.5-6.2 1.2L9.8 19 5 3z"
                    fill={COLOR_CURSOR}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
