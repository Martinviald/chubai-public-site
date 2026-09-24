import Image from 'next/image';
import {
  ArrowLeft,
  BookMarked,
  Bus,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  Compass,
  Gauge,
  LayoutDashboard,
  LogOut,
  MapPin,
  MoreVertical,
  PanelLeftClose,
  PanelRightClose,
  Radio,
  School,
  Search,
  User,
  Users,
  Wifi,
  XCircle,
  type LucideIcon,
} from 'lucide-react';
import { ModuleArt } from '@/components/ui/module-art';
import { MapaFlota3D } from './MapaFlota3D';
import { MapaFurgon3D } from './MapaFurgon3D';
import { cn } from '@/lib/utils';

// Copia estática del panel del administrador del colegio (rama feat/base-chubai):
// mismo marcado y mismas clases que Sidebar, NavbarPrivate, PageHeader,
// AttendanceTabs, DataTable y el bloque "Tracking escolar en vivo" del
// Dashboard. Los datos son ficticios. Se dibuja a 1280 x 800 y quien lo use lo
// escala para que entre en su caja.

export const PANEL_ANCHO = 1280;
export const PANEL_ALTO = 800;

export type VistaPanel = 'asistencia' | 'transporte' | 'enCurso';

/**
 * Lo que se ve en la vista de transporte: qué filtro del mapa está marcado y si
 * a la derecha va la lista de viajes o la ficha del furgón de Carlos. Lo usa la
 * vista previa animada de la sección de soluciones.
 */
export type EstadoTransporte = { filtro: 'todos' | 'enRuta'; ficha: boolean };

const TRANSPORTE_INICIAL: EstadoTransporte = { filtro: 'todos', ficha: false };

type ItemMenu = { title: string; icon: LucideIcon; subItems?: string[] };

const menu: ItemMenu[] = [
  { title: 'Dashboard', icon: LayoutDashboard },
  { title: 'Usuarios', icon: Users, subItems: [] },
  { title: 'Gestión Escolar', icon: BookMarked, subItems: [] },
  { title: 'Asistencia', icon: CheckCircle, subItems: ['Asistencia', 'Reportes', 'Justificaciones'] },
  { title: 'Transporte', icon: Bus, subItems: [] },
];

const fila = 'flex h-10 w-full items-center gap-3 rounded-control px-3 text-sm transition-colors';

function MenuLateral({ vista }: { vista: VistaPanel }) {
  const asistenciaAbierta = vista === 'asistencia';
  return (
    <aside className="flex h-full w-sidebar shrink-0 flex-col border-r border-primary-950 bg-primary-950 text-white/70">
      <div className="relative border-b border-white/10 px-4 pb-5 pt-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-white">
            <Image src="/landing/chubai-logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-semibold leading-tight text-white">Chubai</p>
            <p className="truncate text-xs leading-tight text-white/60">Colegio Ejemplo</p>
          </div>
        </div>
        <span className="absolute -right-3.5 top-6 grid h-7 w-7 place-items-center rounded-pill border border-white/20 bg-white text-primary-950 shadow-sm">
          <PanelLeftClose className="h-4 w-4" aria-hidden />
        </span>
      </div>

      <nav className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <ul className="space-y-0.5">
          {menu.map((item) => {
            const Icon = item.icon;
            const esGrupo = Boolean(item.subItems);
            const activo =
              vista === 'transporte'
                ? item.title === 'Dashboard'
                : vista === 'enCurso'
                  ? item.title === 'Transporte'
                  : item.title === 'Asistencia';
            const abierto = asistenciaAbierta && item.title === 'Asistencia';
            return (
              <li key={item.title}>
                <span
                  className={cn(
                    fila,
                    activo
                      ? esGrupo
                        ? 'font-semibold text-white'
                        : 'bg-white/[0.12] font-semibold text-white'
                      : 'text-white/70',
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0', activo ? 'text-white' : 'text-white/60')} aria-hidden />
                  <span className="flex-1 truncate text-left">{item.title}</span>
                  {esGrupo && (
                    <ChevronDown className={cn('h-4 w-4 shrink-0 text-white/40', abierto && 'rotate-180')} aria-hidden />
                  )}
                </span>
                {abierto && (
                  <ul className="mb-1 ml-[1.375rem] mt-0.5 space-y-0.5 border-l border-white/15 pl-4">
                    {item.subItems!.map((sub, index) => (
                      <li key={sub} className="relative">
                        {index === 0 && (
                          <span className="absolute -left-[1.3125rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-pill bg-white ring-4 ring-primary-950" />
                        )}
                        <span
                          className={cn(
                            'flex h-8 items-center gap-2.5 rounded-control px-3 text-[13px]',
                            index === 0 ? 'font-semibold text-white' : 'text-white/70',
                          )}
                        >
                          {sub}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <span className="flex h-10 w-full items-center gap-3 rounded-control px-3 text-sm text-white/70">
          <LogOut className="h-5 w-5 shrink-0" aria-hidden />
          <span>Cerrar sesión</span>
        </span>
      </div>
    </aside>
  );
}

function BarraSuperior() {
  return (
    <div className="flex h-navbar shrink-0 items-center justify-end gap-2 border-b border-border bg-white px-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-control text-neutral-600">
        <Compass className="h-5 w-5" aria-hidden />
      </span>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-control text-neutral-600">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-pill bg-destructive px-1 text-[10px] font-semibold leading-none text-white">
          2
        </span>
      </span>
      <span className="flex items-center rounded-pill p-0.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
          CR
        </span>
      </span>
    </div>
  );
}

function Encabezado({
  arte,
  titulo,
  descripcion,
  accion,
}: {
  arte: 'libreta' | 'inicio';
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

// ---------- Asistencia por curso ----------

const cursos = [
  { letra: 'A', nombre: '1° Básico A', nivel: '1° Básico', jefe: 'Ana González', total: 30, p: 29, a: 0, f: 1, lista: '8:05' },
  { letra: 'B', nombre: '1° Básico B', nivel: '1° Básico', jefe: 'Luis Vargas', total: 31, p: 27, a: 2, f: 2, lista: '8:07' },
  { letra: 'A', nombre: '2° Básico A', nivel: '2° Básico', jefe: 'María Fernández', total: 33, p: 30, a: 1, f: 2, lista: '8:10' },
  { letra: 'A', nombre: '3° Básico A', nivel: '3° Básico', jefe: 'Pedro Soto', total: 32, p: 25, a: 2, f: 5, lista: '8:12' },
  { letra: 'B', nombre: '4° Básico B', nivel: '4° Básico', jefe: 'Carolina Muñoz', total: 29, p: 21, a: 2, f: 6, lista: '8:15' },
  { letra: 'A', nombre: '5° Básico A', nivel: '5° Básico', jefe: null, total: 34, p: 0, a: 0, f: 0, lista: null },
];

/** Verde, naranja o rojo según qué tan lejos está del 90% que pide el colegio. */
const colorDeTasa = (rate: number) => {
  if (rate >= 90) return 'bg-success-50 text-success-700';
  if (rate >= 80) return 'bg-[#FFF7ED] text-[#B45309]';
  return 'bg-destructive-50 text-destructive-700';
};

/** `filaActiva`: 4° Básico B con el color de "pasar el mouse" del panel. */
export function VistaAsistencia({ filaActiva = false }: { filaActiva?: boolean }) {
  return (
    <div className="mx-auto w-full space-y-section-lg">
      <Encabezado
        arte="libreta"
        titulo="Asistencia por curso"
        descripcion="martes 22 de septiembre · 10 de 12 cursos pasaron lista"
      />

      <div className="-mt-3">
        <nav className="flex gap-1 border-b border-border">
          {['Resumen', 'Por curso', 'Por estudiante'].map((label) => (
            <span
              key={label}
              className={cn(
                '-mb-px whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium',
                label === 'Por curso' ? 'border-primary text-primary-700' : 'border-transparent text-neutral-600',
              )}
            >
              {label}
            </span>
          ))}
        </nav>
        <p className="mt-3 text-sm text-muted-foreground">La asistencia de cada curso, con su profesor jefe.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="relative flex w-full max-w-md items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-400" aria-hidden />
            <span className="flex h-10 w-full items-center rounded-control border border-input bg-background pl-9 pr-3 text-sm text-neutral-400 shadow-sm">
              Buscar por curso o letra
            </span>
          </div>
          <p className="shrink-0 text-sm tabular-nums text-neutral-700">
            Mostrando <span className="font-semibold text-foreground">6</span> de 12 cursos
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-medium text-foreground">Filtrar por</span>
          <span className="inline-flex h-9 items-center gap-2 rounded-pill border border-primary-200 bg-primary-50 px-3 text-sm font-medium text-primary-800">
            <CalendarDays className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
            Hoy
          </span>
          {[
            ['Estado', 'Todos'],
            ['Nivel', 'todos'],
          ].map(([label, valor]) => (
            <span
              key={label}
              className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-border bg-card px-3.5 text-sm text-neutral-700"
            >
              <span>
                {label}: <span className="font-medium">{valor}</span>
              </span>
              <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-control border border-border bg-card">
        <table className="w-full">
          <thead className="bg-neutral-50 text-left text-[13px] font-medium text-muted-foreground">
            <tr>
              {['Curso', 'Profesor jefe', 'Estudiantes', 'Presentes', 'Atrasados', 'Ausentes', 'Asistencia', 'Lista de hoy', ''].map(
                (header, index) => (
                  <th key={index} scope="col" className="px-4 py-3 font-medium">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => {
              const tasa = curso.total ? ((curso.p + curso.a) / curso.total) * 100 : 0;
              const celda = 'px-4 py-3 text-sm tabular-nums text-neutral-700';
              return (
                <tr
                  key={curso.nombre}
                  className={cn(
                    'border-t border-border transition-colors duration-200',
                    filaActiva && curso.nombre === '4° Básico B' ? 'bg-neutral-100' : 'bg-card',
                  )}
                >
                  <td className={celda}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-neutral-100 text-sm font-semibold text-neutral-700">
                        {curso.letra}
                      </span>
                      <span className="min-w-0">
                        <span
                          data-objetivo={curso.nombre === '4° Básico B' ? 'curso-4b' : undefined}
                          className="block truncate font-medium text-foreground"
                        >
                          {curso.nombre}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">{curso.nivel}</span>
                      </span>
                    </div>
                  </td>
                  <td className={celda}>{curso.jefe ?? <span className="text-muted-foreground">Sin asignar</span>}</td>
                  <td className={celda}>{curso.total}</td>
                  <td className={celda}>{curso.lista ? curso.p : '—'}</td>
                  <td className={celda}>{curso.lista ? curso.a : '—'}</td>
                  <td className={celda}>{curso.lista ? curso.f : '—'}</td>
                  <td className={celda}>
                    {curso.lista ? (
                      <span className={cn('inline-flex whitespace-nowrap rounded-pill px-2.5 py-1 text-xs font-semibold tabular-nums', colorDeTasa(tasa))}>
                        {tasa.toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className={cn(celda, 'whitespace-nowrap text-muted-foreground')}>
                    {curso.lista ? `Tomada ${curso.lista}` : 'Sin tomar'}
                  </td>
                  <td className="px-2 py-3 text-right">
                    <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Dashboard: Tracking escolar en vivo ----------

const ESTADOS = {
  enRuta: { short: 'En ruta', color: '#16A34A' },
  retraso: { short: 'Con retraso', color: '#6B7280' },
  sinSenal: { short: 'Sin señal', color: '#DC2626' },
};

const viajes = [
  { conductor: 'Carlos Muñoz', patente: 'AABB11', estado: ESTADOS.enRuta, aBordo: '12 de 14', salio: '7:12', kmh: 32 },
  { conductor: 'Jorge Díaz', patente: 'CDXY22', estado: ESTADOS.enRuta, aBordo: '14 de 14', salio: '7:05', kmh: 28 },
  { conductor: 'Marta Rojas', patente: 'GHKL33', estado: ESTADOS.retraso, aBordo: '9 de 13', salio: '7:20', kmh: 18 },
];

function Cifra({ valor, total, palabra }: { valor: number; total: number; palabra: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-surface border border-border bg-card px-5 py-4">
      <div>
        <p className="leading-none tabular-nums">
          <span className="text-3xl font-semibold tracking-tight text-foreground">{valor}</span>
          <span className="text-lg font-medium text-muted-foreground">/{total}</span>
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{palabra}</p>
      </div>
      <span className="relative mr-1 inline-flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-pill bg-success opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-pill bg-success" />
      </span>
    </div>
  );
}

// Ficha del furgón: mismo marcado que TripDetailDrawer del panel.
const alumnosCarlos = [
  { nombre: 'Isabella López', estado: 'aBordo' },
  { nombre: 'Benjamín Morales', estado: 'aBordo' },
  { nombre: 'Mateo González', estado: 'bajo' },
  { nombre: 'Lucía Jiménez', estado: 'ausente' },
  { nombre: 'Amanda Vargas', estado: 'aBordo' },
  { nombre: 'Sofía Martínez', estado: 'pendiente' },
] as const;

const ESTADO_ALUMNO = {
  aBordo: { label: 'A bordo', icon: CheckCircle2, className: 'text-success-700' },
  bajo: { label: 'Bajó', icon: CheckCircle2, className: 'text-primary-700' },
  ausente: { label: 'Ausente', icon: XCircle, className: 'text-destructive-700' },
  pendiente: { label: 'Pendiente', icon: Circle, className: 'text-neutral-400' },
};

function Dato({ icon: Icono, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Icono className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
        {label}
      </dt>
      <dd className="mt-0.5 pl-[22px] text-sm text-neutral-700">{children}</dd>
    </div>
  );
}

function FichaFurgon() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <ArrowLeft className="-ml-0.5 h-5 w-5 text-neutral-500" aria-hidden />
        <span className="text-sm text-muted-foreground">Ficha del furgón</span>
        <span className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ESTADOS.enRuta.color }} aria-hidden />
          {ESTADOS.enRuta.short}
        </span>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden px-4 py-3">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-neutral-100 text-neutral-700">
            <User className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-semibold text-foreground">Carlos Muñoz</p>
            <p className="flex items-center gap-1.5 text-sm text-neutral-700">
              <Bus className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden />
              <span className="truncate">Mercedes Sprinter</span>
              <span className="font-mono text-neutral-700">AABB11</span>
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-x-3 rounded-control bg-neutral-50 px-3 py-3">
          <Dato icon={Gauge} label="Velocidad">
            <span className="tabular-nums">32 km/h</span>
          </Dato>
          <Dato icon={Users} label="A bordo">
            <span className="tabular-nums">
              12<span className="text-muted-foreground"> de 14</span>
            </span>
          </Dato>
          <Dato icon={Radio} label="Señal">
            hace 3 s
          </Dato>
        </dl>

        <dl className="grid grid-cols-2 gap-x-3">
          <Dato icon={Clock} label="Salió">
            <span className="tabular-nums">7:12</span>
            <span className="text-muted-foreground"> · hace 18 min</span>
          </Dato>
          <Dato icon={School} label="Colegio">
            Colegio Ejemplo
          </Dato>
        </dl>

        <div data-objetivo="ficha-alumnos">
          <div className="flex items-baseline justify-between gap-3">
            <p className="flex items-center gap-1.5 text-base font-semibold text-foreground">
              <Users className="h-4 w-4 text-neutral-500" aria-hidden />
              Alumnos
            </p>
            <p className="text-sm tabular-nums text-muted-foreground">12 a bordo · 14 en total</p>
          </div>
          <ul className="mt-1 divide-y divide-border">
            {alumnosCarlos.map((alumno) => {
              const info = ESTADO_ALUMNO[alumno.estado];
              const Icono = info.icon;
              return (
                <li key={alumno.nombre} className="flex items-center gap-2.5 py-1.5 text-sm">
                  <Icono className={cn('h-4 w-4 shrink-0', info.className)} aria-hidden />
                  <span className="flex-1 truncate text-foreground">{alumno.nombre}</span>
                  <span className={cn('shrink-0 text-sm', info.className)}>{info.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function VistaTransporte({ estado = TRANSPORTE_INICIAL }: { estado?: EstadoTransporte }) {
  const soloEnRuta = estado.filtro === 'enRuta';
  const lista = soloEnRuta ? viajes.filter((viaje) => viaje.estado === ESTADOS.enRuta) : viajes;
  return (
    <div className="mx-auto w-full space-y-section-lg">
      <Encabezado
        arte="inicio"
        titulo="Colegio Ejemplo"
        descripcion="RBD 12345-6 · Ñuñoa, Santiago"
        accion={
          <span className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-control border border-transparent bg-primary px-6 text-base font-bold leading-none text-white">
            <MapPin className="mr-2 h-5 w-5" aria-hidden />
            Abrir Viajes en curso
          </span>
        }
      />

      <section data-recorte className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold text-foreground">Tracking escolar en vivo</h2>
          <span className="inline-flex items-center gap-1.5 text-sm text-success-700">
            <Wifi className="h-4 w-4" aria-hidden />
            En vivo
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Cifra valor={3} total={4} palabra="Viajes" />
          <Cifra valor={3} total={3} palabra="Choferes" />
          <Cifra valor={35} total={41} palabra="Alumnos" />
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_22rem] gap-4">
          <div className="relative h-[27rem] overflow-hidden rounded-surface border border-border bg-card">
            <MapaFurgon3D />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {[
                { label: 'Todos', count: 3, activo: !soloEnRuta },
                {
                  label: ESTADOS.enRuta.short,
                  count: 2,
                  color: ESTADOS.enRuta.color,
                  activo: soloEnRuta,
                  objetivo: 'filtro-enruta',
                },
                { label: ESTADOS.retraso.short, count: 1, color: ESTADOS.retraso.color },
                { label: ESTADOS.sinSenal.short, count: 0, color: '#D1D5DB' },
              ].map((opcion) => (
                <span
                  key={opcion.label}
                  data-objetivo={opcion.objetivo}
                  className={cn(
                    'inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-pill border pl-2.5 pr-2 text-sm font-medium shadow-lg',
                    opcion.activo ? 'border-foreground bg-foreground text-white' : 'border-border bg-card text-foreground',
                    opcion.count === 0 && 'text-neutral-500',
                  )}
                >
                  {opcion.color && (
                    <span className="h-2 w-2 shrink-0 rounded-full ring-2 ring-white/70" style={{ backgroundColor: opcion.color }} />
                  )}
                  {opcion.label}
                  <span
                    className={cn(
                      'inline-flex h-5 min-w-5 items-center justify-center rounded-pill px-1.5 text-xs tabular-nums',
                      opcion.activo ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-700',
                    )}
                  >
                    {opcion.count}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex h-[27rem] flex-col overflow-hidden rounded-surface border border-border bg-card">
            {estado.ficha ? (
              <FichaFurgon />
            ) : (
              <>
            <p className="border-b border-border px-5 py-3 text-sm font-semibold text-foreground">
              Viajes activos
              <span className="ml-1.5 font-normal tabular-nums text-muted-foreground">{lista.length}</span>
            </p>
            <ul className="min-h-0 flex-1 divide-y divide-border">
              {lista.map((viaje) => (
                <li
                  key={viaje.patente}
                  data-objetivo={viaje.patente === 'AABB11' ? 'viaje-carlos' : undefined}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-pill ring-2 ring-white/70" style={{ backgroundColor: viaje.estado.color }} />
                      <span className="truncate text-sm font-semibold text-foreground">{viaje.conductor}</span>
                      <span className="font-mono text-xs text-muted-foreground">{viaje.patente}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {viaje.estado.short} · {viaje.aBordo} a bordo · salió {viaje.salio} · {viaje.kmh} km/h
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden />
                </li>
              ))}
            </ul>
            <span className="border-t border-border px-5 py-3 text-sm font-medium text-primary-700">Abrir Viajes en curso</span>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Transporte: Viajes en curso ----------
// Mismo marcado que LiveMapPanel (variante 'fullscreen'), FleetStatusBar
// ('pills') y LiveMapSidebar: el mapa ocupa el módulo y a la derecha va un solo
// panel con la cabecera, los estados, el buscador y la lista (o la ficha).

type ViajeEnCurso = {
  conductor: string;
  patente: string;
  color: string;
  texto: string;
  aBordo: number;
  vivo?: boolean;
  aviso?: boolean;
  alerta?: boolean;
};

// Los ocho furgones del mapa de la flota (MapaFlota3D).
const viajesEnCurso: ViajeEnCurso[] = [
  { conductor: 'Carlos Muñoz', patente: 'AABB11', color: '#16A34A', texto: 'En ruta · 32 km/h', aBordo: 12, vivo: true },
  { conductor: 'Jorge Díaz', patente: 'CDXY22', color: '#16A34A', texto: 'En ruta · 28 km/h', aBordo: 14, vivo: true },
  { conductor: 'Paula Soto', patente: 'FJRT45', color: '#16A34A', texto: 'En ruta · 24 km/h', aBordo: 10, vivo: true },
  { conductor: 'Marta Rojas', patente: 'GHKL33', color: '#6B7280', texto: 'Reporte atrasado 2 min', aBordo: 9, aviso: true },
  { conductor: 'Andrés Pérez', patente: 'HPLW61', color: '#16A34A', texto: 'En ruta · 35 km/h', aBordo: 11, vivo: true },
  { conductor: 'Camila Reyes', patente: 'KSTB27', color: '#16A34A', texto: 'En ruta · 19 km/h', aBordo: 13, vivo: true },
  { conductor: 'Rodrigo Silva', patente: 'LMNX83', color: '#DC2626', texto: 'Sin señal hace 6 min', aBordo: 8, alerta: true },
  { conductor: 'Valeria Núñez', patente: 'PRCZ19', color: '#16A34A', texto: 'En ruta · 27 km/h', aBordo: 12, vivo: true },
];

/**
 * La pantalla "Viajes en curso". Llena la caja que la contiene: la vista previa
 * de la sección de soluciones la dibuja más ancha que el panel, así el mapa de
 * la flota ocupa todo el ancho sin estirarse.
 */
export function VistaViajesEnCurso({
  estado = TRANSPORTE_INICIAL,
  rellenoMapa = 0,
}: {
  estado?: EstadoTransporte;
  /** Píxeles del mapa, desde la izquierda, que quedan bajo el texto de la sección. */
  rellenoMapa?: number;
}) {
  const soloEnRuta = estado.filtro === 'enRuta';
  const lista = soloEnRuta ? viajesEnCurso.filter((viaje) => viaje.vivo) : viajesEnCurso;
  const pastillas = [
    { label: 'Todos', count: 8, activo: !soloEnRuta },
    { label: 'En ruta', count: 6, color: '#16A34A', activo: soloEnRuta, objetivo: 'filtro-enruta' },
    { label: 'Con retraso', count: 1, color: '#6B7280' },
    { label: 'Sin señal', count: 1, color: '#DC2626' },
  ];

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="relative min-w-0 flex-1">
        <MapaFlota3D rellenoIzquierdo={rellenoMapa} />
      </div>

      <aside className="relative flex w-[420px] shrink-0 flex-col border-l border-border bg-card">
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          <ModuleArt name="enCurso" className="shrink-0" />
          <h1 className="min-w-0 flex-1 truncate text-xl font-semibold text-foreground">Viajes en curso</h1>
          <span className="flex h-10 w-10 items-center justify-center rounded-control text-neutral-500">
            <PanelRightClose className="h-5 w-5" aria-hidden />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-control text-neutral-500">
            <MoreVertical className="h-5 w-5" aria-hidden />
          </span>
        </div>

        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {pastillas.map((opcion) => {
              const vacio = opcion.count === 0;
              return (
                <span
                  key={opcion.label}
                  data-objetivo={opcion.objetivo}
                  className={cn(
                    'inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-pill border pl-2.5 pr-2 text-sm font-medium transition-colors',
                    opcion.activo
                      ? 'border-foreground bg-foreground text-white'
                      : cn('border-border bg-card text-foreground', vacio && 'text-neutral-500'),
                  )}
                >
                  {opcion.color && (
                    <span
                      className="h-2 w-2 shrink-0 rounded-full ring-2 ring-white/70"
                      style={{ backgroundColor: vacio && !opcion.activo ? '#D1D5DB' : opcion.color }}
                      aria-hidden
                    />
                  )}
                  {opcion.label}
                  <span
                    className={cn(
                      'inline-flex h-5 min-w-5 items-center justify-center rounded-pill px-1.5 text-xs tabular-nums',
                      opcion.activo ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-700',
                    )}
                  >
                    {opcion.count}
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        {estado.ficha ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-border">
            <FichaFurgon />
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="px-4 pb-3 pt-1">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                  aria-hidden
                />
                <span className="flex h-10 w-full items-center rounded-control border border-input bg-background pl-9 pr-3 text-sm text-neutral-400 shadow-sm">
                  Buscar patente o conductor
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden border-t border-border">
              {lista.map((viaje) => (
                <div
                  key={viaje.patente}
                  data-objetivo={viaje.patente === 'AABB11' ? 'viaje-carlos' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left',
                    viaje.aviso && 'bg-neutral-100',
                    viaje.alerta && 'bg-destructive-50',
                  )}
                >
                  <span className="relative shrink-0">
                    <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: viaje.color }} />
                    {viaje.vivo && (
                      <span
                        className="absolute inset-0 animate-ping rounded-full opacity-60"
                        style={{ backgroundColor: viaje.color }}
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base text-foreground">
                      <span className="font-semibold">{viaje.conductor}</span>
                      <span className="text-muted-foreground"> · </span>
                      <span className="font-mono text-sm text-neutral-700">{viaje.patente}</span>
                    </span>
                    <span
                      className={cn(
                        'block truncate text-sm text-neutral-700',
                        viaje.aviso && 'font-medium',
                        viaje.alerta && 'font-medium text-destructive-700',
                      )}
                    >
                      {viaje.texto}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm tabular-nums text-foreground">{viaje.aBordo} a bordo</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 text-sm">
              <span className="flex items-center gap-1.5 text-success-700">
                <Wifi className="h-4 w-4" aria-hidden />
                En vivo<span className="text-muted-foreground"> · hace 3 s</span>
              </span>
              <span className="text-muted-foreground">Se actualiza cada 30 s</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

/** El panel completo a 1280 x 800: menú lateral, barra superior y la pantalla. */
export function PanelClon({ vista, transporte }: { vista: VistaPanel; transporte?: EstadoTransporte }) {
  return (
    <div className="flex bg-neutral-50 text-left font-sans" style={{ width: PANEL_ANCHO, height: PANEL_ALTO }}>
      <MenuLateral vista={vista} />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraSuperior />
        <main
          className={cn('min-h-0 flex-1 overflow-hidden bg-neutral-50', vista !== 'enCurso' && 'p-8')}
          data-panel-contenido
        >
          {vista === 'asistencia' ? (
            <VistaAsistencia />
          ) : vista === 'enCurso' ? (
            <VistaViajesEnCurso estado={transporte} />
          ) : (
            <VistaTransporte estado={transporte} />
          )}
        </main>
      </div>
    </div>
  );
}
