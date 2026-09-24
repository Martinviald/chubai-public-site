// La etiqueta chica que encabeza cada sección de la página pública.
export function SectionBadge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] ${
        dark ? 'text-sky-300' : 'text-sky-600'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-sky-300' : 'bg-sky-500'}`} />
      {children}
    </div>
  );
}
