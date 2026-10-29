import { useState, type ReactNode } from 'react';
import { useSite, type Role as RoleData } from '../data/site';
import { useUi } from '../data/ui';
import { useMediaQuery, useReducedMotion } from '../lib/motion';
import LogoLoop from './vendor/LogoLoop';

export function Section({
  id,
  title,
  aside,
  children,
  wide
}: {
  id: string;
  title: string;
  aside?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section className={`section${wide ? ' section--wide' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="shell">
        <header className="section__head">
          <h2 id={`${id}-title`}>{title}</h2>
          {aside ? <p className="section__aside">{aside}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

/** No celular cada cargo mostra os 3 primeiros bullets; o resto abre sob demanda. */
const COMPACT_BULLETS = 3;

export function Experience() {
  const { roles } = useSite();
  const compact = useMediaQuery('(max-width: 780px)');

  return (
    <ol className="roles">
      {roles.map((role) => (
        <Role key={role.company} role={role} compact={compact} />
      ))}
    </ol>
  );
}

function Role({ role, compact }: { role: RoleData; compact: boolean }) {
  const t = useUi();
  const [open, setOpen] = useState(false);
  const hidden = compact && !open ? Math.max(0, role.bullets.length - COMPACT_BULLETS) : 0;
  const bullets = hidden ? role.bullets.slice(0, COMPACT_BULLETS) : role.bullets;

  return (
    <li className={`role${role.current ? ' role--current' : ''}`}>
      <div className="role__id">
        <h3 className="role__company">
          {role.href ? (
            <a href={role.href} target="_blank" rel="noreferrer">
              {role.company}
            </a>
          ) : (
            role.company
          )}
        </h3>
        <p className="role__title">{role.title}</p>
        <p className="role__period reading">{role.period}</p>
      </div>
      <div className="role__body">
        <p className="role__summary">{role.summary}</p>
        <ul className="role__bullets">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {hidden ? (
          <button type="button" className="role__more" onClick={() => setOpen(true)}>
            {t.more(hidden)}
          </button>
        ) : null}
        <ul className="chips">
          {role.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

const MARQUEE = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'NestJS',
  'React Native',
  'PostgreSQL',
  'Prisma',
  'Docker',
  'C#',
  'SQL Server',
  'Tailwind',
  'GitHub Actions',
  'RabbitMQ',
  'Nginx',
  'AWS'
];

export function StackBand() {
  const t = useUi();
  const { stackGroups } = useSite();
  const reduced = useReducedMotion();
  const logos = MARQUEE.map((name) => ({
    node: <span className="wordmark">{name}</span>,
    title: name
  }));

  return (
    <>
      <div className="band">
        <LogoLoop
          logos={logos}
          speed={reduced ? 0 : 38}
          direction="left"
          gap={64}
          logoHeight={34}
          pauseOnHover={!reduced}
          fadeOut
          fadeOutColor="var(--plane)"
          ariaLabel={t.stackLoop}
        />
      </div>

      <dl className="stack">
        {stackGroups.map((group) => (
          <div key={group.label} className="stack__group">
            <dt className="meta">{group.label}</dt>
            <dd>{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function Education() {
  const { education } = useSite();
  return (
    <ul className="education">
      {education.map((entry) => (
        <li key={entry.school}>
          <h3>{entry.school}</h3>
          <p>{entry.course}</p>
          <p className="reading">{entry.period}</p>
        </li>
      ))}
    </ul>
  );
}
