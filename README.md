# Luiz Filipe Miranda - Portfolio

Meu portfólio: https://portfolio.luizfbm.win (em inglês em `/en`).

Hero com retrato e feixes de luz em 3D, experiência com números reais, quatro cases com prints do produto, arquitetura e código, e o CV para baixar.

## Stack

- Vite, React 19 e TypeScript
- React Three Fiber para os feixes do hero (carregado só depois da primeira pintura)
- Motion e Lenis para scroll e transições
- Cloudflare Workers servindo o `dist/` como assets estáticos

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/, com um HTML por rota para os previews de link
npm run deploy     # build + wrangler deploy
```

## Onde mexer

- `src/data/site.ts`: hero, experiência, stack e formação, em português e inglês
- `src/data/cases.ts`: os cases (texto em português, código, prints, diagramas)
- `src/data/cases.en.ts`: o texto dos cases em inglês
- `src/data/ui.ts`: textos de interface nos dois idiomas
- `public/assets/cases/`: prints dos projetos rodando local com dados de exemplo
- `public/og/`: imagens de preview (1200×630) do site e de cada case
- `public/cv/`: currículos em PDF, vindos do repositório Resume

O `vite.config.ts` gera `dist/en.html`, `dist/cases/*.html` e `dist/en/cases/*.html` com título, descrição e imagem de cada rota, além de `sitemap.xml` e `robots.txt`.
