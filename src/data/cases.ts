export type CodeTab = { file: string; lang: string; code: string };

export type CaseStudy = {
  slug: string;
  name: string;
  context: string;
  headline: string;
  summary: string;
  /** Aparece na vitrine e no topo do case; texto curto, sem número inventado. */
  readings: { label: string; value: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  story: string;
  architecture: { src: string; alt: string; caption: string };
  points: { title: string; body: string }[];
  code: CodeTab[];
  closing: string;
};

export const cases: CaseStudy[] = [
  {
    slug: 'chrono-crash',
    name: 'Chrono Crash',
    context: 'Full-stack challenge',
    headline: 'Crash game com dinheiro, realtime e observabilidade.',
    summary:
      'React/Vite na frente, NestJS partido em Game e Wallet, RabbitMQ carregando comando financeiro, Keycloak, Kong, PostgreSQL, Prisma, Socket.IO e uma stack de observabilidade inteira.',
    readings: [
      { label: 'serviços', value: '2, Game e Wallet' },
      { label: 'mensageria', value: 'RabbitMQ, outbox/inbox' },
      { label: 'fairness', value: 'HMAC SHA-256' },
      { label: 'coverage', value: '84.58%' }
    ],
    stack: ['NestJS', 'React/Vite', 'RabbitMQ', 'Keycloak', 'Kong', 'Prisma', 'Socket.IO', 'OpenTelemetry'],
    links: [{ label: 'Repositório', href: 'https://github.com/Luizfbm/fullstack-challenge' }],
    story:
      'Peguei o desafio como um cassino realtime. Queria deixar claro onde cada responsabilidade mora. O Game Service não mexe direto no saldo, o Wallet Service cuida do ledger em centavos com BigInt, o Kong concentra a entrada, o Keycloak emite identidade, o Socket.IO publica os eventos da rodada e a observabilidade deixa a operação auditável.',
    architecture: {
      src: '/assets/fullstack-challenge-architecture.svg',
      alt: 'Diagrama da arquitetura do Chrono Crash com React Vite, Kong, Keycloak, Game Service, Wallet Service, RabbitMQ, PostgreSQL e observabilidade.',
      caption:
        'React/Vite entra pelo Kong. O gateway encaminha REST e Socket.IO para o Game Service, o Keycloak emite JWTs, Game e Wallet validam por JWKS, o RabbitMQ carrega os comandos financeiros e Prometheus, Grafana, Jaeger e OpenTelemetry dão visibilidade da operação.'
    },
    points: [
      {
        title: 'Consistência financeira',
        body: 'O Game não altera saldo direto. Débito e crédito passam por RabbitMQ, outbox no Game, inbox no Wallet e comandos idempotentes.'
      },
      {
        title: 'Realtime auditável',
        body: 'A rodada publica snapshot, abertura de apostas, ticks, crash, settlement, apostas e cashouts por Socket.IO.'
      },
      {
        title: 'Operação observável',
        body: 'Prometheus mede apostas, cashouts, WebSocket, RTP, auto bet e comandos de wallet. Jaeger recebe traces via OTEL.'
      },
      {
        title: 'Segurança e identidade',
        body: 'Keycloak cuida do login com authorization code flow e PKCE no frontend. Os serviços NestJS validam JWT por JWKS.'
      },
      {
        title: 'Mecânica verificável',
        body: 'Provably fair com serverSeedHash antes da rodada, serverSeed revelado depois do crash, HMAC SHA-256, auto cashout e auto bet Martingale.'
      },
      {
        title: 'Testes',
        body: 'Bun test, Vitest, Playwright, E2E de API e de browser, healthchecks no Docker e quality gate por baseline. O README registra 17 testes E2E de API, 7 de browser, 84.58% de coverage e 1.46% de duplicação.'
      }
    ],
    code: [
      {
        file: 'provably-fair.ts',
        lang: 'TypeScript',
        code: `import { createHash, createHmac } from "node:crypto";

export class ProvablyFair {
  static hashSeed(seed: string): string {
    return createHash("sha256").update(seed).digest("hex");
  }

  static verifySeed(serverSeed: string, serverSeedHash: string): boolean {
    return ProvablyFair.hashSeed(serverSeed) === serverSeedHash;
  }

  static calculateCrashPointBp(input: CrashPointInput): number {
    const digest = createHmac("sha256", input.serverSeed)
      .update(\`\${input.clientSeed}:\${input.nonce}\`)
      .digest("hex");

    const sample = BigInt(\`0x\${digest.slice(0, 13)}\`);
    const maxSample = 2n ** 52n;
    const numerator = maxSample * BigInt(10000 - input.houseEdgeBp);
    const denominator = maxSample - sample;
    const multiplierBp = Number(numerator / denominator);

    return Math.max(10000, multiplierBp);
  }
}`
      },
      {
        file: 'place-bet.use-case.ts',
        lang: 'TypeScript',
        code: `private async dispatchDebitThroughOutbox(input: {
  amountCents: bigint;
  betId: string;
  playerId: string;
  referenceId: string;
  roundId: string;
  username: string;
}): Promise<{ applied: boolean; balanceCents: bigint }> {
  const message = await this.walletOutboxRepository.enqueue({
    id: this.idGenerator.generate(),
    type: "WALLET_DEBIT",
    status: "IN_FLIGHT",
    roundId: input.roundId,
    betId: input.betId,
    playerId: input.playerId,
    amountCents: input.amountCents,
    referenceId: input.referenceId,
    reason: "BET_PLACED",
  });

  await this.walletOutboxDispatcher.dispatchMessage(message);
  const stored = await this.walletOutboxRepository.findById(message.id);

  if (stored?.status !== "SUCCEEDED" || stored.responseBalanceCents === null) {
    throw new WalletOperationRejectedError(
      stored?.errorCode ?? "WALLET_DEBIT_FAILED",
      stored?.errorMessage ?? "Wallet debit failed",
    );
  }

  return {
    applied: stored.responseApplied ?? true,
    balanceCents: stored.responseBalanceCents,
  };
}`
      },
      {
        file: 'wallet-inbox.repository.ts',
        lang: 'TypeScript',
        code: `async process(command: WalletInboxCommand): Promise<WalletInboxResponse> {
  return this.prisma.$transaction(async (prisma) => {
    const existing = await prisma.walletInboxMessage.findUnique({
      where: { referenceId: command.data.referenceId },
    });

    if (existing?.status === "PROCESSED" || existing?.status === "FAILED") {
      return this.toDuplicateResponse(existing);
    }

    const wallet = await prisma.wallet.findUnique({
      where: { playerId: command.data.playerId },
    });

    if (!wallet) {
      return this.reject(prisma, command, "WALLET_NOT_FOUND");
    }

    const amountCents = BigInt(command.data.amountCents);

    if (command.pattern === "wallet.debit" && wallet.balanceCents < amountCents) {
      return this.reject(prisma, command, "INSUFFICIENT_FUNDS");
    }

    const nextBalance =
      command.pattern === "wallet.debit"
        ? wallet.balanceCents - amountCents
        : wallet.balanceCents + amountCents;

    await prisma.wallet.update({ where: { id: wallet.id }, data: { balanceCents: nextBalance } });
    await prisma.walletTransaction.create({
      data: { walletId: wallet.id, amountCents, referenceId: command.data.referenceId },
    });
  });
}`
      }
    ],
    closing:
      'O case mostra a separação de contexto. Dinheiro passa por mensageria idempotente, e a operação fica instrumentada.'
  },
  {
    slug: 'iaejovem',
    name: 'IAeJovem',
    context: 'HackFaesa2025',
    headline: 'Apoio emocional dentro da rotina escolar, sem expor a conversa do estudante.',
    summary:
      'Estudantes conversam com a Ayla, uma IA de tom acolhedor. Professores veem score e sinal de atenção, mas não leem o conteúdo privado. Chat, score e painel ficam em camadas diferentes.',
    readings: [
      { label: 'perfis', value: '3, aluno, professor, admin' },
      { label: 'score', value: '0 a 10, sem abrir a conversa' },
      { label: 'IA', value: 'Abacus.AI, streaming' },
      { label: 'trilha', value: 'auditoria de ação sensível' }
    ],
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Abacus.AI'],
    links: [
      { label: 'Repositório', href: 'https://github.com/Luizfbm/IAeJovem-HackFaesa2025' },
      { label: 'Demo', href: 'https://iaejovem.abacusai.app' }
    ],
    story:
      'O estudante precisa de um espaço reservado para falar. A escola precisa perceber quando algo merece atenção. O projeto separa o chat privado, o score emocional e o painel pedagógico.',
    architecture: {
      src: '/assets/iaejovem-architecture.svg',
      alt: 'Diagrama da arquitetura do IAeJovem com atores, middleware RBAC, painéis, API routes, Abacus AI e camada de dados Prisma PostgreSQL.',
      caption:
        'O middleware libera rotas conforme o papel do usuário, os painéis chamam API Routes, a Ayla conversa via Abacus.AI e a análise emocional fica separada do texto privado.'
    },
    points: [
      {
        title: 'Privacidade desde o desenho',
        body: 'O professor acompanha score e alerta. A conversa em si continua fora do painel.'
      },
      {
        title: 'Além do chat',
        body: 'Tem pontos, resgates, dashboards, notificações, auditoria e ações em massa.'
      },
      {
        title: 'A Ayla tem voz própria',
        body: 'A conversa foi escrita para soar acolhedora, jovem e direta.'
      }
    ],
    code: [
      {
        file: 'chat/route.ts',
        lang: 'TypeScript',
        code: `const systemPrompt = \`Você é a Ayla, uma companheira empática que conversa com estudantes.
PERSONALIDADE:
- Empática, jovem, acolhedora e compreensiva
- Valida sentimentos sem julgamento
- Faz perguntas abertas para o estudante se expressar
DIRETRIZES:
- Use o nome "\${firstName}" ocasionalmente, de forma natural
- Responda de forma concisa (máximo 3 frases por vez)
- Se o estudante mencionar algo sério, sugira buscar ajuda\`;

const response = await fetch("https://apps.abacus.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: \`Bearer \${process.env.ABACUSAI_API_KEY}\`,
  },
  body: JSON.stringify({
    model: "gpt-4.1-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream: true,
  }),
});`
      },
      {
        file: 'middleware.ts',
        lang: 'TypeScript',
        code: `export default withAuth(function middleware(request) {
  const { pathname } = request.nextUrl;
  const userRole = request.nextauth.token.role;

  if (pathname.startsWith("/aluno") && userRole !== "ALUNO") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/professor") && userRole !== "PROFESSOR") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/admin") && userRole !== "ADMINISTRADOR") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});`
      },
      {
        file: 'resgatar/route.ts',
        lang: 'TypeScript',
        code: `const code = \`IAJ-\${Date.now()}-\${Math.random().toString(36).slice(2, 11).toUpperCase()}\`;

const redemption = await prisma.$transaction(async (tx) => {
  const redemption = await tx.redemption.create({
    data: { userId: user.id, productId: product.id, code, status: "AGUARDANDO_RETIRADA" },
  });

  await tx.user.update({
    where: { id: user.id },
    data: { points: { decrement: product.pointsCost } },
  });

  await tx.product.update({
    where: { id: product.id },
    data: { stock: { decrement: 1 } },
  });

  await tx.notification.create({
    data: {
      userId: user.id,
      message: \`Você resgatou: \${product.name}. Código de retirada: \${code}\`,
    },
  });

  return redemption;
});`
      }
    ],
    closing:
      'IA em produto sensível: útil para a escola, com um limite implementado para a privacidade de quem fala.'
  },
  {
    slug: 'case-flow',
    name: 'Case Flow',
    context: 'InovaApp2025',
    headline: 'Conversa solta entra, chamado organizado sai.',
    summary:
      'Sistema de chamados com Kanban, controle por setor e um chatbot que entende a mensagem do usuário, extrai contexto e cria o ticket já com título, categoria e prioridade.',
    readings: [
      { label: 'entrada', value: 'mensagem → ticket' },
      { label: 'status', value: '4 colunas no Kanban' },
      { label: 'papéis', value: 'Admin, TI, SAC, Financeiro' },
      { label: 'histórico', value: 'conversa vira contexto' }
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'NLP'],
    links: [
      { label: 'Repositório', href: 'https://github.com/Luizfbm/CaseFlow-EQPDEV' },
      { label: 'Demo', href: 'https://caseflow.abacusai.app' }
    ],
    story:
      'O usuário explica o problema do jeito dele, e o time precisa de um ticket organizado para agir. A IA fica nessa passagem. Ela entende a mensagem, sugere estrutura e entrega ao Kanban um chamado mais pronto para triagem.',
    architecture: {
      src: '/assets/case-flow-architecture.svg',
      alt: 'Diagrama da arquitetura do Case Flow com usuários, frontend Next.js, API Routes serverless, Abacus.AI NLP, Prisma ORM, NextAuth e PostgreSQL.',
      caption:
        'A interface envia mensagens e ações para API Routes serverless. O NLP externo interpreta a demanda e o Prisma grava tickets, usuários e comentários no PostgreSQL.'
    },
    points: [
      {
        title: 'Onde a IA entra',
        body: 'A IA transforma texto livre em dados que o time consegue usar.'
      },
      {
        title: 'Responsabilidade por setor',
        body: 'Papéis e categorias deixam claro quem pode ver, assumir e resolver cada demanda.'
      },
      {
        title: 'Atendimento fechado',
        body: 'Ticket, comentários, status, Kanban e histórico ficam no mesmo fluxo.'
      }
    ],
    code: [
      {
        file: 'schema.prisma',
        lang: 'Prisma',
        code: `model Ticket {
  id          String         @id @default(cuid())
  title       String
  description String         @db.Text
  category    TicketCategory
  status      TicketStatus   @default(NEW)
  priority    Priority       @default(MEDIUM)
  createdBy   String
  assignedTo  String?
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  creator     User           @relation("CreatedTickets", fields: [createdBy], references: [id])
  assignee    User?          @relation("AssignedTickets", fields: [assignedTo], references: [id])
  comments    Comment[]
}

enum UserRole {
  ADM
  TI
  SAC
  FINANCEIRO
}

enum TicketStatus {
  NEW
  IN_PROGRESS
  FINISHED
  RETURNED
}`
      },
      {
        file: 'analyze-intent/route.ts',
        lang: 'TypeScript',
        code: `export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();
    const isTicketRequest = detectTicketIntent(message);

    return Response.json({ isTicketRequest, message });
  } catch (error) {
    console.error("Intent analysis error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

function detectTicketIntent(message: string): boolean {
  const ticketPhrases = ["abrir um chamado", "criar um chamado", "abrir um ticket"];
  return ticketPhrases.some((phrase) => message.toLowerCase().includes(phrase));
}`
      },
      {
        file: 'auth.ts',
        lang: 'TypeScript',
        code: `export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
};`
      }
    ],
    closing:
      'A IA entende a intenção, organiza a demanda e manda o chamado para o fluxo de suporte com a estrutura que o time precisa.'
  },
  {
    slug: 'dev-roast',
    name: 'Dev-roast',
    context: 'AI code review',
    headline: 'Revisão de código com IA que termina numa página fácil de compartilhar.',
    summary:
      'O usuário cola um snippet e recebe crítica técnica, score, veredito, sugestões e uma página de resultado. Por baixo, server-first: tRPC, Drizzle, Server Components e syntax highlight feito no servidor.',
    readings: [
      { label: 'render', value: 'server-first' },
      { label: 'tipos', value: 'Drizzle → tRPC → React' },
      { label: 'highlight', value: 'Shiki no servidor' },
      { label: 'saída', value: 'página compartilhável + OG' }
    ],
    stack: ['Next.js 16', 'React 19', 'tRPC', 'TanStack Query', 'Drizzle', 'Tailwind v4', 'Gemini'],
    links: [{ label: 'Repositório', href: 'https://github.com/Luizfbm/Dev-roast' }],
    story:
      'O Dev-roast parte de colar um trecho de código. O tom é de roast, e o produto entrega análise, pontuação, veredito, sugestões e uma página final que funciona como conteúdo compartilhável.',
    architecture: {
      src: '/assets/dev-roast-architecture.svg',
      alt: 'Diagrama da arquitetura do Dev-roast com Client, Next.js App Router, tRPC Router, Gemini e PostgreSQL.',
      caption:
        'Fluxo server-first: páginas e Server Components preparam dados via tRPC, as mutações passam por API Route, a análise usa Gemini e os resultados ficam em PostgreSQL com Drizzle ORM.'
    },
    points: [
      {
        title: 'Tom que chama atenção',
        body: 'O roast dá um tom à análise para o resultado ser mais fácil de lembrar.'
      },
      {
        title: 'Stack recente',
        body: 'Next.js 16, React 19, tRPC, TanStack Query, Drizzle e Tailwind v4.'
      },
      {
        title: 'Menos peso no cliente',
        body: 'Server Components, prefetch com hidratação e Shiki no servidor reduzem o trabalho do browser.'
      }
    ],
    code: [
      {
        file: 'server.tsx',
        lang: 'TypeScript',
        code: `import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cache } from "react";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);

export function HydrateClient({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(queryOptions: T) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    return queryClient.prefetchInfiniteQuery(queryOptions as any);
  }
  return queryClient.prefetchQuery(queryOptions);
}`
      },
      {
        file: 'roast.ts',
        lang: 'TypeScript',
        code: `create: baseProcedure
  .input(z.object({ code: z.string().min(1), language: z.string(), roastMode: z.boolean() }))
  .mutation(async ({ ctx, input }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    const [roast] = await ctx.db.transaction(async (tx) => {
      const [insertedRoast] = await tx
        .insert(roasts)
        .values({
          code: input.code,
          language: input.language,
          lineCount: input.code.split("\\n").length,
          score: data.score,
          verdict: data.verdict,
          roastQuote: data.roastQuote,
          suggestedFix: data.suggestedFix,
        })
        .returning();

      if (data.analysisItems?.length > 0) {
        await tx.insert(analysisItems).values(
          data.analysisItems.map((item, index) => ({
            roastId: insertedRoast.id,
            severity: item.severity,
            title: item.title,
            description: item.description,
            order: index,
          })),
        );
      }

      return [insertedRoast];
    });

    return { id: roast.id };
  }),`
      },
      {
        file: 'code-block.tsx',
        lang: 'TypeScript',
        code: `/** Server Component: syntax highlighting com zero bundle no client. */
export async function CodeBlockContent({ code, lang = "typescript", className }: Props) {
  "use cache";

  const html = await codeToHtml(code, { lang, theme: "vesper" });
  const linesCount = code.trim().split("\\n").length;

  return (
    <div className={body({ className })}>
      <div className={lineNumbers()}>
        {Array.from({ length: linesCount }).map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className={contentStyle()} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}`
      }
    ],
    closing:
      'IA para revisar código, página compartilhável na saída e arquitetura server-first por baixo.'
  }
];

export function findCase(slug: string | undefined): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}
