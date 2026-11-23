import { Link } from 'react-router-dom';
import { useToolbox } from '../data/toolbox';
import { useUi } from '../data/ui';
import { localePath, useLocale } from '../lib/locale';

const index = (n: number) => String(n).padStart(2, '0');

/**
 * Uma linha curta por ferramenta; o detalhe mora na página de cada uma.
 * A última linha, apagada, guarda o lugar da próxima.
 */
export function Toolbox() {
  const t = useUi().toolbox;
  const locale = useLocale();
  const tools = useToolbox();

  return (
    <ol className="toolbox">
      {tools.map((tool, i) => (
        <li key={tool.slug}>
          <Link
            className="toolbox__row"
            to={localePath(locale, `/toolbox/${tool.slug}`)}
          >
            <span className="toolbox__index reading">{index(i + 1)}</span>
            <span className="toolbox__head">
              <span className="toolbox__name">{tool.name}</span>
              <span className="toolbox__kind reading">{tool.kind}</span>
            </span>
            <span className="toolbox__pitch">{tool.pitch}</span>
            <span className="toolbox__go" aria-hidden="true">
              {t.open}
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
      <li className="toolbox__ghost">
        <span className="toolbox__index reading">{index(tools.length + 1)}</span>
        <span className="toolbox__name">{t.soon}</span>
      </li>
    </ol>
  );
}
