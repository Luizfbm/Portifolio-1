import { useEffect, useState } from 'react';
import { useUi } from '../../data/ui';
import { CheckIcon, CopyIcon } from './ToolIcons';

/** Plano B para navegador sem a API de área de transferência liberada. */
function copyWithSelection(text: string): boolean {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  field.remove();
  return ok;
}

export function CopyLine({ label, text }: { label: string; text: string }) {
  const t = useUi().toolbox;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(copyWithSelection(text));
    }
  };

  return (
    <div className="copy">
      <span className="meta">{label}</span>
      <div className="copy__box">
        <code>{text}</code>
        <button type="button" className="copy__button" onClick={copy} aria-label={t.copy(text)}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <span className="copy__status meta" role="status">
        {copied ? t.copied : ''}
      </span>
    </div>
  );
}
