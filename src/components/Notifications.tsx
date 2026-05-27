'use client';

import { useUIStore } from '@/stores/useUIStore';

const config = {
  success: { color: 'var(--syn-property)',  prefix: '// ✓' },
  error:   { color: 'var(--syn-keyword)',   prefix: '// ✗' },
  info:    { color: 'var(--syn-variable)',  prefix: '//' },
} as const;

export function Notifications() {
  const { notifications, removeNotification } = useUIStore();

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      {notifications.map((n) => {
        const { color, prefix } = config[n.type];
        return (
          <div
            key={n.id}
            className="notif-toast"
            style={{
              background: 'var(--bg-secondary)',
              border: `1px solid ${color}`,
              borderRadius: 6,
              padding: '10px 14px',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              pointerEvents: 'all',
              maxWidth: 340,
            }}
          >
            <span style={{ color, flexShrink: 0 }}>{prefix}</span>
            <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{n.message}</span>
            <button
              onClick={() => removeNotification(n.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0 2px',
                fontSize: 12,
                flexShrink: 0,
                fontFamily: 'inherit',
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
