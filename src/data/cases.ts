import type { Locale } from '../lib/locale';
import { casesEn } from './cases.en';

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
  /** O evento ou desafio em que o projeto nasceu: uma linha para a vitrine e um parágrafo para o case. */
  challenge?: { short: string; body: string };
  story: string;
  /** Termos do domínio explicados para quem não é da área. */
  glossary?: { term: string; body: string }[];
  /** Prints do produto rodando local com dados de exemplo. O primeiro vira capa na vitrine. */
  screens?: { src: string; alt: string; caption: string }[];
  /** Troca a nota padrão dos prints quando eles não vêm de uma instância local. */
  screensNote?: string;
  architecture: { src: string; alt: string; caption: string };
  points: { title: string; body: string }[];
  code: CodeTab[];
  closing: string;
};

export const cases: CaseStudy[] = [
  {
    slug: 'terminators-lunar',
    name: 'NASA Space Apps 2026',
    context: 'Desafio mundial da NASA',
    headline: 'Um lander no polo sul da Lua vai ver o Sol e a Terra? Por quanto tempo?',
    summary:
      'Lunar Landing Site Navigator, o projeto do nosso time no NASA Space Apps Challenge 2026. Você escolhe um Site e uma Window, e o app diz quando o Sol e a Terra somem e qual feição do relevo esconde cada um. FastAPI e NumPy no motor, SPICE e os mapas do LOLA nos dados, React e Three.js na interface.',
    readings: [
      { label: 'sites', value: '134, 130 do Artemis' },
      { label: 'horizonte', value: '720 raios em 3 resoluções' },
      { label: 'efemérides', value: 'SPICE com DE440' },
      { label: 'validação', value: '29 de 32 checagens passam' }
    ],
    stack: ['Python', 'FastAPI', 'NumPy', 'SPICE', 'rasterio', 'React', 'TypeScript', 'Three.js'],
    links: [
      { label: 'Repositório', href: 'https://github.com/Luizfbm/terminators-lunar' },
      { label: 'lunar.luizfbm.win', href: 'https://lunar.luizfbm.win' }
    ],
    challenge: {
      short: 'O hackathon mundial da NASA: dois dias, dados abertos da agência, 14 e 15 de novembro de 2026.',
      body: 'O NASA Space Apps Challenge é o hackathon mundial da NASA, que a agência apresenta como o maior hackathon anual do mundo. Em dois dias, times reunidos em centenas de eventos locais usam dados abertos da NASA e de 17 agências espaciais parceiras para resolver desafios escritos por especialistas delas. A edição de 2026 aconteceu em 14 e 15 de novembro, com times de até seis pessoas. O nosso escolheu o desafio Lunar Landing Site Navigator.'
    },
    story:
      'No polo sul da Lua o Sol fica a cerca de 1,5° do horizonte e dá uma volta nele por mês, então uma única crista decide se o painel solar funciona. Levamos isso para o desafio Lunar Landing Site Navigator como uma pergunta só: daquele ponto, naquela janela, o lander vê o Sol e a Terra? Todo o cálculo fica no backend, a Query inteira cabe no link e cada resposta nomeia o que escondeu o Sol ou a Terra. O Sol importa porque é ele que carrega os painéis, e a Terra porque sem ela à vista não há comunicação direta.',
    glossary: [
      {
        term: 'Site',
        body: 'Um ponto exato na superfície da Lua, dado por latitude e longitude. O app tem 134 deles, e uma coordenada digitada também vira um Site.'
      },
      {
        term: 'Window',
        body: 'O período que a pergunta cobre: um instante de início e uma duração. O padrão é um mês lunar, cerca de 29,5 dias.'
      },
      {
        term: 'Artemis',
        body: 'O programa da NASA para levar pessoas de volta à Lua. 130 dos Sites vêm de uma lista de candidatos de pouso publicada para ele.'
      },
      {
        term: 'O motor',
        body: 'A parte do sistema que faz as contas. Recebe o Site e a Window, calcula onde o Sol e a Terra estão no céu e compara com o relevo em volta. É um programa em Python que roda no servidor, e a tela só mostra o resultado.'
      },
      {
        term: 'Efemérides',
        body: 'Tabelas que dizem onde cada astro está em cada instante. É por elas que o motor sabe em que direção ficam o Sol e a Terra vistos da Lua.'
      },
      {
        term: 'SPICE e DE440',
        body: 'SPICE é o conjunto de ferramentas da NASA para calcular posições no espaço, o mesmo usado em missões reais. DE440 é a efeméride que ele lê: o arquivo do JPL com as órbitas do Sol, da Terra e da Lua.'
      },
      {
        term: 'DEM',
        body: 'Sigla de Digital Elevation Model, um mapa de alturas do terreno. Cada quadradinho guarda a altitude daquele pedaço de chão. Num DEM de 20 m há um valor a cada 20 metros, e quanto menor o número, mais detalhe.'
      },
      {
        term: 'LOLA',
        body: 'Lunar Orbiter Laser Altimeter, o instrumento da sonda LRO da NASA que mede a altura do solo lunar disparando laser da órbita. Os DEMs que o motor usa vêm dessas medições.'
      },
      {
        term: 'Horizon mask',
        body: 'A linha do horizonte vista de um Site. Para cada direção em volta, guarda a altura do relevo mais alto naquela direção. Se o Sol está abaixo dessa linha, ele está escondido.'
      },
      {
        term: 'Occluder',
        body: 'A montanha, a crista ou a borda de cratera que forma o horizonte numa direção. É o que esconde o Sol ou a Terra.'
      },
      {
        term: 'IAU e Gazetteer',
        body: 'A IAU é a União Astronômica Internacional, que dá os nomes oficiais a crateras e montanhas. O Gazetteer é o catálogo desses nomes, e é dele que sai o nome do que escondeu o Sol.'
      },
      {
        term: 'Sunset e Earthset',
        body: 'O instante em que o Sol, ou a Terra, some atrás do relevo. Sunrise e Earthrise são a volta. No polo, quem causa isso quase sempre é o terreno, não a rotação da Lua.'
      },
      {
        term: 'Sun fraction',
        body: 'A parte do disco do Sol que está acima do horizonte num instante, de 0 a 100%.'
      },
      {
        term: 'JPL Horizons',
        body: 'Serviço do JPL, laboratório da NASA, que calcula a posição dos astros. Serve de referência independente para conferir se os números do motor batem.'
      }
    ],
    screensNote: 'Capturas do app publicado em lunar.luizfbm.win.',
    screens: [
      {
        src: '/assets/cases/terminators-lunar-chao.webp',
        alt: 'Vista do chão no Site 001, Connecting Ridge: o Sol sobre o relevo, a Terra no alto, a linha do tempo da Window e o painel com as horas de Sol e de Terra.',
        caption:
          'A vista do chão no Connecting Ridge. Nesta Window o Sol não se põe, e a Terra some atrás de Mons Malapert, a 134 km.'
      },
      {
        src: '/assets/cases/terminators-lunar-mapa.webp',
        alt: 'Mapa do polo sul da Lua com as regiões marcadas, entre elas Connecting Ridge, Mons Malapert, Haworth, Nobile Rim e Shackleton.',
        caption: 'O polo sul visto de cima, com as regiões do catálogo e o Site escolhido.'
      },
      {
        src: '/assets/cases/terminators-lunar-prova.webp',
        alt: 'Página Prova com a tabela de onde um número pode errar: fonte do erro, tamanho, efeito na resposta e de onde vem o tamanho.',
        caption: 'A página Prova abre dizendo onde um número pode errar, antes de listar as checagens.'
      }
    ],
    architecture: {
      src: '/assets/terminators-lunar-architecture.svg',
      alt: 'Diagrama do Lunar Landing Site Navigator com interface React e Three.js, API FastAPI, motor de visibilidade e dados da NASA.',
      caption:
        'A interface manda a Query para a API pelo contrato OpenAPI. O motor calcula a posição do Sol e da Terra com SPICE a cada 15 minutos, monta a Horizon mask com 720 raios sobre os DEMs do LOLA e compara os dois. Fila, cache e o assistente ficam na borda da API.'
    },
    points: [
      {
        title: 'Horizonte em três resoluções',
        body: 'Um raio a cada 0,5° de azimute sobre DEMs aninhados: 20 m até 5 km, 80 m até 100 km e 240 m até 300 km. Cada raio considera a curvatura da Lua e guarda o ângulo mais alto.'
      },
      {
        title: 'O que escondeu',
        body: 'Cada Sunset, Sunrise, Earthset e Earthrise sai com o Occluder: azimute, distância e o nome da feição no Gazetteer da IAU.'
      },
      {
        title: 'Sol como disco',
        body: 'O Sol conta como visível enquanto qualquer pedaço do disco está acima do horizonte, e a Terra conta pelo centro. Um Sol parcialmente à vista nunca arredonda para 0% nem para 100%.'
      },
      {
        title: 'Validação sem ajuste',
        body: 'São 32 checagens publicadas contra o JPL Horizons, o eclipse de 14/03/2025, o mapa de 18,6 anos da NASA e pousos reais. 29 passam, 2 falham e 1 é só um exemplo. Nenhuma tolerância mudou para uma checagem passar, e as que falham aparecem primeiro.'
      },
      {
        title: 'Controles negativos',
        body: 'Parte das checagens precisa falhar de propósito, como girar a silhueta do horizonte 1° ou deslocar o tempo em 10 minutos. Elas mostram que o teste distingue uma resposta errada de uma certa.'
      },
      {
        title: 'Operação',
        body: 'Três containers num VPS com Docker Compose: backend, Caddy e Cloudflare Tunnel. O motor roda 4 execuções por vez, e com a fila cheia a API responde 503 busy com Retry-After.'
      },
      {
        title: 'Feito com agentes de IA',
        body: 'O time escolheu a pergunta, os dados, os modelos e as tolerâncias. Agentes escreveram a maior parte do código em branches próprias, e um pull request só entrou com o diff lido e os checks verdes. Os números do app vêm dos dados da NASA, não de um modelo de linguagem.'
      }
    ],
    code: [
      {
        file: 'horizon.py',
        lang: 'Python',
        code: `def look(distances: Array, band: Band) -> tuple[Array, Array, Array, Array]:
    lat, lon = _destination(latitude_deg, longitude_deg, azimuths, distances)
    x, y = _project(band, lat, lon, longitude_deg)
    terrain = _heights(Path(folder), band, x, y, reads)
    theta = distances / MOON_RADIUS_M
    radius = MOON_RADIUS_M + terrain
    elevation = np.degrees(
        np.arctan2(radius * np.cos(theta) - observer_radius, radius * np.sin(theta))
    )
    return elevation, lat, lon, terrain

# The bands don't depend on each other and numpy lets go of the GIL in its loops, so
# they run side by side; they are merged in ladder order, as one after the other would.
with ThreadPoolExecutor(max_workers=len(bands)) as pool:
    found = list(pool.map(band_peaks, bands))
for peak, distance, lat, lon, terrain in found:
    better = peak > best
    best = np.where(better, peak, best)
    best_distance = np.where(better, distance, best_distance)
    best_lat = np.where(better, lat, best_lat)
    best_lon = np.where(better, lon, best_lon)
    best_height = np.where(better, terrain, best_height)`
      },
      {
        file: 'geometry.py',
        lang: 'Python',
        code: `def disc_above(center: float, radius: float) -> float:
    if center - radius >= 0:
        return 1.0
    if center + radius <= 0:
        return 0.0
    x = max(-1.0, min(1.0, center / radius))
    return 0.5 + math.asin(x) / math.pi + x * math.sqrt(max(0.0, 1.0 - x * x)) / math.pi


def angle_between(a: tuple[float, float, float], b: tuple[float, float, float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    magnitude = math.sqrt(sum(x * x for x in a) * sum(y * y for y in b))
    return math.acos(max(-1.0, min(1.0, dot / magnitude)))`
      },
      {
        file: 'engine.py',
        lang: 'Python',
        code: `def sun_fraction(self) -> float:
    over_horizon = self._sun_over_terrain
    behind_earth = geometry.circle_overlap_fraction(
        self.sun_radius_rad,
        self.earth_radius_rad,
        geometry.angle_between(self.sun.vector_km, self.earth.vector_km),
    )
    return max(0.0, min(1.0, over_horizon * (1.0 - behind_earth)))


def _refine(left: Look, right: Look, body: Seen, look: Callable[[datetime], Look]) -> datetime:
    """Bisect the instant the body crosses the horizon, to about one second."""
    before, after = left.instant, right.instant
    was_above = left.above(body)
    while (after - before).total_seconds() > 0.5:
        middle = before + (after - before) / 2
        if look(middle).above(body) == was_above:
            before = middle
        else:
            after = middle
    return round_second(before + (after - before) / 2)`
      }
    ],
    closing:
      'O app responde uma pergunta só e mostra, na mesma página, onde essa resposta pode estar errada.'
  },
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
    screens: [
      {
        src: '/assets/cases/chrono-crash-rodada.webp',
        alt: 'Tela do Chrono Crash durante uma rodada: multiplicador em 1.09x, aposta de R$ 10,00 aceita e botão de cash out ativo.',
        caption: 'Rodada em andamento com aposta aceita. O saldo do topo vem do Wallet Service, o multiplicador chega pelo Socket.IO.'
      },
      {
        src: '/assets/cases/chrono-crash-grafana.webp',
        alt: 'Dashboard do Grafana com volume de apostas, total apostado, payouts, crashes por faixa, RTP e eventos WebSocket.',
        caption: 'O dashboard provisionado no Grafana, com as métricas que o jogo exporta para o Prometheus.'
      }
    ],
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
    links: [{ label: 'Repositório', href: 'https://github.com/Luizfbm/IAeJovem-HackFaesa2025' }],
    story:
      'O estudante precisa de um espaço reservado para falar. A escola precisa perceber quando algo merece atenção. O projeto separa o chat privado, o score emocional e o painel pedagógico.',
    screens: [
      {
        src: '/assets/cases/iaejovem-conversa.webp',
        alt: 'Conversa com a Ayla: o estudante conta que está cansado com a semana de provas e a Ayla responde acolhendo e perguntando o que pesa mais.',
        caption: 'Conversa com a Ayla. A resposta da IA neste print é um texto de exemplo.'
      },
      {
        src: '/assets/cases/iaejovem-painel.webp',
        alt: 'Painel do estudante com atalhos para conversar, ver pontos e a loja, e contadores de conversas e pontos.',
        caption: 'Painel do estudante, com pontos, conversas da semana e a loja de resgates.'
      }
    ],
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
    links: [{ label: 'Repositório', href: 'https://github.com/Luizfbm/CaseFlow-EQPDEV' }],
    story:
      'O usuário explica o problema do jeito dele, e o time precisa de um ticket organizado para agir. A IA fica nessa passagem. Ela entende a mensagem, sugere estrutura e entrega ao Kanban um chamado mais pronto para triagem.',
    screens: [
      {
        src: '/assets/cases/case-flow-kanban.webp',
        alt: 'Dashboard Kanban do Case Flow com chamados novos, em progresso, finalizados e retornados, cada um com setor e prioridade.',
        caption: 'Kanban com os chamados por status, setor e prioridade.'
      },
      {
        src: '/assets/cases/case-flow-chatbot.webp',
        alt: 'Chatbot do Case Flow transformando uma mensagem em um resumo de chamado com título, descrição, departamento TI e prioridade alta.',
        caption: 'O chatbot transforma a mensagem em um chamado e pede confirmação. A análise da IA neste print é de exemplo.'
      }
    ],
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
    screens: [
      {
        src: '/assets/cases/dev-roast-editor.webp',
        alt: 'Tela inicial do Dev-roast com o editor de código, o modo roast ligado e o botão roast my code.',
        caption: 'O editor de entrada, com detecção de linguagem e o modo roast.'
      },
      {
        src: '/assets/cases/dev-roast-compartilhar.webp',
        alt: 'Imagem de compartilhamento de um roast: nota 1.8 de 10, veredito needs serious help e a frase do roast.',
        caption: 'A imagem gerada para compartilhar o resultado. Roast de exemplo.'
      },
      {
        src: '/assets/cases/dev-roast-leaderboard.webp',
        alt: 'Shame Leaderboard do Dev-roast listando os códigos com as piores notas e o trecho de cada um.',
        caption: 'O leaderboard com os piores códigos, renderizados com Shiki no servidor.'
      }
    ],
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

function translate(study: CaseStudy): CaseStudy {
  const text = casesEn[study.slug];
  if (!text) return study;
  return {
    ...study,
    context: text.context,
    headline: text.headline,
    summary: text.summary,
    readings: text.readings,
    challenge: text.challenge ?? study.challenge,
    story: text.story,
    glossary: text.glossary ?? study.glossary,
    screensNote: text.screensNote ?? study.screensNote,
    points: text.points,
    closing: text.closing,
    links: study.links.map((link) => (link.label === 'Repositório' ? { ...link, label: text.repoLabel } : link)),
    screens: study.screens?.map((screen, index) => ({ ...screen, ...text.screens?.[index] })),
    architecture: { ...study.architecture, ...text.architecture }
  };
}

const casesByLocale: Record<Locale, CaseStudy[]> = { pt: cases, en: cases.map(translate) };

export function getCases(locale: Locale): CaseStudy[] {
  return casesByLocale[locale];
}

export function findCase(slug: string | undefined, locale: Locale): CaseStudy | undefined {
  return casesByLocale[locale].find((item) => item.slug === slug);
}
