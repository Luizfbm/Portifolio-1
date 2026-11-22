import { useLocale, type Locale } from '../lib/locale';

/** Textos de interface. O conteúdo (cargos, cases) mora em site.ts e cases.ts. */
const pt = {
  htmlLang: 'pt-BR',
  title: 'Luiz Filipe Miranda, desenvolvedor full stack',
  skip: 'Pular para o conteúdo',
  nav: { experiencia: 'Experiência', cases: 'Cases', toolbox: 'Toolbox', stack: 'Stack', contato: 'Contato' },
  navLabel: 'Navegação principal',
  switchTo: 'English',
  switchLabel: 'Ver o site em inglês',
  stageLabel: 'Apresentação',
  lightHint: 'a luz segue o mouse',
  seeCases: 'Ver cases',
  downloadCv: 'Baixar CV',
  themeToDark: 'Usar tema escuro',
  themeToLight: 'Usar tema claro',
  sections: {
    experiencia: { title: 'Experiência', aside: 'Onde o trabalho foi entregue e o que mudou depois.' },
    cases: { title: 'Cases', aside: 'Cinco projetos com arquitetura, decisões e código abertos.' },
    toolbox: { title: 'Toolbox', aside: 'Skills e MCPs que eu escrevo para os meus agentes. Cada uma faz um trabalho só.' },
    stack: { title: 'Stack', aside: 'O que uso no dia a dia.' },
    formacao: { title: 'Formação' },
    contato: { title: 'Contato', aside: 'Resposta pelo email costuma ser a mais rápida.' }
  },
  positioningTitle: 'Posicionamento',
  more: (n: number) => `Mais ${n} ${n === 1 ? 'ponto' : 'pontos'}`,
  stackLoop: 'Tecnologias usadas no dia a dia',
  seeCase: 'Ver o case',
  seeCaseNamed: (name: string) => `Ver o case ${name}`,
  caseBack: 'Voltar aos cases',
  caseProduct: 'Produto',
  caseProductNote: 'Rodando local, com dados de exemplo.',
  caseChallenge: 'O desafio',
  caseStory: 'História',
  caseGlossary: 'Em palavras simples',
  caseArchitecture: 'Arquitetura',
  casePoints: 'O que isso mostra',
  caseCode: 'Código',
  eduAbout: 'A instituição',
  eduProgram: 'O curso',
  eduTopics: 'O que estudei',
  caseNext: 'próximo case',
  caseNextLabel: 'Próximo case',
  codeTabs: 'Arquivos do case',
  toolbox: {
    input: 'Você manda',
    output: 'Volta',
    verdicts: 'Vereditos',
    limits: 'O que ela não faz',
    install: 'Para instalar, cole no seu agente',
    run: 'Para usar',
    copy: (what: string) => `Copiar: ${what}`,
    copied: 'Copiado',
    agents: 'Roda em',
    repo: 'Ver no GitHub',
    demo: 'Como ela trabalha'
  }
};

export type Ui = typeof pt;

const en: Ui = {
  htmlLang: 'en',
  title: 'Luiz Filipe Miranda, full stack developer',
  skip: 'Skip to content',
  nav: { experiencia: 'Experience', cases: 'Work', toolbox: 'Toolbox', stack: 'Stack', contato: 'Contact' },
  navLabel: 'Main navigation',
  switchTo: 'Português',
  switchLabel: 'Ver o site em português',
  stageLabel: 'Introduction',
  lightHint: 'the light follows the cursor',
  seeCases: 'See the work',
  downloadCv: 'Download resume',
  themeToDark: 'Switch to dark theme',
  themeToLight: 'Switch to light theme',
  sections: {
    experiencia: { title: 'Experience', aside: 'Where the work shipped and what changed afterwards.' },
    cases: { title: 'Work', aside: 'Five projects with architecture, decisions and code in the open.' },
    toolbox: { title: 'Toolbox', aside: 'Skills and MCPs I write for my own agents. Each one does a single job.' },
    stack: { title: 'Stack', aside: 'What I use day to day.' },
    formacao: { title: 'Education' },
    contato: { title: 'Contact', aside: 'Email is usually the fastest way to reach me.' }
  },
  positioningTitle: 'Positioning',
  more: (n: number) => `${n} more ${n === 1 ? 'point' : 'points'}`,
  stackLoop: 'Technologies I use day to day',
  seeCase: 'Read the case',
  seeCaseNamed: (name: string) => `Read the ${name} case`,
  caseBack: 'Back to work',
  caseProduct: 'Product',
  caseProductNote: 'Running locally with sample data.',
  caseChallenge: 'The challenge',
  caseStory: 'Story',
  caseGlossary: 'In plain words',
  caseArchitecture: 'Architecture',
  casePoints: 'What it shows',
  caseCode: 'Code',
  eduAbout: 'The school',
  eduProgram: 'The course',
  eduTopics: 'What I studied',
  caseNext: 'next case',
  caseNextLabel: 'Next case',
  codeTabs: 'Case files',
  toolbox: {
    input: 'You send',
    output: 'You get',
    verdicts: 'Verdicts',
    limits: 'What it does not do',
    install: 'To install, paste this into your agent',
    run: 'To use it',
    copy: (what: string) => `Copy: ${what}`,
    copied: 'Copied',
    agents: 'Runs on',
    repo: 'See it on GitHub',
    demo: 'How it works'
  }
};

export const ui: Record<Locale, Ui> = { pt, en };

export function useUi(): Ui {
  return ui[useLocale()];
}
