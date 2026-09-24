'use client';

import type { ReactNode } from 'react';
import { VistaViajesEnCurso, type EstadoTransporte } from '@/components/landing/panel/PanelClon';
import { VistaPreviaAnimada, type PasoAnimacion } from './VistaPreviaAnimada';

// Vista previa del módulo de transporte: la pantalla "Viajes en curso", de
// borde a borde de la sección, con el texto encima de la parte izquierda.
// 1. filtra por "En ruta", 2. de ahí baja directo a la lista y abre el viaje
// de Carlos, 3. se acerca a los alumnos de la ficha del furgón.

const INICIAL: EstadoTransporte = { filtro: 'todos', ficha: false };

const PASOS: PasoAnimacion<EstadoTransporte>[] = [
  { objetivo: 'filtro-enruta', zoom: 1.9, clic: { filtro: 'enRuta', ficha: false } },
  { objetivo: 'viaje-carlos', zoom: 1.8, clic: { filtro: 'enRuta', ficha: true } },
  { objetivo: 'ficha-alumnos', zoom: 1.6, espera: 1.8 },
];

export function VideoTransporte({ children }: { children?: ReactNode }) {
  return (
    <VistaPreviaAnimada
      inicial={INICIAL}
      pasos={PASOS}
      alto={640}
      anchoMin={1060}
      etiqueta="Vista previa del módulo de transporte escolar"
      textoAlLado
      // En pantallas grandes el texto ocupa los primeros 28rem y el mapa
      // aparece recién después, con un degradado hasta los 42rem.
      mascara="[mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_90%,transparent)] lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(to_right,transparent_26rem,#000_42rem),linear-gradient(to_bottom,transparent,#000_8%,#000_90%,transparent)]"
      pantalla={(estado, { escala, grande }) => (
        // La flota se centra en lo que se ve a la derecha del texto (35rem =
        // 560 px). Se redondea a 50 px para no mover la cámara por nada.
        <VistaViajesEnCurso
          estado={estado}
          rellenoMapa={children && grande ? Math.round(560 / escala / 50) * 50 : 0}
        />
      )}
    >
      {children}
    </VistaPreviaAnimada>
  );
}
