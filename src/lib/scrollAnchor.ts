/**
 * Guarda onde o visitante está na página de um jeito que sobrevive à troca de
 * idioma: qual bloco está no topo da tela e quanto dele já passou. O texto muda
 * de altura entre português e inglês, então o pixel exato não serviria.
 */
export type ScrollAnchor = { index: number; ratio: number };

const BLOCKS = 'main > section, main .case__head, main .case__block';

function blocks(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(BLOCKS));
}

export function captureScrollAnchor(): ScrollAnchor | null {
  const list = blocks();
  let index = -1;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].getBoundingClientRect().top <= 1) index = i;
  }
  if (index < 0) return null;
  const rect = list[index].getBoundingClientRect();
  return { index, ratio: rect.height > 0 ? Math.min(1, -rect.top / rect.height) : 0 };
}

/** A posição de scroll que devolve o visitante ao mesmo ponto, ou null se o bloco sumiu. */
export function resolveScrollAnchor(anchor: ScrollAnchor): number | null {
  const el = blocks()[anchor.index];
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return Math.max(0, Math.round(rect.top + window.scrollY + anchor.ratio * rect.height));
}
