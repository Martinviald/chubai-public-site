import {
  ArrowLeft,
  ChevronRight,
  FileBarChart,
  FileDown,
  Loader2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { ModuleArt } from '@/components/ui/module-art';
import { cn } from '@/lib/utils';
import { VistaAsistencia } from './PanelClon';

// Copias estáticas de dos pantallas del panel del colegio, con datos ficticios,
// para las vistas previas animadas de la página pública:
// - El detalle de un curso (SchoolAdminCourseDetailView): las dos gráficas y
//   el historial de días.
// - Reportes (ReportsView): "Por qué faltan", con las cifras, los motivos y
//   los últimos casos.
// Mismo marcado y mismas clases; las gráficas se dibujan con SVG en vez de
// Recharts para no cargar la librería en la página pública.

const boton =
  'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-control border px-4 text-sm font-medium';

function Cabecera({
  arte,
  titulo,
  descripcion,
  accion,
}: {
  arte: 'libreta' | 'estadistica';
  titulo: string;
  descripcion: string;
  accion?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ModuleArt name={arte} className="shrink-0" />
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{titulo}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{descripcion}</p>
        </div>
      </div>
      {accion && <div className="shrink-0">{accion}</div>}
    </div>
  );
}

// ---------- Asistencia: la lista de cursos o el detalle de 4° Básico B ----------

export type EstadoAsistencia = { curso: boolean; fila?: boolean };

const reparto = [
  { palabra: 'Presentes', valor: 418, porcentaje: 72, color: '#16A34A' },
  { palabra: 'Atrasos', valor: 41, porcentaje: 7, color: '#F97316' },
  { palabra: 'Ausencias', valor: 122, porcentaje: 21, color: '#DC2626' },
];

const alumnos = [
  { nombre: 'Tomás R.', tasa: 58 },
  { nombre: 'Josefa M.', tasa: 64 },
  { nombre: 'Martín S.', tasa: 71 },
  { nombre: 'Agustina P.', tasa: 77 },
  { nombre: 'Benjamín L.', tasa: 82 },
  { nombre: 'Florencia D.', tasa: 86 },
  { nombre: 'Vicente A.', tasa: 88 },
  { nombre: 'Emilia C.', tasa: 91 },
  { nombre: 'Lucas F.', tasa: 94 },
  { nombre: 'Isidora V.', tasa: 97 },
];

const colorTasa = (tasa: number) => (tasa >= 90 ? '#16A34A' : tasa >= 80 ? '#F97316' : '#DC2626');

const dias = [
  { fecha: 'martes, 22 de septiembre de 2026', tasa: 79, p: 21, a: 2, f: 6, profe: 'Carolina Muñoz' },
  { fecha: 'lunes, 21 de septiembre de 2026', tasa: 83, p: 22, a: 2, f: 5, profe: 'Carolina Muñoz' },
  { fecha: 'viernes, 18 de septiembre de 2026', tasa: 72, p: 19, a: 2, f: 8, profe: 'Pedro Soto' },
];

function Dona() {
  // Anillo como el PieChart del panel: radio 62–86, empieza arriba y gira a la derecha.
  const radio = 74;
  const largo = 2 * Math.PI * radio;
  // El desfase de cada tramo depende de la suma acumulada de los anteriores —
  // reduce en vez de una variable mutada, para no reasignar nada durante el render.
  const tramos = reparto.reduce<{ filas: Array<{ palabra: string; color: string; tramo: number; desfase: number }>; acumulado: number }>(
    (estado, parte) => {
      const tramo = (parte.porcentaje / 100) * largo - 3;
      const desfase = -estado.acumulado;
      return {
        filas: [...estado.filas, { palabra: parte.palabra, color: parte.color, tramo, desfase }],
        acumulado: estado.acumulado + (parte.porcentaje / 100) * largo,
      };
    },
    { filas: [], acumulado: 0 },
  ).filas;
  return (
    <svg viewBox="0 0 192 192" className="h-48 w-48" aria-hidden>
      <g transform="rotate(-90 96 96)">
        {tramos.map((parte) => (
          <circle
            key={parte.palabra}
            cx="96"
            cy="96"
            r={radio}
            fill="none"
            stroke={parte.color}
            strokeWidth="24"
            strokeDasharray={`${parte.tramo} ${largo}`}
            strokeDashoffset={parte.desfase}
          />
        ))}
      </g>
    </svg>
  );
}

function VistaCurso() {
  return (
    <div className="mx-auto w-full space-y-section-lg">
      <Cabecera
        arte="libreta"
        titulo="4° Básico B"
        descripcion="Básica · 29 estudiantes · Profesor jefe Carolina Muñoz"
        accion={
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn(boton, 'border-border bg-card text-foreground')}>
              <ArrowLeft className="mr-2 h-5 w-5" aria-hidden />
              Volver a los cursos
            </span>
            <span className={cn(boton, 'border-border bg-card text-foreground')}>
              <FileDown className="mr-2 h-5 w-5" aria-hidden />
              Exportar informe
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-[20rem_minmax(0,1fr)] gap-4">
        <section data-objetivo="curso-dona" className="rounded-surface border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">Los días del curso</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            581 registros de asistencia. Le faltan 10.7 puntos para llegar al 90%.
          </p>
          <div className="relative mt-4 flex h-48 w-full items-center justify-center">
            <Dona />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-semibold leading-none tabular-nums text-destructive-700">79.3%</span>
              <span className="mt-1 text-xs text-muted-foreground">de asistencia</span>
            </div>
          </div>
          <ul className="mt-4 space-y-1.5">
            {reparto.map((parte) => (
              <li key={parte.palabra} className="flex items-center gap-2 text-sm">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-pill" style={{ backgroundColor: parte.color }} />
                <span className="flex-1 text-neutral-700">{parte.palabra}</span>
                <span className="font-semibold tabular-nums text-foreground">{parte.valor}</span>
                <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">{parte.porcentaje}%</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-surface border border-border bg-card p-5">
          <h2 className="text-base font-semibold text-foreground">Cómo viene cada estudiante</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Del que menos asiste al que más. Verde sobre 90%, rojo bajo 80%.
          </p>
          {/* Barras como el BarChart del panel: eje de 0 a 100 %, etiqueta arriba. */}
          <div data-objetivo="curso-barras" className="mt-8 h-64 w-full pb-7 pl-10 pr-2">
            <div className="relative flex h-full items-end gap-[3%] border-b border-[#E5E7EB]">
              {[0, 25, 50, 75, 100].map((marca) => (
                <span
                  key={marca}
                  className="absolute -left-10 w-8 translate-y-1/2 text-right text-xs tabular-nums text-[#5B6370]"
                  style={{ bottom: `${marca}%` }}
                >
                  {marca}%
                </span>
              ))}
              {alumnos.map((alumno) => (
                <div key={alumno.nombre} className="relative h-full flex-1">
                  <span
                    className="absolute inset-x-0 bottom-0 block rounded-t-md"
                    style={{ height: `${alumno.tasa}%`, backgroundColor: colorTasa(alumno.tasa) }}
                  />
                  <span
                    className="absolute inset-x-0 text-center text-[13px] font-semibold tabular-nums text-foreground"
                    style={{ bottom: `calc(${alumno.tasa}% + 4px)` }}
                  >
                    {alumno.tasa}%
                  </span>
                  <span className="absolute -bottom-6 left-1/2 w-24 -translate-x-1/2 truncate text-center text-xs text-[#5B6370]">
                    {alumno.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium text-foreground">Historial de</span>
        <span className="inline-flex h-9 items-center rounded-pill border border-border bg-card px-3.5 text-sm text-neutral-700">
          Este mes
        </span>
        <span className="text-sm text-muted-foreground">16 días con lista tomada</span>
      </div>

      <section className="rounded-surface border border-border bg-card">
        <ul className="divide-y divide-border">
          {dias.map((dia) => (
            <li key={dia.fecha} className="flex w-full items-center gap-3 px-5 py-3 text-left">
              <span
                className={cn(
                  'inline-flex shrink-0 items-center rounded-pill px-2.5 py-1 text-xs font-semibold tabular-nums',
                  dia.tasa >= 90
                    ? 'bg-success-50 text-success-700'
                    : dia.tasa >= 80
                      ? 'bg-[#FFF7ED] text-[#B45309]'
                      : 'bg-destructive-50 text-destructive-700',
                )}
              >
                {dia.tasa}%
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium capitalize text-foreground">{dia.fecha}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {dia.p + dia.a} de {dia.p + dia.a + dia.f} estudiantes · lista tomada por {dia.profe}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3 text-xs tabular-nums text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-pill bg-[#16A34A]" aria-hidden />
                  {dia.p}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-pill bg-[#F97316]" aria-hidden />
                  {dia.a}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-pill bg-[#DC2626]" aria-hidden />
                  {dia.f}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** Asistencia por curso; con `curso`, el detalle de 4° Básico B. */
export function PantallaAsistencia({ estado }: { estado: EstadoAsistencia }) {
  return <div className="h-full w-full p-8">{estado.curso ? <VistaCurso /> : <VistaAsistencia filaActiva={estado.fila} />}</div>;
}

// ---------- Reportes ----------

const motivos = [
  { nombre: 'Salud', cantidad: 12, porcentaje: 40, revisa: 3, debil: 0 },
  { nombre: 'Transporte', cantidad: 7, porcentaje: 23, revisa: 1, debil: 1 },
  { nombre: 'Familiar', cantidad: 5, porcentaje: 17, revisa: 2, debil: 0 },
  { nombre: 'Atraso', cantidad: 4, porcentaje: 13, revisa: 0, debil: 2 },
  { nombre: 'Otro', cantidad: 2, porcentaje: 7, revisa: 1, debil: 1 },
];

const casos = [
  {
    alumno: 'Tomás Rojas',
    detalle: 'Salud · 4° Básico B',
    estado: 'Válida',
    resumen: 'Control médico con certificado adjunto por el apoderado.',
    respaldo: 'formal',
  },
  {
    alumno: 'Josefa Muñoz',
    detalle: 'Transporte · 4° Básico B',
    estado: 'Dudosa',
    resumen: 'El furgón no pasó por la casa; el apoderado no avisó antes.',
    respaldo: 'débil',
  },
  {
    alumno: 'Martín Soto',
    detalle: 'Familiar · 3° Básico A',
    estado: 'Válida',
    resumen: 'Viaje familiar informado con una semana de anticipación.',
    respaldo: 'no requerida',
  },
];

function Cifra({
  valor,
  palabra,
  alerta,
  objetivo,
}: {
  valor: number;
  palabra: string;
  alerta?: boolean;
  objetivo?: string;
}) {
  return (
    <div data-objetivo={objetivo} className="px-5 py-4">
      <p
        className={cn(
          'text-3xl font-semibold leading-none tabular-nums',
          alerta ? 'text-destructive-700' : 'text-foreground',
        )}
      >
        {valor}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{palabra}</p>
    </div>
  );
}

/**
 * `motivo` / `caso`: esa fila con el color de "pasar el mouse";
 * `generando`: se tocó "Generar un reporte".
 */
export type EstadoReportes = { motivo?: boolean; caso?: boolean; generando?: boolean };

/** La pantalla de Reportes del panel (ReportsView), con lo que encontró el asistente. */
export function PantallaReportes({ estado }: { estado: EstadoReportes }) {
  return (
    <div className="h-full w-full p-8">
      <div className="mx-auto w-full space-y-section-lg">
        <Cabecera
          arte="estadistica"
          titulo="Reportes"
          descripcion="Baja la asistencia en planilla, por alumno, curso, ciclo o el colegio completo."
          accion={
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn(boton, 'h-11 border-border bg-card px-5 text-base text-foreground')}>
                <Sparkles className="mr-2 h-5 w-5" aria-hidden />
                Informe del asistente
              </span>
              <span
                data-objetivo="rep-generar"
                className={cn(
                  boton,
                  'h-11 border-transparent px-5 text-base font-bold text-white transition-colors',
                  estado.generando ? 'bg-primary-700' : 'bg-primary',
                )}
              >
                {estado.generando ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
                ) : (
                  <FileBarChart className="mr-2 h-5 w-5" aria-hidden />
                )}
                {estado.generando ? 'Generando…' : 'Generar un reporte'}
              </span>
            </div>
          }
        />

        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-border pt-6">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                <Sparkles className="h-5 w-5 text-primary-600" aria-hidden />
                Por qué faltan
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Los motivos que el asistente sacó de las conversaciones con los apoderados, en los últimos 30 días.
              </p>
            </div>
            <span className={cn(boton, 'border-border bg-card text-foreground')}>
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
              Actualizar
            </span>
          </div>

          <div className="space-y-6">
            <div
              className="grid grid-cols-4 divide-x divide-border rounded-surface border border-border bg-card"
            >
              <Cifra valor={30} palabra="Casos analizados" />
              <Cifra valor={7} palabra="Los revisa el colegio" />
              <Cifra valor={19} palabra="Cerrados por el asistente" />
              <Cifra valor={4} palabra="Sin respaldo firme" alerta objetivo="rep-sin-respaldo" />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-6">
              <div>
                <h3 className="text-base font-semibold text-foreground">Los motivos que más se repiten</h3>
                <ul className="mt-3 divide-y divide-border border-t border-border">
                  {motivos.map((motivo) => (
                    <li
                      key={motivo.nombre}
                      data-objetivo={motivo.nombre === 'Salud' ? 'rep-motivo-salud' : undefined}
                      className={cn(
                        '-mx-3 rounded-control px-3 py-3 transition-colors duration-200',
                        estado.motivo && motivo.nombre === 'Salud' && 'bg-neutral-100',
                      )}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground">{motivo.nombre}</p>
                        <p className="shrink-0 text-sm tabular-nums text-muted-foreground">
                          <span className="font-semibold text-foreground">{motivo.cantidad}</span> de 30 ·{' '}
                          {motivo.porcentaje}%
                        </p>
                      </div>
                      {(motivo.revisa > 0 || motivo.debil > 0) && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {motivo.revisa > 0 && `${motivo.revisa} los revisa el colegio`}
                          {motivo.revisa > 0 && motivo.debil > 0 && ' · '}
                          {motivo.debil > 0 && (
                            <span className="text-destructive-700">{motivo.debil} con respaldo débil</span>
                          )}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground">Últimos casos</h3>
                <ul className="mt-3 divide-y divide-border border-t border-border">
                  {casos.map((caso) => (
                    <li
                      key={caso.alumno}
                      data-objetivo={caso.alumno === 'Josefa Muñoz' ? 'rep-caso' : undefined}
                      className={cn(
                        '-mx-3 rounded-control px-3 py-3 transition-colors duration-200',
                        estado.caso && caso.alumno === 'Josefa Muñoz' && 'bg-neutral-100',
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">{caso.alumno}</p>
                          <p className="text-xs text-muted-foreground">{caso.detalle}</p>
                        </div>
                        <span className="shrink-0 rounded-pill bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600">
                          {caso.estado}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-sm text-neutral-700">{caso.resumen}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Respaldo: {caso.respaldo}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
