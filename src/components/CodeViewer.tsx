import { useId, useState } from 'react';
import type { CodeTab } from '../data/cases';

export function CodeViewer({ tabs }: { tabs: CodeTab[] }) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const lines = tab.code.split('\n');

  return (
    <div className="code">
      <div className="code__tabs" role="tablist" aria-label="Trechos de código">
        {tabs.map((item, index) => (
          <button
            key={item.file}
            type="button"
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            className={index === active ? 'is-active' : undefined}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
              event.preventDefault();
              const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
              setActive(next);
              document.getElementById(`${baseId}-tab-${next}`)?.focus();
            }}
          >
            {item.file}
          </button>
        ))}
      </div>

      <div
        className="code__pane"
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
      >
        <p className="code__lang reading">{tab.lang}</p>
        <pre>
          <code>
            {lines.map((line, index) => (
              <span className="code__line" key={index}>
                <span className="code__no" aria-hidden="true">
                  {index + 1}
                </span>
                {line || ' '}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
