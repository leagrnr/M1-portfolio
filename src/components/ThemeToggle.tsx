'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: 80 }} />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
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
