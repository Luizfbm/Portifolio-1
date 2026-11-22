import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from '../lib/motion';

type CaseVideoProps = {
  src: string;
  poster: string;
  label: string;
  caption: string;
};

/** Toca o vídeo só enquanto metade dele está na tela; pausa quando sai. */
function usePlayInView(ref: RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref, enabled]);
}

/**
 * Demo curta e sem áudio do produto rodando, na página do case. Só começa a
 * tocar sozinha quando aparece na tela, e nunca com prefers-reduced-motion:
 * aí fica no poster e quem quiser aperta o play.
 */
export function CaseVideo({ src, poster, label, caption }: CaseVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  usePlayInView(ref, !reduced);

  return (
    <figure className="screen case-video">
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        width={1280}
        height={800}
        preload="metadata"
        muted
        loop
        playsInline
        controls
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/**
 * A mesma demo como capa da vitrine: sem controles, sem som, em loop, como
 * se fosse a imagem. Com prefers-reduced-motion fica só o poster.
 */
export function CoverVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  usePlayInView(ref, !reduced);

  if (reduced) return <img src={poster} alt="" loading="lazy" />;
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      preload="metadata"
      muted
      loop
      playsInline
      disablePictureInPicture
    />
  );
}
