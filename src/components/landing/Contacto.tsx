'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Cierre de la página: la invitación a conversar. Misma estructura de
// siempre (icono, título, texto y dos botones), pero con recursos propios,
// distintos del resto de la landing, sobre el azul plano de la marca y con
// aire de escuela: en lugar de un icono, una fila de alumnos del set de
// ilustraciones, sonriendo, que entran uno a uno y flotan apenas; detrás,
// un cuaderno cuadriculado muy tenue; la última palabra del título va rotando ("colegio",
// "jardín", "transporte"); la entrada pasa de borroso a nítido. Todo se pausa fuera de la
// vista y se queda quieto con "reducir movimiento".

const PALABRAS = ['colegio', 'jardín', 'transporte'];

export function Contacto() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const seccion = raiz.current;
        if (!seccion) return;
        const bloque = seccion.querySelector<HTMLElement>('[data-bloque]');
        const palabras = gsap.utils.toArray<HTMLElement>('[data-palabra]', seccion);
        const ninos = gsap.utils.toArray<HTMLElement>('[data-nino]', seccion);

        // Entrada (una vez): de borroso y chico a nítido.
        if (bloque) {
          gsap.set(bloque, { autoAlpha: 0, scale: 0.94, filter: 'blur(14px)' });
          ScrollTrigger.create({
            trigger: seccion,
            start: 'top 70%',
            once: true,
            onEnter: () => {
              gsap.to(bloque, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' });
              // Los alumnos aparecen uno a uno, con un rebote.
              gsap.fromTo(
                ninos,
                { scale: 0.4, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.09, delay: 0.3 },
              );
            },
          });
        }

        // Lo que se mueve mientras la sección está a la vista.
        const vivo = gsap.timeline({ paused: true });
        // Los alumnos flotan apenas, cada uno a su ritmo.
        ninos.forEach((nino, i) => {
          vivo.to(
            nino,
            { y: i % 2 ? -5 : 5, duration: 2.2 + (i % 3) * 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' },
            i * 0.2,
          );
        });
        // La última palabra del título rota: la actual sube y sale, la
        // siguiente entra desde abajo.
        if (palabras.length > 1) {
          // En píxeles (el alto de la línea), no en porcentaje: GSAP les
          // dejaba un desplazamiento extra a estos spans y quedaban fuera de
          // su ventana.
          const alto = () => palabras[0].offsetHeight;
          gsap.set(palabras, { y: alto, autoAlpha: 0 });
          gsap.set(palabras[0], { y: 0, autoAlpha: 1 });
          const rueda = gsap.timeline({ repeat: -1 });
          palabras.forEach((palabra, i) => {
            const siguiente = palabras[(i + 1) % palabras.length];
            rueda
              .to(palabra, { y: () => -alto(), autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, i * 2.6 + 2.2)
              .fromTo(
                siguiente,
                { y: alto, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out' },
                i * 2.6 + 2.55,
              );
          });
          vivo.add(rueda, 0);
        }

        ScrollTrigger.create({
          trigger: seccion,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            seccion.dataset.enPantalla = String(self.isActive);
            if (self.isActive) vivo.play();
            else vivo.pause();
          },
        });
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section
      id="contacto"
      ref={raiz}
      data-en-pantalla="false"
      className="relative overflow-hidden bg-[#061447] py-24 text-white"
    >
      {/* Cuaderno cuadriculado, muy tenue, que se desvanece hacia los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_45%,#000,transparent_78%)]"
      />

      <div data-bloque className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Los alumnos, en fila, sonriendo: entran uno a uno y flotan apenas. */}
        <div className="mx-auto mb-8 flex justify-center -space-x-4">
          {[1, 2, 3, 4, 5, 6].map((n, i) => (
            <div key={n} data-nino className={`relative ${i === 2 || i === 3 ? 'z-10 -mt-3' : ''}`}>
              <Image
                src={`/landing/alumnos/nino-${n}.svg`}
                alt=""
                width={72}
                height={72}
                className={`rounded-full ring-4 ring-[#061447] ${i === 2 || i === 3 ? 'h-20 w-20' : 'h-16 w-16'}`}
              />
            </div>
          ))}
        </div>
        <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Conversemos sobre tu {/* La palabra que rota, en una ventana del alto de una línea. */}
          <span className="relative inline-grid justify-items-center overflow-hidden align-bottom text-sky-300">
            <span className="invisible col-start-1 row-start-1">transporte.</span>
            {PALABRAS.map((palabra) => (
              <span key={palabra} data-palabra className="col-start-1 row-start-1 whitespace-nowrap text-center">
                {palabra}.
              </span>
            ))}
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
          Agenda una demo para ver cuál de los dos servicios hace sentido según tu operación, o si te conviene tenerlos
          juntos.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sky-400 px-7 text-[15px] font-extrabold text-[#061447] shadow-[0_14px_30px_-12px_rgba(56,189,248,0.6)] transition duration-200 hover:-translate-y-0.5 hover:bg-sky-300"
          >
            Agendar demo
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link
            href="https://app.chubai.cl/auth/login"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-7 text-[15px] font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
          >
            Acceder a la plataforma
          </Link>
        </div>
      </div>
    </section>
  );
}
