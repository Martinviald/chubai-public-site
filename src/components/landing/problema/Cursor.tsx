/**
 * El cursor que recorre la mesa de carpetas. Solo dibuja la flecha; quien la
 * mueve es la sección, que sabe dónde quedó cada carpeta.
 */
export function Cursor() {
  return (
    <div
      data-cursor
      className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
      style={{ opacity: 0 }}
      aria-hidden
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M5 3l14 8.5-6.2 1.2L9.8 19 5 3z"
          fill="var(--color-cursor, #0FB5F5)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
