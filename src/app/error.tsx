'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px' }}>
      <div style={{ color: 'var(--syn-comment)', marginBottom: 24, lineHeight: 1.8 }}>
        <div>{'/**'}</div>
        <div>{' * @error   500'}</div>
        <div>{` * @message ${error.message || 'Une erreur est survenue'}`}</div>
        {error.digest && <div>{` * @digest  ${error.digest}`}</div>}
        <div>{' */'}</div>
      </div>

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--syn-keyword)',
          borderRadius: 6,
          padding: '16px 20px',
          marginBottom: 32,
          fontSize: 13,
        }}
      >
        <span style={{ color: 'var(--syn-keyword)' }}>RuntimeError</span>
        {': '}
        <span style={{ color: 'var(--text-secondary)' }}>
          {error.message || "Une erreur inattendue s'est produite."}
        </span>
      </div>

      <button
        onClick={reset}
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--syn-variable)',
          color: 'var(--syn-variable)',
          padding: '10px 20px',
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: 'var(--syn-variable)' }}>$</span>
        {' retry()'}
      </button>
    </div>
  );
}
