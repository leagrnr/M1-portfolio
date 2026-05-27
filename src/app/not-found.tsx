import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px' }}>
      <div style={{ color: 'var(--syn-comment)', marginBottom: 24, lineHeight: 1.8 }}>
        <div>{'/**'}</div>
        <div>{' * @error   404'}</div>
        <div>{' * @message Page introuvable'}</div>
        <div>{' */'}</div>
      </div>

      <div style={{ marginBottom: 20, fontSize: 13 }}>
        <span style={{ color: 'var(--syn-keyword)' }}>throw new</span>
        {' '}
        <span style={{ color: 'var(--syn-function)' }}>NotFoundError</span>
        {'('}
        <span style={{ color: 'var(--syn-string)' }}>'cette page n\'existe pas'</span>
        {')'}
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
        <span style={{ color: 'var(--syn-keyword)' }}>Error</span>
        {': '}
        <span style={{ color: 'var(--text-secondary)' }}>
          La ressource demandée est introuvable.
        </span>
      </div>

      <Link
        href="/"
        className="cta-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          color: 'var(--syn-property)',
          padding: '10px 20px',
          borderRadius: 4,
          textDecoration: 'none',
          fontSize: 13,
          transition: 'border-color 0.15s',
        }}
      >
        <span style={{ color: 'var(--syn-variable)' }}>$</span>
        {' cd ~/home'}
      </Link>
    </div>
  );
}
