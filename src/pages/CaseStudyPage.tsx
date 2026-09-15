import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { cases, findCase } from '../data/cases';
import { CodeViewer } from '../components/CodeViewer';
import { SiteHeader } from '../components/SiteHeader';
import { SweepLink } from '../components/SweepLink';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = findCase(slug);

  useEffect(() => {
    if (study) document.title = `${study.name} · Luiz Filipe Miranda`;
  }, [study]);

  if (!study) return <Navigate to="/" replace />;

  const index = cases.findIndex((item) => item.slug === study.slug);
  const next = cases[(index + 1) % cases.length];

  return (
    <>
      <SiteHeader pinned />
      <main className="case" id="conteudo">
        <header className="case__head">
          <div className="shell">
            <Link className="case__back" to="/#cases">
              Voltar aos cases
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
            <h2 id="historia-title">História</h2>
            <p className="case__prose">{study.story}</p>
          </section>

          <section className="case__block" aria-labelledby="arquitetura-title">
            <h2 id="arquitetura-title">Arquitetura</h2>
            <figure className="diagram">
              <img src={study.architecture.src} alt={study.architecture.alt} loading="lazy" />
              <figcaption>{study.architecture.caption}</figcaption>
            </figure>
          </section>

          <section className="case__block" aria-labelledby="valor-title">
            <h2 id="valor-title">O que isso mostra</h2>
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
            <h2 id="codigo-title">Código</h2>
            <CodeViewer tabs={study.code} />
          </section>

          <p className="case__closing">{study.closing}</p>

          <nav className="case__next" aria-label="Próximo case">
            <Link to={`/cases/${next.slug}`}>
              <span className="meta">próximo case</span>
              <span className="case__next-name">{next.name}</span>
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
}
