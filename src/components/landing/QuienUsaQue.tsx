'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Bus, GraduationCap, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// "Quién usa qué": cada rol del colegio y el servicio que le corresponde.
//
// En pantallas grandes, primero se ve solo el título de la sección, grande
// y centrado. Con el primer tramo de scroll el título se va y entra desde
// abajo la línea de tiempo: una línea ondulada al pie de la sección con un
// paso por rol. El paso actual va grande en el centro; el anterior y el
// siguiente asoman chicos a los lados, sobre la misma línea. Arriba,
// centrada y grande, la explicación del paso actual; arriba a la derecha,
// un punto por paso que marca en cuál se va. Con el scroll la línea entera
// se desliza junto con los círculos y el siguiente paso llega al centro y
// crece, mientras la explicación cambia. El scroll encaja paso por paso. En celular o con "reducir movimiento" es
// una lista simple, sin fijar nada.

type Servicio = 'tracking' | 'asistencia';

const ETIQUETA_SERVICIO: Record<Servicio, { icon: LucideIcon; nombre: string; className: string }> = {
  tracking: { icon: Bus, nombre: 'Tracking', className: 'bg-sky-400/15 text-sky-200' },
  asistencia: { icon: GraduationCap, nombre: 'Asistencia', className: 'bg-emerald-400/15 text-emerald-200' },
};

// Los bustos (cabeza y hombros, en círculo) están en public/landing/roles y
// se arman con piezas del set de ilustraciones del proyecto (svg-assets,
// estilo studio), uno por rol: la ropa dice quién es.
// `depie-*.svg` son las mismas personas de cuerpo completo, para la portada.
const roles: Array<{ avatar: string; title: string; text: string; usa: Servicio[] }> = [
  {
    avatar: 'direccion',
    title: 'Dirección y sostenedores',
    text: 'Métricas consolidadas de una o varias instituciones, con la asistencia y el transporte en el mismo panel.',
    usa: ['tracking', 'asistencia'],
  },
  {
    avatar: 'profesor',
    title: 'Profesores e inspectoría',
    text: 'Registro rápido en sala, seguimiento de sus cursos y justificaciones sin perseguir a nadie.',
    usa: ['asistencia'],
  },
  {
    avatar: 'apoderado',
    title: 'Apoderados',
    text: 'App con el estado del día de sus hijos, el furgón en el mapa y avisos al celular cuando pasa algo.',
    usa: ['tracking', 'asistencia'],
  },
  {
    avatar: 'conductor',
    title: 'Transportistas',
    text: 'App con inicio de ruta, check-in de estudiantes, GPS automático y botón SOS.',
    usa: ['tracking'],
  },
];

// Pasos del scroll: el título y después un paso por rol. `progreso` 0 es el
// título; de 1 en adelante, el rol `progreso - 1`.
const TOTAL_PASOS = roles.length + 1;

// El dibujo. La onda es un seno: cada paso queda a la misma distancia del
// anterior y cae alternadamente en una cresta y en un valle. Todo el dibujo
// (línea y círculos) se corre a la izquierda con el scroll, `SEPARACION`
// por cada paso, y el paso actual queda siempre en el centro de la vista.
const ANCHO_VISTA = 1200;
const ALTO_VISTA = 300;
const CENTRO_X = ANCHO_VISTA / 2;
const SEPARACION = 380;
const AMPLITUD = 44;
// Eje de la onda: deja aire abajo para el círculo grande cuando cae en un valle.
const LINEA_Y = 150;
const alturaEn = (x: number) => LINEA_Y - AMPLITUD * Math.cos((Math.PI * (x - CENTRO_X)) / SEPARACION);
const xDe = (i: number) => CENTRO_X + i * SEPARACION;

// La onda entera, más larga que la vista para que nunca se vea el final.
const ONDA = (() => {
  const desde = -SEPARACION * 2;
  const hasta = ANCHO_VISTA + SEPARACION * (TOTAL_PASOS + 1);
  let d = `M ${desde} ${alturaEn(desde)}`;
  for (let x = desde + 6; x <= hasta; x += 6) d += ` L ${x} ${alturaEn(x)}`;
  return d;
})();

// Radio del círculo del paso actual y de los que asoman a los lados.
const RADIO = 64;
const RADIO_CHICO = 30;

function EtiquetaServicio({ servicio }: { servicio: Servicio }) {
  const { icon: Icon, nombre, className } = ETIQUETA_SERVICIO[servicio];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${className}`}>
      <Icon className="h-4 w-4" />
      {nombre}
    </span>
  );
}

// Persona de cuerpo completo, inline: el archivo trae sus partes con las
// clases `figura-cuerpo` y `figura-cabeza`, que animan desde globals.css.
export function Figura({ avatar }: { avatar: string }) {
  const [svg, setSvg] = useState('');
  useEffect(() => {
    let vigente = true;
    fetch(`/landing/roles/depie-${avatar}.svg`)
      .then((r) => r.text())
      .then((t) => vigente && setSvg(t))
      .catch(() => undefined);
    return () => {
      vigente = false;
    };
  }, [avatar]);
  return <div className="h-full [&>svg]:h-full [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function Encabezado() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-4xl font-extrabold tracking-tight">Cada equipo entra a lo suyo.</h2>
      <p className="mt-5 text-lg leading-8 text-white/75">
        Un mismo acceso para todo el colegio. Cada rol ve solo el servicio que le corresponde.
      </p>
    </div>
  );
}

export function QuienUsaQue() {
  const raiz = useRef<HTMLElement>(null);
  const ultimo = TOTAL_PASOS - 1;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const seccion = raiz.current;
        const mundo = seccion?.querySelector<SVGGElement>('[data-mundo]');
        if (!seccion || !mundo) return;

        const pasos = gsap.utils.toArray<SVGGElement>('[data-paso]', seccion);
        const fichas = gsap.utils.toArray<HTMLElement>('[data-ficha]', seccion);
        const titulo = seccion.querySelector<HTMLElement>('[data-titulo]');
        const linea = seccion.querySelector<HTMLElement>('[data-linea]');
        const limitar = (v: number) => Math.min(1, Math.max(0, v));

        // Portada: al llegar a la sección (una sola vez) las palabras del
        // título suben una a una, se dibuja el subrayado y las personas
        // entran desde abajo. Mientras la sección está a la vista, las
        // personas flotan apenas.
        const palabras = gsap.utils.toArray<HTMLElement>('[data-palabra]', seccion);
        const subrayado = seccion.querySelector<SVGPathElement>('[data-subrayado]');
        const figuras = gsap.utils.toArray<HTMLElement>('[data-figura]', seccion);
        const entradas = gsap.utils.toArray<HTMLElement>('[data-entrada]', seccion);
        gsap.set(palabras, { y: 40, autoAlpha: 0 });
        gsap.set(entradas, { y: 70, autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: seccion,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            const entrada = gsap.timeline();
            entrada
              .to(palabras, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0)
              .to(entradas, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.2);
            if (subrayado) entrada.to(subrayado, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' }, 0.6);
          },
        });
        const ambiente = gsap.timeline({ paused: true });
        ambiente.to(
          gsap.utils.toArray<HTMLElement>('[data-flota]', seccion),
          {
            y: -9,
            duration: 2.4,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: { each: 0.35, repeat: -1, yoyo: true },
          },
          0,
        );
        const rebote = ambiente;
        // Mientras la sección esté a la vista (desde que asoma hasta que se
        // va), corren el ambiente y las animaciones de CSS de las figuras;
        // fuera, se pausan. Es un disparador aparte del que fija la sección,
        // porque ese no marca activo justo en el borde de arranque.
        ScrollTrigger.create({
          trigger: seccion,
          start: 'top bottom',
          // Desde que asoma hasta que se va: una pantalla de acercamiento, las
          // pantallas del recorrido fijado y una de salida.
          end: () => `+=${(ultimo + 2) * window.innerHeight}`,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            rebote.paused(!self.isActive);
            seccion.dataset.enPantalla = String(self.isActive);
          },
        });

        // Pinta el estado para un `progreso` de 0 al último paso (con
        // decimales mientras se desliza): corre el dibujo entero, agranda el
        // paso que está en el centro, muestra su explicación y marca su
        // punto arriba.
        const pintar = (progreso: number) => {
          // El título se va en el primer tramo y, en su lugar, entra la
          // línea de tiempo subiendo desde abajo.
          const conTitulo = limitar(1 - progreso * 2);
          const aparece = limitar((progreso - 0.2) / 0.6);
          if (titulo) {
            titulo.style.opacity = String(conTitulo);
            titulo.style.transform = `translateY(${(1 - conTitulo) * -24}px)`;
          }
          if (linea) {
            linea.style.opacity = String(aparece);
            linea.style.transform = `translateY(${(1 - aparece) * 80}px)`;
          }

          // De acá en adelante todo se mide en pasos de rol.
          const paso = progreso - 1;
          mundo.setAttribute('transform', `translate(${-paso * SEPARACION} 0)`);
          pasos.forEach((paso_, i) => {
            const cerca = Math.max(0, 1 - Math.abs(paso - i));
            const escala = RADIO_CHICO / RADIO + (1 - RADIO_CHICO / RADIO) * cerca;
            paso_.setAttribute('transform', `translate(${xDe(i)} ${alturaEn(xDe(i))}) scale(${escala})`);
            paso_.setAttribute('opacity', String(0.55 + 0.45 * cerca));
            paso_.querySelector('[data-anillo]')?.setAttribute('stroke-opacity', String(cerca));
          });
          // La explicación brota del círculo del centro: sube desde el punto
          // y crece hasta su lugar; al cambiar de paso, vuelve a hundirse.
          fichas.forEach((ficha, i) => {
            const cerca = Math.max(0, 1 - Math.abs(paso - i) * 2.2);
            const suave = 1 - (1 - cerca) ** 2;
            ficha.style.opacity = String(suave);
            ficha.style.transform = `translateY(${(1 - suave) * 220}px) scale(${0.4 + 0.6 * suave})`;
          });
        };

        pintar(0);

        const avance = { progreso: 0 };
        // El pie (la caja de la línea) se mide sin transformaciones.
        const pie = seccion.querySelector<HTMLElement>('[data-pie]');
        // A dónde vuela cada persona al hacer scroll: al centro del círculo de
        // su rol en la línea de tiempo, medido sin transformaciones (offset*)
        // para que no dependa de en qué punto del scroll se mida.
        const destino = (figura: HTMLElement, i: number) => {
          if (!pie) return { x: 0, y: 0 };
          const k = pie.offsetWidth / ANCHO_VISTA;
          const cx = pie.offsetLeft + xDe(i) * k;
          const cy = pie.offsetTop + alturaEn(xDe(i)) * k;
          return {
            x: cx - (figura.offsetLeft + figura.offsetWidth / 2),
            y: cy - (figura.offsetTop + figura.offsetHeight / 2),
          };
        };
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: seccion,
            start: 'top top',
            // Una pantalla de scroll por cada paso.
            end: () => `+=${ultimo * window.innerHeight}`,
            pin: true,
            scrub: 0.5,
            // Encaja en el paso más cercano. Sin `inertia` ni `directional`,
            // un scroll rápido no se salta pasos.
            snap: {
              snapTo: 1 / ultimo,
              inertia: false,
              directional: false,
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: 'power1.inOut',
            },
            invalidateOnRefresh: true,
          },
        });
        tl.to(avance, { progreso: ultimo, duration: ultimo, onUpdate: () => pintar(avance.progreso) }, 0);
        // En el primer tramo, cada persona vuela hacia su círculo y se achica
        // hasta entrar en él, una tras otra.
        figuras.forEach((figura, i) => {
          tl.to(
            figura,
            {
              x: () => destino(figura, i).x,
              y: () => destino(figura, i).y,
              scale: 0.18,
              rotation: i % 2 === 0 ? -8 : 8,
              autoAlpha: 0,
              duration: 0.62,
              ease: 'power2.in',
            },
            0.04 + i * 0.05,
          );
        });
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  return (
    <section id="roles" ref={raiz} data-en-pantalla="false" className="bg-[#061447] text-white">
      {/* Recorrido (pantallas grandes, sin "reducir movimiento"). */}
      <div className="relative hidden h-screen overflow-hidden motion-safe:lg:block">
        {/* El título de la sección, solo y centrado en toda la sección. Es lo
            primero que se ve; se va con el primer tramo de scroll. */}
        <div data-titulo className="absolute inset-0 flex items-center justify-center px-6 pt-16 text-center">
          {/* Detrás: un resplandor celeste y una trama de puntos que se
              desvanece hacia los bordes. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.13)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_45%_45%_at_50%_50%,#000,transparent_75%)]"
          />
          <div className="relative max-w-3xl">
            <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              {/* Palabra por palabra, para animarlas al llegar. */}
              {['Cada', 'equipo', 'entra', 'a'].map((palabra) => (
                <span key={palabra} data-palabra className="inline-block">
                  {palabra}&nbsp;
                </span>
              ))}
              <span data-palabra className="relative inline-block whitespace-nowrap">
                lo suyo.
                {/* Subrayado a mano, se dibuja al llegar. */}
                <svg
                  viewBox="0 0 220 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-4 w-full"
                  aria-hidden
                >
                  <path
                    data-subrayado
                    d="M4 10 C 40 4, 80 13, 120 8 S 190 5, 216 9"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength={1}
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                  />
                </svg>
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-white/80">
              Un mismo acceso para todo el colegio. Cada rol ve solo el servicio que le corresponde.
            </p>
          </div>
        </div>

        {/* Las cuatro personas, de cuerpo completo, a los lados del título,
            cada una con un globo en el que dice algo de lo suyo. Entran
            desde abajo al llegar, flotan mientras se ven y, con el scroll,
            vuelan a su círculo de la línea de tiempo. Solo en pantallas
            anchas. */}
        {(
          [
            {
              rol: roles[0],
              className: 'left-[4%] bottom-[16%] h-[280px]',
              globo: { texto: '94 % de asistencia hoy', className: '-top-9 left-[-1rem]', retraso: '-0.4s' },
              detalle: null,
            },
            {
              rol: roles[1],
              className: 'left-[15%] bottom-[9%] h-[330px]',
              globo: { texto: '3° B, lista tomada', className: '-top-[4.6rem] left-[-6%]', retraso: '-1.1s' },
              detalle: 'bolso',
            },
            {
              rol: roles[2],
              className: 'right-[15%] bottom-[9%] h-[330px]',
              globo: { texto: '¡Hola!', className: '-top-8 right-[-1.5rem]', retraso: '0s' },
              detalle: null,
            },
            {
              rol: roles[3],
              className: 'right-[4%] bottom-[16%] h-[280px]',
              globo: { texto: 'Salgo en 5 min', className: '-top-[4.6rem] right-[-1rem]', retraso: '-0.7s' },
              detalle: 'llaves',
            },
          ] as const
        ).map(({ rol, className, globo, detalle }) => (
          <div key={rol.title} data-figura className={`pointer-events-none absolute hidden xl:block ${className}`}>
            <div data-entrada className="h-full">
              <div data-flota className="relative h-full">
                <Figura avatar={rol.avatar} />
                {/* El bolso cuelga de la mano del profesor y se mece. */}
                {detalle === 'bolso' && (
                  <div className="figura-bolso absolute left-[-4%] top-[50%] h-[27%]">
                    <Image
                      src="/landing/roles/objeto-bolso.svg"
                      alt=""
                      width={200}
                      height={260}
                      className="h-full w-auto"
                    />
                  </div>
                )}
                {/* Las llaves cuelgan de la mano del conductor y se mecen. */}
                {detalle === 'llaves' && (
                  <div className="figura-llaves absolute right-[6%] top-[50%] h-[21%]">
                    <Image
                      src="/landing/roles/objeto-llaves.svg"
                      alt=""
                      width={200}
                      height={240}
                      className="h-full w-auto"
                    />
                  </div>
                )}
                {/* La única etiqueta: el globo, que rebota. */}
                <span
                  className={`figura-globo absolute whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-extrabold text-[#061447] shadow-lg shadow-black/30 ${globo.className}`}
                  style={{ animationDelay: globo.retraso }}
                >
                  {globo.texto}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* La explicación del paso actual, centrada en el espacio que queda
            sobre la línea. Las fichas van una encima de otra. */}
        <div className="absolute inset-x-0 bottom-[36vh] top-24 mx-auto grid w-full max-w-3xl items-center px-6 text-center">
          {roles.map((rol) => (
            <div key={rol.title} data-ficha className="origin-bottom [grid-area:1/1]" style={{ opacity: 0 }}>
              <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{rol.title}</h3>
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-white/80">{rol.text}</p>
              <div className="mt-7 flex justify-center gap-2.5">
                {rol.usa.map((servicio) => (
                  <EtiquetaServicio key={servicio} servicio={servicio} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* La línea ondulada con los pasos, al pie. Se corre entera con el
            scroll; el paso actual queda en el centro. */}
        <div data-pie className="absolute inset-x-0 bottom-0">
          <svg
            data-linea
            viewBox={`0 0 ${ANCHO_VISTA} ${ALTO_VISTA}`}
            className="block h-auto w-full [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
            style={{ opacity: 0 }}
            aria-hidden
          >
            <g data-mundo>
              <path d={ONDA} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
              {roles.map((rol, i) => (
                <g key={rol.title} data-paso transform={`translate(${xDe(i)} ${alturaEn(xDe(i))})`}>
                  <circle r={RADIO + 6} fill="#061447" />
                  <circle r={RADIO + 3} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                  <circle data-anillo r={RADIO + 3} fill="none" stroke="#38bdf8" strokeWidth="3" />
                  <image
                    href={`/landing/roles/${rol.avatar}.svg`}
                    x={-RADIO}
                    y={-RADIO}
                    width={RADIO * 2}
                    height={RADIO * 2}
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Lista simple (celular, o "reducir movimiento"). */}
      <div className="py-20 motion-safe:lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Encabezado />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {roles.map((rol) => (
              <div key={rol.title} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6">
                <Image
                  src={`/landing/roles/${rol.avatar}.svg`}
                  alt=""
                  width={56}
                  height={56}
                  className="mb-5 h-14 w-14 rounded-full"
                />
                <h3 className="text-lg font-bold">{rol.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-white/70">{rol.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {rol.usa.map((servicio) => (
                    <EtiquetaServicio key={servicio} servicio={servicio} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
