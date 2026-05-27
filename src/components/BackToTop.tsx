'use client';

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 100,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        color: 'var(--syn-comment)',
        fontFamily: 'inherit',
        fontSize: 12,
        padding: '7px 14px',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'border-color 0.15s, color 0.15s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--syn-variable)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--syn-variable)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--syn-comment)';
      }}
    >
      $ cd ~
    </button>
  );
}
