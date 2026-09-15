export const person = {
  name: 'Luiz Filipe Miranda',
  fullName: 'Luiz Filipe Bungenstab Miranda',
  role: 'Full Stack',
  city: 'Vitória, ES',
  email: 'contatoluizfbm@gmail.com',
  github: { label: 'github.com/Luizfbm', href: 'https://github.com/Luizfbm' },
  linkedin: { label: 'linkedin.com/in/luizfilipedev', href: 'https://www.linkedin.com/in/luizfilipedev/' }
};

/** Frase do posicionamento, revelada palavra a palavra no scroll. */
export const positioning =
  'Pego operação confusa em saúde, educação, ERP e atendimento, e deixo no ar. IA entra só quando corta tempo ou risco.';

export const positioningNote =
  'Português nativo, inglês C1. Aberto a posições full stack, mobile e produtos com IA aplicada.';

export type Role = {
  company: string;
  href?: string;
  title: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    company: 'PVT Software',
    href: 'https://www.pvtsoftware.com.br/',
    title: 'Desenvolvedor Full Stack',
    period: 'atual',
    current: true,
    summary: 'Entrega e operação de sistemas internos, integração com ERP e agentes de IA colados no banco.',
    bullets: [
      'Deploy blue/green com PM2 e Nginx, com rollback quando a versão nova não se sustenta.',
      'Consulta de portfólio saiu de 36 segundos para 3 segundos.',
      'Sistema anti-alucinação para agentes que escrevem SQL e leem o ERP: tarefas de ~15 minutos passaram a levar 5, e o time adotou.',
      'Orquestrador em Node e PostgreSQL com Evolution API e painel em Next.js para o atendimento interno no WhatsApp.',
      'Integração com TOTVS RM por DataServer e REST/SOAP TBC.'
    ],
    stack: ['C#', 'NestJS', 'SQL', 'Docker', 'Next.js', 'React', 'TypeScript', 'Tailwind']
  },
  {
    company: 'S_line (Sistemas Online)',
    title: 'Desenvolvedor Web e Mobile',
    period: 'anterior',
    summary: 'Migração de apps legados e enxugamento do ciclo de build para uma base white-label.',
    bullets: [
      'Migrei apps feitos em FlutterFlow para React Native, TypeScript, Node.js e APIs REST.',
      'Refatorei mais de 48 telas e módulos usados por laboratórios em todo o país.',
      'CI/CD com EAS e GitHub Actions: build e deploy caíram de 2 dias para menos de 3 horas.',
      'Publiquei mais de 30 aplicativos white-label para iOS e Android.'
    ],
    stack: ['React Native', 'TypeScript', 'Node.js', 'EAS', 'GitHub Actions']
  },
  {
    company: 'Super Estágios',
    title: 'Estagiário Desenvolvedor Web',
    period: 'jul 2025 a out 2025',
    summary: 'Manutenção de fluxos na maior plataforma de estágios do Brasil.',
    bullets: [
      'Mantive funcionalidades em PHP, JavaScript, HTML, CSS e Bootstrap.',
      'Atuei em fluxos usados por 3,5 milhões de estudantes.',
      'Corrigi consultas, telas e integrações em MySQL e AWS, priorizando performance e consistência dos dados.'
    ],
    stack: ['PHP', 'JavaScript', 'MySQL', 'AWS']
  }
];

export const stackGroups: { label: string; items: string[] }[] = [
  {
    label: 'Linguagens',
    items: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'Python', 'Java', 'SQL']
  },
  {
    label: 'Frameworks',
    items: ['React', 'Next.js', 'React Native', 'Node.js', 'NestJS', 'Laravel', 'Tailwind', 'FastAPI']
  },
  {
    label: 'Dados',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Redis', 'Prisma', 'Drizzle', 'SQLite']
  },
  {
    label: 'Operação',
    items: ['Docker', 'Nginx', 'PM2', 'AWS', 'GitHub Actions', 'EAS', 'CI/CD', 'GitFlow']
  },
  {
    label: 'IA aplicada',
    items: ['RAG', 'Prompt Engineering', 'NLP', 'Streaming API', 'MCP', 'Agentic Workflows']
  },
  {
    label: 'Qualidade',
    items: ['TDD', 'Testes automatizados', 'RNTL', 'SOLID', 'API REST']
  }
];

export const education = [
  {
    school: 'Universidade Vila Velha (UVV)',
    course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    period: 'jul 2024 a dez 2026'
  },
  {
    school: 'Senac',
    course: 'Técnico de Informática para a Internet',
    period: 'jun 2022 a ago 2024'
  }
];
