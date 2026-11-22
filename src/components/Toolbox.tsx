import { useEffect, useRef, useState } from 'react';
import { useToolbox, type Tool, type VerdictKey } from '../data/toolbox';
import { useUi } from '../data/ui';
import { useReducedMotion } from '../lib/motion';

/**
 * Bancada: cada ferramenta ocupa uma linha, com o que ela faz de um lado e,
 * do outro, o terminal com os passos que ela segue. Quando o vídeo da
 * ferramenta existir, ele entra no lugar do terminal.
 */
export function Toolbox() {
  const tools = useToolbox();
  return (
    <div className="toolbox">
      {tools.map((tool, index) => (
        <ToolBench key={tool.id} tool={tool} index={index} />
      ))}
    </div>
  );
}

function ToolBench({ tool, index }: { tool: Tool; index: number }) {
  const t = useUi().toolbox;

  return (
    <article className="tool" aria-labelledby={`tool-${tool.id}`}>
      <div className="tool__body">
        <p className="tool__tag reading">
          {String(index + 1).padStart(2, '0')} · {tool.kind}
        </p>
        <h3 className="tool__name" id={`tool-${tool.id}`}>
          {tool.name}
        </h3>
        <p className="tool__pitch">{tool.pitch}</p>

        <dl className="tool__io">
          <div>
            <dt className="meta">{t.input}</dt>
            <dd>{tool.input}</dd>
          </div>
          <div>
            <dt className="meta">{t.output}</dt>
            <dd>{tool.output}</dd>
          </div>
        </dl>

        <h4 className="meta tool__label">{t.verdicts}</h4>
        <ul className="tool__verdicts">
          {tool.verdicts.map((verdict) => (
            <li key={verdict.key}>
              <VerdictIcon kind={verdict.key} />
              <span className="tool__verdict-name">{verdict.name}</span>
              <span className="tool__verdict-body">{verdict.body}</span>
            </li>
          ))}
        </ul>

        <h4 className="meta tool__label">{t.limits}</h4>
        <p className="tool__limits">{tool.limits}</p>

        <div className="tool__use">
          <CopyLine label={t.install} text={tool.install} />
          <CopyLine label={t.run} text={tool.run} />
        </div>

        <div className="tool__foot">
          <div>
            <span className="meta">{t.agents}</span>
            <ul className="chips">
              {tool.agents.map((agent) => (
                <li key={agent}>{agent}</li>
              ))}
            </ul>
          </div>
          <a className="vitrine__cta" href={tool.repo} target="_blank" rel="noreferrer">
            {t.repo}
          </a>
        </div>
      </div>

      <div className="tool__demo plate">
        {tool.video ? (
          <figure className="tool__video">
            <video src={tool.video.src} poster={tool.video.poster} controls playsInline preload="metadata" />
            <figcaption className="meta">{tool.video.caption}</figcaption>
          </figure>
        ) : (
          <Terminal tool={tool} title={t.demo} />
        )}
      </div>
    </article>
  );
}

/**
 * O comando é digitado quando o painel entra em quadro e os passos acendem
 * um a um. Todas as linhas já ocupam o espaço desde o início, então nada
 * empurra a página enquanto a animação roda.
 */
function Terminal({ tool, title }: { tool: Tool; title: string }) {
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

function CopyLine({ label, text }: { label: string; text: string }) {
  const t = useUi().toolbox;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(copyWithSelection(text));
    }
  };

  return (
    <div className="copy">
      <span className="meta">{label}</span>
      <div className="copy__box">
        <code>{text}</code>
        <button type="button" className="copy__button" onClick={copy} aria-label={t.copy(text)}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <span className="copy__status meta" role="status">
        {copied ? t.copied : ''}
      </span>
    </div>
  );
}

/** Plano B para navegador sem a API de área de transferência liberada. */
function copyWithSelection(text: string): boolean {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  field.remove();
  return ok;
}

const TICKET =
  'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z';
const VERDICT_MARK: Record<VerdictKey, string> = {
  confirmed: 'm9 12 2 2 4-4',
  likely: 'M13 5v2m0 10v2m0-8v2',
  discarded: 'm9.5 9.5 5 5m-5 0 5-5'
};

function VerdictIcon({ kind }: { kind: VerdictKey }) {
  return (
    <svg className={`tool__verdict-icon is-${kind}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={TICKET} />
      <path d={VERDICT_MARK[kind]} />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
