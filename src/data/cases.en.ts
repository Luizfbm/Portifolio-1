import type { CaseStudy } from './cases';

/**
 * Versão em inglês dos cases. Só os campos de texto; código, stack, links e
 * imagens continuam vindo de cases.ts. Os prints seguem a mesma ordem de lá.
 */
export type CaseText = Pick<CaseStudy, 'context' | 'headline' | 'summary' | 'readings' | 'story' | 'points' | 'closing'> & {
  screens?: { alt: string; caption: string }[];
  glossary?: { term: string; body: string }[];
  screensNote?: string;
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
  },
  'terminators-lunar': {
    context: 'NASA Space Apps 2026',
    headline: "Will a lander at the Moon's south pole see the Sun and the Earth? For how long?",
    summary:
      "Our team's project for the NASA Space Apps Challenge 2026. You pick a Site and a Window, and the app tells you when the Sun and the Earth go out of view and which terrain feature hides each one. FastAPI and NumPy in the engine, SPICE and the LOLA maps for data, React and Three.js in the interface.",
    readings: [
      { label: 'sites', value: '134, 130 from Artemis' },
      { label: 'horizon', value: '720 rays at 3 resolutions' },
      { label: 'ephemeris', value: 'SPICE with DE440' },
      { label: 'validation', value: '29 of 32 checks pass' }
    ],
    repoLabel: 'Repository',
    story:
      "At the Moon's south pole the Sun stays within about 1.5° of the horizon and circles it once a month, so a single ridge decides whether a solar panel works. We took that to the Lunar Landing Site Navigator challenge as one question: from that point, in that window, does the lander see the Sun and the Earth? All computation happens in the backend, the whole Query fits in the link and every answer names what hid the Sun or the Earth. The Sun matters because it charges the panels, and the Earth because without it in view there is no direct communication.",
    glossary: [
      {
        term: 'Site',
        body: 'An exact point on the Moon, given by latitude and longitude. The app has 134 of them, and a typed coordinate becomes a Site too.'
      },
      {
        term: 'Window',
        body: 'The time span the question covers: a start instant and a duration. The default is one lunar month, about 29.5 days.'
      },
      {
        term: 'Artemis',
        body: 'The NASA programme to take people back to the Moon. 130 of the Sites come from a list of candidate landing sites published for it.'
      },
      {
        term: 'The engine',
        body: 'The part of the system that does the maths. It takes the Site and the Window, works out where the Sun and the Earth are in the sky and compares that with the terrain around. It is a Python program running on the server, and the screen only shows the result.'
      },
      {
        term: 'Ephemeris',
        body: 'Tables that say where each body is at each instant. They are how the engine knows which way the Sun and the Earth lie as seen from the Moon.'
      },
      {
        term: 'SPICE and DE440',
        body: 'SPICE is the NASA toolkit for computing positions in space, the same one real missions use. DE440 is the ephemeris it reads: the JPL file with the orbits of the Sun, the Earth and the Moon.'
      },
      {
        term: 'DEM',
        body: 'Short for Digital Elevation Model, a map of terrain heights. Each small square holds the altitude of that patch of ground. A 20 m DEM has one value every 20 metres, and the smaller the number, the more detail.'
      },
      {
        term: 'LOLA',
        body: 'Lunar Orbiter Laser Altimeter, the instrument on the NASA LRO probe that measures the height of the lunar ground by firing a laser from orbit. The DEMs the engine uses come from those measurements.'
      },
      {
        term: 'Horizon mask',
        body: 'The horizon line seen from a Site. For each direction around it, it keeps the height of the highest terrain that way. If the Sun is below that line, it is hidden.'
      },
      {
        term: 'Occluder',
        body: 'The mountain, ridge or crater rim that forms the horizon in one direction. It is what hides the Sun or the Earth.'
      },
      {
        term: 'IAU and the Gazetteer',
        body: 'The IAU is the International Astronomical Union, which gives craters and mountains their official names. The Gazetteer is the catalogue of those names, and it is where the name of whatever hid the Sun comes from.'
      },
      {
        term: 'Sunset and Earthset',
        body: 'The instant the Sun, or the Earth, goes behind the terrain. Sunrise and Earthrise are the way back. At the pole the terrain causes most of them, not the rotation of the Moon.'
      },
      {
        term: 'Sun fraction',
        body: 'The share of the disc of the Sun above the horizon at an instant, from 0 to 100%.'
      },
      {
        term: 'JPL Horizons',
        body: 'A service from JPL, the NASA laboratory, that computes where bodies are in the sky. It is the independent reference used to check that the numbers from the engine agree.'
      }
    ],
    screensNote: 'Screenshots of the app published at lunar.luizfbm.win.',
    screens: [
      {
        alt: 'Ground view at Site 001, Connecting Ridge: the Sun over the terrain, the Earth overhead, the Window timeline and the panel with Sun and Earth hours.',
        caption:
          'The ground view at Connecting Ridge. In this Window the Sun does not set, and the Earth goes behind Mons Malapert, 134 km away.'
      },
      {
        alt: "Map of the Moon's south pole with the regions marked, including Connecting Ridge, Mons Malapert, Haworth, Nobile Rim and Shackleton.",
        caption: 'The south pole from above, with the catalogue regions and the chosen Site.'
      },
      {
        alt: 'Proof page with the table of where a number can be wrong: source of error, size, effect on the answer and where the size comes from.',
        caption: 'The Proof page opens by saying where a number can be wrong, before it lists the checks.'
      }
    ],
    architecture: {
      alt: 'Lunar Landing Site Navigator diagram with the React and Three.js interface, the FastAPI API, the visibility engine and NASA data.',
      caption:
        "The interface sends the Query to the API through the OpenAPI contract. The engine gets the Sun's and the Earth's positions from SPICE every 15 minutes, builds the Horizon mask with 720 rays over the LOLA DEMs and compares the two. Queue, cache and the assistant sit at the edge of the API."
    },
    points: [
      {
        title: 'A horizon at three resolutions',
        body: "One ray every 0.5° of azimuth over nested DEMs: 20 m out to 5 km, 80 m out to 100 km and 240 m out to 300 km. Each ray allows for the Moon's curvature and keeps the highest angle."
      },
      {
        title: 'What did the hiding',
        body: "Every Sunset, Sunrise, Earthset and Earthrise comes with its Occluder: azimuth, distance and the feature's name in the IAU Gazetteer."
      },
      {
        title: 'The Sun as a disc',
        body: 'The Sun counts as visible while any part of its disc is above the horizon, and the Earth counts by its centre. A partly visible Sun never rounds to 0% or to 100%.'
      },
      {
        title: 'Validation without tuning',
        body: "There are 32 published checks against JPL Horizons, the eclipse of 14 March 2025, NASA's 18.6-year map and real landings. 29 pass, 2 fail and 1 is only an example. No tolerance was changed to make a check pass, and the failing ones are listed first."
      },
      {
        title: 'Negative controls',
        body: 'Some checks have to fail on purpose, such as turning the horizon silhouette by 1° or shifting time by 10 minutes. They show the test can tell a wrong answer from a right one.'
      },
      {
        title: 'Operations',
        body: 'Three containers on one VPS with Docker Compose: the backend, Caddy and a Cloudflare Tunnel. The engine runs 4 jobs at once, and when the queue is full the API answers 503 busy with Retry-After.'
      },
      {
        title: 'Built with AI agents',
        body: 'The team chose the question, the data, the models and the tolerances. Agents wrote most of the code on their own branches, and a pull request only went in once the diff was read and the checks were green. The numbers in the app come from NASA data, not from a language model.'
      }
    ],
    closing: 'The app answers one question and shows, on the same page, where that answer can be wrong.'
  }
};
