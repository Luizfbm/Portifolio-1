import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUi } from '../data/ui';
import { localePath, useLocale } from '../lib/locale';
import { useMediaQuery } from '../lib/motion';
import { LightSwitch } from './LightSwitch';
import { LocaleSwitch } from './LocaleSwitch';

const NAV = ['experiencia', 'cases', 'toolbox', 'stack', 'contato'] as const;

function SectionLink({ id, label }: { id: string; label: string }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const locale = useLocale();
  const home = localePath(locale, '/');
  const onHome = pathname === home;
  const target = localePath(locale, `/#${id}`);

  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onHome) return;
    event.preventDefault();
    navigate(target);
  };

  return (
    <a href={onHome ? `#${id}` : target} onClick={handle}>
      {label}
    </a>
  );
}

/**
 * No desktop a barra só acende depois que o estúdio sai de quadro. No
 * celular e nas páginas de case ela nasce visível, com o interruptor.
 */
export function SiteHeader({ pinned = false }: { pinned?: boolean }) {
  const t = useUi();
  const locale = useLocale();
  const narrow = useMediaQuery('(max-width: 780px)');
  const always = pinned || narrow;
  const [shown, setShown] = useState(always);

  useEffect(() => {
    if (always) {
      setShown(true);
      return;
    }
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [always]);

  return (
    <header className={`bar${shown ? ' is-shown' : ''}`}>
      <div className="bar__inner shell">
        <Link className="bar__name" to={localePath(locale, '/')}>
          Luiz Filipe Miranda
        </Link>
        <nav className="bar__nav" aria-label={t.navLabel}>
          <ul>
            {NAV.map((id) => (
              <li key={id}>
                <SectionLink id={id} label={t.nav[id]} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="bar__switch">
          <LocaleSwitch />
          <LightSwitch />
        </div>
      </div>
    </header>
  );
}
