import { lazy, Suspense, useEffect, useState, type RefObject } from 'react';
import { useMediaQuery, useReducedMotion } from '../lib/motion';
import { useStudioLight } from '../lib/studioLight';
import { useTheme } from '../lib/theme';
import { person } from '../data/site';
import { LightSwitch } from './LightSwitch';
import { Portrait } from './Portrait';
import { SweepLink } from './SweepLink';

const Beams = lazy(() => import('./vendor/Beams'));

const NAV = [
  { href: '#experiencia', label: 'Experiência' },
  { href: '#cases', label: 'Cases' },
  { href: '#stack', label: 'Stack' },
  { href: '#contato', label: 'Contato' }
];

export function StudioStage() {
  const reduced = useReducedMotion();
  const coarse = useMediaQuery('(pointer: coarse)');
  const narrow = useMediaQuery('(max-width: 780px)');
  const { theme } = useTheme();
  const [inView, setInView] = useState(true);
  const { stageRef } = useStudioLight(!reduced && !coarse && inView);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '15% 0px',
      threshold: 0.02
    });
    io.observe(el);
    return () => io.disconnect();
  }, [stageRef]);

  const light = theme === 'light';

  return (
    <section
      className="stage is-lit"
      id="topo"
      ref={stageRef as RefObject<HTMLElement>}
      aria-label="Apresentação"
    >
      <div className="stage__rig" aria-hidden="true">
        <Suspense fallback={null}>
          <Beams
            beamWidth={narrow ? 2.4 : 2.2}
            beamHeight={18}
            beamNumber={narrow ? 4 : 8}
            speed={0.85}
            noiseIntensity={1.2}
            scale={0.2}
            rotation={narrow ? 24 : 32}
            lightColor="#ffffff"
            beamColor={light ? '#8e8e8e' : '#0f0f0f'}
            backgroundColor="#000000"
            transparent
            ambient={light ? 0.85 : 0.55}
            keyIntensity={light ? 1.2 : 1.35}
            fillIntensity={light ? 0.45 : 0.28}
            fillColor="#d4d4d4"
            paused={reduced || !inView}
            dpr={narrow ? [1, 1] : [1, 1.35]}
          />
        </Suspense>
      </div>

      <div className="stage__portrait">
        <Portrait priority />
      </div>

      <div className="stage__grid shell">
        <div className="stage__panel">
          <div className="panel plate">
            <div className="panel__body">
              <h1 className="panel__name">
                <span>Luiz</span>
                <span>Filipe</span>
                <span>Miranda</span>
              </h1>
              <p className="panel__role">
                {person.role} · {person.city}
              </p>
              <nav className="panel__nav" aria-label="Seções">
                <ul>
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <ul className="stage__contact">
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
        </div>
      </div>

      <div className="stage__switch">
        <LightSwitch />
      </div>

      {!reduced && !coarse ? <p className="stage__hint meta">a luz segue o mouse</p> : null}
    </section>
  );
}
