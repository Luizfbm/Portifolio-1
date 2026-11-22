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
  education: {
    school: string;
    course: string;
    period: string;
    /** Uma linha sobre a instituição, para quem não a conhece. */
    about: string;
    /** O que o curso é: duração, formato e o que a grade cobre. */
    program: string;
    topics: string[];
    project?: { name: string; body: string };
  }[];
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
    'Pego processo lento ou manual e transformo em software que roda sozinho, de ponta a ponta. Agentes de IA fazem a parte repetitiva, e as pessoas ficam com o que importa.',
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
      period: 'jul 2024 a dez 2026',
      about:
        'Universidade privada sem fins lucrativos em Vila Velha, no Espírito Santo. Foi fundada em 1974 e virou universidade em 2011.',
      program:
        'Graduação tecnológica de dois anos e meio, em cinco períodos, no turno da noite. A grade passa por programação, engenharia de software, sistemas operacionais, estatística, gestão de projetos e empreendedorismo, com alianças acadêmicas com Cisco, Oracle e Red Hat.',
      topics: [
        'Banco de dados: SQL Server, MySQL e PostgreSQL',
        'Web front-end e back-end: React, Next.js, PHP e Node.js',
        'Orientação a objetos com C#',
        'Redes: TCP/IP, HTTP, DNS, FTP e SSH',
        'Engenharia de software: Scrum, Kanban, XP, Lean e DevOps',
        'Estrutura de dados e algoritmos'
      ]
    },
    {
      school: 'Senac',
      course: 'Técnico em Informática para Internet',
      period: 'jun 2022 a ago 2024',
      about:
        'Serviço Nacional de Aprendizagem Comercial, criado em 1946. É uma instituição de educação profissional ligada ao comércio de bens, serviços e turismo.',
      program:
        'Curso técnico de 1000 horas voltado a aplicações web e mobile, com desenvolvimento web, APIs, banco de dados, redes, estrutura de dados e algoritmos.',
      topics: ['HTML, CSS e JavaScript', 'PHP com MySQL', 'Java para Android', 'Java com Spring Boot', 'Git e GitHub'],
      project: {
        name: 'Projeto integrador: Parkflow',
        body: 'Sistema que identifica veículos por QR Code no estacionamento da unidade. Fiz o back-end, o banco de dados, a autenticação, o cadastro de usuários e veículos, a geração e a validação dos QR Codes e a integração com o app mobile em Java. Apresentei para professores, direção e outras turmas, mais de 90 pessoas.'
      }
    }
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
    'I take slow or manual processes and turn them into software that runs on its own, end to end. AI agents handle the repetitive part, and people keep the work that matters.',
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
      period: 'Jul 2024 to Dec 2026',
      about:
        'A private non-profit university in Vila Velha, in the Brazilian state of Espírito Santo. It was founded in 1974 and became a university in 2011.',
      program:
        'A two-and-a-half-year technology degree, in five terms, taught in the evening. The curriculum covers programming, software engineering, operating systems, statistics, project management and entrepreneurship, with academic alliances with Cisco, Oracle and Red Hat.',
      topics: [
        'Databases: SQL Server, MySQL and PostgreSQL',
        'Front-end and back-end web: React, Next.js, PHP and Node.js',
        'Object-oriented programming with C#',
        'Networking: TCP/IP, HTTP, DNS, FTP and SSH',
        'Software engineering: Scrum, Kanban, XP, Lean and DevOps',
        'Data structures and algorithms'
      ]
    },
    {
      school: 'Senac',
      course: 'Web Development technical course',
      period: 'Jun 2022 to Aug 2024',
      about:
        "Brazil's National Commercial Training Service, created in 1946. It is a vocational education institution tied to the trade, services and tourism sector.",
      program:
        'A 1000-hour technical course aimed at web and mobile applications, covering web development, APIs, databases, networking, data structures and algorithms.',
      topics: ['HTML, CSS and JavaScript', 'PHP with MySQL', 'Java for Android', 'Java with Spring Boot', 'Git and GitHub'],
      project: {
        name: 'Capstone project: Parkflow',
        body: 'A system that identifies vehicles by QR code in the campus car park. I built the back end, the database, authentication, user and vehicle registration, QR code generation and validation, and the integration with the Java mobile app. I presented it to teachers, management and other classes, more than 90 people.'
      }
    }
  ]
};

export const siteContent: Record<Locale, SiteContent> = { pt, en };

export function useSite(): SiteContent {
  return siteContent[useLocale()];
}
