import { useEffect, useRef, useState } from 'react';
import type { Tool } from '../../data/toolbox';
import { useReducedMotion } from '../../lib/motion';

/**
 * O comando é digitado quando o terminal entra em quadro e os passos acendem
 * um a um. Todas as linhas já ocupam o espaço desde o início, então nada
 * empurra a página enquanto a animação roda.
 */
export function ToolTerminal({ tool, title }: { tool: Tool; title: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const total = tool.steps.length + 1;
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);
  const done = reduced || shown >= total;

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!started || reduced) return;
    if (typed < tool.run.length) {
      const id = window.setTimeout(() => setTyped((n) => n + 1), 26);
      return () => window.clearTimeout(id);
    }
    if (shown < total) {
      const id = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 420 : 340);
      return () => window.clearTimeout(id);
    }
  }, [started, reduced, typed, shown, total, tool.run.length]);

  const command = reduced ? tool.run : tool.run.slice(0, typed);
  const lit = (row: number) => reduced || shown > row;

  return (
    <div className="term" ref={ref}>
      <p className="term__title meta">
        {title}
        <span className="reading">{tool.name}</span>
      </p>
      <p className="term__prompt">
        <span aria-hidden="true">›</span>
        <span className="visually-hidden">{tool.run}</span>
        <span aria-hidden="true">
          {command}
          {done ? null : <span className="term__caret" />}
        </span>
      </p>
      <ol className="term__steps">
        {tool.steps.map((step, row) => (
          <li key={step.label} className={lit(row) ? 'is-lit' : undefined}>
            <span className="term__label">{step.label}</span>
            <span>{step.body}</span>
          </li>
        ))}
      </ol>
      <p className={`term__closing${lit(tool.steps.length) ? ' is-lit' : ''}`}>{tool.closing}</p>
    </div>
  );
}
