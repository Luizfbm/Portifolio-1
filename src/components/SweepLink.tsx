import type { ReactNode } from 'react';

type SweepLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

/**
 * O sublinhado varre de um lado ao outro como uma luz passando pela palavra.
 * Usado só no hero e no contato — se todo link fizesse isso, não seria nada.
 */
export function SweepLink({ href, children, external, className, ariaLabel }: SweepLinkProps) {
  return (
    <a
      className={['sweep', className].filter(Boolean).join(' ')}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : null)}
    >
      <span className="sweep__text">{children}</span>
      {external ? (
        <svg className="sweep__mark" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
          <path
            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </a>
  );
}
