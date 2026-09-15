import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { cases } from '../data/cases';
import { useMediaQuery, useReducedMotion } from '../lib/motion';

/**
 * Mesa de luz: os quatro nomes ficam no escuro até a lâmina cair em um deles.
 * A ficha ao lado é um lightbox de vidro — prova curta, sem o diagrama que
 * só faz sentido na página do case.
 */
export function Vitrine() {
  const compact = useMediaQuery('(max-width: 900px)');
  const reduced = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState(cases[0].slug);
  const active = cases.find((item) => item.slug === activeSlug) ?? cases[0];

  if (compact) {
    return (
      <ul className="vitrine vitrine--stacked">
        {cases.map((item) => (
          <li key={item.slug}>
            <Link className="vitrine__card plate" to={`/cases/${item.slug}`}>
              <h3 className="vitrine__name">{item.name}</h3>
              <p className="vitrine__context meta">{item.context}</p>
              <p className="vitrine__summary">{item.headline}</p>
              <ul className="chips">
                {item.stack.slice(0, 5).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <span className="vitrine__cta">Ver o case</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="vitrine" onMouseLeave={() => setActiveSlug(cases[0].slug)}>
      <ul className="vitrine__list">
        {cases.map((item) => {
          const on = item.slug === activeSlug;
          return (
            <li key={item.slug} className={on ? 'is-lit' : undefined}>
              <Link
                className="vitrine__row"
                to={`/cases/${item.slug}`}
                onMouseEnter={() => setActiveSlug(item.slug)}
                onFocus={() => setActiveSlug(item.slug)}
              >
                <span className="vitrine__name">{item.name}</span>
                <span className="vitrine__context meta">{item.context}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="vitrine__sheet plate">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.slug}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="vitrine__headline">{active.headline}</h3>
            <p className="vitrine__summary">{active.summary}</p>
            <dl className="readings">
              {active.readings.slice(0, 2).map((reading) => (
                <div key={reading.label}>
                  <dt className="reading">{reading.label}</dt>
                  <dd>{reading.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="chips">
              {active.stack.slice(0, 6).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <Link className="vitrine__cta" to={`/cases/${active.slug}`}>
              Ver o case {active.name}
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
