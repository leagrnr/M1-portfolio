export default function Loading() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ color: 'var(--syn-comment)', marginBottom: 32 }}>
        {'// loading projects'}
        <span className="cursor" />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 16,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: 160, borderRadius: 6, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
