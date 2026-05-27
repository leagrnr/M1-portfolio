'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const tabs = [
  { href: '/',         label: 'home.tsx',     path: '~/' },
  { href: '/projects', label: 'projects.tsx', path: '~/projects' },
  { href: '/contact',  label: 'contact.tsx',  path: '~/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const active = tabs.find(t => t.href === pathname) ?? tabs[0];

  return (
    <header
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          gap: 8,
        }}
      >
        <span
          style={{
            color: 'var(--text-muted)',
            fontSize: 12,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{ color: 'var(--syn-property)' }}>lea</span>
          <span style={{ color: 'var(--text-muted)' }}>@</span>
          <span style={{ color: 'var(--syn-variable)' }}>portfolio</span>
          <span style={{ color: 'var(--text-muted)' }}>:</span>
          <span style={{ color: 'var(--syn-string)' }}>{active.path}</span>
          <span style={{ color: 'var(--syn-property)' }}> $</span>
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>

      {/* Tabs */}
      <nav style={{ display: 'flex', overflowX: 'auto' }}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                padding: '8px 18px',
                fontSize: 13,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive ? 'var(--bg-primary)' : 'transparent',
                borderRight: '1px solid var(--border)',
                borderBottom: isActive ? '2px solid var(--syn-variable)' : '2px solid transparent',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              {isActive && (
                <span style={{ color: 'var(--syn-keyword)', marginRight: 6, fontSize: 11 }}>●</span>
              )}
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
