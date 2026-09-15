import { useId, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../lib/theme';

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Skiper4 ThemeToggleButton2, ligado no tema de verdade. No escuro mostra o
 * sol (acender o estúdio); no claro, a lua. A transição de página sai do
 * próprio botão, como um cone de luz.
 */
export function LightSwitch() {
  const { theme, toggle } = useTheme();
  const clipId = `luz-${useId().replace(/:/g, '')}`;
  const lightsOn = theme === 'light';

  const onToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      className="switch"
      onClick={onToggle}
      aria-pressed={lightsOn}
      title={lightsOn ? 'Usar tema escuro' : 'Usar tema claro'}
      aria-label={lightsOn ? 'Usar tema escuro' : 'Usar tema claro'}
    >
      <svg className="switch__icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId}>
            <motion.path
              animate={{ x: lightsOn ? -12 : 0, y: lightsOn ? 10 : 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.42 }}
              d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <motion.circle
            cx="16"
            cy="16"
            animate={{ r: lightsOn ? 10 : 6.2 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.42 }}
          />
          <motion.g
            style={{ transformOrigin: '16px 16px' }}
            animate={{
              rotate: lightsOn ? -100 : 0,
              scale: lightsOn ? 0.45 : 1,
              opacity: lightsOn ? 0 : 1
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.42 }}
          >
            {RAYS.map((angle) => (
              <polygon key={angle} points="16,1.6 17.55,7.35 14.45,7.35" transform={`rotate(${angle} 16 16)`} />
            ))}
          </motion.g>
        </g>
      </svg>
    </button>
  );
}
