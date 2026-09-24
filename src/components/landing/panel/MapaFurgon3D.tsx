'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import type { LayerSpecification, Map as MapboxMap } from 'mapbox-gl';
import { RUTA_DEMO } from './rutaDemo';

// Mapa de Mapbox en 3D (estilo Standard, con edificios) y el furgón escolar
// del panel (public/models/furgon_escolar.glb, capa nativa `model`). Es una
// toma fija: la cámara detrás del furgón, mirando la calle por delante, sin
// movimiento y sin dibujar el trazado (Luis, 22-09-2026).

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

// La toma. Si el furgón se ve chico o grande, se ajusta acá.
const ZOOM = 19;
const PITCH = 72;
const ESCALA_FURGON = 5;
// Qué tan abajo de la pantalla va el furgón (0 = centro, 0.5 = borde de abajo).
const FURGON_ABAJO = 0.3;
// Dónde está el furgón en la ruta, en metros desde el inicio: al comienzo del
// tramo recto más largo (512 m), así se ve la calle derecha por delante.
const METROS_EN_RUTA = 1060;
// La cámara mira hacia un punto de la calle por delante del furgón.
const MIRA_ADELANTE = 30;

// Mismo cálculo que busModel.ts del panel: con rotación [0,0,0] el frente del
// GLB apunta al sur, así que para mirar al rumbo `b` va b + 180.
const rotacionModelo = (rumbo: number): [number, number, number] => [0, 0, (rumbo + 180) % 360];

const METROS_POR_GRADO = 111_320;
const cosLat = Math.cos((RUTA_DEMO[0][1] * Math.PI) / 180);

const distanciaEntre = ([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) =>
  Math.hypot((lng2 - lng1) * METROS_POR_GRADO * cosLat, (lat2 - lat1) * METROS_POR_GRADO);

const acumulado = RUTA_DEMO.reduce<number[]>((lista, punto, i) => {
  lista.push(i === 0 ? 0 : lista[i - 1] + distanciaEntre(RUTA_DEMO[i - 1], punto));
  return lista;
}, []);
const LARGO = acumulado[acumulado.length - 1];

function puntoEn(metros: number): [number, number] {
  const d = ((metros % LARGO) + LARGO) % LARGO;
  let i = 1;
  while (i < acumulado.length - 1 && acumulado[i] < d) i += 1;
  const tramo = acumulado[i] - acumulado[i - 1] || 1;
  const t = (d - acumulado[i - 1]) / tramo;
  const [lng1, lat1] = RUTA_DEMO[i - 1];
  const [lng2, lat2] = RUTA_DEMO[i];
  return [lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t];
}

function rumbo([lng1, lat1]: [number, number], [lng2, lat2]: [number, number]) {
  const grados = (Math.atan2((lng2 - lng1) * cosLat, lat2 - lat1) * 180) / Math.PI;
  return (grados + 360) % 360;
}

function datosFurgon(posicion: [number, number], rumboFurgon: number) {
  return {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: { modelRotation: rotacionModelo(rumboFurgon) },
        geometry: { type: 'Point' as const, coordinates: posicion },
      },
    ],
  };
}

export function MapaFurgon3D() {
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = contenedor.current;
    if (!elemento || !TOKEN.trim()) return;

    let mapa: MapboxMap | null = null;
    let cancelado = false;

    // El mapa se carga recién cuando el panel se acerca a la pantalla: Mapbox
    // pesa y cada carga cuenta en la cuenta de Mapbox.
    const vigia = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !mapa) void iniciar();
      },
      { rootMargin: '400px 0px' },
    );
    vigia.observe(elemento);

    async function iniciar() {
      const mapboxgl = (await import('mapbox-gl')).default;
      if (cancelado || !elemento || mapa) return;
      mapboxgl.accessToken = TOKEN;

      const posicion = puntoEn(METROS_EN_RUTA);
      const rumboCamara = rumbo(posicion, puntoEn(METROS_EN_RUTA + MIRA_ADELANTE));

      mapa = new mapboxgl.Map({
        container: elemento,
        style: 'mapbox://styles/mapbox/standard',
        config: {
          basemap: {
            lightPreset: 'day',
            // Sin nombres: el de la calle se dibujaba encima del furgón.
            showPointOfInterestLabels: false,
            showTransitLabels: false,
            showRoadLabels: false,
            showPlaceLabels: false,
          },
        },
        center: posicion,
        zoom: ZOOM,
        pitch: PITCH,
        bearing: rumboCamara,
        interactive: false,
        attributionControl: false,
        fadeDuration: 0,
      });
      mapa.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
      // El furgón va en la parte de abajo de la pantalla, con la calle por delante.
      mapa.jumpTo({ center: posicion, padding: { top: elemento.clientHeight * FURGON_ABAJO * 2, bottom: 0, left: 0, right: 0 } });

      mapa.on('style.load', () => {
        if (!mapa) return;
        mapa.addModel('furgon-escolar', '/models/furgon_escolar.glb');
        // Mismo rumbo que la cámara: se ve recto desde atrás.
        mapa.addSource('furgon', { type: 'geojson', data: datosFurgon(posicion, rumboCamara) });
        mapa.addLayer({
          id: 'furgon-3d',
          type: 'model',
          source: 'furgon',
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
      mapa?.remove();
    };
  }, []);

  // Dos capas: la hoja de Mapbox le pone `position: relative` al contenedor del
  // mapa, y con eso un `absolute inset-0` directo se anulaba y el mapa quedaba
  // con alto 0. La de afuera ocupa la caja; la de adentro es el mapa.
  return (
    <div className="absolute inset-0 bg-[#E9EBEE]" aria-hidden>
      <div ref={contenedor} className="h-full w-full" />
    </div>
  );
}
