import { useLocale, type Locale } from '../lib/locale';

export const person = {
  name: 'Luiz Filipe Miranda',
  fullName: 'Luiz Filipe Bungenstab Miranda',
  city: 'Vitória, ES',
  email: 'contatoluizfbm@gmail.com',
  github: { label: 'github.com/Luizfbm', href: 'https://github.com/Luizfbm' },
  linkedin: { label: 'linkedin.com/in/luizfilipedev', href: 'https://www.linkedin.com/in/luizfilipedev/' }
};

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

export type SiteContent = {
  role: string;
  cv: string;
  /** Primeira prova que o recrutador vê, ainda no hero. Números do cargo atual. */
  heroProof: { current: string; metrics: { value: string; label: string }[] };
  /** Frase do posicionamento, revelada palavra a palavra no scroll. */
  positioning: string;
  positioningNote: string;
  roles: Role[];
  stackGroups: { label: string; items: string[] }[];
  education: { school: string; course: string; period: string }[];
};

const pt: SiteContent = {
  role: 'Full Stack',
  cv: '/cv/Luiz_Filipe_Miranda_Curriculo_Full_Stack.pdf',
  heroProof: {
    current: 'Full Stack na PVT Software, desde jul 2026',
    metrics: [
      { value: '36s → 3s', label: 'consulta SQL de portfólio' },
      { value: '15 → 5 min', label: 'consultas SQL/ERP com agentes de IA' }
    ]
  },
  positioning:
    'Pego operação confusa em saúde, educação, ERP e atendimento, e deixo no ar. IA entra só quando corta tempo ou risco.',
  positioningNote: 'Português nativo, inglês C1. Aberto a posições full stack, mobile e produtos com IA aplicada.',
  roles: [
    {
      company: 'PVT Software',
      href: 'https://www.pvtsoftware.com.br/',
      title: 'Desenvolvedor Full Stack',
      period: 'jul 2026 até hoje',
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
      title: 'Desenvolvedor Full Stack e Mobile',
      period: 'dez 2025 a jul 2026',
      summary: 'Migração de apps legados e enxugamento do ciclo de build para uma base white-label.',
      bullets: [
        'Migrei apps feitos em FlutterFlow para React Native, TypeScript e Node.js, usados por mais de 50 laboratórios.',
        'Refatorei mais de 48 telas e módulos no caminho da migração.',
        'CI/CD com EAS e GitHub Actions: build e deploy caíram de 2 dias para menos de 3 horas.',
        'A desistência na compra de apps novos caiu 30%.',
        'Publiquei mais de 30 aplicativos white-label para iOS e Android.'
      ],
      stack: ['React Native', 'TypeScript', 'Node.js', 'EAS', 'GitHub Actions']
    },
    {
      company: 'Super Estágios',
      title: 'Estagiário Desenvolvedor Web',
      period: 'jul 2025 a set 2025',
      summary: 'Manutenção de fluxos na maior plataforma de estágios do Brasil.',
      bullets: [
        'Mantive funcionalidades em PHP, JavaScript, HTML, CSS e Bootstrap.',
        'Atuei em fluxos usados por 3,5 milhões de estudantes.',
        'Corrigi consultas, telas e integrações em MySQL e AWS, priorizando performance e consistência dos dados.'
      ],
      stack: ['PHP', 'JavaScript', 'MySQL', 'AWS']
    }
  ],
  stackGroups: [
    { label: 'Linguagens', items: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'Python', 'Java', 'SQL'] },
    {
      label: 'Frameworks',
      items: ['React', 'Next.js', 'React Native', 'Node.js', 'NestJS', 'Laravel', 'Tailwind', 'FastAPI']
    },
    { label: 'Dados', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Redis', 'Prisma', 'Drizzle', 'SQLite'] },
    { label: 'Operação', items: ['Docker', 'Nginx', 'PM2', 'AWS', 'GitHub Actions', 'EAS', 'CI/CD', 'GitFlow'] },
    { label: 'IA aplicada', items: ['RAG', 'Prompt Engineering', 'NLP', 'Streaming API', 'MCP', 'Agentic Workflows'] },
    { label: 'Qualidade', items: ['TDD', 'Testes automatizados', 'RNTL', 'SOLID', 'API REST'] }
  ],
  education: [
    {
      school: 'Universidade Vila Velha (UVV)',
      course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      period: 'jul 2024 a dez 2026'
    },
    { school: 'Senac', course: 'Técnico de Informática para a Internet', period: 'jun 2022 a ago 2024' }
  ]
};

const en: SiteContent = {
  role: 'Full Stack',
  cv: '/cv/Luiz_Filipe_Miranda_Resume_Full_Stack.pdf',
  heroProof: {
    current: 'Full Stack at PVT Software since Jul 2026',
    metrics: [
      { value: '36s → 3s', label: 'portfolio SQL query' },
      { value: '15 → 5 min', label: 'SQL/ERP queries with AI agents' }
    ]
  },
  positioning:
    'I take messy operations in healthcare, education, ERP and customer support and ship them. AI comes in only when it cuts time or risk.',
  positioningNote: 'Native Portuguese, C1 English. Open to full stack, mobile and applied AI product roles.',
  roles: [
    {
      company: 'PVT Software',
      href: 'https://www.pvtsoftware.com.br/',
      title: 'Full Stack Developer',
      period: 'Jul 2026 to present',
      current: true,
      summary: 'Building and running internal systems, ERP integration and AI agents that work on top of the database.',
      bullets: [
        'Blue/green deploys with PM2 and Nginx, with rollback when the new release does not hold.',
        'A portfolio query went from 36 seconds to 3 seconds.',
        'Anti-hallucination system for agents that write SQL and read the ERP: ~15-minute tasks now take 5, and the team adopted it.',
        'Node and PostgreSQL orchestrator with Evolution API and a Next.js panel for internal support over WhatsApp.',
        'TOTVS RM integration through DataServer and REST/SOAP TBC.'
      ],
      stack: ['C#', 'NestJS', 'SQL', 'Docker', 'Next.js', 'React', 'TypeScript', 'Tailwind']
    },
    {
      company: 'S_line (Sistemas Online)',
      title: 'Full Stack and Mobile Developer',
      period: 'Dec 2025 to Jul 2026',
      summary: 'Migrating legacy apps and cutting the build cycle down for a white-label codebase.',
      bullets: [
        'Migrated FlutterFlow apps to React Native, TypeScript and Node.js, used by more than 50 labs.',
        'Refactored more than 48 screens and modules along the way.',
        'CI/CD with EAS and GitHub Actions: build and deploy went from 2 days to under 3 hours.',
        'Drop-off when buying new apps fell 30%.',
        'Shipped more than 30 white-label apps for iOS and Android.'
      ],
      stack: ['React Native', 'TypeScript', 'Node.js', 'EAS', 'GitHub Actions']
    },
    {
      company: 'Super Estágios',
      title: 'Web Developer Intern',
      period: 'Jul 2025 to Sep 2025',
      summary: "Maintaining flows on Brazil's largest internship platform.",
      bullets: [
        'Maintained features in PHP, JavaScript, HTML, CSS and Bootstrap.',
        'Worked on flows used by 3.5 million students.',
        'Fixed queries, screens and integrations on MySQL and AWS, focusing on performance and data consistency.'
      ],
      stack: ['PHP', 'JavaScript', 'MySQL', 'AWS']
    }
  ],
  stackGroups: [
    { label: 'Languages', items: ['TypeScript', 'JavaScript', 'C#', 'PHP', 'Python', 'Java', 'SQL'] },
    {
      label: 'Frameworks',
      items: ['React', 'Next.js', 'React Native', 'Node.js', 'NestJS', 'Laravel', 'Tailwind', 'FastAPI']
    },
    { label: 'Data', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Redis', 'Prisma', 'Drizzle', 'SQLite'] },
    { label: 'Operations', items: ['Docker', 'Nginx', 'PM2', 'AWS', 'GitHub Actions', 'EAS', 'CI/CD', 'GitFlow'] },
    { label: 'Applied AI', items: ['RAG', 'Prompt Engineering', 'NLP', 'Streaming API', 'MCP', 'Agentic Workflows'] },
    { label: 'Quality', items: ['TDD', 'Automated tests', 'RNTL', 'SOLID', 'REST APIs'] }
  ],
  education: [
    {
      school: 'Universidade Vila Velha (UVV)',
      course: 'Associate degree in Systems Analysis and Development',
      period: 'Jul 2024 to Dec 2026'
    },
    { school: 'Senac', course: 'Web Development technical course', period: 'Jun 2022 to Aug 2024' }
  ]
};

export const siteContent: Record<Locale, SiteContent> = { pt, en };

export function useSite(): SiteContent {
  return siteContent[useLocale()];
}
