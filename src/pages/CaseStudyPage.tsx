import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { findCase, getCases } from '../data/cases';
import { useUi } from '../data/ui';
import { localePath, useLocale } from '../lib/locale';
import { CodeViewer } from '../components/CodeViewer';
import { SiteHeader } from '../components/SiteHeader';
import { SweepLink } from '../components/SweepLink';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const t = useUi();
  const locale = useLocale();
  const cases = getCases(locale);
  const study = findCase(slug, locale);

  useEffect(() => {
    if (study) document.title = `${study.name} · Luiz Filipe Miranda`;
  }, [study]);

  if (!study) return <Navigate to={localePath(locale, '/')} replace />;

  const index = cases.findIndex((item) => item.slug === study.slug);
  const next = cases[(index + 1) % cases.length];

  return (
    <>
      <SiteHeader pinned />
      <main className="case" id="conteudo">
        <header className="case__head">
          <div className="shell">
            <Link className="case__back" to={localePath(locale, '/#cases')}>
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
              {t.caseBack}
            </Link>
            <p className="case__context meta">{study.context}</p>
            <h1 className="case__title">{study.headline}</h1>
            <p className="case__summary">{study.summary}</p>
            <ul className="case__links">
              {study.links.map((link) => (
                <li key={link.href}>
                  <SweepLink href={link.href} external>
                    {link.label}
                  </SweepLink>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="shell">
          <dl className="readings readings--strip">
            {study.readings.map((reading) => (
              <div key={reading.label}>
                <dt className="reading">{reading.label}</dt>
                <dd>{reading.value}</dd>
              </div>
            ))}
          </dl>

          <section className="case__block" aria-labelledby="historia-title">
            <h2 id="historia-title">{t.caseStory}</h2>
            <p className="case__prose">{study.story}</p>
          </section>

          {study.screens?.length ? (
            <section className="case__block" aria-labelledby="produto-title">
              <h2 id="produto-title">{t.caseProduct}</h2>
              <div className="screens">
                {study.screens.map((screen) => (
                  <figure key={screen.src} className="screen">
                    <img src={screen.src} alt={screen.alt} loading="lazy" />
                    <figcaption>{screen.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="screens__note meta">{study.screensNote ?? t.caseProductNote}</p>
            </section>
          ) : null}

          <section className="case__block" aria-labelledby="arquitetura-title">
            <h2 id="arquitetura-title">{t.caseArchitecture}</h2>
            <figure className="diagram">
              <img src={study.architecture.src} alt={study.architecture.alt} loading="lazy" />
              <figcaption>{study.architecture.caption}</figcaption>
            </figure>
          </section>

          {study.glossary?.length ? (
            <section className="case__block" aria-labelledby="glossario-title">
              <h2 id="glossario-title">{t.caseGlossary}</h2>
              <dl className="glossary">
                {study.glossary.map((entry) => (
                  <div key={entry.term}>
                    <dt>{entry.term}</dt>
                    <dd>{entry.body}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section className="case__block" aria-labelledby="valor-title">
            <h2 id="valor-title">{t.casePoints}</h2>
            <ul className="points">
              {study.points.map((point) => (
                <li key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="case__block" aria-labelledby="codigo-title">
            <h2 id="codigo-title">{t.caseCode}</h2>
            <CodeViewer tabs={study.code} />
          </section>

          <p className="case__closing">{study.closing}</p>

          <nav className="case__next" aria-label={t.caseNextLabel}>
            <Link to={localePath(locale, `/cases/${next.slug}`)}>
              <span className="meta">{t.caseNext}</span>
              <span className="case__next-name">{next.name}</span>
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
