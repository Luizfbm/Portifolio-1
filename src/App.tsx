import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { useUi } from './data/ui';
import { jumpTo, useSmoothScroll } from './lib/smoothScroll';
import { resolveScrollAnchor, type ScrollAnchor } from './lib/scrollAnchor';
import Home from './pages/Home';
import CaseStudyPage from './pages/CaseStudyPage';
import './styles/tokens.css';
import './styles/base.css';
import './styles/studio.css';
import './styles/case.css';

/**
 * Rota nova entra pelo topo; hash leva à seção depois que ela existe. A troca
 * de idioma traz uma âncora e volta ao mesmo ponto da página.
 */
function Positioning() {
  const { pathname, hash, state } = useLocation();
  const anchor = (state as { scrollAnchor?: ScrollAnchor | null } | null)?.scrollAnchor;

  useEffect(() => {
    if (anchor) {
      const restore = () => {
        const top = resolveScrollAnchor(anchor);
        if (top !== null) jumpTo(top);
      };
      restore();
      // De novo no quadro seguinte, quando o texto do outro idioma já assentou.
      const frame = requestAnimationFrame(restore);
      return () => cancelAnimationFrame(frame);
    }
    if (!hash) {
      jumpTo(0);
      return;
    }
    const id = hash.slice(1);
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) jumpTo(target);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, anchor]);

  return null;
}

function Shell() {
  useSmoothScroll();
  const t = useUi();

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t]);

  return (
    <>
      <Positioning />
      <a className="skip-link" href="#conteudo">
        {t.skip}
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases/:slug" element={<CaseStudyPage />} />
        <Route path="/en" element={<Home />} />
        <Route path="/en/cases/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
