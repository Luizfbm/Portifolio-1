import type { CaseStudy } from './cases';

/**
 * Versão em inglês dos cases. Só os campos de texto; código, stack, links e
 * imagens continuam vindo de cases.ts. Os prints seguem a mesma ordem de lá.
 */
export type CaseText = Pick<CaseStudy, 'context' | 'headline' | 'summary' | 'readings' | 'story' | 'points' | 'closing'> & {
  screens?: { alt: string; caption: string }[];
  architecture: { alt: string; caption: string };
  repoLabel: string;
};

export const casesEn: Record<string, CaseText> = {
  'chrono-crash': {
    context: 'Full-stack challenge',
    headline: 'A crash game with real money flows, realtime and observability.',
    summary:
      'React/Vite up front, NestJS split into Game and Wallet, RabbitMQ carrying financial commands, Keycloak, Kong, PostgreSQL, Prisma, Socket.IO and a full observability stack.',
    readings: [
      { label: 'services', value: '2, Game and Wallet' },
      { label: 'messaging', value: 'RabbitMQ, outbox/inbox' },
      { label: 'fairness', value: 'HMAC SHA-256' },
      { label: 'coverage', value: '84.58%' }
    ],
    repoLabel: 'Repository',
    story:
      'I treated the challenge as a realtime casino and wanted it obvious where each responsibility lives. The Game Service never touches the balance, the Wallet Service keeps the ledger in cents with BigInt, Kong is the single entry point, Keycloak issues identity, Socket.IO publishes round events and observability keeps the whole thing auditable.',
    screens: [
      {
        alt: 'Chrono Crash during a round: multiplier at 1.09x, an accepted R$ 10.00 bet and the cash out button active.',
        caption: 'A round in progress with an accepted bet. The balance comes from the Wallet Service, the multiplier arrives over Socket.IO.'
      },
      {
        alt: 'Grafana dashboard with bet volume, total wagered, payouts, crashes by range, RTP and WebSocket events.',
        caption: 'The provisioned Grafana dashboard with the metrics the game exports to Prometheus.'
      }
    ],
    architecture: {
      alt: 'Chrono Crash architecture diagram with React Vite, Kong, Keycloak, Game Service, Wallet Service, RabbitMQ, PostgreSQL and observability.',
      caption:
        'React/Vite goes through Kong. The gateway routes REST and Socket.IO to the Game Service, Keycloak issues JWTs, Game and Wallet validate them via JWKS, RabbitMQ carries the financial commands and Prometheus, Grafana, Jaeger and OpenTelemetry make the operation visible.'
    },
    points: [
      {
        title: 'Financial consistency',
        body: 'Game never changes a balance directly. Debits and credits go through RabbitMQ, an outbox in Game, an inbox in Wallet and idempotent commands.'
      },
      {
        title: 'Auditable realtime',
        body: 'Each round publishes snapshot, betting window, ticks, crash, settlement, bets and cashouts over Socket.IO.'
      },
      {
        title: 'Observable operations',
        body: 'Prometheus tracks bets, cashouts, WebSocket, RTP, auto bet and wallet commands. Jaeger receives traces through OTEL.'
      },
      {
        title: 'Security and identity',
        body: 'Keycloak handles login with authorization code flow and PKCE on the frontend. The NestJS services validate JWTs via JWKS.'
      },
      {
        title: 'Verifiable mechanics',
        body: 'Provably fair with serverSeedHash before the round, serverSeed revealed after the crash, HMAC SHA-256, auto cashout and Martingale auto bet.'
      },
      {
        title: 'Tests',
        body: 'Bun test, Vitest, Playwright, API and browser E2E, Docker healthchecks and a baseline quality gate. The README records 17 API E2E tests, 7 browser tests, 84.58% coverage and 1.46% duplication.'
      }
    ],
    closing:
      'The case is about context boundaries. Money moves through idempotent messaging, and the operation is instrumented end to end.'
  },
  iaejovem: {
    context: 'HackFaesa2025',
    headline: "Emotional support inside the school routine, without exposing the student's conversation.",
    summary:
      'Students talk to Ayla, an AI with a warm tone. Teachers see a score and attention signals but never read the private content. Chat, score and dashboard live in separate layers.',
    readings: [
      { label: 'roles', value: '3, student, teacher, admin' },
      { label: 'score', value: '0 to 10, conversation stays closed' },
      { label: 'AI', value: 'Abacus.AI, streaming' },
      { label: 'trail', value: 'audit log for sensitive actions' }
    ],
    repoLabel: 'Repository',
    story:
      'Students need a private place to talk. The school needs to notice when something deserves attention. The project keeps the private chat, the emotional score and the teaching dashboard apart.',
    screens: [
      {
        alt: 'A conversation with Ayla: the student says they are tired from exam week and Ayla responds warmly and asks what weighs on them most.',
        caption: "A conversation with Ayla. The AI's reply in this screenshot is sample text."
      },
      {
        alt: 'Student dashboard with shortcuts to chat, points and the store, plus conversation and point counters.',
        caption: "The student's dashboard with points, this week's conversations and the rewards store."
      }
    ],
    architecture: {
      alt: 'IAeJovem architecture diagram with actors, RBAC middleware, dashboards, API routes, Abacus AI and a Prisma PostgreSQL data layer.',
      caption:
        "Middleware opens routes by role, dashboards call API Routes, Ayla talks through Abacus.AI and the emotional analysis stays separate from the private text."
    },
    points: [
      {
        title: 'Privacy by design',
        body: 'Teachers follow the score and alerts. The conversation itself never reaches their dashboard.'
      },
      {
        title: 'More than a chat',
        body: 'Points, rewards, dashboards, notifications, auditing and bulk actions.'
      },
      {
        title: 'Ayla has her own voice',
        body: 'The conversation was written to sound warm, young and direct.'
      }
    ],
    closing:
      'AI in a sensitive product: useful to the school, with an enforced boundary around the privacy of whoever is talking.'
  },
  'case-flow': {
    context: 'InovaApp2025',
    headline: 'A loose message goes in, an organized ticket comes out.',
    summary:
      "A ticketing system with a Kanban board, access by department and a chatbot that reads the user's message, pulls out the context and creates the ticket with title, category and priority already filled in.",
    readings: [
      { label: 'input', value: 'message → ticket' },
      { label: 'status', value: '4 Kanban columns' },
      { label: 'roles', value: 'Admin, IT, Support, Finance' },
      { label: 'history', value: 'the conversation becomes context' }
    ],
    repoLabel: 'Repository',
    story:
      'Users describe the problem their own way, and the team needs an organized ticket to act on. The AI sits in that handoff: it reads the message, suggests a structure and hands the Kanban a ticket that is closer to ready for triage.',
    screens: [
      {
        alt: 'Case Flow Kanban dashboard with new, in-progress, finished and reopened tickets, each with department and priority.',
        caption: 'Kanban with tickets by status, department and priority.'
      },
      {
        alt: 'Case Flow chatbot turning a message into a ticket summary with title, description, IT department and high priority.',
        caption: "The chatbot turns the message into a ticket and asks for confirmation. The AI analysis in this screenshot is sample data."
      }
    ],
    architecture: {
      alt: 'Case Flow architecture diagram with users, Next.js frontend, serverless API Routes, Abacus.AI NLP, Prisma ORM, NextAuth and PostgreSQL.',
      caption:
        'The UI sends messages and actions to serverless API Routes. External NLP interprets the request and Prisma stores tickets, users and comments in PostgreSQL.'
    },
    points: [
      {
        title: 'Where the AI fits',
        body: 'AI turns free text into data the team can actually use.'
      },
      {
        title: 'Ownership by department',
        body: 'Roles and categories make it clear who can see, take and resolve each request.'
      },
      {
        title: 'One closed loop',
        body: 'Ticket, comments, status, Kanban and history live in the same flow.'
      }
    ],
    closing:
      'The AI understands intent, organizes the request and sends the ticket into the support flow with the structure the team needs.'
  },
  'dev-roast': {
    context: 'AI code review',
    headline: 'AI code review that ends on a page worth sharing.',
    summary:
      'Users paste a snippet and get technical critique, a score, a verdict, suggestions and a result page. Underneath it is server-first: tRPC, Drizzle, Server Components and syntax highlighting done on the server.',
    readings: [
      { label: 'render', value: 'server-first' },
      { label: 'types', value: 'Drizzle → tRPC → React' },
      { label: 'highlight', value: 'Shiki on the server' },
      { label: 'output', value: 'shareable page + OG image' }
    ],
    repoLabel: 'Repository',
    story:
      'Dev-roast starts with pasting a piece of code. The tone is a roast, and the product returns analysis, score, verdict, suggestions and a final page that works as shareable content.',
    screens: [
      {
        alt: 'Dev-roast home screen with the code editor, roast mode on and the roast my code button.',
        caption: 'The input editor, with language detection and roast mode.'
      },
      {
        alt: 'Share image for a roast: score 1.8 out of 10, verdict needs serious help and the roast line.',
        caption: 'The image generated to share a result. Sample roast.'
      },
      {
        alt: 'Dev-roast Shame Leaderboard listing the lowest-scoring code with a snippet of each.',
        caption: 'The leaderboard of the worst code, rendered with Shiki on the server.'
      }
    ],
    architecture: {
      alt: 'Dev-roast architecture diagram with Client, Next.js App Router, tRPC Router, Gemini and PostgreSQL.',
      caption:
        'Server-first flow: pages and Server Components prepare data through tRPC, mutations go through an API Route, the analysis uses Gemini and results are stored in PostgreSQL with Drizzle ORM.'
    },
    points: [
      {
        title: 'A tone that sticks',
        body: 'The roast gives the analysis a voice so the result is easier to remember.'
      },
      {
        title: 'Current stack',
        body: 'Next.js 16, React 19, tRPC, TanStack Query, Drizzle and Tailwind v4.'
      },
      {
        title: 'Less work for the client',
        body: 'Server Components, prefetch with hydration and server-side Shiki cut the work the browser has to do.'
      }
    ],
    closing: 'AI to review code, a shareable page as the output and a server-first architecture underneath.'
  }
};
