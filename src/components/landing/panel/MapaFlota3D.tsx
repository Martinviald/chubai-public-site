'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import type { LayerSpecification, Map as MapboxMap } from 'mapbox-gl';

// Mapa de Mapbox en 3D con la flota del colegio: ocho furgones escolares (el
// mismo modelo del panel, public/models/furgon_escolar.glb) cada uno en una
// calle distinta de Ñuñoa, sin cruzarse. Las posiciones y el sentido de cada
// calle salieron una sola vez de la API de rutas de Mapbox (22-09-2026) y
// quedan fijas en el código. Toma fija, sin movimiento de cámara.

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

// La toma. Si los furgones se ven chicos o grandes, se ajusta acá.
const CENTRO: [number, number] = [-70.6026, -33.4567];
const ZOOM = 15.15;
const PITCH = 45;
const RUMBO_CAMARA = -12;
const ESCALA_FURGON = 15;

// [lng, lat] y rumbo de la calle, en grados (0 = norte).
const FLOTA: Array<{ calle: string; posicion: [number, number]; rumbo: number }> = [
  { calle: 'General Miranda', posicion: [-70.60835, -33.459491], rumbo: 97 },
  { calle: 'Av. José Domingo Cañas', posicion: [-70.609022, -33.456753], rumbo: 278 },
  { calle: 'Av. Irarrázaval', posicion: [-70.60803, -33.453873], rumbo: 98 },
  { calle: 'Av. Pedro de Valdivia', posicion: [-70.604876, -33.453365], rumbo: 356 },
  { calle: 'Calle interior', posicion: [-70.604311, -33.456944], rumbo: 187 },
  { calle: 'Alcalde Eduardo Castillo Velasco', posicion: [-70.597169, -33.459134], rumbo: 273 },
  { calle: 'Av. Holanda', posicion: [-70.596176, -33.453359], rumbo: 4 },
  { calle: 'Alcaldesa Balbina Vera', posicion: [-70.592804, -33.453793], rumbo: 272 },
];

// Mismo cálculo que busModel.ts del panel: con rotación [0,0,0] el frente del
// GLB apunta al sur, así que para mirar al rumbo `b` va b + 180.
const rotacionModelo = (rumbo: number): [number, number, number] => [0, 0, (rumbo + 180) % 360];

const DATOS_FLOTA = {
  type: 'FeatureCollection' as const,
  features: FLOTA.map((furgon) => ({
    type: 'Feature' as const,
    properties: { modelRotation: rotacionModelo(furgon.rumbo) },
    geometry: { type: 'Point' as const, coordinates: furgon.posicion },
  })),
};

/**
 * `rellenoIzquierdo`: píxeles del borde izquierdo que tapa otra cosa (el texto
 * de la sección); la flota se centra en el resto.
 */
export function MapaFlota3D({ rellenoIzquierdo = 0 }: { rellenoIzquierdo?: number }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<MapboxMap | null>(null);
  const relleno = useRef(rellenoIzquierdo);
  relleno.current = rellenoIzquierdo;

  // Si cambia lo que tapa el texto, se corre la cámara sin volver a cargar el mapa.
  useEffect(() => {
    mapaRef.current?.jumpTo({ center: CENTRO, padding: { left: rellenoIzquierdo, top: 0, right: 0, bottom: 0 } });
  }, [rellenoIzquierdo]);

  useEffect(() => {
    const elemento = contenedor.current;
    if (!elemento || !TOKEN.trim()) return;

    let mapa: MapboxMap | null = null;
    let cancelado = false;

    // Se carga recién cuando se acerca a la pantalla: cada carga cuenta en la
    // cuenta de Mapbox.
    const vigia = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !mapa) void iniciar();
      },
      { rootMargin: '400px 0px' },
    );
    vigia.observe(elemento);

    // Mapbox solo se reacomoda cuando cambia la ventana. Si cambia la caja (la
    // vista previa se mide después de cargar), el lienzo quedaba del tamaño
    // viejo y el mapa se veía cortado.
    const medidor = new ResizeObserver(() => mapa?.resize());
    medidor.observe(elemento);

    async function iniciar() {
      const mapboxgl = (await import('mapbox-gl')).default;
      if (cancelado || !elemento || mapa) return;
      mapboxgl.accessToken = TOKEN;

      mapa = new mapboxgl.Map({
        container: elemento,
        style: 'mapbox://styles/mapbox/standard',
        config: {
          basemap: {
            lightPreset: 'day',
            showPointOfInterestLabels: false,
            showTransitLabels: false,
            showRoadLabels: false,
            showPlaceLabels: false,
          },
        },
        center: CENTRO,
        zoom: ZOOM,
        pitch: PITCH,
        bearing: RUMBO_CAMARA,
        interactive: false,
        attributionControl: false,
        fadeDuration: 0,
      });
      mapa.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
      mapaRef.current = mapa;
      mapa.jumpTo({ center: CENTRO, padding: { left: relleno.current, top: 0, right: 0, bottom: 0 } });

      mapa.on('style.load', () => {
        if (!mapa) return;
        mapa.addModel('furgon-escolar', '/models/furgon_escolar.glb');
        mapa.addSource('flota', { type: 'geojson', data: DATOS_FLOTA });
        mapa.addLayer({
          id: 'flota-3d',
          type: 'model',
          source: 'flota',
          layout: { 'model-id': 'furgon-escolar' },
          paint: {
            'model-rotation': ['get', 'modelRotation'],
            'model-scale': ['literal', [ESCALA_FURGON, ESCALA_FURGON, ESCALA_FURGON]],
            'model-cast-shadows': true,
            'model-receive-shadows': true,
            'model-elevation-reference': 'ground',
            'model-emissive-strength': 0.7,
          },
        } as unknown as LayerSpecification);
      });
    }

    return () => {
      cancelado = true;
      vigia.disconnect();
      medidor.disconnect();
      mapa?.remove();
      mapaRef.current = null;
    };
  }, []);

  // Dos capas por la misma razón que MapaFurgon3D: la hoja de Mapbox le pone
  // `position: relative` al contenedor y un `absolute inset-0` directo se anula.
  return (
    <div className="absolute inset-0 bg-[#E9EBEE]" aria-hidden>
      <div ref={contenedor} className="h-full w-full" />
    </div>
  );
}
