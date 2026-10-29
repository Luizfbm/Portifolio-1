import { lazy, Suspense, useEffect, useState, type RefObject } from 'react';
import { useMediaQuery, useReducedMotion } from '../lib/motion';
import { useStudioLight } from '../lib/studioLight';
import { useTheme } from '../lib/theme';
import { person, useSite } from '../data/site';
import { useUi } from '../data/ui';
import { LightSwitch } from './LightSwitch';
import { LocaleSwitch } from './LocaleSwitch';
import { Portrait } from './Portrait';
import { SweepLink } from './SweepLink';

const Beams = lazy(() => import('./vendor/Beams'));

export function StudioStage() {
  const t = useUi();
  const { heroProof, cv } = useSite();
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

  // O three.js pesa ~240 KB gzip. Ele só entra depois que a página pintou e ficou
  // ociosa, e nem entra para quem pediu menos movimento ou economia de dados.
  const [rigReady, setRigReady] = useState(false);
  useEffect(() => {
    const { connection } = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (reduced || connection?.saveData) return;
    let idle = 0;
    let timer = 0;
    const start = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(() => setRigReady(true), { timeout: 2000 });
      } else {
        timer = window.setTimeout(() => setRigReady(true), 600);
      }
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  const light = theme === 'light';

  return (
    <section
      className="stage is-lit"
      id="topo"
      ref={stageRef as RefObject<HTMLElement>}
      aria-label={t.stageLabel}
    >
      <div className={`stage__rig${rigReady ? '' : ' stage__rig--still'}`} aria-hidden="true">
        {rigReady ? (
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
              paused={!inView}
              dpr={narrow ? [1, 1] : [1, 1.35]}
            />
          </Suspense>
        ) : null}
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
                {heroProof.current}
                <span className="panel__city">{person.city}</span>
              </p>
              <dl className="panel__proof">
                {heroProof.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.value}</dt>
                    <dd>{metric.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="panel__actions">
                <a className="button button--solid" href="#cases">
                  {t.seeCases}
                </a>
                <a className="button" href={cv} download>
                  {t.downloadCv}
                </a>
              </div>
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
        <LocaleSwitch />
        <LightSwitch />
      </div>

      {!reduced && !coarse ? <p className="stage__hint meta">{t.lightHint}</p> : null}
    </section>
  );
}
