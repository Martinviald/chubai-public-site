'use client';

import {
  PantallaAsistencia,
  PantallaReportes,
  type EstadoAsistencia,
  type EstadoReportes,
} from '@/components/landing/panel/PantallasAsistencia';
import { VistaPreviaAnimada, type PasoAnimacion } from './VistaPreviaAnimada';

// Vistas previas de las dos celdas de abajo de la grilla de soluciones. Van
// debajo de su texto, de borde a borde de la celda, fundidas por los bordes.

// Degradado arriba y abajo; a los lados apenas, para no comerse los bordes de la pantalla.
const MASCARA =
  '[mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_90%,transparent),linear-gradient(to_right,transparent,#000_2%,#000_98%,transparent)]';

// Asistencia: la lista de cursos, abre 4° Básico B (el que está bajo el 80 %),
// mira el total del curso y después cómo viene cada estudiante.
const PASOS_ASISTENCIA: PasoAnimacion<EstadoAsistencia>[] = [
  // Llega al nombre del curso, la fila se pinta como al pasar el mouse y hace clic.
  { objetivo: 'curso-4b', zoom: 2.1, alLlegar: { curso: false, fila: true }, clic: { curso: true }, espera: 0.3 },
  { objetivo: 'curso-dona', zoom: 1.9, espera: 1.2 },
  { objetivo: 'curso-barras', zoom: 1.6, espera: 1.6 },
];

export function VideoAsistencia() {
  return (
    <VistaPreviaAnimada
      inicial={{ curso: false }}
      pasos={PASOS_ASISTENCIA}
      alto={800}
      anchoMin={1100}
      escalaMax={0.62}
      etiqueta="Vista previa del módulo de asistencia"
      mascara={MASCARA}
      pantalla={(estado) => <PantallaAsistencia estado={estado} />}
    />
  );
}

// Reportes: cosas concretas, una a la vez. Los casos sin respaldo firme (en
// rojo), el motivo que más se repite, un caso del asistente y, al final, el
// clic en "Generar un reporte", que queda "Generando…".
const PASOS_REPORTES: PasoAnimacion<EstadoReportes>[] = [
  // El zoom va según el ancho de lo que muestra: las filas son anchas y con
  // más acercamiento se cortaba el nombre del motivo.
  { objetivo: 'rep-sin-respaldo', zoom: 1.8, espera: 1 },
  { objetivo: 'rep-motivo-salud', zoom: 1.35, alLlegar: { motivo: true }, espera: 1.2 },
  { objetivo: 'rep-caso', zoom: 1.5, alLlegar: { caso: true }, espera: 1.2 },
  { objetivo: 'rep-generar', zoom: 1.8, clic: { generando: true }, espera: 1.4 },
];

export function VideoReportes() {
  return (
    <VistaPreviaAnimada
      inicial={{}}
      pasos={PASOS_REPORTES}
      alto={800}
      anchoMin={1100}
      escalaMax={0.62}
      etiqueta="Vista previa del módulo de reportes"
      mascara={MASCARA}
      pantalla={(estado) => <PantallaReportes estado={estado} />}
    />
  );
}
