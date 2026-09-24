'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bus, ClipboardCheck, Clock3, FileCheck2, MapPin, Thermometer, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tono = 'verde' | 'amarillo' | 'rojo' | 'azul' | 'violeta';

const tonos: Record<Tono, string> = {
  verde: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  amarillo: 'border-amber-200 bg-amber-50 text-amber-800',
  rojo: 'border-red-200 bg-red-50 text-red-800',
  azul: 'border-sky-200 bg-sky-50 text-sky-800',
  violeta: 'border-violet-200 bg-violet-50 text-violet-800',
};

type Burbuja = {
  avatar: string;
  texto: string;
  icono: LucideIcon;
  tono: Tono;
  lado: 'izquierda' | 'derecha';
  // Posición dentro del hero. Las de "soloGrande" van a la altura del título,
  // donde solo caben en pantallas muy anchas.
  top: number;
  borde: string;
  soloGrande?: boolean;
};

const burbujas: Burbuja[] = [
  { avatar: 'alumnos/nino-2', texto: 'Ya subí al furgón', icono: Bus, tono: 'verde', lado: 'izquierda', top: 104, borde: '4%' },
  { avatar: 'avatar-21', texto: 'Voy 5 min atrasado', icono: Clock3, tono: 'amarillo', lado: 'derecha', top: 116, borde: '4%' },
  { avatar: 'avatar-09', texto: 'Hoy no va, está con fiebre', icono: Thermometer, tono: 'rojo', lado: 'izquierda', top: 440, borde: '7%' },
  { avatar: 'avatar-35', texto: 'Lista del 3° B tomada', icono: ClipboardCheck, tono: 'azul', lado: 'derecha', top: 450, borde: '7%' },
  { avatar: 'avatar-27', texto: '¿Dónde va el furgón?', icono: MapPin, tono: 'violeta', lado: 'izquierda', top: 300, borde: '1%', soloGrande: true },
  { avatar: 'alumnos/nino-5', texto: 'Justificación enviada', icono: FileCheck2, tono: 'verde', lado: 'derecha', top: 310, borde: '1%', soloGrande: true },
];

// Avatares con su burbuja de estado alrededor del título. Solo en pantallas
// anchas: en celular y tablet no hay espacio a los lados del texto.
export function HeroBurbujas() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-[640px] max-w-[1440px] xl:block">
      {burbujas.map((burbuja, index) => {
        const Icono = burbuja.icono;
        const izquierda = burbuja.lado === 'izquierda';
        return (
          <motion.div
            key={burbuja.avatar}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.15, ease: 'easeOut' }}
            className={cn('absolute', burbuja.soloGrande && 'hidden 2xl:block')}
            style={{ top: burbuja.top, [izquierda ? 'left' : 'right']: burbuja.borde }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
              className={cn('flex flex-col gap-2', izquierda ? 'items-start' : 'items-end')}
            >
              <div
                className={cn(
                  'relative flex items-center gap-2 whitespace-nowrap rounded-2xl border px-3.5 py-2 text-[13px] font-medium shadow-[0_8px_24px_-12px_rgba(6,20,71,0.25)]',
                  tonos[burbuja.tono],
                )}
              >
                <Icono className="h-3.5 w-3.5 flex-shrink-0" />
                {burbuja.texto}
                {/* Colita de la burbuja, apuntando al avatar */}
                <span
                  className={cn(
                    'absolute -bottom-[5px] h-2.5 w-2.5 rotate-45 border-b border-r',
                    tonos[burbuja.tono],
                    izquierda ? 'left-6' : 'right-6',
                  )}
                />
              </div>
              <Image
                src={burbuja.avatar.includes('/') ? `/landing/${burbuja.avatar}.svg` : `/landing/caras/${burbuja.avatar}.svg`}
                alt=""
                width={64}
                height={64}
                unoptimized
                className={cn(
                  'h-16 w-16 rounded-full shadow-[0_10px_30px_-12px_rgba(6,20,71,0.35)] ring-4 ring-white',
                  izquierda ? 'ml-1' : 'mr-1',
                )}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
