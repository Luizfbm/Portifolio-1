import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { getCases } from './src/data/cases';
import type { Locale } from './src/lib/locale';

const ORIGIN = 'https://portfolio.luizfbm.win';

type Page = {
  file: string;
  locale: Locale;
  path: string;
  /** O mesmo endereço no outro idioma, para o hreflang. */
  alternate: string;
  title: string;
  description: string;
  image: string;
};

const home: Record<Locale, Omit<Page, 'file' | 'locale' | 'path' | 'alternate'>> = {
  pt: {
    title: 'Luiz Filipe Miranda, desenvolvedor full stack',
    description:
      'Portfólio de Luiz Filipe Miranda, desenvolvedor full stack em Vitória/ES. Experiência em ERP, saúde, educação e atendimento, com cases abertos de arquitetura e código.',
    image: '/og/site.jpg'
  },
  en: {
    title: 'Luiz Filipe Miranda, full stack developer',
    description:
      'Portfolio of Luiz Filipe Miranda, a full stack developer in Vitória, Brazil. ERP, healthcare, education and support work, with open case studies on architecture and code.',
    image: '/og/site.jpg'
  }
};

function pages(): Page[] {
  const list: Page[] = [
    { file: 'index.html', locale: 'pt', path: '/', alternate: '/en', ...home.pt },
    { file: 'en.html', locale: 'en', path: '/en', alternate: '/', ...home.en }
  ];
  for (const locale of ['pt', 'en'] as const) {
    const prefix = locale === 'en' ? '/en' : '';
    for (const study of getCases(locale)) {
      const path = `${prefix}/cases/${study.slug}`;
      list.push({
        file: `${path.slice(1)}.html`,
        locale,
        path,
        alternate: locale === 'en' ? `/cases/${study.slug}` : `/en/cases/${study.slug}`,
        title: `${study.name} · Luiz Filipe Miranda`,
        description: `${study.headline} ${study.summary}`,
        image: `/og/${study.slug}.jpg`
      });
    }
  }
  return list;
}

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function head(page: Page): string {
  const url = `${ORIGIN}${page.path}`;
  const pt = page.locale === 'pt' ? page.path : page.alternate;
  const en = page.locale === 'en' ? page.path : page.alternate;
  return [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${ORIGIN}${pt}" />`,
    `<link rel="alternate" hreflang="en" href="${ORIGIN}${en}" />`,
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}${pt}" />`,
    `<meta property="og:type" content="${page.path.includes('/cases/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="Luiz Filipe Miranda" />`,
    `<meta property="og:locale" content="${page.locale === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:image" content="${ORIGIN}${page.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`
  ].join('\n    ');
}

/**
 * O site é uma SPA, mas quem gera preview de link (LinkedIn, WhatsApp, Slack)
 * não roda JS. Cada rota ganha um HTML com o próprio título, descrição e
 * imagem; o Cloudflare serve `/cases/x` a partir de `cases/x.html`.
 */
function seoPages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'seo-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8');
      const block = /<!-- seo:[\s\S]*?<!-- \/seo -->/;
      if (!block.test(template)) throw new Error('index.html sem o bloco <!-- seo -->');
      for (const page of pages()) {
        const html = template
          .replace(block, head(page))
          .replace(/<html lang="[^"]*"/, `<html lang="${page.locale === 'pt' ? 'pt-BR' : 'en'}"`);
        const target = resolve(outDir, page.file);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, html);
      }
      const sitemap = pages()
        .map((page) => `  <url><loc>${ORIGIN}${page.path}</loc></url>`)
        .join('\n');
      writeFileSync(
        resolve(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`
      );
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
    }
  };
}

export default defineConfig({
  plugins: [react(), seoPages()],
  build: {
    target: 'es2022'
  }
});
