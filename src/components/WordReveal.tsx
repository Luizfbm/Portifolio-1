import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useMediaQuery, useReducedMotion } from '../lib/motion';

type WordRevealProps = {
  text: string;
  note?: string;
};

/**
 * Skiper72 in-world: a segunda sessão é uma folha colada. As palavras entram
 * pela direita, com skew, e só param no centro quando o scroll paga o trecho.
 */
export function WordReveal({ text, note }: WordRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const narrow = useMediaQuery('(max-width: 780px)');
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const words = text.split(' ');

  if (reduced) {
    return (
      <section className="reveal reveal--static" id="posicionamento" aria-labelledby="posicionamento-title">
        <div className="reveal__pin">
          <div className="reveal__layout shell">
            <h2 className="visually-hidden" id="posicionamento-title">
              Posicionamento
            </h2>
            {note ? <p className="reveal__aside">{note}</p> : null}
            <p className="statement">{text}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reveal" id="posicionamento" ref={ref} aria-labelledby="posicionamento-title">
      <div className="reveal__pin">
        <div className="reveal__layout shell">
          <h2 className="visually-hidden" id="posicionamento-title">
            Posicionamento
          </h2>
          {note ? (
            <aside className="reveal__aside">
              <Note progress={scrollYProgress}>{note}</Note>
            </aside>
          ) : null}
          <p className="statement">
            {words.map((word, index) => (
              <Word
                key={`${word}-${index}`}
                progress={scrollYProgress}
                index={index}
                total={words.length}
                travel={narrow ? 14 : 88}
              >
                {word}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function Note({ children, progress }: { children: string; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.18, 0.85], [0.35, 1, 1]);
  const x = useTransform(progress, [0, 0.22], [-16, 0]);

  return (
    <motion.p style={{ opacity, x }} className="reveal__aside-text">
      {children}
    </motion.p>
  );
}

function Word({
  children,
  progress,
  index,
  total,
  travel
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  travel: number;
}) {
  const start = (index / total) * 0.62;
  const end = Math.min(1, start + 0.28);

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const x = useTransform(progress, [start, end], [travel, 0]);
  const skewX = useTransform(progress, [start, end], [travel > 40 ? 14 : 8, 0]);

  return (
    <>
      <motion.span className="reveal__word" style={{ opacity, x, skewX }}>
        {children}
      </motion.span>{' '}
    </>
  );
}
