# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript + React Three Fiber + Lenis. Output estático (`dist/`) publicado no Cloudflare Worker `portifolio`. Sem API, D1 ou CMS neste redesign. Escolha do usuário em 2026-09-11 (delegated from the static HTML incumbent).

## Users

Visitante principal: recrutador ou tech lead abrindo o link para decidir se chama Luiz. Visitante secundário: devs pares vindo pelo GitHub para julgar craft. Os dois compartilham a mesma superfície; o job #1 é o recrutador.

## Product Purpose

Portfólio pessoal de Luiz Filipe Bungenstab Miranda. Existe para o visitante sair impressionado com craft (3D, motion, UI) e ainda conseguir escanear prova real de entrega. Sucesso: o artefato é memorável e os cases + contato estão acháveis.

## Positioning

Full stack que pega operação confusa (saúde, educação, ERP, atendimento) e deixa no ar, com IA só quando reduz tempo ou risco de verdade. O site é o próprio artefato de craft, não um template com bullets.

## Operating Context

O visitante chega de GitHub, LinkedIn ou email, em desktop ou telefone, com pouco tempo. Lê em português. Avalia contra outros portfólios de dev. Deploy alvo: Cloudflare Worker já existente (`https://portifolio.contatoluizfbm.workers.dev`). O look terminal atual é anti-referência; pode ser descartado por completo.

## Capabilities and Constraints

- Superfície única: home com retrato, experiência, cases, contato. Cases existentes têm páginas próprias e continuam existindo como conteúdo.
- Quatro cases obrigatórios: Chrono Crash, IAeJovem, Case Flow, Dev-roast.
- Contato visível: `contatoluizfbm@gmail.com`, GitHub `Luizfbm`, LinkedIn `luizfilipedev`.
- Copy pode ser reescrita; fatos não.
- Sem backend neste fase.
- Datas do cargo atual na PVT e do encerramento na S_line: não informadas.
- Título do cargo na PVT: não informado; a JD descreve atuação full stack (C#, NestJS, SQL, Docker, Next.js, React, TypeScript, Tailwind). Gravado como Desenvolvedor Full Stack até correção.
- Galeria tipo Skiper16: explicitamente em aberto.

## Brand Commitments

- Nome: Luiz Filipe Miranda.
- Retrato em `assets/luiz-portrait.png` (P&B, recorte com alpha derivado do JPEG sem fundo). Aparece no primeiro viewport, sobre os Beams. A paleta do site é extraída desta imagem: pretos, carvões, pratas, branco. Não inventar um accent colorido que a foto não tem.
- Claro e escuro existem (referência Skiper4); os dois modos continuam dentro da família da foto.
- Ingredientes de UI que o autor quer no redesign (não são o mundo visual inteiro): Skiper80 (vitrine de projetos), Skiper4 (toggle), Skiper40 (links), Skiper72 (reveal de texto numa seção), React Bits Beams (fundo 3D de feixes), GlassSurface (vidro), LogoLoop (faixa de stack). Skiper16 (pilha de cards no scroll) fica para decisão posterior.
- Tom: direto, técnico, em português. Sem hype inventado.

## Evidence on Hand

- Retrato: `assets/luiz-portrait.png` (alpha). Fonte JPEG original em `assets/luiz-portrait-cutout-source.jpg`.
- Experiência atual, PVT Software (`https://www.pvtsoftware.com.br/`): blue/green com PM2 + Nginx e rollback; query de portfólio 36s → 3s; sistema anti-alucinação para agentes SQL/ERP (~15min → 5min, adotado pelo time); orquestrador Node/PostgreSQL + Evolution API + painel Next.js para atendimento interno no WhatsApp; integração TOTVS RM (DataServer, REST/SOAP TBC). Stack citada: C#, NestJS, SQL, Docker, Next.js, React, TypeScript, Tailwind.
- S_line — Sistemas Online (anterior): React Native / Node; 48+ telas; EAS + GitHub Actions (2 dias → <3h); 30+ apps white-label. O site antigo marcava este cargo como "atual"; isso está obsoleto.
- Super Estágios (estágio): PHP/JS; fluxos com 3,5 milhões de estudantes.
- Cases em `projects/`: Chrono Crash, IAeJovem, Case Flow, Dev-roast, com diagramas em `assets/`.
- Formação no site atual: UVV (TADS, jul 2024–dez 2026) e Senac (Técnico de Informática para Internet). Não foi confirmada como obrigatória neste grill.
- Métricas do site antigo (50+ laboratórios, 5.000 usuários, etc.) são do período S_line; não fabricar número novo da PVT.

## Product Principles

- Recrutador encontra prova e contato sem caçar; par encontra craft para ficar.
- 3D e motion servem o retrato e os cases, não um showcase de biblioteca.
- Fato verdadeiro > frase bonita. Sem depoimento, cliente ou métrica inventados.
- A foto é a origem da identidade; o resto obedece a ela.
- O visual terminal não é identidade. Descarte-o.

## Accessibility & Inclusion

Português nativo, inglês C1. Motion e 3D devem respeitar `prefers-reduced-motion` (já era regra no incumbente; Beams/Lenis/reveals não podem ignorar).
