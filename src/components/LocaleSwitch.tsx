import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUi } from '../data/ui';
import { switchLocalePath, useLocale } from '../lib/locale';
import { captureScrollAnchor } from '../lib/scrollAnchor';

/**
 * Leva para a mesma página no outro idioma, no mesmo ponto em que o visitante
 * está. Mostra a sigla do idioma de destino.
 */
export function LocaleSwitch() {
  const t = useUi();
  const locale = useLocale();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Sem o hash: ele mandaria de volta para o começo da seção.
  const to = switchLocalePath(pathname, '');

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Abrir em outra aba ou janela segue o comportamento normal do link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to, { state: { scrollAnchor: captureScrollAnchor() } });
  };

  return (
    <Link
      className="locale"
      to={to}
      onClick={onClick}
      hrefLang={locale === 'pt' ? 'en' : 'pt-BR'}
      lang={locale === 'pt' ? 'en' : 'pt-BR'}
      title={t.switchTo}
      aria-label={t.switchLabel}
    >
      {locale === 'pt' ? 'EN' : 'PT'}
    </Link>
  );
}
