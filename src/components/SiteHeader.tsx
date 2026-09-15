import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../lib/motion';
import { LightSwitch } from './LightSwitch';

const NAV = [
  { id: 'experiencia', label: 'Experiência' },
  { id: 'cases', label: 'Cases' },
  { id: 'stack', label: 'Stack' },
  { id: 'contato', label: 'Contato' }
];

function SectionLink({ id, label }: { id: string; label: string }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';

  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    if (onHome) return;
    event.preventDefault();
    navigate(`/#${id}`);
  };

  return (
    <a href={onHome ? `#${id}` : `/#${id}`} onClick={handle}>
      {label}
    </a>
  );
}

/**
 * No desktop a barra só acende depois que o estúdio sai de quadro. No
 * celular e nas páginas de case ela nasce visível, com o interruptor.
 */
export function SiteHeader({ pinned = false }: { pinned?: boolean }) {
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
        <Link className="bar__name" to="/">
          Luiz Filipe Miranda
        </Link>
        <nav className="bar__nav" aria-label="Navegação principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <SectionLink id={item.id} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="bar__switch">
          <LightSwitch />
        </div>
      </div>
    </header>
  );
}
