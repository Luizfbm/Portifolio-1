import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'luz:theme';

type Origin = { x: number; y: number };

type ThemeApi = {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggle: (origin?: Origin) => void;
};

const ThemeContext = createContext<ThemeApi | null>(null);

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function paintTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', next === 'dark' ? '#050505' : '#f8f8f8');
}

function canTransition(): boolean {
  return (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    paintTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    paintTheme(next);
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(
    (origin?: Origin) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';
      const apply = () => setTheme(next);

      if (!origin || !canTransition()) {
        apply();
        return;
      }

      document.documentElement.style.setProperty('--vt-x', `${origin.x}px`);
      document.documentElement.style.setProperty('--vt-y', `${origin.y}px`);

      try {
        const transition = document.startViewTransition(() => {
          flushSync(apply);
        });
        window.setTimeout(() => {
          try {
            transition.skipTransition();
          } catch {
            /* already finished */
          }
        }, 640);
      } catch {
        apply();
      }
    },
    [theme, setTheme]
  );

  const value = useMemo<ThemeApi>(
    () => ({
      theme,
      setTheme,
      toggle
    }),
    [theme, setTheme, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme precisa de ThemeProvider');
  return ctx;
}
