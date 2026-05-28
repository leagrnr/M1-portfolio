export default function Loading() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ color: 'var(--syn-comment)', marginBottom: 32 }}>
        {'// loading'}
        <span className="cursor" />
      </div>
      {[80, 60, 90, 50, 70].map((w, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height: 14,
            width: `${w}%`,
            marginBottom: 14,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
