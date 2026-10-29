import { Link, useLocation } from 'react-router-dom';
import { useUi } from '../data/ui';
import { switchLocalePath, useLocale } from '../lib/locale';

/** Leva para a mesma página no outro idioma. Mostra a sigla do idioma de destino. */
export function LocaleSwitch() {
  const t = useUi();
  const locale = useLocale();
  const { pathname, hash } = useLocation();

  return (
    <Link
      className="locale"
      to={switchLocalePath(pathname, hash)}
      hrefLang={locale === 'pt' ? 'en' : 'pt-BR'}
      lang={locale === 'pt' ? 'en' : 'pt-BR'}
      title={t.switchTo}
      aria-label={t.switchLabel}
    >
      {locale === 'pt' ? 'EN' : 'PT'}
    </Link>
  );
}
