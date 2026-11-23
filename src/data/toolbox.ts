import { useLocale, type Locale } from '../lib/locale';

/** Ícones disponíveis para os itens do bloco "o que ela entrega". */
export type OutcomeIcon = 'ticket-check' | 'ticket' | 'ticket-x';

export type Tool = {
  /** Vira o endereço da página: /toolbox/<slug>. */
  slug: string;
  /** Skill, MCP ou o que mais entrar na caixa. Aparece como etiqueta. */
  kind: string;
  name: string;
  pitch: string;
  input: string;
  output: string;
  /** O que a ferramenta devolve, item a item. Na cupons são os vereditos; num MCP, as ferramentas que ele expõe. */
  outcomes: { label: string; items: { icon?: OutcomeIcon; name: string; body: string }[] };
  limits: string;
  agents: string[];
  /** O pedido que a pessoa cola no agente para instalar. */
  install: string;
  /** Como chamar a ferramenta depois de instalada. */
  run: string;
  repo: string;
  /** Passos reais que a ferramenta segue, na ordem; viram o terminal ao lado. */
  steps: { label: string; body: string }[];
  closing: string;
  /** Quando existir, o vídeo da ferramenta rodando toma o lugar do terminal. */
  video?: { src: string; poster: string; label: string; caption: string };
};

const REPO = 'https://github.com/Luizfbm/skills/tree/main/skills/cupons';
const RUN = '/cupons https://loja.com.br/produto';

const pt: Tool[] = [
  {
    slug: 'cupons',
    kind: 'Skill',
    name: 'cupons',
    pitch: 'Procura cupons de desconto para um produto e entrega só os que têm prova de que estão valendo.',
    input: 'O link do produto numa loja brasileira.',
    output: 'Uma tabela de cupons, cada um com veredito, preço estimado e a prova.',
    outcomes: {
      label: 'Vereditos',
      items: [
        { icon: 'ticket-check', name: 'Confirmado', body: 'A própria loja liga o cupom àquele produto.' },
        {
          icon: 'ticket',
          name: 'Provável',
          body: 'A regra da loja cabe no produto e duas fontes diferentes mostram o cupom ativo nos últimos dias.'
        },
        { icon: 'ticket-x', name: 'Descartado', body: 'Todo o resto, com o motivo escrito.' }
      ]
    },
    limits:
      'Ela não testa o cupom no carrinho, não faz login e não compara lojas. A resposta avisa que o veredito vem das provas.',
    agents: ['Claude Code', 'Codex', 'Cursor', 'App Claude'],
    install: 'Instala a skill cupons de github.com/Luizfbm/skills',
    run: RUN,
    repo: REPO,
    steps: [
      { label: 'produto', body: 'loja, vendedor, preço à vista e parcelado' },
      { label: 'loja', body: 'página de cupons: ativos, encerrados e futuros' },
      { label: 'fontes', body: 'Cuponomia, Promobit, Méliuz, Pelando e matérias' },
      { label: 'triagem', body: 'sai o vencido, o de outra loja e o sem sinal recente' },
      { label: 'regras', body: 'categoria, vendedor, valor mínimo e pagamento' },
      { label: 'veredito', body: 'confirmado, provável ou descartado, com prova' }
    ],
    closing: 'Nenhum cupom foi testado no carrinho; os vereditos vêm das provas citadas.'
  }
];

const en: Tool[] = [
  {
    ...pt[0],
    pitch: 'Looks for discount coupons for a product and returns only the ones with proof that they work today.',
    input: 'The product link from a Brazilian online store.',
    output: 'A table of coupons, each with a verdict, an estimated price and the proof.',
    outcomes: {
      label: 'Verdicts',
      items: [
        { icon: 'ticket-check', name: 'Confirmed', body: 'The store itself ties the coupon to that product.' },
        {
          icon: 'ticket',
          name: 'Likely',
          body: "The store's rule fits the product and two different sources show the coupon active in the last few days."
        },
        { icon: 'ticket-x', name: 'Discarded', body: 'Everything else, with the reason written down.' }
      ]
    },
    limits:
      'It does not test the coupon at checkout, does not log in and does not compare stores. The answer says the verdict comes from the evidence.',
    agents: ['Claude Code', 'Codex', 'Cursor', 'Claude app'],
    install: 'Install the cupons skill from github.com/Luizfbm/skills',
    steps: [
      { label: 'product', body: 'store, seller, cash and instalment price' },
      { label: 'store', body: 'coupon page: active, ended and upcoming' },
      { label: 'sources', body: 'Cuponomia, Promobit, Méliuz, Pelando and articles' },
      { label: 'triage', body: 'drops expired, other-store and stale coupons' },
      { label: 'rules', body: 'category, seller, minimum spend and payment' },
      { label: 'verdict', body: 'confirmed, likely or discarded, with proof' }
    ],
    closing: 'No coupon was tested at checkout; the verdicts come from the evidence cited.'
  }
];

const toolsByLocale: Record<Locale, Tool[]> = { pt, en };

export function getTools(locale: Locale): Tool[] {
  return toolsByLocale[locale];
}

export function findTool(slug: string | undefined, locale: Locale): Tool | undefined {
  return toolsByLocale[locale].find((tool) => tool.slug === slug);
}

export function useToolbox(): Tool[] {
  return toolsByLocale[useLocale()];
}
