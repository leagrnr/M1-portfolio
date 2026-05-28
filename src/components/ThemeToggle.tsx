'use client';

import { useThemeStore } from '@/stores/useThemeStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontFamily: 'inherit',
        fontSize: 11,
        padding: '3px 10px',
        borderRadius: 4,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'border-color 0.15s, color 0.15s',
      }}
    >
      <span style={{ color: 'var(--syn-variable)' }}>$</span>
      {isDark ? ' theme --light' : ' theme --dark'}
    </button>
  );
}
