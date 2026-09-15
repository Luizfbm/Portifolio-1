import { useEffect } from 'react';
import { person, positioning, positioningNote } from '../data/site';
import { Education, Experience, Section, StackBand } from '../components/sections';
import { SiteHeader } from '../components/SiteHeader';
import { StudioStage } from '../components/StudioStage';
import { SweepLink } from '../components/SweepLink';
import { Vitrine } from '../components/Vitrine';
import { WordReveal } from '../components/WordReveal';

export default function Home() {
  useEffect(() => {
    document.title = 'Luiz Filipe Miranda, desenvolvedor full stack';
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <StudioStage />

        <WordReveal text={positioning} note={positioningNote} />

        <Section id="experiencia" title="Experiência" aside="Onde o trabalho foi entregue e o que mudou depois.">
          <Experience />
        </Section>

        <Section id="cases" title="Cases" aside="Quatro projetos com arquitetura, decisões e código abertos.">
          <Vitrine />
        </Section>

        <Section id="stack" title="Stack" aside="O que uso no dia a dia.">
          <StackBand />
        </Section>

        <Section id="formacao" title="Formação">
          <Education />
        </Section>

        <Section id="contato" title="Contato" aside="Resposta pelo email costuma ser a mais rápida.">
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
