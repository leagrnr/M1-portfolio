import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://localhost:3000';

export const metadata: Metadata = {
  title: { default: 'Portfolio', template: '%s — Portfolio' },
  description: 'Portfolio — développeur web',
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Portfolio',
    title: 'Portfolio',
    description: 'Portfolio — développeur web',
  },
  twitter: { card: 'summary' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ThemeProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <footer
            style={{
              borderTop: '1px solid var(--border)',
              padding: '16px 24px',
              color: 'var(--syn-comment)',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            {'// '}
            <span style={{ color: 'var(--syn-keyword)' }}>export default</span>
            {' Portfolio — '}
            <span style={{ color: 'var(--syn-number)' }}>{new Date().getFullYear()}</span>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
