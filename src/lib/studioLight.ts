import { useEffect, useRef } from 'react';

export type LightVector = { x: number; y: number };

/** Repouso do rig: key alta à esquerda, o lado para onde Luiz olha. */
const REST: LightVector = { x: -0.4, y: -0.42 };

export const liveLight: LightVector = { ...REST };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * O ponteiro move a key light no CSS. Os feixes 3D leem `liveLight` no
 * próprio frame, sem setState, para o React não reconciliar o Canvas.
 */
export function useStudioLight(enabled: boolean) {
  const stageRef = useRef<HTMLElement | null>(null);
  const target = useRef<LightVector>({ ...REST });
  const current = useRef<LightVector>({ ...REST });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const apply = ({ x, y }: LightVector) => {
      liveLight.x = x;
      liveLight.y = y;
      stage.style.setProperty('--key-x', x.toFixed(3));
      stage.style.setProperty('--key-y', y.toFixed(3));
      stage.style.setProperty('--key-px', `${(50 + x * 38).toFixed(2)}%`);
      stage.style.setProperty('--key-py', `${(40 + y * 30).toFixed(2)}%`);
      stage.style.setProperty('--shade-px', `${(50 - x * 44).toFixed(2)}%`);
      stage.style.setProperty('--shade-py', `${(46 - y * 22).toFixed(2)}%`);
    };

    apply(REST);

    if (!enabled) return;

    let frame = 0;

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = stage.getBoundingClientRect();
      target.current = {
        x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)),
        y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
      };
    };

    const onLeave = () => {
      target.current = { ...REST };
    };

    const tick = (time: number) => {
      const t = time / 1000;
      current.current = {
        x: lerp(current.current.x, target.current.x + Math.sin(t * 0.28) * 0.03, 0.1),
        y: lerp(current.current.y, target.current.y + Math.cos(t * 0.2) * 0.018, 0.1)
      };
      apply(current.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  return { stageRef };
}
