import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';

/**
 * Ilustraciones a color de cada módulo, en el estilo de `svg-assets/studio`.
 *
 * LA RECETA, sacada de mirar las piezas del set (studio/body/coffee.svg,
 * device.svg, macbook.svg son las que dibujan objetos):
 *
 *  1. Cada pieza son 3–4 capas: primero BLOQUES DE COLOR PLANO, y encima UN
 *     SOLO path NEGRO con todo el trazo.
 *  2. El trazo negro no es un `stroke`: es una forma RELLENA. Por eso la línea
 *     engorda y adelgaza como la de un pincel, cosa que un `stroke-width` fijo
 *     no puede hacer.
 *  3. Los contornos se arman como anillo (borde exterior + borde interior en
 *     el mismo path) y se vacían con `fill-rule="evenodd"` — la regla §4.4 del
 *     DISENO.md: nada de tapar huecos con blanco opaco.
 *  4. Nada de simetría perfecta ni de radios iguales: las curvas van con
 *     control points despareados y el conjunto va levemente inclinado.
 *  5. Paleta cerrada, la que ya usan los archivos de `studio/`.
 *
 * A diferencia de `module-icon.tsx` (monocromo, hereda `currentColor`), estas
 * llevan color propio y no cambian con el tema.
 */

/** Los colores exactos que aparecen en svg-assets/studio. */
export const C = {
  negro: '#000000',
  blanco: '#FFFFFF',
  amarillo: '#FDEA6B',
  verde: '#78E185',
  durazno: '#FFCF77',
  rosa: '#EC7495',
  celeste: '#9DDADB',
  azul: '#9FD8E5',
  lavanda: '#C6C7FF',
  morado: '#BA98DE',
  piel: '#D08B5B',
  // Los verdes de Excel. No son del set de svg-assets: están solo para que
  // el dibujo de la planilla se reconozca como un archivo de Excel y no como
  // "una hoja verde" (Luis, 07-09-2026).
  excel: '#107C41',
  excelClaro: '#33C481',
  // Rojo de borrar. Tampoco es del set: el rosa del set no se leía como
  // "eliminar" y Luis pidió rojo (08-09-2026).
  rojo: '#EF4444',
} as const;

/**
 * Azules de la marca (primary del tailwind.config), para la pincelada de
 * fondo. No salen de la paleta de svg-assets: esa es de las ilustraciones,
 * y el fondo tiene que ser del producto.
 */
const MARCA = {
  claro: '#BFDBFE', // primary-200 — la pasada ancha
  medio: '#93C5FD', // primary-300 — el cuerpo del trazo
  fibra: '#60A5FA', // primary-400 — las cerdas, el tono que las hace visibles
} as const;

export type NombreArteModulo =
  | 'asistencia'
  | 'estudiantes'
  | 'cursos'
  | 'revisar'
  | 'justificaciones'
  // Módulo de transporte del panel de administración.
  | 'transporte'
  | 'enCurso'
  | 'viajes'
  | 'conductores'
  | 'historial'
  // La ficha de un viaje del historial: el mapa desplegado con el recorrido y
  // el reloj (Luis, 08-09-2026; antes usaba la hoja con reloj de `historial`).
  | 'recorrido'
  // Exportar viajes: la planilla de Excel con la insignia de descarga.
  | 'exportar'
  // Avisos: salió bien (visto verde) o falló (equis roja). Van en el
  // mensaje flotante de cada guardado, descarga o borrado (Luis, 08-09-2026).
  | 'listo'
  | 'fallo'
  // Confirmar un borrado: la papelera.
  | 'papelera'
  // El Inicio del colegio: el edificio con su bandera.
  | 'inicio'
  // Ajustes: el engranaje (cabecera) y sus tres tarjetas: la campana de
  // notificaciones, los bloques de módulos y las capas de ciclos
  // (Luis, 08-09-2026).
  | 'ajustes'
  | 'campana'
  | 'modulos'
  | 'ciclos'
  // Asignaturas: los tres lápices de colores. El color ES el dato de una
  // asignatura (es con lo que se pinta el horario), así que el dibujo son
  // lápices y no otro libro, que ya lo usa Cursos (Luis, 09-09-2026).
  | 'asignaturas'
  // Horarios: la grilla de la semana con sus bloques de color.
  | 'horarios'
  // Calendario académico: la hoja colgada de sus dos anillas, con un día
  // pintado. Es el feriado, que es de lo que trata la pantalla.
  | 'calendario'
  // El historial de asistencia de alguien: la hoja con las barras y el visto.
  // No es "un estudiante" (eso ya lo dice el nombre en el título), es lo que
  // la pantalla muestra: cómo viene asistiendo (Luis, 09-09-2026).
  | 'estadistica'
  // Estudiantes con baja asistencia: la misma hoja de `estadistica`, pero con
  // las barras bajando y la insignia roja con la flecha hacia abajo en vez del
  // visto. Es la pantalla de los que vienen faltando (11-09-2026).
  | 'bajaAsistencia'
  // El historial por curso: la libreta de clases con su espiral y la lista de
  // días pasados, cada uno con su marca.
  | 'libreta'
  // Personas del colegio, en el panel de administración.
  | 'apoderados'
  | 'funcionarios'
  // Diálogos del módulo de estudiantes: cargar un Excel, ver la ficha,
  // editar, crear.
  | 'planilla'
  // La misma hoja de `planilla` pero con el cartel "CSV": el importador de
  // horarios recibe CSV, no un .xlsx, y la X de Excel prometía otra cosa
  // (Luis, 09-09-2026).
  | 'csv'
  | 'ficha'
  | 'lapiz'
  | 'nuevo'
  // "Crear" con la persona del módulo: el mismo busto de cada uno, con la
  // insignia del más. Un solo dibujo para los cuatro no decía a quién se
  // creaba (Luis, 07-09-2026).
  | 'nuevoEstudiante'
  | 'nuevoApoderado'
  | 'nuevoFuncionario'
  | 'nuevoConductor'
  // "Agregar" cosas que no son personas: un documento, un vehículo.
  | 'nuevoDocumento'
  | 'nuevoVehiculo';

/**
 * La insignia del "más", pisando el hombro derecho de la figura. Es lo que
 * distingue a los dibujos de "crear" de los de cada módulo.
 */
const INSIGNIA_MAS = (
  <g>
    <path d="M196 148c26 0 46 20 46 46s-20 46-46 46-46-20-46-46 20-46 46-46Z" fill={C.verde} />
    <path
      fillRule="evenodd"
      fill={C.negro}
      d="
        M196 148c26 0 46 20 46 46s-20 46-46 46-46-20-46-46 20-46 46-46Z
        M196 157c21 0 37 16 37 37s-16 37-37 37-37-16-37-37 16-37 37-37Z
        M190 170h12v18h18v12h-18v18h-12v-18h-18v-12h18Z
      "
    />
  </g>
);

/**
 * La pincelada de fondo, igual para todos los módulos: es la firma del
 * producto, no del módulo. Va PRIMERO, detrás de todo, con su propia
 * inclinación — si girara junto al objeto se leería como un marco y no como
 * un brochazo suelto.
 */
export const PINCELADA = (
  <g transform="translate(128 146) rotate(-19) scale(1.3) translate(-128 -138)">
    {/* La pasada ancha, el tono más claro. */}
    <path
      fill={MARCA.claro}
      d="M-14 150c6-19 24-33 50-42 30-11 70-18 112-19 32-1 62 2 84 10 14 5 24 13 25 22 1 7-5 13-15 18 13 3 21 9 21 16-1 11-16 20-38 26-30 8-70 13-110 13-38 0-72-4-95-12-19-6-30-15-31-25 0-6 4-11 11-15-9-3-14-8-14-14Z"
    />
    {/* Cuerpo del trazo, un tono más subido y más angosto: es lo que hace que
        el borde no sea una sola masa plana. */}
    <path
      fill={MARCA.medio}
      d="M-6 148c8-15 26-26 50-33 30-9 68-14 106-14 28 0 54 3 72 9-14 6-38 10-70 12-42 3-84 6-116 12-20 4-34 9-42 14Z"
    />

    {/* ── Las cerdas ──
        Cada una es una lengüeta larga y afinada en las puntas, separadas por
        huecos y con los extremos SIN alinear: si empezaran y terminaran a la
        misma altura se leerían como rayas de una regla. Son lo que evidencia
        que pasó un pincel y no un rodillo. */}
    <path fill={MARCA.fibra} d="M6 128c34-10 84-16 132-15 30 1 56 4 74 9-18 5-46 8-80 8-46 1-92 2-126 5Z" />
    <path fill={MARCA.fibra} d="M2 146c30-8 74-13 118-13 26 0 50 2 66 6-16 4-40 7-70 7-42 1-84 1-114 3Z" />
    <path fill={MARCA.fibra} d="M20 164c26-6 62-9 98-9 22 0 42 1 56 4-14 3-34 5-58 6-36 1-72 0-96 2Z" />

    {/* Cola seca: el pincel se queda sin pintura y suelta trozos. */}
    <path fill={MARCA.fibra} d="M214 132c10 0 18 1 23 3-5 2-13 3-23 3-6 0-9-6 0-6Z" />
    <path fill={MARCA.fibra} d="M222 156c8 0 14 1 18 3-4 2-10 3-18 3-5 0-7-6 0-6Z" />
    <path fill={MARCA.medio} d="M244 144c5 0 9 1 11 2-2 1-6 2-11 2-3 0-4-4 0-4Z" />
  </g>
);

const DIBUJOS: Record<NombreArteModulo, ReactElement> = {
  /**
   * Asistencia: la tabla con la lista del día. Los tres renglones llevan los
   * mismos colores que los estados de la pantalla — verde presente, durazno
   * atrasado, rosa ausente — para que el dibujo hable de lo que hay adentro.
   */
  asistencia: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}

      {/* ── Capas de color plano ── */}
      {/* Tabla */}
      <path
        d="M54 72c0-14 10-25 24-26 34-3 74-3 108 0 13 1 22 12 22 26 2 46 2 98-1 140 0 13-10 24-23 25-33 3-75 3-108 0-13-1-23-11-23-24-3-43-3-95-1-141Z"
        fill={C.celeste}
      />
      {/* Hoja */}
      <path
        d="M72 82c0-8 5-13 13-14 29-2 63-2 92 0 8 1 12 6 12 14 2 40 2 86 0 124 0 8-5 13-13 14-29 2-62 2-91 0-8-1-13-6-13-14-2-38-2-84-0-124Z"
        fill={C.blanco}
      />
      {/* Marcas de estado. La primera es un CHECK y no un cuadrado: es lo que
          hace que el dibujo se lea como "lista tomada" y no como una tabla
          cualquiera con colores. Va dibujado como forma rellena, con las
          puntas afinadas, igual que el resto del set. */}
      {/* Escalado al 72% sobre su propio centro: a tamaño completo el check
          llegaba hasta x≈117 —donde empiezan las líneas— y por abajo rozaba
          la fila siguiente. Reducido, cada marca queda dentro de su renglón. */}
      <g transform="translate(96 100) scale(0.72) translate(-96 -100)">
        <path d="M78 97c3-5 9-5 13-1l7 8 15-21c4-5 11-4 14 1 3 5 2 10-2 14l-21 28c-3 4-10 4-13 0l-12-16c-3-4-3-9-1-13Z" fill={C.verde} />
      </g>
      <path d="M80 136c0-6 4-10 10-11 4 0 8 0 11 1 5 1 8 5 8 10 0 4 0 8-1 11-1 5-5 8-10 8-4 0-8-1-11-2-4-2-7-6-7-11 0-2 0-4 0-6Z" fill={C.durazno} />
      <path d="M80 176c0-6 4-10 10-11 4 0 8 0 11 1 5 1 8 5 8 10 0 4 0 8-1 11-1 5-5 8-10 8-4 0-8-1-11-2-4-2-7-6-7-11 0-2 0-4 0-6Z" fill={C.rosa} />

      {/* ── Trazo: un solo path negro, huecos por par-impar ── */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M54 72c0-14 10-25 24-26 34-3 74-3 108 0 13 1 22 12 22 26 2 46 2 98-1 140 0 13-10 24-23 25-33 3-75 3-108 0-13-1-23-11-23-24-3-43-3-95-1-141Z
          M67 74c-2 45-2 96 1 138 0 7 5 12 12 13 32 3 73 3 105 0 7-1 12-6 12-14 3-41 3-92 1-137 0-8-5-13-12-14-33-3-72-3-105 0-8 1-14 6-14 14Z

          M100 26c0-5 4-9 10-9 12-1 25-1 37 0 6 0 10 4 10 9 1 8 1 17 0 25 0 5-4 9-10 9-12 1-25 1-37 0-6 0-10-4-10-9-1-8-1-17 0-25Z

          M124 96c16-2 32-2 48 0 5 0 6 8 1 9-16 2-33 2-49 0-5-1-5-8 0-9Z
          M124 136c12-2 24-2 36 0 5 0 6 8 1 9-12 2-26 2-38 0-5-1-4-8 1-9Z
          M124 176c14-2 28-2 42 0 5 0 6 8 1 9-14 2-30 2-44 0-5-1-4-8 1-9Z
        "
      />
    </g>
  ),
  /**
   * Estudiantes: dos personas, del set de bustos de la librería. El de atrás
   * va más chico y descentrado — dos figuras del mismo tamaño y alineadas se
   * leen como un icono de "usuarios", no como un curso.
   */
  estudiantes: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* ── ORDEN DE PINTADO: una capa COMPLETA por figura ──
          Cada persona lleva su color Y su trazo juntos, y la de adelante se
          pinta encima de la de atrás: así su relleno tapa el contorno de la
          otra y se ve quién está delante.

          Un solo path negro para las dos NO sirve: con `fill-rule="evenodd"`,
          donde los dos contornos se cruzan el relleno se cancela y las
          figuras se funden en una sola mancha. Es la misma regla §4.4 del
          DISENO.md, pero aplicada entre piezas. */}

      {/* Persona de atrás: más chica y descentrada — dos figuras iguales y
          alineadas se leen como un icono de "usuarios", no como un curso.
          Va con pelo largo y la de adelante con pelo corto: dos siluetas
          idénticas se leían como la misma persona duplicada (Luis,
          06-09-2026). */}
      <g>
        {/* El pelo va PRIMERO, antes que el cuerpo y que la cara: así el
            relleno del torso le tapa las puntas y la melena queda SUELTA POR
            DETRÁS de los hombros. Pintado después caía sobre el pecho, como
            si se lo hubiera echado adelante (Luis, 06-09-2026). */}
        <path
          fill={C.negro}
          d="M186 78c-33 0-55 23-55 53 0 15-3 30-9 44-4 9-9 17-14 23 16 9 36 6 47-6 9-11 14-26 16-43 3 18 8 33 17 44 11 13 32 16 48 6-6-6-11-14-15-24-6-14-9-29-9-44 0-30-22-53-55-53Z"
        />
        <path d="M122 316c0-90 28-158 64-158s64 68 64 158Z" fill={C.lavanda} />
        <path d="M152 126c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z" fill={C.piel} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M122 316c0-90 28-158 64-158s64 68 64 158Z
            M133 316h106c0-84-24-147-53-147s-53 63-53 147Z
            M152 126c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z
            M161 126c0 18 11 30 25 30s25-12 25-30c0-15-11-26-25-26s-25 11-25 26Z
            M150 122c-3-27 18-46 40-45 21 0 36 13 38 31-7-8-17-12-28-11-16 1-28 9-32 22-5-4-12-3-18 3Z
          "
        />
      </g>

      {/* Persona de adelante: su relleno tapa lo de atrás. */}
      <g>
        <path d="M18 316c0-96 36-166 82-166s82 70 82 166Z" fill={C.celeste} />
        <path d="M58 110c0-23 19-42 42-42s42 19 42 42c0 26-19 46-42 46s-42-20-42-46Z" fill={C.piel} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M18 316c0-96 36-166 82-166s82 70 82 166Z
            M29 316h142c0-90-32-155-71-155s-71 65-71 155Z
            M58 110c0-23 19-42 42-42s42 19 42 42c0 26-19 46-42 46s-42-20-42-46Z
            M67 110c0 22 15 38 33 38s33-16 33-38c0-18-14-33-33-33s-33 15-33 33Z
            M56 106c-3-32 20-55 44-54 26 0 45 16 47 38-8-10-21-15-35-14-20 1-35 12-40 28-6-5-13-4-16 2Z
          "
        />
      </g>
    </g>
  ),

  /**
   * Asignaturas: tres lápices de colores, abiertos en abanico. Cada uno es
   * cuerpo de color plano + un solo path negro relleno con el contorno y la
   * punta, igual que el resto del set.
   */
  asignaturas: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}
      {[
        { x: 34, giro: -13, color: C.rosa },
        { x: 106, giro: 2, color: C.celeste },
        { x: 178, giro: 15, color: C.verde },
      ].map(({ x, giro, color }) => (
        <g key={x} transform={`translate(${x} 36) rotate(${giro} 17 100)`}>
          {/* Cuerpo y punta, en color plano. */}
          <path d="M0 10a10 10 0 0 1 10-10h14a10 10 0 0 1 10 10v138l-17 38-17-38Z" fill={color} />
          {/* La banda de madera, más clara, justo antes de la punta. */}
          <path d="M0 148h34l-8 18H8Z" fill={C.durazno} />
          {/* La mina. */}
          <path d="M9 170h16l-8 16Z" fill={C.negro} />
          {/* El trazo: contorno exterior e interior en un solo path. */}
          <path
            fillRule="evenodd"
            fill={C.negro}
            d="
              M0 10a10 10 0 0 1 10-10h14a10 10 0 0 1 10 10v138l-17 38-17-38Z
              M6 11v136l11 25 11-25V11a5 5 0 0 0-5-5H11a5 5 0 0 0-5 5Z
              M0 146h34v6H0Z
            "
          />
        </g>
      ))}
    </g>
  ),

  /**
   * Horarios: la grilla de la semana. Es literalmente lo que se ve en la
   * pantalla —una tabla con bloques de color— y por eso se reconoce sin
   * leer el título. Los bloques usan los mismos colores del set.
   */
  horarios: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}

      {/* La hoja. */}
      <path d="M40 48c0-9 7-16 16-16h144c9 0 16 7 16 16v152c0 9-7 16-16 16H56c-9 0-16-7-16-16Z" fill={C.blanco} />
      {/* La franja de los días, arriba. */}
      <path d="M40 48c0-9 7-16 16-16h144c9 0 16 7 16 16v22H40Z" fill={C.azul} />

      {/* Los bloques de clase: cada uno un color, como una asignatura. */}
      <path d="M56 86h40v40H56Z" fill={C.rosa} />
      <path d="M108 86h40v66h-40Z" fill={C.celeste} />
      <path d="M160 86h40v26h-40Z" fill={C.verde} />
      <path d="M56 138h40v26H56Z" fill={C.durazno} />
      <path d="M160 124h40v40h-40Z" fill={C.lavanda} />
      <path d="M108 164h40v26h-40Z" fill={C.verde} />

      {/* Un solo trazo negro: el borde de la hoja, la línea de los días y el
          contorno de cada bloque, todo con huecos por par-impar. */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 48c0-9 7-16 16-16h144c9 0 16 7 16 16v152c0 9-7 16-16 16H56c-9 0-16-7-16-16Z
          M51 48v152c0 3 2 5 5 5h144c3 0 5-2 5-5V48c0-3-2-5-5-5H56c-3 0-5 2-5 5Z

          M40 64h176v10H40Z

          M56 86h40v40H56Z M62 92h28v28H62Z
          M108 86h40v66h-40Z M114 92h28v54h-28Z
          M160 86h40v26h-40Z M166 92h28v14h-28Z
          M56 138h40v26H56Z M62 144h28v14H62Z
          M160 124h40v40h-40Z M166 130h28v28h-28Z
          M108 164h40v26h-40Z M114 170h28v14h-28Z
        "
      />
    </g>
  ),

  calendario: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* La hoja. */}
      <path d="M40 48c0-9 7-16 16-16h144c9 0 16 7 16 16v152c0 9-7 16-16 16H56c-9 0-16-7-16-16Z" fill={C.blanco} />
      {/* La franja del mes, arriba. */}
      <path d="M40 48c0-9 7-16 16-16h144c9 0 16 7 16 16v22H40Z" fill={C.durazno} />

      {/* Los días. El del medio es el que está marcado. */}
      <path d="M60 88h40v30H60Z" fill={C.celeste} />
      <path d="M108 88h40v30h-40Z" fill={C.celeste} />
      <path d="M156 88h40v30h-40Z" fill={C.celeste} />
      <path d="M60 128h40v30H60Z" fill={C.celeste} />
      <path d="M108 128h40v30h-40Z" fill={C.rosa} />
      <path d="M156 128h40v30h-40Z" fill={C.celeste} />
      <path d="M60 168h40v30H60Z" fill={C.celeste} />
      <path d="M108 168h40v30h-40Z" fill={C.celeste} />
      <path d="M156 168h40v30h-40Z" fill={C.verde} />

      {/* Las dos anillas de las que cuelga. */}
      <path d="M76 20h14v34H76Z" fill={C.blanco} />
      <path d="M166 20h14v34h-14Z" fill={C.blanco} />

      {/* Un solo trazo negro: el borde de la hoja, la línea del mes, las
          anillas y el contorno de cada día. */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 48c0-9 7-16 16-16h144c9 0 16 7 16 16v152c0 9-7 16-16 16H56c-9 0-16-7-16-16Z
          M51 48v152c0 3 2 5 5 5h144c3 0 5-2 5-5V48c0-3-2-5-5-5H56c-3 0-5 2-5 5Z

          M40 64h176v10H40Z

          M76 20h14v34H76Z M81 25v24h4V25Z
          M166 20h14v34h-14Z M171 25v24h4V25Z

          M60 88h40v30H60Z M66 94v18h28V94Z
          M108 88h40v30h-40Z M114 94v18h28V94Z
          M156 88h40v30h-40Z M162 94v18h28V94Z
          M60 128h40v30H60Z M66 134v18h28v-18Z
          M108 128h40v30h-40Z M114 134v18h28v-18Z
          M156 128h40v30h-40Z M162 134v18h28v-18Z
          M60 168h40v30H60Z M66 174v18h28v-18Z
          M108 168h40v30h-40Z M114 174v18h28v-18Z
          M156 168h40v30h-40Z M162 174v18h28v-18Z
        "
      />
    </g>
  ),

  estadistica: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* La hoja. */}
      <path d="M44 56c0-9 7-16 16-16h136c9 0 16 7 16 16v144c0 9-7 16-16 16H60c-9 0-16-7-16-16Z" fill={C.blanco} />

      {/* Las dos rayas del encabezado. */}
      <path d="M68 72h72v12H68Z" fill={C.azul} />
      <path d="M68 94h44v8H68Z" fill={C.celeste} />

      {/* Las barras: la asistencia semana a semana. */}
      <path d="M68 140h24v40H68Z" fill={C.verde} />
      <path d="M104 118h24v62h-24Z" fill={C.durazno} />
      <path d="M140 130h24v50h-24Z" fill={C.rosa} />
      <path d="M176 104h24v76h-24Z" fill={C.lavanda} />

      {/* Un solo trazo negro: el borde de la hoja, las rayas del encabezado,
          la línea de base y el contorno de cada barra. */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M44 56c0-9 7-16 16-16h136c9 0 16 7 16 16v144c0 9-7 16-16 16H60c-9 0-16-7-16-16Z
          M55 56v144c0 3 2 5 5 5h136c3 0 5-2 5-5V56c0-3-2-5-5-5H60c-3 0-5 2-5 5Z

          M68 72h72v12H68Z M74 78v0h60v0Z
          M68 94h44v8H68Z

          M62 180h140v6H62Z

          M68 140h24v40H68Z M74 146v28h12v-28Z
          M104 118h24v62h-24Z M110 124v50h12v-50Z
          M140 130h24v50h-24Z M146 136v38h12v-38Z
          M176 104h24v76h-24Z M182 110v64h12v-64Z
        "
      />
    </g>
  ),

  bajaAsistencia: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* La hoja, la misma de `estadistica`. */}
      <path d="M44 56c0-9 7-16 16-16h136c9 0 16 7 16 16v144c0 9-7 16-16 16H60c-9 0-16-7-16-16Z" fill={C.blanco} />

      {/* Las dos rayas del encabezado. */}
      <path d="M68 72h72v12H68Z" fill={C.azul} />
      <path d="M68 94h44v8H68Z" fill={C.celeste} />

      {/* Las barras, cada semana más baja: de verde a rojo. */}
      <path d="M68 104h24v76H68Z" fill={C.verde} />
      <path d="M104 124h24v56h-24Z" fill={C.durazno} />
      <path d="M140 144h24v36h-24Z" fill={C.rosa} />
      <path d="M176 160h24v20h-24Z" fill={C.rojo} />

      {/* El trazo de la hoja, el encabezado, la base y cada barra. */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M44 56c0-9 7-16 16-16h136c9 0 16 7 16 16v144c0 9-7 16-16 16H60c-9 0-16-7-16-16Z
          M55 56v144c0 3 2 5 5 5h136c3 0 5-2 5-5V56c0-3-2-5-5-5H60c-3 0-5 2-5 5Z

          M68 72h72v12H68Z
          M68 94h44v8H68Z

          M62 180h140v6H62Z

          M68 104h24v76H68Z M74 110v64h12v-64Z
          M104 124h24v56h-24Z M110 130v44h12v-44Z
          M140 144h24v36h-24Z M146 150v24h12v-24Z
          M176 160h24v20h-24Z M182 166v8h12v-8Z
        "
      />

      {/* La insignia: el círculo rojo con la flecha hacia abajo, en la
          esquina de la hoja. Su propio trazo, para que el anillo no se vacíe
          donde toca el borde de la hoja. */}
      <circle cx="198" cy="62" r="25" fill={C.rojo} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="M168 62a30 30 0 1 0 60 0a30 30 0 1 0-60 0Z M174 62a24 24 0 1 0 48 0a24 24 0 1 0-48 0Z"
      />
      <path d="M193 46h10v15h10l-15 18-15-18h10Z" fill={C.blanco} />
    </g>
  ),

  libreta: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* La libreta. */}
      <path d="M64 44c0-9 7-16 16-16h120c9 0 16 7 16 16v168c0 9-7 16-16 16H80c-9 0-16-7-16-16Z" fill={C.blanco} />
      {/* La franja del lomo. */}
      <path d="M64 44c0-9 7-16 16-16h18v200H80c-9 0-16-7-16-16Z" fill={C.durazno} />

      {/* Los días anotados: la marca y su renglón. */}
      <path d="M116 66h72v14h-72Z" fill={C.verde} />
      <path d="M116 104h72v14h-72Z" fill={C.verde} />
      <path d="M116 142h72v14h-72Z" fill={C.rosa} />
      <path d="M116 180h72v14h-72Z" fill={C.verde} />

      {/* Las anillas del espiral. */}
      <path d="M52 62h28v12H52Z" fill={C.blanco} />
      <path d="M52 118h28v12H52Z" fill={C.blanco} />
      <path d="M52 174h28v12H52Z" fill={C.blanco} />

      {/* Un solo trazo negro: el borde, el lomo, cada renglón y cada anilla. */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M64 44c0-9 7-16 16-16h120c9 0 16 7 16 16v168c0 9-7 16-16 16H80c-9 0-16-7-16-16Z
          M75 44v168c0 3 2 5 5 5h120c3 0 5-2 5-5V44c0-3-2-5-5-5H80c-3 0-5 2-5 5Z

          M98 30h10v196H98Z

          M116 66h72v14h-72Z M122 72v2h60v-2Z
          M116 104h72v14h-72Z M122 110v2h60v-2Z
          M116 142h72v14h-72Z M122 148v2h60v-2Z
          M116 180h72v14h-72Z M122 186v2h60v-2Z

          M52 62h28v12H52Z M58 66v4h16v-4Z
          M52 118h28v12H52Z M58 122v4h16v-4Z
          M52 174h28v12H52Z M58 178v4h16v-4Z
        "
      />
    </g>
  ),

  /**
   * Justificaciones: el sobre con la nota adentro. Es lo que el apoderado
   * manda, no un papel más — por eso sobre y no otra hoja: el módulo ya tiene
   * a `revisar` para los registros y dos dibujos parecidos se confunden
   * (Luis, 06-09-2026). El sobre va inclinado y la nota asoma torcida.
   */
  justificaciones: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* La nota, detrás: asoma por arriba del sobre y va con su propia
          inclinación, para que no parezca pegada. */}
      <g transform="rotate(-7 128 96)">
        <path d="M72 48h108v92H72Z" fill={C.blanco} />
        <path d="M86 72h74v9H86Z" fill={C.rosa} />
        <path d="M86 92h60v9H86Z" fill={C.celeste} />
        <path d="M86 112h68v9H86Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="M72 48h108v92H72Z M81 57h90v74H81Z"
        />
      </g>

      {/* El sobre, encima: su relleno tapa la mitad baja de la nota. */}
      <g>
        <path d="M38 136c0-7 6-13 13-13h154c7 0 13 6 13 13v82c0 7-6 13-13 13H51c-7 0-13-6-13-13Z" fill={C.durazno} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M38 136c0-7 6-13 13-13h154c7 0 13 6 13 13v82c0 7-6 13-13 13H51c-7 0-13-6-13-13Z
            M47 136v82c0 3 2 4 4 4h154c2 0 4-1 4-4v-82c0-3-2-4-4-4H51c-2 0-4 1-4 4Z
          "
        />
        {/* La solapa: el pliegue en V que baja hasta el centro. */}
        <path
          fill={C.negro}
          d="M42 130 128 186 214 130l6 8-92 60-92-58Z"
        />
      </g>
    </g>
  ),

  /**
   * Mis cursos: tres libros apilados, cada uno de un color y con su lomo. Los
   * bordes van despareados y la pila se inclina — una torre perfecta se lee
   * como un gráfico de barras.
   */
  cursos: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* Un libro por capa, de abajo hacia arriba: el de encima tapa al de
          abajo. Con los tres en un solo path negro, los contornos que se
          tocan se cancelaban por par-impar y la pila se leía como una sola
          caja con rayas. */}
      <g>
        <path d="M40 190c0-9 6-15 15-16 48-5 100-5 148 0 9 1 15 7 15 16v18c0 9-6 15-15 16-48 5-100 5-148 0-9-1-15-7-15-16Z" fill={C.durazno} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M40 190c0-9 6-15 15-16 48-5 100-5 148 0 9 1 15 7 15 16v18c0 9-6 15-15 16-48 5-100 5-148 0-9-1-15-7-15-16Z
            M49 191v16c0 5 3 8 8 9 46 4 96 4 142 0 5-1 8-4 8-9v-16c0-5-3-8-8-9-46-4-96-4-142 0-5 1-8 4-8 9Z
            M78 178c4-1 8 2 8 6v22c0 5-8 6-9 1-1-8-1-16 0-24 0-3 0-5 1-5Z
          "
        />
      </g>

      <g>
        <path d="M50 142c0-9 6-15 15-16 44-5 90-5 134 0 9 1 15 7 15 16v18c0 9-6 15-15 16-44 5-90 5-134 0-9-1-15-7-15-16Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M50 142c0-9 6-15 15-16 44-5 90-5 134 0 9 1 15 7 15 16v18c0 9-6 15-15 16-44 5-90 5-134 0-9-1-15-7-15-16Z
            M59 143v16c0 5 3 8 8 9 42 4 86 4 128 0 5-1 8-4 8-9v-16c0-5-3-8-8-9-42-4-86-4-128 0-5 1-8 4-8 9Z
            M88 130c4-1 8 2 8 6v22c0 5-8 6-9 1-1-8-1-16 0-24 0-3 0-5 1-5Z
          "
        />
      </g>

      <g>
        <path d="M60 94c0-9 6-15 15-16 40-4 80-4 120 0 9 1 15 7 15 16v18c0 9-6 15-15 16-40 4-80 4-120 0-9-1-15-7-15-16Z" fill={C.rosa} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M60 94c0-9 6-15 15-16 40-4 80-4 120 0 9 1 15 7 15 16v18c0 9-6 15-15 16-40 4-80 4-120 0-9-1-15-7-15-16Z
            M69 95v16c0 5 3 8 8 9 38 4 76 4 114 0 5-1 8-4 8-9V95c0-5-3-8-8-9-38-4-76-4-114 0-5 1-8 4-8 9Z
            M98 82c4-1 8 2 8 6v22c0 5-8 6-9 1-1-8-1-16 0-24 0-3 0-5 1-5Z
          "
        />
      </g>
    </g>
  ),

  /**
   * Revisar antes de guardar: una lupa sobre la lista. No un triángulo de
   * peligro — el profesor no cometió un error, solo se le pide que confirme
   * lo que marcó. El triángulo ámbar de advertencia decía "algo salió mal".
   */
  revisar: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* Hoja con renglones, detrás */}
      <g>
        <path d="M56 54c0-9 6-15 15-16 34-3 72-3 106 0 9 1 15 7 15 16v148c0 9-6 15-15 16-34 3-72 3-106 0-9-1-15-7-15-16Z" fill={C.blanco} />
        <path d="M78 84c22-2 44-2 66 0 6 1 7 10 1 11-22 2-46 2-68 0-6-1-5-10 1-11Z" fill={C.negro} />
        <path d="M78 116c16-2 32-2 48 0 6 1 7 10 1 11-16 2-34 2-50 0-6-1-5-10 1-11Z" fill={C.negro} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M56 54c0-9 6-15 15-16 34-3 72-3 106 0 9 1 15 7 15 16v148c0 9-6 15-15 16-34 3-72 3-106 0-9-1-15-7-15-16Z
            M69 55v146c0 5 3 8 8 9 32 3 68 3 100 0 5-1 8-4 8-9V55c0-5-3-8-8-9-32-3-68-3-100 0-5 1-8 4-8 9Z
          "
        />
      </g>

      {/* Lupa por delante: su relleno tapa la hoja, para que se lea encima */}
      <g>
        <path d="M104 168c0-31 25-56 56-56s56 25 56 56-25 56-56 56-56-25-56-56Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M104 168c0-31 25-56 56-56s56 25 56 56-25 56-56 56-56-25-56-56Z
            M117 168c0 24 19 43 43 43s43-19 43-43-19-43-43-43-43 19-43 43Z
            M196 208c5-5 12-4 17 1l30 30c6 6 6 15 0 20s-15 4-20-2l-29-31c-4-5-3-13 2-18Z
          "
        />
      </g>
    </g>
  ),


  /**
   * Viajes en curso: un mapa con dos puntos de ubicación, la ruta punteada
   * entre ellos y el furgón a mitad de camino. Lo que se mira en esa
   * pantalla es DÓNDE van, y eso lo dice un mapa (Luis, 07-09-2026). Con
   * manzanas, un parque con árboles, un río con su puente y una rotonda,
   * para que se lea como un mapa de ciudad y no como un rectángulo.
   */
  enCurso: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      {/* La hoja del mapa. */}
      <path d="M40 74c0-10 8-18 18-18h140c10 0 18 8 18 18v108c0 10-8 18-18 18H58c-10 0-18-8-18-18Z" fill={C.blanco} />

      {/* Manzanas: bloques en durazno y lavanda, como los mapas de calles. */}
      <path fill={C.durazno} d="M52 68h36v40H52Z M110 68h36v18h-36Z M168 128h38v26h-38Z" />
      <path fill={C.lavanda} d="M52 118h36v22H52Z M110 152h34v38h-34Z M168 68h38v40h-38Z" />

      {/* El parque, con tres árboles. */}
      <path d="M52 150c26-8 46-2 64 10s40 16 88 6v16c0 10-8 18-18 18H58c-10 0-18-8-18-18Z" fill={C.verde} />
      <path fill={C.negro} d="M66 176a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z M84 170a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z M154 182a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z" opacity="0.18" />
      <path fill="#3FB35A" d="M66 174a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z M84 168a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z M154 180a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z" />

      {/* El río, y el puente que lo cruza. */}
      <path d="M40 96c30 4 46 18 64 30s36 22 56 26 34-4 56-20v14c-22 14-40 22-58 20s-36-14-56-28-32-26-62-30Z" fill={C.celeste} />
      <path fill={C.blanco} d="M96 118h12v30H96Z" />
      <path fill={C.negro} d="M94 116h16v3H94Z M94 147h16v3H94Z" opacity="0.5" />

      {/* Las calles: dos verticales, una horizontal, una diagonal y la rotonda. */}
      <path d="M92 56h12v144H92Z M150 56h12v144h-12Z M40 112h176v10H40Z" fill={C.lavanda} />
      <path d="M40 182l60-60 8 8-60 60Z" fill={C.lavanda} />
      <path d="M156 117a12 12 0 1 0 0 24 12 12 0 1 0 0-24Z" fill={C.lavanda} />
      <path d="M156 123a6 6 0 1 0 0 12 6 6 0 1 0 0-12Z" fill={C.blanco} />

      {/* La ruta punteada, de un punto al otro, y el furgón a mitad de camino. */}
      <path
        d="M82 170c14-30 32-38 52-30s30 8 44-22"
        fill="none"
        stroke={C.negro}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="1 12"
      />
      <g transform="translate(120 142) rotate(-25)">
        <path d="M-14-9h28c3 0 5 2 5 5v8c0 3-2 5-5 5h-28c-3 0-5-2-5-5v-8c0-3 2-5 5-5Z" fill={C.amarillo} />
        <path d="M-10-5h6v6h-6Z M-2-5h6v6h-6Z M6-5h6v6H6Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="M-14-9h28c3 0 5 2 5 5v8c0 3-2 5-5 5h-28c-3 0-5-2-5-5v-8c0-3 2-5 5-5Z M-14-6c-1 0-2 1-2 2v8c0 1 1 2 2 2h28c1 0 2-1 2-2v-8c0-1-1-2-2-2Z M-10 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z M10 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"
        />
      </g>

      {/* Los dos puntos de ubicación: donde sale y adonde va. */}
      <path d="M82 104c14 0 25 11 25 25 0 17-25 44-25 44s-25-27-25-44c0-14 11-25 25-25Z" fill={C.rosa} />
      <path d="M178 66c14 0 25 11 25 25 0 17-25 44-25 44s-25-27-25-44c0-14 11-25 25-25Z" fill={C.amarillo} />

      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 74c0-10 8-18 18-18h140c10 0 18 8 18 18v108c0 10-8 18-18 18H58c-10 0-18-8-18-18Z
          M50 74v108c0 4 4 8 8 8h140c4 0 8-4 8-8V74c0-4-4-8-8-8H58c-4 0-8 4-8 8Z
          M82 104c14 0 25 11 25 25 0 17-25 44-25 44s-25-27-25-44c0-14 11-25 25-25Z
          M82 113c-9 0-16 7-16 16 0 9 9 24 16 32 7-8 16-23 16-32 0-9-7-16-16-16Z
          M82 121a8 8 0 1 1 0 16 8 8 0 1 1 0-16Z
          M178 66c14 0 25 11 25 25 0 17-25 44-25 44s-25-27-25-44c0-14 11-25 25-25Z
          M178 75c-9 0-16 7-16 16 0 9 9 24 16 32 7-8 16-23 16-32 0-9-7-16-16-16Z
          M178 83a8 8 0 1 1 0 16 8 8 0 1 1 0-16Z
        "
      />
    </g>
  ),

  /**
   * Transporte: el furgón escolar de lado. Amarillo porque es el color con el
   * que se reconoce el transporte escolar en la calle, no una decisión de
   * paleta; las ruedas van pintadas DESPUÉS de la carrocería para que su
   * relleno tape el contorno de abajo y se lean por delante.
   */
  transporte: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* Letrero del techo: lo que distingue un furgón escolar de una van. */}
      <path fill={C.durazno} d="M100 84c0-4 3-7 7-7h42c4 0 7 3 7 7v14h-56Z" />
      <path
        d="M24 122c0-13 9-23 22-24 61-6 123-6 184 0 13 1 22 11 22 24v34c0 12-9 22-21 23-62 5-124 5-186 0-12-1-21-11-21-23Z"
        fill={C.amarillo}
      />
      <path d="M52 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9H61c-5 0-9-4-9-9Z" fill={C.celeste} />
      <path d="M114 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9h-38c-5 0-9-4-9-9Z" fill={C.celeste} />
      {/* El parabrisas se inclina hacia adelante: con las tres ventanas
          iguales el furgón se leía como un vagón, sin frente ni atrás. */}
      <path d="M176 118c0-5 4-9 9-9h19c6 0 11 3 13 8l9 21c2 5-2 10-7 10h-34c-5 0-9-4-9-9Z" fill={C.celeste} />

      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M24 122c0-13 9-23 22-24 61-6 123-6 184 0 13 1 22 11 22 24v34c0 12-9 22-21 23-62 5-124 5-186 0-12-1-21-11-21-23Z
          M35 123v33c0 6 5 12 12 12 61 5 121 5 182 0 6 0 11-6 11-12v-33c0-7-5-13-12-13-61-6-120-6-181 0-7 0-12 6-12 13Z
          M52 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9H61c-5 0-9-4-9-9Z
          M57 118v26c0 2 2 4 4 4h38c2 0 4-2 4-4v-26c0-2-2-4-4-4H61c-2 0-4 2-4 4Z
          M114 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9h-38c-5 0-9-4-9-9Z
          M119 118v26c0 2 2 4 4 4h38c2 0 4-2 4-4v-26c0-2-2-4-4-4h-38c-2 0-4 2-4 4Z
          M176 118c0-5 4-9 9-9h19c6 0 11 3 13 8l9 21c2 5-2 10-7 10h-34c-5 0-9-4-9-9Z
          M181 118v26c0 2 2 4 4 4h34c2 0 4-2 3-5l-9-20c-1-3-4-5-7-5h-17c-2 0-4 2-4 4Z
          M100 84c0-4 3-7 7-7h42c4 0 7 3 7 7v14h-9V86h-38v12h-9Z
        "
      />

      {/* Ruedas: van encima, su relleno tapa el borde de la carrocería. */}
      <path d="M72 154a26 26 0 1 0 0 52 26 26 0 1 0 0-52Z" fill={C.blanco} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="M72 152a28 28 0 1 0 0 56 28 28 0 1 0 0-56Z M72 164a16 16 0 1 1 0 32 16 16 0 1 1 0-32Z"
      />
      <path d="M186 154a26 26 0 1 0 0 52 26 26 0 1 0 0-52Z" fill={C.blanco} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="M186 152a28 28 0 1 0 0 56 28 28 0 1 0 0-56Z M186 164a16 16 0 1 1 0 32 16 16 0 1 1 0-32Z"
      />
    </g>
  ),

  /**
   * Viajes programados: el calendario con el recorrido dibujado adentro. El
   * módulo no es "una fecha" ni "un mapa": es una ruta que ocurre un día, y
   * por eso van las dos cosas en el mismo dibujo — la parada de salida en
   * verde, los puntos del trayecto y el destino como chincheta.
   */
  /**
   * Viajes programados: la hoja de calendario con las casillas de la semana
   * y un reloj encima. Antes llevaba un pin de mapa con un rastro de puntos,
   * que hablaba de ubicación (eso es "Viajes en curso"); un horario se dice
   * con un reloj (Luis, 07-09-2026).
   */
  viajes: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      {/* Las argollas del calendario. */}
      <path fill={C.negro} d="M74 52c5 0 9 4 9 9v22c0 11-18 11-18 0V61c0-5 4-9 9-9Z" />
      <path fill={C.negro} d="M182 52c5 0 9 4 9 9v22c0 11-18 11-18 0V61c0-5 4-9 9-9Z" />

      {/* La hoja y su cabecera. */}
      <path
        d="M40 92c0-11 8-19 19-20 46-4 92-4 138 0 11 1 19 9 19 20v108c0 11-8 19-19 20-46 4-92 4-138 0-11-1-19-9-19-20Z"
        fill={C.blanco}
      />
      <path d="M40 92c0-11 8-19 19-20 46-4 92-4 138 0 11 1 19 9 19 20v24H40Z" fill={C.lavanda} />

      {/* Las casillas de la semana: la rosada es hoy. */}
      <path fill={C.lavanda} d="M60 134h22v22H60Z M92 134h22v22H92Z M124 134h22v22h-22Z M92 166h22v22H92Z" />
      <path fill={C.rosa} d="M60 166h22v22H60Z" />

      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 92c0-11 8-19 19-20 46-4 92-4 138 0 11 1 19 9 19 20v108c0 11-8 19-19 20-46 4-92 4-138 0-11-1-19-9-19-20Z
          M51 93v107c0 6 4 10 10 11 45 4 89 4 134 0 6-1 10-5 10-11V93c0-6-4-10-10-11-45-4-89-4-134 0-6 1-10 5-10 11Z
          M42 112h172v9H42Z
          M56 130h30v30H56Z M62 136v18h18v-18Z
          M88 130h30v30H88Z M94 136v18h18v-18Z
          M120 130h30v30h-30Z M126 136v18h18v-18Z
          M56 162h30v30H56Z M62 168v18h18v-18Z
          M88 162h30v30H88Z M94 168v18h18v-18Z
        "
      />

      {/* El reloj: va encima y su relleno tapa lo que hay debajo. */}
      <path d="M176 132a34 34 0 1 0 0 68 34 34 0 1 0 0-68Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M176 128a38 38 0 1 0 0 76 38 38 0 1 0 0-76Z
          M176 138a28 28 0 1 1 0 56 28 28 0 1 1 0-56Z
          M172 144h8v24h-8Z
          M174 162l18 10-4 7-18-10Z
          M176 161a5 5 0 1 0 0 10 5 5 0 1 0 0-10Z
        "
      />
    </g>
  ),

  /**
   * Conductores: la persona con gorra y el volante por delante. La gorra va
   * como UNA sola silueta (copa + visera) y no como dos piezas: dibujada
   * aparte, la visera quedaba tan delgada que el trazo negro se la comía y se
   * leía como una raya cruzando la cara.
   */
  conductores: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      {/* Ropa amarilla, como el furgón escolar, y gorra celeste. Antes iba en
          celeste y gorra morada: el mismo tono de los estudiantes y de los
          funcionarios (Luis, 07-09-2026). */}
      <path d="M22 316c0-96 36-166 82-166s82 70 82 166Z" fill={C.amarillo} />
      {/* El pelo asoma bajo la gorra, a los dos lados. Va antes que la cara
          para que el relleno de la cara lo recorte por dentro. */}
      <path fill={C.negro} d="M56 112c-3 12-2 24 3 34l8-3c-4-9-5-19-3-30Z" />
      <path fill={C.negro} d="M152 112c3 12 2 24-3 34l-8-3c4-9 5-19 3-30Z" />
      <path d="M60 120c0-24 20-44 44-44s44 20 44 44c0 27-20 48-44 48s-44-21-44-48Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M22 316c0-96 36-166 82-166s82 70 82 166Z
          M33 316h142c0-90-32-155-71-155s-71 65-71 155Z
          M60 120c0-24 20-44 44-44s44 20 44 44c0 27-20 48-44 48s-44-21-44-48Z
          M69 120c0 23 16 39 35 39s35-16 35-39c0-19-15-35-35-35s-35 16-35 35Z
        "
      />

      <path d="M62 104c0-24 19-44 42-44s42 20 42 44h32c11 0 19 6 19 13s-8 13-19 13H62Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M62 104c0-24 19-44 42-44s42 20 42 44h32c11 0 19 6 19 13s-8 13-19 13H62Z
          M71 104c0-19 15-35 33-35s33 16 33 35v8h36c6 0 10 2 10 5s-4 5-10 5H71Z
        "
      />

      {/* El volante va corrido a la derecha, no centrado: tapando el pecho
          entero la persona se perdía y quedaba un volante con cabeza. */}
      <path d="M186 176a52 52 0 1 0 0 104 52 52 0 1 0 0-104Z" fill={C.blanco} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M186 174a54 54 0 1 0 0 108 54 54 0 1 0 0-108Z
          M186 187a41 41 0 1 1 0 82 41 41 0 1 1 0-82Z
          M186 208a21 21 0 1 0 0 42 21 21 0 1 0 0-42Z
          M186 219a10 10 0 1 1 0 20 10 10 0 1 1 0-20Z
          M148 222h76v13h-76Z
          M180 246h13v32h-13Z
        "
      />
    </g>
  ),

  /**
   * Historial de viajes: la hoja con los viajes ya cerrados y el reloj por
   * delante. Comparte la hoja con `revisar` a propósito — es el mismo objeto,
   * lo que cambia es lo que se le pone encima: allá una lupa (mirar antes de
   * guardar), acá un reloj (lo que ya pasó).
   */
  historial: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      <g>
        <path
          d="M46 54c0-9 6-15 15-16 34-3 72-3 106 0 9 1 15 7 15 16v148c0 9-6 15-15 16-34 3-72 3-106 0-9-1-15-7-15-16Z"
          fill={C.blanco}
        />
        <path d="M68 84c22-2 44-2 66 0 6 1 7 10 1 11-22 2-46 2-68 0-6-1-5-10 1-11Z" fill={C.negro} />
        <path d="M68 116c16-2 32-2 48 0 6 1 7 10 1 11-16 2-34 2-50 0-6-1-5-10 1-11Z" fill={C.negro} />
        <path d="M68 148c12-2 24-2 36 0 6 1 7 10 1 11-12 2-26 2-38 0-6-1-5-10 1-11Z" fill={C.negro} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M46 54c0-9 6-15 15-16 34-3 72-3 106 0 9 1 15 7 15 16v148c0 9-6 15-15 16-34 3-72 3-106 0-9-1-15-7-15-16Z
            M59 55v146c0 5 3 8 8 9 32 3 68 3 100 0 5-1 8-4 8-9V55c0-5-3-8-8-9-32-3-68-3-100 0-5 1-8 4-8 9Z
          "
        />
      </g>

      <g>
        <path d="M166 106a62 62 0 1 0 0 124 62 62 0 1 0 0-124Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M166 104a64 64 0 1 0 0 128 64 64 0 1 0 0-128Z
            M166 117a51 51 0 1 1 0 102 51 51 0 1 1 0-102Z
            M161 132c3 0 5 2 5 5v31h30c7 0 7 10 0 10h-35c-3 0-5-2-5-5v-36c0-3 2-5 5-5Z
          "
        />
      </g>
    </g>
  ),


  /**
   * Recorrido: un mapa plegado en tres, con el trazo del viaje y el pin donde
   * terminó, y el reloj del historial encima. Es lo que se ve al abrir la
   * ficha de un viaje: por dónde fue y a qué hora.
   */
  recorrido: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* Los tres paños del mapa: verde, blanco, verde. */}
      <path d="M40 82 100 64 100 196 40 214Z" fill={C.verde} />
      <path d="M100 64 160 82 160 214 100 196Z" fill={C.blanco} />
      <path d="M160 82 220 64 220 196 160 214Z" fill={C.verde} />

      {/* Calles del paño blanco, apenas insinuadas. */}
      <path d="M100 104c20 5 40 5 60 10v7c-20-5-40-5-60-10Z" fill={C.celeste} />
      <path d="M100 150c20 5 40 5 60 10v7c-20-5-40-5-60-10Z" fill={C.celeste} />

      {/* El recorrido: una cinta azul que cruza el mapa y termina en el pin. */}
      <path
        d="M58 186c22-6 30-40 52-46 24-6 26 30 48 22 12-4 12-22 14-36"
        fill="none"
        stroke={C.azul}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 186c22-6 30-40 52-46 24-6 26 30 48 22 12-4 12-22 14-36"
        fill="none"
        stroke={C.negro}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10 9"
      />

      {/* El pin donde terminó. */}
      <path d="M172 78c-13 0-22 9-22 21 0 14 22 33 22 33s22-19 22-33c0-12-9-21-22-21Z" fill={C.rosa} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M172 74c-15 0-26 11-26 25 0 17 26 38 26 38s26-21 26-38c0-14-11-25-26-25Z
          M172 83c10 0 17 7 17 16 0 10-12 24-17 29-5-5-17-19-17-29 0-9 7-16 17-16Z
          M172 90a9 9 0 1 0 0 18 9 9 0 1 0 0-18Z
        "
      />

      {/* El contorno del mapa y sus dos dobleces, en un solo trazo negro. */}
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 82 100 64 160 82 220 64 220 196 160 214 100 196 40 214Z
          M51 91v109l49-15V79Z
          M105 79v106l50 15V91Z
          M160 91v109l49-15V79Z
        "
      />

      {/* El reloj, el mismo del historial, encima de la esquina del mapa. */}
      <g>
        <path d="M192 148a50 50 0 1 0 0 100 50 50 0 1 0 0-100Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M192 146a52 52 0 1 0 0 104 52 52 0 1 0 0-104Z
            M192 157a41 41 0 1 1 0 82 41 41 0 1 1 0-82Z
            M188 170c3 0 5 2 5 5v23h22c7 0 7 10 0 10h-27c-3 0-5-2-5-5v-28c0-3 2-5 5-5Z
          "
        />
      </g>
    </g>
  ),

  /**
   * Apoderados: el adulto y su hijo. La diferencia de tamaño es lo que hace
   * que se lea "apoderado y estudiante" y no "dos personas" — que es lo que
   * ya dice el dibujo de `estudiantes`.
   */
  /**
   * Ajustes: dos engranajes, el grande lavanda con el centro durazno y uno
   * chico celeste que engrana abajo a la derecha. El contorno negro va
   * detrás y el color encima, 6 puntos más chico, para que la línea pese lo
   * mismo que en el resto de los dibujos (la primera versión salía casi
   * toda negra a tamaño de cabecera; Luis, 08-09-2026).
   */
  ajustes: (
    <g transform="rotate(-6 128 128)">
      {PINCELADA}

      {/* El grande: dientes y cuerpo, primero el negro y encima el color. */}
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(0 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(45 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(90 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(135 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(180 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(225 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(270 108 116)" />
      <rect x="93" y="24" width="30" height="34" rx="5" fill={C.negro} transform="rotate(315 108 116)" />
      <path d="M108 50a66 66 0 1 0 0 132 66 66 0 1 0 0-132Z" fill={C.negro} />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(0 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(45 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(90 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(135 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(180 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(225 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(270 108 116)" />
      <rect x="99" y="30" width="18" height="28" rx="5" fill={C.lavanda} transform="rotate(315 108 116)" />
      <path d="M108 56a60 60 0 1 0 0 120 60 60 0 1 0 0-120Z" fill={C.lavanda} />
      {/* El aro interior y el eje. */}
      <path d="M108 78a38 38 0 1 0 0 76 38 38 0 1 0 0-76Z" fill={C.negro} />
      <path d="M108 84a32 32 0 1 0 0 64 32 32 0 1 0 0-64Z" fill={C.durazno} />
      <path d="M108 102a14 14 0 1 0 0 28 14 14 0 1 0 0-28Z" fill={C.negro} />
      <path d="M108 108a8 8 0 1 0 0 16 8 8 0 1 0 0-16Z" fill={C.lavanda} />

      {/* El chico, engranado abajo a la derecha. */}
      <rect x="186" y="132" width="20" height="22" rx="5" fill={C.negro} transform="rotate(0 196 186)" />
      <rect x="186" y="132" width="20" height="22" rx="5" fill={C.negro} transform="rotate(60 196 186)" />
      <rect x="186" y="132" width="20" height="22" rx="5" fill={C.negro} transform="rotate(120 196 186)" />
      <rect x="186" y="132" width="20" height="22" rx="5" fill={C.negro} transform="rotate(180 196 186)" />
      <rect x="186" y="132" width="20" height="22" rx="5" fill={C.negro} transform="rotate(240 196 186)" />
      <rect x="186" y="132" width="20" height="22" rx="5" fill={C.negro} transform="rotate(300 196 186)" />
      <path d="M196 148a38 38 0 1 0 0 76 38 38 0 1 0 0-76Z" fill={C.negro} />
      <rect x="191" y="137" width="10" height="17" rx="5" fill={C.celeste} transform="rotate(0 196 186)" />
      <rect x="191" y="137" width="10" height="17" rx="5" fill={C.celeste} transform="rotate(60 196 186)" />
      <rect x="191" y="137" width="10" height="17" rx="5" fill={C.celeste} transform="rotate(120 196 186)" />
      <rect x="191" y="137" width="10" height="17" rx="5" fill={C.celeste} transform="rotate(180 196 186)" />
      <rect x="191" y="137" width="10" height="17" rx="5" fill={C.celeste} transform="rotate(240 196 186)" />
      <rect x="191" y="137" width="10" height="17" rx="5" fill={C.celeste} transform="rotate(300 196 186)" />
      <path d="M196 154a32 32 0 1 0 0 64 32 32 0 1 0 0-64Z" fill={C.celeste} />
      <path d="M196 172a14 14 0 1 0 0 28 14 14 0 1 0 0-28Z" fill={C.negro} />
      <path d="M196 178a8 8 0 1 0 0 16 8 8 0 1 0 0-16Z" fill={C.rosa} />
    </g>
  ),

  /**
   * Campana: el aviso. Va en la tarjeta de Notificaciones de Ajustes, con la
   * bolita rosada arriba a la derecha que dice "hay algo nuevo".
   */
  campana: (
    <g transform="rotate(6 128 128)">
      {PINCELADA}
      {/* La campana, contorno negro detrás y durazno encima. */}
      <path d="M128 34c-38 0-62 28-62 66v34l-22 30c-3 4 0 10 5 10h158c5 0 8-6 5-10l-22-30v-34c0-38-24-66-62-66Z" fill={C.negro} />
      <path d="M128 46c-31 0-50 22-50 54v38l-18 24h136l-18-24v-38c0-32-19-54-50-54Z" fill={C.durazno} />
      {/* El asa de arriba. */}
      <path d="M128 22a12 12 0 1 0 0 24 12 12 0 1 0 0-24Z" fill={C.negro} />
      {/* El badajo, abajo. */}
      <path d="M104 178h48c0 16-10 26-24 26s-24-10-24-26Z" fill={C.negro} />
      <path d="M114 186h28c0 8-6 12-14 12s-14-4-14-12Z" fill={C.durazno} />
      {/* La bolita de "nuevo". */}
      <path d="M186 42a30 30 0 1 0 0 60 30 30 0 1 0 0-60Z" fill={C.negro} />
      <path d="M186 52a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z" fill={C.rosa} />
    </g>
  ),

  /**
   * Módulos: cuatro bloques, tres puestos y uno entrando torcido. Es la
   * tarjeta de activar o apagar partes de Gestión Escolar.
   */
  modulos: (
    <g>
      {PINCELADA}
      <rect x="44" y="44" width="76" height="76" rx="14" fill={C.negro} />
      <rect x="54" y="54" width="56" height="56" rx="8" fill={C.verde} />
      <rect x="136" y="44" width="76" height="76" rx="14" fill={C.negro} />
      <rect x="146" y="54" width="56" height="56" rx="8" fill={C.celeste} />
      <rect x="44" y="136" width="76" height="76" rx="14" fill={C.negro} />
      <rect x="54" y="146" width="56" height="56" rx="8" fill={C.durazno} />
      <g transform="rotate(12 182 182)">
        <rect x="144" y="144" width="76" height="76" rx="14" fill={C.negro} />
        <rect x="154" y="154" width="56" height="56" rx="8" fill={C.lavanda} />
      </g>
    </g>
  ),

  /**
   * Ciclos: tres capas apiladas, como los ciclos de un colegio (básica,
   * media…) uno sobre otro. Es la tarjeta de Ciclos de exportación.
   */
  ciclos: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}
      <path d="M128 118l90 46-90 46-90-46Z" fill={C.negro} />
      <path d="M128 132l66 32-66 32-66-32Z" fill={C.morado} />
      <path d="M128 82l90 46-90 46-90-46Z" fill={C.negro} />
      <path d="M128 96l66 32-66 32-66-32Z" fill={C.celeste} />
      <path d="M128 46l90 46-90 46-90-46Z" fill={C.negro} />
      <path d="M128 60l66 32-66 32-66-32Z" fill={C.verde} />
    </g>
  ),

  apoderados: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      {/* El adulto, atrás y grande. Ropa durazno y pelo corto: antes iba en
          lavanda y sin pelo, y se confundía con las figuras de `estudiantes`
          (Luis, 07-09-2026). */}
      <path d="M96 316c0-88 30-152 68-152s68 64 68 152Z" fill={C.durazno} />
      <path d="M128 116c0-22 18-40 40-40s40 18 40 40c0 25-18 44-40 44s-40-19-40-44Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M96 316c0-88 30-152 68-152s68 64 68 152Z
          M107 316h114c0-82-26-141-57-141s-57 59-57 141Z
          M128 116c0-22 18-40 40-40s40 18 40 40c0 25-18 44-40 44s-40-19-40-44Z
          M137 116c0 20 14 35 31 35s31-15 31-35c0-17-14-31-31-31s-31 14-31 31Z
          M121 119c-5-39 22-64 47-63 29 0 50 19 52 46-9-12-24-18-39-17-23 1-38 13-43 31-7-6-13-5-17 3Z
        "
      />
      {/* El pelo del hombre va grueso y sin brillos: baja más por la frente y
          las sienes, y la patilla sigue por la sien. Los brillos blancos se
          leían como rayas (Luis, 07-09-2026). */}
      <path fill={C.negro} d="M127 114h6c0 7 1 13 3 18l-6 2c-2-6-3-13-3-20Z" />

      {/* La mujer, adelante y chica: su relleno tapa al adulto. Ropa verde,
          el pelo largo va PRIMERO para que el torso le tape las puntas y la
          melena quede suelta por detrás de los hombros. */}
      <path
        fill={C.negro}
        d="M74 140c-26 0-44 18-44 42 0 12-2 24-7 35-3 7-7 14-11 18 13 7 29 5 38-5 7-9 11-21 13-34 2 14 6 26 14 35 9 10 26 13 38 5-5-5-9-11-12-19-5-11-7-23-7-35 0-24-18-42-44-42Z"
      />
      <path d="M26 316c0-60 22-104 48-104s48 44 48 104Z" fill={C.verde} />
      <path d="M46 178c0-15 12-27 28-27s28 12 28 27c0 17-12 30-28 30s-28-13-28-30Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M26 316c0-60 22-104 48-104s48 44 48 104Z
          M37 316h74c0-54-17-93-37-93s-37 39-37 93Z
          M46 178c0-15 12-27 28-27s28 12 28 27c0 17-12 30-28 30s-28-13-28-30Z
          M55 178c0 13 9 22 19 22s19-9 19-22c0-11-8-19-19-19s-19 8-19 19Z
          M43 180c-4-26 14-43 32-42 19 0 33 13 34 31-6-8-16-12-26-11-15 1-25 9-28 21-5-4-9-3-12 1Z
        "
      />
    </g>
  ),

  /**
   * Funcionarios: la persona con su credencial colgada. Es lo que distingue a
   * quien trabaja en el colegio de cualquier otra figura del set, sin recurrir
   * a un maletín ni a una corbata.
   */
  funcionarios: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      {/* Ropa morada y pelo recogido en un moño: antes iba en celeste, el
          mismo tono de los conductores y los estudiantes, y sin pelo. El moño
          es un peinado distinto del pelo corto del apoderado y de la melena
          (Luis, 07-09-2026). */}
      {/* El moño va PRIMERO, detrás de la cabeza. */}
      <path d="M150 58c10 0 18 8 18 18s-8 18-18 18-18-8-18-18 8-18 18-18Z" fill={C.negro} />
      <path d="M40 316c0-92 34-158 78-158s78 66 78 158Z" fill={C.morado} />
      <path d="M76 112c0-23 19-42 42-42s42 19 42 42c0 26-19 46-42 46s-42-20-42-46Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 316c0-92 34-158 78-158s78 66 78 158Z
          M51 316h134c0-86-30-147-67-147s-67 61-67 147Z
          M76 112c0-23 19-42 42-42s42 19 42 42c0 26-19 46-42 46s-42-20-42-46Z
          M85 112c0 21 15 37 33 37s33-16 33-37c0-18-15-33-33-33s-33 15-33 33Z
          M74 112c-4-34 16-60 44-60 26 0 46 18 48 44-10-9-24-13-40-11-19 2-33 12-38 25-5-4-10-3-14 2Z
        "
      />

      {/* El cordón y la credencial. */}
      <path
        fill={C.negro}
        d="M96 168c3-2 7-1 9 2l17 27-8 5-18-25c-2-3-2-7 0-9Zm44 0c2 2 2 6 0 9l-18 25-8-5 17-27c2-3 6-4 9-2Z"
      />
      <path d="M100 204c0-6 5-11 11-11h26c6 0 11 5 11 11v34c0 6-5 11-11 11h-26c-6 0-11-5-11-11Z" fill={C.blanco} />
      <path d="M110 212h28v8h-28Z" fill={C.durazno} />
      <path d="M110 226h20v7h-20Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M100 204c0-6 5-11 11-11h26c6 0 11 5 11 11v34c0 6-5 11-11 11h-26c-6 0-11-5-11-11Z
          M109 205v32c0 2 1 3 2 3h26c1 0 2-1 2-3v-32c0-2-1-3-2-3h-26c-1 0-2 1-2 3Z
        "
      />
    </g>
  ),

  /**
   * Planilla: el archivo de Excel tal como se ve en el escritorio. La hoja
   * blanca con la esquina doblada y la cuadrícula verde detrás, y adelante el
   * cuadro verde oscuro con la X blanca. Es la única pieza con colores fuera
   * del set: un Excel se reconoce por sus verdes o no se reconoce
   * (Luis, 07-09-2026).
   */
  planilla: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}

      {/* La hoja, con la esquina de arriba a la derecha doblada. */}
      <path d="M78 50c0-8 6-14 14-14h90l32 32v150c0 8-6 14-14 14H92c-8 0-14-6-14-14Z" fill={C.blanco} />
      {/* La cuadrícula: la fila de cabecera llena y las celdas con borde. */}
      <path d="M118 96h80v22h-80Z" fill={C.excelClaro} />
      <path
        fillRule="evenodd"
        fill={C.excel}
        d="
          M118 96h80v100h-80Z
          M124 102v88h68v-88Z
          M118 118h80v5h-80Z
          M118 144h80v5h-80Z
          M118 170h80v5h-80Z
          M155 96h5v100h-5Z
        "
      />
      {/* El doblez. */}
      <path d="M182 36v32h32Z" fill={C.excelClaro} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M78 50c0-8 6-14 14-14h90l32 32v150c0 8-6 14-14 14H92c-8 0-14-6-14-14Z
          M86 52v164c0 3 3 6 6 6h108c3 0 6-3 6-6V72h-24c-3 0-6-3-6-6V44H92c-3 0-6 3-6 6Z
          M184 48v16h16Z
        "
      />

      {/* El cuadro verde con la X, adelante: su relleno tapa la mitad
          izquierda de la hoja, como en el ícono de Excel. */}
      <path d="M40 96c0-8 6-14 14-14h82c8 0 14 6 14 14v88c0 8-6 14-14 14H54c-8 0-14-6-14-14Z" fill={C.excel} />
      <path fill={C.blanco} d="M64 120l10-10 52 52-10 10Z" />
      <path fill={C.blanco} d="M116 110l10 10-52 52-10-10Z" />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 96c0-8 6-14 14-14h82c8 0 14 6 14 14v88c0 8-6 14-14 14H54c-8 0-14-6-14-14Z
          M48 98v84c0 3 3 6 6 6h82c3 0 6-3 6-6V98c0-3-3-6-6-6H54c-3 0-6 3-6 6Z
        "
      />
    </g>
  ),

  csv: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}

      {/* La hoja, con la esquina de arriba a la derecha doblada. */}
      <path d="M78 50c0-8 6-14 14-14h90l32 32v150c0 8-6 14-14 14H92c-8 0-14-6-14-14Z" fill={C.blanco} />
      {/* La cuadrícula: la fila de cabecera llena y las celdas con borde. */}
      <path d="M118 96h80v22h-80Z" fill={C.excelClaro} />
      <path
        fillRule="evenodd"
        fill={C.excel}
        d="
          M118 96h80v100h-80Z
          M124 102v88h68v-88Z
          M118 118h80v5h-80Z
          M118 144h80v5h-80Z
          M118 170h80v5h-80Z
          M155 96h5v100h-5Z
        "
      />
      {/* El doblez. */}
      <path d="M182 36v32h32Z" fill={C.excelClaro} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M78 50c0-8 6-14 14-14h90l32 32v150c0 8-6 14-14 14H92c-8 0-14-6-14-14Z
          M86 52v164c0 3 3 6 6 6h108c3 0 6-3 6-6V72h-24c-3 0-6-3-6-6V44H92c-3 0-6 3-6 6Z
          M184 48v16h16Z
        "
      />

      {/* El cartel de adelante: donde el ícono de Excel lleva la X, este
          lleva escrito CSV, que es el formato que acepta la pantalla. */}
      <path d="M40 96c0-8 6-14 14-14h82c8 0 14 6 14 14v88c0 8-6 14-14 14H54c-8 0-14-6-14-14Z" fill={C.excel} />
      <text
        x="95"
        y="140"
        textAnchor="middle"
        dominantBaseline="central"
        fill={C.blanco}
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="46"
        fontWeight="700"
        letterSpacing="1"
      >
        CSV
      </text>
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M40 96c0-8 6-14 14-14h82c8 0 14 6 14 14v88c0 8-6 14-14 14H54c-8 0-14-6-14-14Z
          M48 98v84c0 3 3 6 6 6h82c3 0 6-3 6-6V98c0-3-3-6-6-6H54c-3 0-6 3-6 6Z
        "
      />
    </g>
  ),

  /**
   * Exportar: la misma hoja de Excel de `planilla`, sin el cuadro de la X, y
   * adelante la insignia redonda de descarga (flecha hacia la bandeja). Dice
   * "un Excel que baja", que es exactamente lo que hace la pantalla.
   */
  exportar: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}

      <path d="M62 50c0-8 6-14 14-14h90l32 32v150c0 8-6 14-14 14H76c-8 0-14-6-14-14Z" fill={C.blanco} />
      <path d="M82 96h96v22H82Z" fill={C.excelClaro} />
      <path
        fillRule="evenodd"
        fill={C.excel}
        d="
          M82 96h96v100H82Z
          M88 102v88h84v-88Z
          M82 118h96v5H82Z
          M82 144h96v5H82Z
          M82 170h96v5H82Z
          M126 96h5v100h-5Z
        "
      />
      <path d="M166 36v32h32Z" fill={C.excelClaro} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M62 50c0-8 6-14 14-14h90l32 32v150c0 8-6 14-14 14H76c-8 0-14-6-14-14Z
          M70 52v164c0 3 3 6 6 6h108c3 0 6-3 6-6V72h-24c-3 0-6-3-6-6V44H76c-3 0-6 3-6 6Z
          M168 48v16h16Z
        "
      />

      {/* La insignia de descarga, adelante y abajo a la derecha. */}
      <path d="M186 148a46 46 0 1 0 0 92 46 46 0 1 0 0-92Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M186 146a48 48 0 1 0 0 96 48 48 0 1 0 0-96Z
          M186 157a37 37 0 1 1 0 74 37 37 0 1 1 0-74Z
          M180 168h12v26h13l-19 20-19-20h13Z
          M164 218h44v8h-44Z
        "
      />
    </g>
  ),

  /**
   * Listo: el disco verde con el visto. Es el aviso de "ya quedó": guardado,
   * creado, descargado, eliminado.
   */
  listo: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}
      <path d="M128 40a88 88 0 1 0 0 176 88 88 0 1 0 0-176Z" fill={C.verde} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M128 36a92 92 0 1 0 0 184 92 92 0 1 0 0-184Z
          M128 48a80 80 0 1 1 0 160 80 80 0 1 1 0-160Z
          M78 132c3-4 8-6 12-3l22 21 52-58c3-4 9-4 12 0 4 3 4 9 0 12l-58 65c-3 3-8 4-12 0l-28-27c-3-3-3-7 0-10Z
        "
      />
    </g>
  ),

  /**
   * Fallo: el disco rosado con la equis. Es el aviso de "no se pudo": va con
   * el botón de reintentar cuando reintentar tiene sentido.
   */
  fallo: (
    <g transform="rotate(5 128 128)">
      {PINCELADA}
      <path d="M128 40a88 88 0 1 0 0 176 88 88 0 1 0 0-176Z" fill={C.rosa} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M128 36a92 92 0 1 0 0 184 92 92 0 1 0 0-184Z
          M128 48a80 80 0 1 1 0 160 80 80 0 1 1 0-160Z
          M92 96c3-4 9-4 12 0l24 24 24-24c4-4 9-4 12 0 4 3 4 9 0 12l-24 24 24 24c4 4 4 9 0 12-3 4-8 4-12 0l-24-24-24 24c-3 4-9 4-12 0-4-3-4-8 0-12l24-24-24-24c-4-4-4-9 0-12Z
        "
      />
    </g>
  ),

  /**
   * Papelera: el tarro con su tapa levantada. Es la cabecera del pop-up de
   * "¿Eliminar…?": dice qué va a pasar sin gritar (nada de rojo de fondo).
   */
  papelera: (
    <g transform="rotate(-5 128 128)">
      {PINCELADA}

      {/* El tarro, con las ranuras verticales. */}
      <path d="M72 92h112l-9 122c-1 7-6 12-13 12H94c-7 0-12-5-13-12Z" fill={C.rojo} />
      <path d="M104 112c3 0 5 2 5 5l-2 80c0 3-2 5-5 5s-5-2-5-5l2-80c0-3 2-5 5-5Z" fill={C.negro} />
      <path d="M128 112c3 0 5 2 5 5v80c0 3-2 5-5 5s-5-2-5-5v-80c0-3 2-5 5-5Z" fill={C.negro} />
      <path d="M152 112c3 0 5 2 5 5l2 80c0 3-2 5-5 5s-5-2-5-5l-2-80c0-3 2-5 5-5Z" fill={C.negro} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M66 86h124l-10 130c-1 10-9 17-19 17H95c-10 0-18-7-19-17Z
          M79 98l9 117c0 4 3 7 7 7h66c4 0 7-3 7-7l9-117Z
        "
      />

      {/* La tapa, un poco levantada y girada, con el asa. */}
      <g transform="rotate(-12 128 74)">
        <path d="M58 66c0-6 4-10 10-10h120c6 0 10 4 10 10v8H58Z" fill={C.rosa} />
        <path d="M110 44c0-6 4-10 10-10h16c6 0 10 4 10 10v12h-36Z" fill={C.rosa} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M54 64c0-9 6-15 14-15h120c8 0 14 6 14 15v14H54Z
            M64 60v8h124v-8c0-2-1-3-3-3H67c-2 0-3 1-3 3Z
            M106 44c0-9 6-15 14-15h16c8 0 14 6 14 15v10H106Z
            M116 40v4h20v-4c0-2-1-3-3-3h-14c-2 0-3 1-3 3Z
          "
        />
      </g>
    </g>
  ),

  /**
   * Inicio: el colegio. Un edificio con techo a dos aguas, puerta, ventanas
   * y la bandera en el mástil. Es la cabecera de la primera pantalla; antes
   * usaba el furgón de transporte, que es de otro módulo.
   */
  inicio: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* El cuerpo del edificio y el techo. */}
      <path d="M52 120h152v92c0 6-4 10-10 10H62c-6 0-10-4-10-10Z" fill={C.lavanda} />
      <path d="M40 124 128 62l88 62Z" fill={C.durazno} />
      {/* La puerta y las ventanas. */}
      <path d="M112 160h32v62h-32Z" fill={C.celeste} />
      <path d="M68 140h26v26H68Z" fill={C.blanco} />
      <path d="M162 140h26v26h-26Z" fill={C.blanco} />
      <path d="M68 180h26v26H68Z" fill={C.blanco} />
      <path d="M162 180h26v26h-26Z" fill={C.blanco} />
      {/* La bandera. */}
      <path d="M128 40h34l-8 12 8 12h-34Z" fill={C.rosa} />

      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M52 120h152v92c0 6-4 10-10 10H62c-6 0-10-4-10-10Z
          M62 130v82h132v-82Z
          M34 128 128 56l94 72h-14l-80-60-80 60Z
          M108 156h40v70h-40Z M118 166v52h20v-52Z
          M64 136h34v34H64Z M72 144v18h18v-18Z
          M158 136h34v34h-34Z M166 144v18h18v-18Z
          M64 176h34v34H64Z M72 184v18h18v-18Z
          M158 176h34v34h-34Z M166 184v18h18v-18Z
          M124 34h6v34h-6Z
          M128 36h38l-10 16 10 16h-38Z M134 42v20h22l-6-10 6-10Z
        "
      />
    </g>
  ),

  /**
   * Ficha: la credencial con la foto a la izquierda y los datos a la derecha.
   * Es la misma persona del módulo, pero vista como registro: por eso una
   * tarjeta y no otro busto suelto.
   */
  ficha: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}

      {/* La tarjeta. */}
      <path
        d="M30 84c0-9 7-16 16-16 56-3 110-3 166 0 8 0 14 7 14 16 2 30 2 62 0 92 0 8-6 14-14 14-56 3-110 3-166 0-9 0-16-6-16-14-2-30-2-62 0-92Z"
        fill={C.lavanda}
      />
      {/* El recuadro de la foto, con la persona adentro. */}
      <path d="M46 90h64v82H46Z" fill={C.celeste} />
      <path d="M54 170c0-24 11-38 24-38s24 14 24 38Z" fill={C.rosa} />
      <path d="M63 116c0-9 7-16 15-16s15 7 15 16-7 17-15 17-15-8-15-17Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M30 84c0-9 7-16 16-16 56-3 110-3 166 0 8 0 14 7 14 16 2 30 2 62 0 92 0 8-6 14-14 14-56 3-110 3-166 0-9 0-16-6-16-14-2-30-2-62 0-92Z
          M39 86c0-4 3-8 8-8 54-3 108-3 162 0 4 0 7 4 7 8 2 28 2 60 0 88 0 4-3 7-7 7-54 3-108 3-162 0-5 0-8-3-8-7-2-28-2-60 0-88Z
          M46 90h64v82H46Z
          M53 97h50v68H53Z
          M54 170c0-24 11-38 24-38s24 14 24 38Z
          M61 170c0-19 8-31 17-31s17 12 17 31Z
          M63 116c0-9 7-16 15-16s15 7 15 16-7 17-15 17-15-8-15-17Z
          M69 116c0-6 4-10 9-10s9 4 9 10-4 11-9 11-9-5-9-11Z
        "
      />
      {/* Los datos: el nombre más largo, lo demás más corto, y una pastilla
          de estado abajo. */}
      <path d="M124 100h76v12h-76Z" fill={C.blanco} />
      <path d="M124 124h58v10h-58Z" fill={C.blanco} />
      <path d="M124 146h66v10h-66Z" fill={C.blanco} />
      <path d="M124 164h40v12h-40Z" fill={C.verde} />
    </g>
  ),

  /**
   * Lápiz: solo el lápiz, inclinado, con el trazo que acaba de dejar debajo.
   * Antes iba cruzado por delante de un busto y las dos formas se pisaban:
   * no se entendía qué tapaba a qué (Luis, 07-09-2026). Un lápiz solo ya
   * dice "editar".
   */
  lapiz: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      {/* El trazo que dejó el lápiz: una onda rellena, no un `stroke`. */}
      <path
        fill={C.celeste}
        d="M52 236c14-9 28-9 42 0s28 9 42 0 28-9 42 0l-3 8c-14-9-26-9-39 0s-28 9-42 0-26-9-39 0Z"
      />

      {/* El lápiz: goma, cuerpo, madera y punta. */}
      <g transform="rotate(-40 132 140)">
        <path d="M108 40h48v26h-48Z" fill={C.rosa} />
        <path d="M108 66h48v124h-48Z" fill={C.amarillo} />
        <path d="M108 190l24 46 24-46Z" fill={C.piel} />
        <path d="M124 222l8 14 8-14Z" fill={C.negro} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M108 40h48v150l-24 46-24-46Z
            M115 47h34v141l-17 33-17-33Z
          "
        />
        {/* El anillo de la goma y el borde de la madera. */}
        <path fill={C.negro} d="M108 66h48v6h-48Z" />
        <path fill={C.negro} d="M108 188h48v6h-48Z" />
      </g>
    </g>
  ),

  /**
   * Nuevo: la persona con la insignia del "más" en la esquina. Es el mismo
   * busto del módulo con lo único que cambia: que todavía no está.
   */
  nuevo: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}

      <path d="M30 250c0-66 36-120 80-120s80 54 80 120Z" fill={C.celeste} />
      <path d="M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M30 250c0-66 36-120 80-120s80 54 80 120Z
          M40 250h140c0-60-32-110-70-110s-70 50-70 110Z
          M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z
          M85 96c0 18 11 30 25 30s25-12 25-30c0-15-11-26-25-26s-25 11-25 26Z
          M74 92c-3-27 18-46 40-45 21 0 36 13 38 31-7-8-17-12-28-11-16 1-28 9-32 22-5-4-12-3-18 3Z
        "
      />

      {INSIGNIA_MAS}
    </g>
  ),

  /** Crear estudiante: el estudiante de adelante del módulo, con el más. */
  nuevoEstudiante: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}
      <path d="M30 250c0-66 36-120 80-120s80 54 80 120Z" fill={C.celeste} />
      <path d="M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M30 250c0-66 36-120 80-120s80 54 80 120Z
          M40 250h140c0-60-32-110-70-110s-70 50-70 110Z
          M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z
          M85 96c0 18 11 30 25 30s25-12 25-30c0-15-11-26-25-26s-25 11-25 26Z
          M74 92c-3-27 18-46 40-45 21 0 36 13 38 31-7-8-17-12-28-11-16 1-28 9-32 22-5-4-12-3-18 3Z
        "
      />
      {INSIGNIA_MAS}
    </g>
  ),

  /** Crear apoderado: el adulto del módulo, con su pelo corto, y el más. */
  nuevoApoderado: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}
      <path d="M30 250c0-66 36-120 80-120s80 54 80 120Z" fill={C.durazno} />
      <path d="M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M30 250c0-66 36-120 80-120s80 54 80 120Z
          M40 250h140c0-60-32-110-70-110s-70 50-70 110Z
          M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z
          M85 96c0 18 11 30 25 30s25-12 25-30c0-15-11-26-25-26s-25 11-25 26Z
          M69 100c-5-34 18-56 41-55 25 0 43 16 45 40-8-10-20-15-33-14-20 1-33 11-37 27-6-5-11-4-16 2Z
        "
      />
      <path fill={C.negro} d="M74 96h5c0 6 1 11 3 15l-5 2c-2-5-3-11-3-17Z" />
      {INSIGNIA_MAS}
    </g>
  ),

  /** Crear funcionario: el busto con el moño y la credencial, y el más. */
  nuevoFuncionario: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}
      <path d="M138 44c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16Z" fill={C.negro} />
      <path d="M30 250c0-66 36-120 80-120s80 54 80 120Z" fill={C.morado} />
      <path d="M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M30 250c0-66 36-120 80-120s80 54 80 120Z
          M40 250h140c0-60-32-110-70-110s-70 50-70 110Z
          M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z
          M85 96c0 18 11 30 25 30s25-12 25-30c0-15-11-26-25-26s-25 11-25 26Z
          M74 96c-3-28 13-49 36-49 21 0 38 15 40 36-8-8-20-11-33-9-16 2-27 10-31 21-4-3-8-3-12 1Z
        "
      />
      {/* El cordón y la credencial, más chicos que en el módulo. */}
      <path fill={C.negro} d="M92 142c3-2 6-1 8 2l13 21-7 4-14-20c-2-3-2-6 0-7Zm36 0c2 2 2 5 0 7l-14 20-7-4 13-21c2-3 5-4 8-2Z" />
      <path d="M96 170c0-5 4-9 9-9h20c5 0 9 4 9 9v26c0 5-4 9-9 9h-20c-5 0-9-4-9-9Z" fill={C.blanco} />
      <path d="M104 176h22v6h-22Z" fill={C.durazno} />
      <path d="M104 187h15v5h-15Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M96 170c0-5 4-9 9-9h20c5 0 9 4 9 9v26c0 5-4 9-9 9h-20c-5 0-9-4-9-9Z
          M103 171v24c0 2 1 3 2 3h20c1 0 2-1 2-3v-24c0-2-1-3-2-3h-20c-1 0-2 1-2 3Z
        "
      />
      {INSIGNIA_MAS}
    </g>
  ),

  /** Crear conductor: el busto con la gorra, y el más. */
  nuevoConductor: (
    <g transform="rotate(-3 128 128)">
      {PINCELADA}
      <path d="M30 250c0-66 36-120 80-120s80 54 80 120Z" fill={C.amarillo} />
      <path fill={C.negro} d="M72 92c-3 10-2 20 3 28l7-3c-4-7-4-16-3-25Z" />
      <path fill={C.negro} d="M148 92c3 10 2 20-3 28l-7-3c4-7 4-16 3-25Z" />
      <path d="M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z" fill={C.piel} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M30 250c0-66 36-120 80-120s80 54 80 120Z
          M40 250h140c0-60-32-110-70-110s-70 50-70 110Z
          M76 96c0-19 15-34 34-34s34 15 34 34c0 22-15 38-34 38s-34-16-34-38Z
          M85 96c0 18 11 30 25 30s25-12 25-30c0-15-11-26-25-26s-25 11-25 26Z
        "
      />
      <path d="M78 84c0-19 15-34 32-34s32 15 32 34h26c9 0 15 5 15 10s-6 10-15 10H78Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M78 84c0-19 15-34 32-34s32 15 32 34h26c9 0 15 5 15 10s-6 10-15 10H78Z
          M85 84c0-15 11-27 25-27s25 12 25 27v6h30c5 0 8 2 8 4s-3 4-8 4H85Z
        "
      />
      {INSIGNIA_MAS}
    </g>
  ),

  /**
   * Agregar documento: la hoja con la esquina doblada y sus renglones, y el
   * más pisando la esquina de abajo (Luis, 07-09-2026).
   */
  nuevoDocumento: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}
      <path d="M58 44c0-8 6-14 14-14h72l36 36v146c0 8-6 14-14 14H72c-8 0-14-6-14-14Z" fill={C.blanco} />
      <path d="M144 30v36h36Z" fill={C.celeste} />
      <path d="M80 100h72v10H80Z" fill={C.celeste} />
      <path d="M80 122h96v10H80Z" fill={C.celeste} />
      <path d="M80 144h84v10H80Z" fill={C.celeste} />
      <path d="M80 166h60v10H80Z" fill={C.celeste} />
      <path
        fillRule="evenodd"
        fill={C.negro}
        d="
          M58 44c0-8 6-14 14-14h72l36 36v146c0 8-6 14-14 14H72c-8 0-14-6-14-14Z
          M66 46v166c0 3 3 6 6 6h94c3 0 6-3 6-6V70h-26c-3 0-6-3-6-6V38H72c-3 0-6 3-6 6Z
          M146 42v16h16Z
        "
      />
      {INSIGNIA_MAS}
    </g>
  ),

  /** Crear vehículo: el furgón del módulo de transporte, más chico, y el más. */
  nuevoVehiculo: (
    <g transform="rotate(-4 128 128)">
      {PINCELADA}
      <g transform="translate(-14 -14) scale(0.86)">
        <path fill={C.durazno} d="M100 84c0-4 3-7 7-7h42c4 0 7 3 7 7v14h-56Z" />
        <path
          d="M24 122c0-13 9-23 22-24 61-6 123-6 184 0 13 1 22 11 22 24v34c0 12-9 22-21 23-62 5-124 5-186 0-12-1-21-11-21-23Z"
          fill={C.amarillo}
        />
        <path d="M52 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9H61c-5 0-9-4-9-9Z" fill={C.celeste} />
        <path d="M114 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9h-38c-5 0-9-4-9-9Z" fill={C.celeste} />
        <path d="M176 118c0-5 4-9 9-9h19c6 0 11 3 13 8l9 21c2 5-2 10-7 10h-34c-5 0-9-4-9-9Z" fill={C.celeste} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="
            M24 122c0-13 9-23 22-24 61-6 123-6 184 0 13 1 22 11 22 24v34c0 12-9 22-21 23-62 5-124 5-186 0-12-1-21-11-21-23Z
            M35 123v33c0 6 5 12 12 12 61 5 121 5 182 0 6 0 11-6 11-12v-33c0-7-5-13-12-13-61-6-120-6-181 0-7 0-12 6-12 13Z
            M52 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9H61c-5 0-9-4-9-9Z
            M57 118v26c0 2 2 4 4 4h38c2 0 4-2 4-4v-26c0-2-2-4-4-4H61c-2 0-4 2-4 4Z
            M114 118c0-5 4-9 9-9h38c5 0 9 4 9 9v26c0 5-4 9-9 9h-38c-5 0-9-4-9-9Z
            M119 118v26c0 2 2 4 4 4h38c2 0 4-2 4-4v-26c0-2-2-4-4-4h-38c-2 0-4 2-4 4Z
            M176 118c0-5 4-9 9-9h19c6 0 11 3 13 8l9 21c2 5-2 10-7 10h-34c-5 0-9-4-9-9Z
            M181 118v26c0 2 2 4 4 4h34c2 0 4-2 3-5l-9-20c-1-3-4-5-7-5h-17c-2 0-4 2-4 4Z
            M100 84c0-4 3-7 7-7h42c4 0 7 3 7 7v14h-9V86h-38v12h-9Z
          "
        />
        <path d="M72 154a26 26 0 1 0 0 52 26 26 0 1 0 0-52Z" fill={C.blanco} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="M72 152a28 28 0 1 0 0 56 28 28 0 1 0 0-56Z M72 164a16 16 0 1 1 0 32 16 16 0 1 1 0-32Z"
        />
        <path d="M186 154a26 26 0 1 0 0 52 26 26 0 1 0 0-52Z" fill={C.blanco} />
        <path
          fillRule="evenodd"
          fill={C.negro}
          d="M186 152a28 28 0 1 0 0 56 28 28 0 1 0 0-56Z M186 164a16 16 0 1 1 0 32 16 16 0 1 1 0-32Z"
        />
      </g>
      {INSIGNIA_MAS}
    </g>
  ),

};

interface ModuleArtProps {
  name: NombreArteModulo;
  className?: string;
}

/**
 * TAMANO UNICO: 80px (h-20 w-20). Todos los modulos y submodulos muestran su
 * dibujo del mismo porte, sin importar donde aparezca — cabecera de pagina,
 * titulo de seccion, ventana o estado vacio (Luis, 09-09-2026). Antes cada
 * pantalla pedia el suyo (h-10, h-12, h-14, h-16, h-24, h-28) y el mismo
 * dibujo se veia de seis tamanos distintos segun donde cayera.
 *
 * Por eso el tamano vive ACA y no en cada llamada: quien use <ModuleArt /> no
 * pasa alto ni ancho, solo el nombre del dibujo.
 *
 * El viewBox es MÁS GRANDE que el lienzo de 256 en el que están dibujados los
 * objetos (-60 a 316 en ambos ejes). El motivo: la pincelada de fondo se sale
 * a propósito del lienzo del objeto, y todo lo que queda fuera del viewBox lo
 * recorta el navegador — se veía cortada en seco por los bordes. Como el
 * viewBox es mayor, dentro de esos 80px el objeto se dibuja a unos 54px.
 */
export const TAMANO_ARTE_MODULO = 'h-20 w-20';

export function ModuleArt({ name, className }: ModuleArtProps) {
  return (
    <svg
      viewBox="-60 -60 376 376"
      className={cn(TAMANO_ARTE_MODULO, 'shrink-0', className)}
      role="img"
      aria-hidden
    >
      {DIBUJOS[name]}
    </svg>
  );
}

export default ModuleArt;
