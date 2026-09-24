'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PANEL_ALTO, PANEL_ANCHO, PanelClon, type VistaPanel } from '@/components/landing/panel/PanelClon';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// El panel se dibuja a su tamaño real (1280 x 800) y se escala para que entre
// en el ancho disponible, como una ventana del producto.
function PanelEscalado({ vista, className }: { vista: VistaPanel; className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState<number | null>(null);

  useEffect(() => {
    const elemento = caja.current;
    if (!elemento) return;
    const medir = () => setEscala(elemento.clientWidth / PANEL_ANCHO);
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      data-vista={vista}
      className={cn(
        'rounded-[22px] border border-slate-200/80 bg-white/70 p-1.5 shadow-[0_30px_80px_-28px_rgba(6,20,71,0.35)] sm:p-2',
        className,
      )}
    >
      <div
        ref={caja}
        className="relative w-full overflow-hidden rounded-2xl border border-slate-200"
        style={{ aspectRatio: `${PANEL_ANCHO} / ${PANEL_ALTO}` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left transition-opacity duration-300"
          style={{ transform: `scale(${escala ?? 1})`, opacity: escala === null ? 0 : 1 }}
        >
          <PanelClon vista={vista} />
        </div>
      </div>
    </div>
  );
}

export function HeroScrollPanel() {
  const escenario = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Solo en pantallas medianas o más, y si la persona no pidió reducir el
      // movimiento. En celular (o con movimiento reducido) las dos vistas
      // quedan una debajo de la otra, quietas.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const marcoAsistencia = '[data-vista="asistencia"]';
        const marcoTransporte = '[data-vista="transporte"]';
        const contenidoAsistencia = `${marcoAsistencia} [data-panel-contenido] > *`;
        const contenidoTransporte = `${marcoTransporte} [data-panel-contenido] > *`;

        // 1. Al acercarse, el panel viene inclinado hacia atrás y se endereza.
        gsap.fromTo(
          '[data-escena]',
          { rotateX: 16, scale: 0.92, y: 40, transformPerspective: 1800, transformOrigin: '50% 0%' },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: '[data-escena]', start: 'top 95%', end: 'top 30%', scrub: true },
          },
        );

        // 2. Se queda fijo en pantalla y pasa de Asistencia a Transporte.
        gsap.set(marcoTransporte, { autoAlpha: 0 });
        gsap.set(contenidoTransporte, { autoAlpha: 0, y: 28 });
        gsap
          .timeline({
            scrollTrigger: {
              // Se fija el contenedor de afuera; el de adentro es el que se inclina.
              trigger: escenario.current,
              // Justo bajo el menú de la página (72 px + aire). El ancho del
              // panel está limitado por el alto de la pantalla, así que cabe entero.
              start: 'top 88px',
              end: '+=1000',
              pin: true,
              scrub: 0.6,
            },
          })
          // En orden, para que nunca se vean dos pantallas encimadas: se va el
          // contenido de asistencia, el marco cambia de golpe (solo cambia lo
          // marcado en el menú) y entra el contenido de transporte.
          .to({}, { duration: 0.3 })
          .to(contenidoAsistencia, { y: -28, autoAlpha: 0, duration: 0.3, ease: 'power2.in' })
          .to(marcoTransporte, { autoAlpha: 1, duration: 0.08, ease: 'none' })
          .to(contenidoTransporte, { y: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
          .to({}, { duration: 0.3 });
      });

      return () => mm.revert();
    },
    { scope: escenario },
  );

  return (
    // En pantallas medianas el ancho se limita por el alto de la ventana (el panel
    // es 16:10): así, fijo bajo el menú, se ve entero aunque la pantalla sea baja.
    <div ref={escenario} className="mx-auto w-full max-w-6xl md:max-w-[min(72rem,calc((100vh-8rem)*1.6))]">
      <div data-escena className="relative will-change-transform">
        <PanelEscalado vista="asistencia" className="relative" />
        {/* Encima de la de asistencia en pantallas medianas, para el cruce; en
            celular o con movimiento reducido va debajo. */}
        <PanelEscalado
          vista="transporte"
          className="mt-6 motion-safe:md:absolute motion-safe:md:inset-0 motion-safe:md:mt-0"
        />
      </div>
    </div>
  );
}
