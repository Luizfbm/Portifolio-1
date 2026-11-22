import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis: Lenis | null = null;

/**
 * Lenis suaviza a roda sobre o scroll nativo, então position:sticky (skiper72)
 * continua valendo. O lerp fica acima do padrão (0.1) para o primeiro quadro
 * responder logo no primeiro tick. Âncoras são interceptadas aqui: se o salto
 * nativo do navegador acontece, ele chega antes da animação e o scroll vira
 * instantâneo. O Lenis respeita o scroll-padding-top e, com reduced-motion,
 * desliga a suavização sozinho.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.14,
      stopInertiaOnNavigate: true
    });
    lenis = instance;

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      instance.scrollTo(target);
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, []);
}

/** Troca de rota: posiciona sem animar, e sem brigar com a inércia em curso. */
export function jumpTo(target: number | HTMLElement): void {
  if (lenis) {
    lenis.scrollTo(target, { immediate: true, force: true });
    return;
  }
  if (typeof target === 'number') window.scrollTo(0, target);
  else target.scrollIntoView({ block: 'start' });
}
