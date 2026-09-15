const PORTRAIT_SRC = '/assets/luiz-portrait.png?v=4';

/** Recorte com alpha. Luz de modelagem fica nos feixes, não em camadas blend. */
export function Portrait({ priority = false }: { priority?: boolean }) {
  return (
    <figure className="portrait">
      <img
        className="portrait__base"
        src={PORTRAIT_SRC}
        width={1400}
        height={1400}
        alt="Luiz Filipe Miranda, retrato em preto e branco olhando para o lado."
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </figure>
  );
}
