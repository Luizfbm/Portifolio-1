import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { findTool, getTools } from '../data/toolbox';
import { useUi } from '../data/ui';
import { localePath, useLocale } from '../lib/locale';
import { CaseVideo } from '../components/CaseVideo';
import { SiteHeader } from '../components/SiteHeader';
import { SweepLink } from '../components/SweepLink';
import { CopyLine } from '../components/toolbox/CopyLine';
import { OutcomeGlyph } from '../components/toolbox/ToolIcons';
import { ToolTerminal } from '../components/toolbox/ToolTerminal';

/** Mesmo esqueleto das páginas de case, com os blocos de uma ferramenta. */
export default function ToolPage() {
  const { slug } = useParams();
  const ui = useUi();
  const t = ui.toolbox;
  const locale = useLocale();
  const tools = getTools(locale);
  const tool = findTool(slug, locale);

  useEffect(() => {
    if (tool) document.title = `${tool.name} · Toolbox · Luiz Filipe Miranda`;
  }, [tool]);

  if (!tool) return <Navigate to={localePath(locale, '/#toolbox')} replace />;

  const index = tools.findIndex((item) => item.slug === tool.slug);
  const next = tools.length > 1 ? tools[(index + 1) % tools.length] : null;

  return (
    <>
      <SiteHeader pinned />
      <main className="case tool-page" id="conteudo">
        <header className="case__head">
          <div className="shell">
            <Link className="case__back" to={localePath(locale, '/#toolbox')}>
              <span className="case__back-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="m12 19l-7-7l7-7m7 7H5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {t.back}
            </Link>
            <p className="case__context meta">{tool.kind}</p>
            <h1 className="case__title">{tool.name}</h1>
            <p className="case__summary">{tool.pitch}</p>
            <ul className="case__links">
              <li>
                <SweepLink href={tool.repo} external>
                  {t.repo}
                </SweepLink>
              </li>
            </ul>
          </div>
        </header>

        <div className="shell">
          <section className="case__block" aria-labelledby="demo-title">
            <h2 id="demo-title">{t.demo}</h2>
            {tool.video ? (
              <CaseVideo key={tool.video.src} {...tool.video} />
            ) : (
              <div className="tool-page__demo plate">
                <ToolTerminal tool={tool} title={tool.kind} />
              </div>
            )}
          </section>

          <section className="case__block" aria-labelledby="io-title">
            <h2 id="io-title">{t.io}</h2>
            <dl className="tool-page__io">
              <div>
                <dt className="meta">{t.input}</dt>
                <dd>{tool.input}</dd>
              </div>
              <div>
                <dt className="meta">{t.output}</dt>
                <dd>{tool.output}</dd>
              </div>
            </dl>
          </section>

          <section className="case__block" aria-labelledby="outcomes-title">
            <h2 id="outcomes-title">{tool.outcomes.label}</h2>
            <ul className="outcomes">
              {tool.outcomes.items.map((item) => (
                <li key={item.name}>
                  {item.icon ? <OutcomeGlyph icon={item.icon} /> : <span aria-hidden="true" />}
                  <span className="outcomes__name">{item.name}</span>
                  <span className="outcomes__body">{item.body}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="case__block" aria-labelledby="limits-title">
            <h2 id="limits-title">{t.limits}</h2>
            <p className="case__prose">{tool.limits}</p>
          </section>

          <section className="case__block" aria-labelledby="use-title">
            <h2 id="use-title">{t.useTitle}</h2>
            <div className="tool-page__use">
              <CopyLine label={t.install} text={tool.install} />
              <CopyLine label={t.run} text={tool.run} />
            </div>
            <p className="meta tool-page__agents-label">{t.agents}</p>
            <ul className="chips">
              {tool.agents.map((agent) => (
                <li key={agent}>{agent}</li>
              ))}
            </ul>
          </section>

          {next ? (
            <nav className="case__next" aria-label={t.nextLabel}>
              <Link to={localePath(locale, `/toolbox/${next.slug}`)}>
                <span className="meta">{t.next}</span>
                <span className="case__next-name">{next.name}</span>
              </Link>
            </nav>
          ) : (
            <div className="tool-page__end" />
          )}
        </div>
      </main>
    </>
  );
}
