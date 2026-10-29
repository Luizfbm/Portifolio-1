import { useLocation } from 'react-router-dom';

export type Locale = 'pt' | 'en';

/** Português mora na raiz; inglês ganha o prefixo /en. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt';
}

export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname);
}

/** Leva um caminho da raiz (`/`, `/#cases`, `/cases/x`) para o idioma pedido. */
export function localePath(locale: Locale, path: string): string {
  if (locale === 'pt') return path;
  if (path === '/') return '/en';
  if (path.startsWith('/#')) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** O mesmo endereço no outro idioma, para o seletor PT/EN. */
export function switchLocalePath(pathname: string, hash: string): string {
  const bare = localeFromPath(pathname) === 'en' ? pathname.replace(/^\/en/, '') || '/' : pathname;
  return localePath(localeFromPath(pathname) === 'en' ? 'pt' : 'en', bare) + hash;
}
