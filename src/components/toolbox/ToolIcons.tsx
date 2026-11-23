import type { OutcomeIcon } from '../../data/toolbox';

const TICKET =
  'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z';

/** Marcas por cima do bilhete, desenhadas a partir dos ícones lucide ticket-*. */
const MARKS: Record<OutcomeIcon, string> = {
  'ticket-check': 'm9 12 2 2 4-4',
  ticket: 'M13 5v2m0 10v2m0-8v2',
  'ticket-x': 'm9.5 9.5 5 5m-5 0 5-5'
};

export function OutcomeGlyph({ icon }: { icon: OutcomeIcon }) {
  return (
    <svg className={`outcome__icon is-${icon}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={TICKET} />
      <path d={MARKS[icon]} />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
