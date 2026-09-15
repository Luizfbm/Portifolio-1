import { useEffect } from 'react';
import { useReducedMotion } from './motion';

/**
 * O estúdio precisa de position:sticky (skiper72) e o primeiro quadro precisa
 * responder no primeiro tick da roda. Lenis atrasava os dois. Âncoras usam
 * o scroll nativo, instantâneo se o visitante pediu reduced-motion.
 */
export function useSmoothScroll(): void {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    };

    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, [reduced]);
}
