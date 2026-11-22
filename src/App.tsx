import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { useUi } from './data/ui';
import { jumpTo, useSmoothScroll } from './lib/smoothScroll';
import Home from './pages/Home';
import CaseStudyPage from './pages/CaseStudyPage';
import './styles/tokens.css';
import './styles/base.css';
import './styles/studio.css';
import './styles/case.css';

/** Rota nova entra pelo topo; hash leva à seção depois que ela existe. */
function Positioning() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
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
  }, [pathname, hash]);

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
