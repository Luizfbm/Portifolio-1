import { useEffect } from 'react';
import { person, useSite } from '../data/site';
import { useUi } from '../data/ui';
import { Education, Experience, Section, StackBand } from '../components/sections';
import { SiteHeader } from '../components/SiteHeader';
import { StudioStage } from '../components/StudioStage';
import { SweepLink } from '../components/SweepLink';
import { Vitrine } from '../components/Vitrine';
import { WordReveal } from '../components/WordReveal';

export default function Home() {
  const t = useUi();
  const { positioning, positioningNote } = useSite();

  useEffect(() => {
    document.title = t.title;
  }, [t]);

  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <StudioStage />

        <WordReveal text={positioning} note={positioningNote} title={t.positioningTitle} />

        <Section id="experiencia" title={t.sections.experiencia.title} aside={t.sections.experiencia.aside}>
          <Experience />
        </Section>

        <Section id="cases" title={t.sections.cases.title} aside={t.sections.cases.aside}>
          <Vitrine />
        </Section>

        <Section id="stack" title={t.sections.stack.title} aside={t.sections.stack.aside}>
          <StackBand />
        </Section>

        <Section id="formacao" title={t.sections.formacao.title}>
          <Education />
        </Section>

        <Section id="contato" title={t.sections.contato.title} aside={t.sections.contato.aside}>
          <ul className="contact">
            <li>
              <SweepLink href={`mailto:${person.email}`}>{person.email}</SweepLink>
            </li>
            <li>
              <SweepLink href={person.github.href} external>
                {person.github.label}
              </SweepLink>
            </li>
            <li>
              <SweepLink href={person.linkedin.href} external>
                {person.linkedin.label}
              </SweepLink>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="foot">
        <div className="shell">
          <p>{person.fullName}</p>
          <p className="meta">{person.city}</p>
        </div>
      </footer>
    </>
  );
}
