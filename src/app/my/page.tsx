import Link from 'next/link';

export const metadata = { title: 'À propos — Portfolio' };

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      {/* File header */}
      <div className="fade-in fade-in-1" style={{ color: 'var(--syn-comment)', marginBottom: 32, lineHeight: 1.8 }}>
        <div>{'/**'}</div>
        <div>{' * @file about.tsx'}</div>
        <div>{' * @description À propos de moi'}</div>
        <div>{' */'}</div>
      </div>

      {/* Function declaration */}
      <div className="fade-in fade-in-2" style={{ marginBottom: 32 }}>
        <span style={{ color: 'var(--syn-keyword)' }}>export default function</span>
        {' '}
        <span style={{ color: 'var(--syn-function)' }}>About</span>
        {'() {'}
      </div>

      <div style={{ paddingLeft: 20 }}>
        <div className="fade-in fade-in-2" style={{ color: 'var(--syn-keyword)', marginBottom: 24 }}>
          {'return ('}
        </div>

        <div style={{ paddingLeft: 20 }}>
          {/* Title */}
          <div className="fade-in fade-in-3" style={{ marginBottom: 32 }}>
            <div style={{ color: 'var(--syn-comment)', fontSize: 12, marginBottom: 6 }}>{'<h1>'}</div>
            <h1
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--syn-function)',
                margin: '0 0 4px',
                lineHeight: 1.3,
              }}
            >
              À propos
            </h1>
            <div style={{ color: 'var(--syn-comment)', fontSize: 12 }}>{'</h1>'}</div>
          </div>

          {/* Languages */}
          <div
            className="fade-in fade-in-5"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '24px',
              marginBottom: 32,
              fontSize: 13,
              lineHeight: 2,
            }}
          >
            <div style={{ color: 'var(--syn-comment)', marginBottom: 12 }}>
              {'// ── Languages & Frameworks ──────────────────────'}
            </div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: 'var(--syn-keyword)' }}>const</span>
              {' '}
              <span style={{ color: 'var(--syn-variable)' }}>languages</span>
              {' = {'}
            </div>
            {[
              { key: 'frontend',  items: ['React', 'Vue'] },
              { key: 'mobile',    items: ['Kotlin', 'Flutter'] },
              { key: 'backend',   items: ['Python', 'Django'] },
              { key: 'système',   items: ['C', 'C++'] },
            ].map(({ key, items }) => (
              <div key={key} style={{ paddingLeft: 24 }}>
                <span style={{ color: 'var(--syn-property)' }}>{key}</span>
                {': ['}
                {items.map((lang, i) => (
                  <span key={lang}>
                    <span style={{ color: 'var(--syn-string)' }}>'{lang}'</span>
                    {i < items.length - 1 && ', '}
                  </span>
                ))}
                {'],'}
              </div>
            ))}
            <div>{'}'}</div>
          </div>

          {/* CTA */}
          <div className="fade-in fade-in-5" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link
              href="/projects"
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
              {' ls ~/projects'}
            </Link>
            <Link
              href="/contact"
              className="cta-link-contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--syn-string)',
                padding: '10px 20px',
                borderRadius: 4,
                textDecoration: 'none',
                fontSize: 13,
                transition: 'border-color 0.15s',
              }}
            >
              <span style={{ color: 'var(--syn-variable)' }}>$</span>
              {' mail --new ~/contact'}
            </Link>
          </div>
        </div>

        <div style={{ color: 'var(--syn-keyword)', marginTop: 16 }}>{')'}</div>
      </div>

      <div style={{ marginTop: 8 }}>{'}'}</div>
    </div>
  );
}
